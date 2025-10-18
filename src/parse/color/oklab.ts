// b_path:: src/parse/color/oklab.ts
import type * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type { OKLabColor } from "@/core/types/color";
import * as ASTUtils from "@/utils/ast";
import * as ParseUtils from "@/utils/parse";

/**
 * Parse a CSS OKLab color value.
 *
 * Supports OKLab syntax (modern only, no legacy comma syntax):
 * - Space-separated: `oklab(0.5 -0.2 0.3)`, `oklab(50% -0.2 0.3)`
 * - With alpha: `oklab(0.5 -0.2 0.3 / 0.5)`
 * - Lightness can be percentage (0-100%) or number (0-1)
 * - a and b axes: -0.4 to 0.4 (clamped)
 *
 * @param input - The OKLab color string to parse
 * @returns Result containing the parsed OKLabColor or error message
 *
 * @example
 * ```typescript
 * import { parse } from "@/parse/color/oklab";
 *
 * // Basic syntax with number lightness
 * const color1 = parse("oklab(0.5 -0.2 0.3)");
 * // => { ok: true, value: { kind: "oklab", l: 0.5, a: -0.2, b: 0.3 } }
 *
 * // With alpha
 * const color2 = parse("oklab(0.5 -0.2 0.3 / 0.5)");
 * // => { ok: true, value: { kind: "oklab", l: 0.5, a: -0.2, b: 0.3, alpha: 0.5 } }
 *
 * // Lightness as percentage
 * const color3 = parse("oklab(50% -0.2 0.3)");
 * // => { ok: true, value: { kind: "oklab", l: 0.5, a: -0.2, b: 0.3 } }
 * ```
 *
 * @public
 */
export function parse(input: string): Result<OKLabColor, string> {
	// Parse CSS string to AST
	const astResult = ASTUtils.parseCssString(input, "value");
	if (!astResult.ok) {
		return err(astResult.error);
	}

	// Find oklab() function
	const funcResult = ASTUtils.findFunctionNode(astResult.value, ["oklab"]);
	if (!funcResult.ok) {
		return err(funcResult.error);
	}

	const fn = funcResult.value;
	const children = fn.children.toArray();

	// Parse arguments - space-separated only (OKLab is modern, no legacy syntax)
	return parseOKLabArguments(children);
}

/**
 * Parse OKLab function arguments from AST nodes.
 * OKLab only supports space-separated syntax: oklab(L a b) or oklab(L a b / A)
 *
 * @internal
 */
function parseOKLabArguments(nodes: csstree.CssNode[]): Result<OKLabColor, string> {
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
				return err("Too many values after '/' in OKLab color");
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
			return err("Too many values in OKLab color (expected 3: lightness, a, b)");
		}
		componentIndex++;
	}

	if (l === undefined || a === undefined || b === undefined) {
		return err("Expected 3 OKLab values (lightness, a, b)");
	}

	const color: OKLabColor = { kind: "oklab", l, a, b };
	if (alpha !== undefined) {
		color.alpha = alpha;
	}

	return ok(color);
}

/**
 * Parse a lightness value.
 *
 * Accepts:
 * - Percentage: 0%-100% (converted to 0-1)
 * - Number: 0-1
 *
 * Clamped to 0-1 range.
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
		// Convert percentage to 0-1 range and clamp
		const normalized = value / 100;
		const clamped = Math.max(0, Math.min(1, normalized));
		return ok(clamped);
	}

	// Try number
	if (node.type === "Number") {
		const numResult = ParseUtils.parseNumberNode(node);
		if (!numResult.ok) {
			return err(numResult.error);
		}
		const value = numResult.value;
		// Clamp to 0-1 range
		const clamped = Math.max(0, Math.min(1, value));
		return ok(clamped);
	}

	return err(`Expected percentage or number for lightness, got ${node.type}`);
}

/**
 * Parse an axis value (a or b).
 *
 * Accepts: number (typically -0.4 to 0.4, but clamped)
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
		// Clamp to -0.4 to 0.4 range (CSS spec)
		const clamped = Math.max(-0.4, Math.min(0.4, value));
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
 * Clamped to 0-1 range.
 *
 * @internal
 */
function parseAlpha(node: csstree.CssNode): Result<number, string> {
	// Try percentage first
	if (node.type === "Percentage") {
		const value = Number.parseFloat(node.value);
		if (Number.isNaN(value)) {
			return err("Invalid percentage value for alpha");
		}
		// Convert percentage to 0-1 range and clamp
		const normalized = value / 100;
		const clamped = Math.max(0, Math.min(1, normalized));
		return ok(clamped);
	}

	// Try number
	if (node.type === "Number") {
		const numResult = ParseUtils.parseNumberNode(node);
		if (!numResult.ok) {
			return err(numResult.error);
		}
		const value = numResult.value;
		// Clamp to 0-1 range
		const clamped = Math.max(0, Math.min(1, value));
		return ok(clamped);
	}

	return err(`Expected number or percentage for alpha, got ${node.type}`);
}
