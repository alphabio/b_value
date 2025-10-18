// b_path:: src/parse/color/oklch.ts
import type * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type { OKLCHColor } from "@/core/types/color";
import * as ASTUtils from "@/utils/ast";
import * as ParseUtils from "@/utils/parse";

/**
 * Parse a CSS OKLCH color value.
 *
 * Supports OKLCH syntax (modern only, no legacy comma syntax):
 * - Space-separated: `oklch(0.5 0.2 180deg)`, `oklch(50% 0.2 180)`
 * - With alpha: `oklch(0.5 0.2 180 / 0.5)`
 * - Lightness can be percentage (0-100%) or number (0-1)
 * - Chroma: 0-0.4 (clamped)
 * - Hue: angle with deg, rad, grad, turn units (or unitless defaults to deg)
 *
 * Hue is normalized to 0-360 degrees range with wrapping.
 *
 * @param input - The OKLCH color string to parse
 * @returns Result containing the parsed OKLCHColor or error message
 *
 * @example
 * ```typescript
 * import { parse } from "@/parse/color/oklch";
 *
 * // Basic syntax with number lightness
 * const color1 = parse("oklch(0.5 0.2 180)");
 * // => { ok: true, value: { kind: "oklch", l: 0.5, c: 0.2, h: 180 } }
 *
 * // With angle unit
 * const color2 = parse("oklch(0.5 0.2 0.5turn)");
 * // => { ok: true, value: { kind: "oklch", l: 0.5, c: 0.2, h: 180 } }
 *
 * // With alpha
 * const color3 = parse("oklch(0.5 0.2 180 / 0.5)");
 * // => { ok: true, value: { kind: "oklch", l: 0.5, c: 0.2, h: 180, alpha: 0.5 } }
 *
 * // Lightness as percentage
 * const color4 = parse("oklch(50% 0.2 180)");
 * // => { ok: true, value: { kind: "oklch", l: 0.5, c: 0.2, h: 180 } }
 * ```
 *
 * @public
 */
export function parse(input: string): Result<OKLCHColor, string> {
	// Parse CSS string to AST
	const astResult = ASTUtils.parseCssString(input, "value");
	if (!astResult.ok) {
		return err(astResult.error);
	}

	// Find oklch() function
	const funcResult = ASTUtils.findFunctionNode(astResult.value, ["oklch"]);
	if (!funcResult.ok) {
		return err(funcResult.error);
	}

	const fn = funcResult.value;
	const children = fn.children.toArray();

	// Parse arguments - space-separated only (OKLCH is modern, no legacy syntax)
	return parseOKLCHArguments(children);
}

/**
 * Parse OKLCH function arguments from AST nodes.
 * OKLCH only supports space-separated syntax: oklch(L C H) or oklch(L C H / A)
 *
 * @internal
 */
function parseOKLCHArguments(nodes: csstree.CssNode[]): Result<OKLCHColor, string> {
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
				return err("Too many values after '/' in OKLCH color");
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
			const lightnessResult = ParseUtils.parseLightness(node, "0-1");
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
			return err("Too many values in OKLCH color (expected 3: lightness, chroma, hue)");
		}
		componentIndex++;
	}

	if (l === undefined || c === undefined || h === undefined) {
		return err("Expected 3 OKLCH values (lightness, chroma, hue)");
	}

	const color: OKLCHColor = { kind: "oklch", l, c, h };
	if (alpha !== undefined) {
		color.alpha = alpha;
	}

	return ok(color);
}

/**
 * Parse a chroma value.
 *
 * Accepts: number (0-0.4, clamped)
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
		// Clamp to 0-0.4 range (CSS spec)
		const clamped = Math.max(0, Math.min(0.4, value));
		return ok(clamped);
	}

	return err(`Expected number for chroma, got ${node.type}`);
}
