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
			const alphaResult = parseAlpha(node);
			if (!alphaResult.ok) {
				return err(alphaResult.error);
			}
			alpha = alphaResult.value;
			continue;
		}

		// Parse L, a, b components
		if (componentIndex === 0) {
			// Lightness (percentage or number)
			const lightnessResult = parseLightness(node);
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
 * Parse a lightness value.
 *
 * Accepts:
 * - Percentage: 0%-100%
 * - Number: 0-100
 *
 * Clamped to 0-100 range.
 *
 * @internal
 */
function parseLightness(node: csstree.CssNode): Result<number, string> {
	// Try percentage first
	if (node.type === "Percentage") {
		const value = Number.parseFloat(node.value);
		if (Number.isNaN(value)) {
			return err("Invalid percentage value for lightness");
		}
		// Clamp to 0-100 range
		const clamped = Math.max(0, Math.min(100, value));
		return ok(clamped);
	}

	// Try number
	if (node.type === "Number") {
		const numResult = ParseUtils.parseNumberNode(node);
		if (!numResult.ok) {
			return err(numResult.error);
		}
		const value = numResult.value;
		// Clamp to 0-100 range
		const clamped = Math.max(0, Math.min(100, value));
		return ok(clamped);
	}

	return err(`Expected percentage or number for lightness, got ${node.type}`);
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

/**
 * Parse an alpha value.
 *
 * Accepts:
 * - Number: 0-1
 * - Percentage: 0%-100% (converted to 0-1)
 *
 * @internal
 */
function parseAlpha(node: csstree.CssNode): Result<number, string> {
	// Try parsing as number (0-1)
	if (node.type === "Number") {
		const numResult = ParseUtils.parseNumberNode(node);
		if (!numResult.ok) {
			return err(numResult.error);
		}
		const value = numResult.value;
		if (value < 0 || value > 1) {
			return err(`Alpha value must be between 0 and 1, got ${value}`);
		}
		return ok(value);
	}

	// Try parsing as percentage (0%-100%)
	if (node.type === "Percentage") {
		const value = Number.parseFloat(node.value);
		if (Number.isNaN(value)) {
			return err("Invalid percentage value for alpha");
		}
		if (value < 0 || value > 100) {
			return err(`Alpha percentage must be between 0% and 100%, got ${value}%`);
		}
		// Convert percentage to 0-1 range
		return ok(value / 100);
	}

	return err(`Expected number or percentage for alpha, got ${node.type}`);
}
