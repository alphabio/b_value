// b_path:: src/parse/color/lab.ts
import type * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type { LABColor } from "@/core/types/color";
import * as ASTUtils from "@/utils/ast";
import * as ParseUtils from "@/utils/parse";

/**
 * Parse a CSS LAB color value.
 *
 * Supports LAB syntax (modern only, no legacy comma syntax):
 * - Space-separated: `lab(50% -20 30)`, `lab(50 -20 30)`
 * - With alpha: `lab(50% -20 30 / 0.5)`
 * - Lightness can be percentage (0-100%) or number (0-100)
 * - a and b axes: -125 to 125 (clamped)
 *
 * @param input - The LAB color string to parse
 * @returns Result containing the parsed LABColor or error message
 *
 * @example
 * ```typescript
 * import { parse } from "@/parse/color/lab";
 *
 * // Basic syntax
 * const color1 = parse("lab(50% -20 30)");
 * // => { ok: true, value: { kind: "lab", l: 50, a: -20, b: 30 } }
 *
 * // With alpha
 * const color2 = parse("lab(50% -20 30 / 0.5)");
 * // => { ok: true, value: { kind: "lab", l: 50, a: -20, b: 30, alpha: 0.5 } }
 *
 * // Lightness as number
 * const color3 = parse("lab(50 -20 30)");
 * // => { ok: true, value: { kind: "lab", l: 50, a: -20, b: 30 } }
 * ```
 *
 * @public
 */
export function parse(input: string): Result<LABColor, string> {
	// Parse CSS string to AST
	const astResult = ASTUtils.parseCssString(input, "value");
	if (!astResult.ok) {
		return err(astResult.error);
	}

	// Find lab() function
	const funcResult = ASTUtils.findFunctionNode(astResult.value, ["lab"]);
	if (!funcResult.ok) {
		return err(funcResult.error);
	}

	const fn = funcResult.value;
	const children = fn.children.toArray();

	// Parse arguments - space-separated only (LAB is modern, no legacy syntax)
	return parseLABArguments(children);
}

/**
 * Parse LAB function arguments from AST nodes.
 * LAB only supports space-separated syntax: lab(L a b) or lab(L a b / A)
 *
 * @internal
 */
function parseLABArguments(nodes: csstree.CssNode[]): Result<LABColor, string> {
	let l: number | undefined;
	let a: number | undefined;
	let b: number | undefined;
	let alpha: number | undefined;
	let foundSlash = false;
	let componentIndex = 0;

	for (const node of nodes) {
		// Skip operators except slash
		if (node.type === "Operator" && "value" in node) {
			if (node.value === "/") {
				foundSlash = true;
				continue;
			}
			continue;
		}

		if (foundSlash) {
			// After slash, parse alpha
			if (alpha !== undefined) {
				return err("Too many values after '/' in LAB color");
			}
			const alphaResult = ParseUtils.parseAlpha(node, { clamp: true });
			if (!alphaResult.ok) {
				return err(alphaResult.error);
			}
			alpha = alphaResult.value;
			continue;
		}

		// Parse L, a, b components
		if (componentIndex === 0) {
			// Lightness (percentage or number)
			const lightnessResult = ParseUtils.parseLightness(node, "0-100");
			if (!lightnessResult.ok) {
				return err(lightnessResult.error);
			}
			l = lightnessResult.value;
		} else if (componentIndex === 1) {
			// a axis (number)
			const axisResult = parseAxisValue(node);
			if (!axisResult.ok) {
				return err(axisResult.error);
			}
			a = axisResult.value;
		} else if (componentIndex === 2) {
			// b axis (number)
			const axisResult = parseAxisValue(node);
			if (!axisResult.ok) {
				return err(axisResult.error);
			}
			b = axisResult.value;
		} else {
			// Too many values (more than 3 before slash)
			return err("Too many values in LAB color (expected 3: lightness, a, b)");
		}
		componentIndex++;
	}

	if (l === undefined || a === undefined || b === undefined) {
		return err("Expected 3 LAB values (lightness, a, b)");
	}

	const color: LABColor = { kind: "lab", l, a, b };
	if (alpha !== undefined) {
		color.alpha = alpha;
	}

	return ok(color);
}

/**
 * Parse an axis value (a or b).
 *
 * Accepts: number (typically -125 to 125, but clamped)
 *
 * @internal
 */
function parseAxisValue(node: csstree.CssNode): Result<number, string> {
	if (node.type === "Number") {
		const numResult = ParseUtils.parseNumberNode(node);
		if (!numResult.ok) {
			return err(numResult.error);
		}
		const value = numResult.value;
		// Clamp to -125 to 125 range (CSS spec)
		const clamped = Math.max(-125, Math.min(125, value));
		return ok(clamped);
	}

	return err(`Expected number for axis value, got ${node.type}`);
}
