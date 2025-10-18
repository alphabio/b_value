// b_path:: src/parse/color/lch.ts
import type * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type { LCHColor } from "@/core/types/color";
import * as ASTUtils from "@/utils/ast";
import * as ParseUtils from "@/utils/parse";

/**
 * Parse a CSS LCH color value.
 *
 * Supports LCH syntax (modern only, no legacy comma syntax):
 * - Space-separated: `lch(50% 50 180deg)`, `lch(50 50 180)`
 * - With alpha: `lch(50% 50 180 / 0.5)`
 * - Lightness can be percentage (0-100%) or number (0-100)
 * - Chroma: 0-150 (clamped)
 * - Hue: angle with deg, rad, grad, turn units (or unitless defaults to deg)
 *
 * Hue is normalized to 0-360 degrees range with wrapping.
 *
 * @param input - The LCH color string to parse
 * @returns Result containing the parsed LCHColor or error message
 *
 * @example
 * ```typescript
 * import { parse } from "@/parse/color/lch";
 *
 * // Basic syntax
 * const color1 = parse("lch(50% 50 180)");
 * // => { ok: true, value: { kind: "lch", l: 50, c: 50, h: 180 } }
 *
 * // With angle unit
 * const color2 = parse("lch(50% 50 0.5turn)");
 * // => { ok: true, value: { kind: "lch", l: 50, c: 50, h: 180 } }
 *
 * // With alpha
 * const color3 = parse("lch(50% 50 180 / 0.5)");
 * // => { ok: true, value: { kind: "lch", l: 50, c: 50, h: 180, alpha: 0.5 } }
 * ```
 *
 * @public
 */
export function parse(input: string): Result<LCHColor, string> {
	// Parse CSS string to AST
	const astResult = ASTUtils.parseCssString(input, "value");
	if (!astResult.ok) {
		return err(astResult.error);
	}

	// Find lch() function
	const funcResult = ASTUtils.findFunctionNode(astResult.value, ["lch"]);
	if (!funcResult.ok) {
		return err(funcResult.error);
	}

	const fn = funcResult.value;
	const children = fn.children.toArray();

	// Parse arguments - space-separated only (LCH is modern, no legacy syntax)
	return parseLCHArguments(children);
}

/**
 * Parse LCH function arguments from AST nodes.
 * LCH only supports space-separated syntax: lch(L C H) or lch(L C H / A)
 *
 * @internal
 */
function parseLCHArguments(nodes: csstree.CssNode[]): Result<LCHColor, string> {
	let l: number | undefined;
	let c: number | undefined;
	let h: number | undefined;
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
				return err("Too many values after '/' in LCH color");
			}
			const alphaResult = ParseUtils.parseAlpha(node, { clamp: true });
			if (!alphaResult.ok) {
				return err(alphaResult.error);
			}
			alpha = alphaResult.value;
			continue;
		}

		// Parse L, C, H components
		if (componentIndex === 0) {
			// Lightness (percentage or number)
			const lightnessResult = ParseUtils.parseLightness(node, "0-100");
			if (!lightnessResult.ok) {
				return err(lightnessResult.error);
			}
			l = lightnessResult.value;
		} else if (componentIndex === 1) {
			// Chroma (number)
			const chromaResult = parseChroma(node);
			if (!chromaResult.ok) {
				return err(chromaResult.error);
			}
			c = chromaResult.value;
		} else if (componentIndex === 2) {
			// Hue (angle or unitless number)
			const hueResult = ParseUtils.parseHue(node);
			if (!hueResult.ok) {
				return err(hueResult.error);
			}
			h = hueResult.value;
		} else {
			// Too many values (more than 3 before slash)
			return err("Too many values in LCH color (expected 3: lightness, chroma, hue)");
		}
		componentIndex++;
	}

	if (l === undefined || c === undefined || h === undefined) {
		return err("Expected 3 LCH values (lightness, chroma, hue)");
	}

	const color: LCHColor = { kind: "lch", l, c, h };
	if (alpha !== undefined) {
		color.alpha = alpha;
	}

	return ok(color);
}

/**
 * Parse a chroma value.
 *
 * Accepts: number (0-150, clamped)
 *
 * @internal
 */
function parseChroma(node: csstree.CssNode): Result<number, string> {
	if (node.type === "Number") {
		const numResult = ParseUtils.parseNumberNode(node);
		if (!numResult.ok) {
			return err(numResult.error);
		}
		const value = numResult.value;
		// Clamp to 0-150 range (CSS spec)
		const clamped = Math.max(0, Math.min(150, value));
		return ok(clamped);
	}

	return err(`Expected number for chroma, got ${node.type}`);
}
