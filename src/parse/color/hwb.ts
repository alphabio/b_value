// b_path:: src/parse/color/hwb.ts
import type * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type { HWBColor } from "@/core/types/color";
import * as ASTUtils from "@/utils/ast";
import * as ParseUtils from "@/utils/parse";

/**
 * Parse a CSS HWB color value.
 *
 * Supports HWB syntax (modern only, no legacy comma syntax):
 * - Space-separated: `hwb(120 20% 30%)`, `hwb(120deg 20% 30%)`
 * - With alpha: `hwb(120 20% 30% / 0.5)`
 * - Angle units: deg, rad, grad, turn (or unitless defaults to deg)
 *
 * Hue is normalized to 0-360 degrees range with wrapping.
 * Whiteness and blackness are clamped to 0-100%.
 *
 * @param input - The HWB color string to parse
 * @returns Result containing the parsed HWBColor or error message
 *
 * @example
 * ```typescript
 * import { parse } from "@/parse/color/hwb";
 *
 * // Basic syntax
 * const color1 = parse("hwb(120 20% 30%)");
 * // => { ok: true, value: { kind: "hwb", h: 120, w: 20, b: 30 } }
 *
 * // With angle unit
 * const color2 = parse("hwb(0.5turn 20% 30%)");
 * // => { ok: true, value: { kind: "hwb", h: 180, w: 20, b: 30 } }
 *
 * // With alpha
 * const color3 = parse("hwb(120 20% 30% / 0.5)");
 * // => { ok: true, value: { kind: "hwb", h: 120, w: 20, b: 30, alpha: 0.5 } }
 * ```
 *
 * @public
 */
export function parse(input: string): Result<HWBColor, string> {
	// Parse CSS string to AST
	const astResult = ASTUtils.parseCssString(input, "value");
	if (!astResult.ok) {
		return err(astResult.error);
	}

	// Find hwb() function
	const funcResult = ASTUtils.findFunctionNode(astResult.value, ["hwb"]);
	if (!funcResult.ok) {
		return err(funcResult.error);
	}

	const fn = funcResult.value;
	const children = fn.children.toArray();

	// Parse arguments - space-separated only (HWB is modern, no legacy syntax)
	return parseHWBArguments(children);
}

/**
 * Parse HWB function arguments from AST nodes.
 * HWB only supports space-separated syntax: hwb(H W% B%) or hwb(H W% B% / A)
 *
 * @internal
 */
function parseHWBArguments(nodes: csstree.CssNode[]): Result<HWBColor, string> {
	// Filter out whitespace nodes
	const valueNodes = nodes.filter((node) => node.type !== "WhiteSpace");

	// Check for slash separator for alpha
	const slashIndex = valueNodes.findIndex((node) => node.type === "Operator" && "value" in node && node.value === "/");

	if (slashIndex !== -1) {
		// Has alpha: hwb(H W% B% / A)
		if (slashIndex !== 3) {
			return err("Invalid HWB syntax: expected 3 values before '/'");
		}
		if (valueNodes.length !== 5) {
			return err("Invalid HWB syntax: expected alpha value after '/'");
		}
		const [hueNode, whitenessNode, blacknessNode, , alphaNode] = valueNodes;
		if (!hueNode || !whitenessNode || !blacknessNode || !alphaNode) {
			return err("Invalid HWB syntax: missing required values");
		}

		// Parse hue
		const hueResult = ParseUtils.parseHue(hueNode);
		if (!hueResult.ok) {
			return err(`Invalid hue: ${hueResult.error}`);
		}
		const h = hueResult.value;

		// Parse whiteness (percentage)
		const wResult = ParseUtils.parsePercentage(whitenessNode, { clamp: true });
		if (!wResult.ok) {
			return err(`Invalid whiteness: ${wResult.error}`);
		}
		const w = wResult.value;

		// Parse blackness (percentage)
		const bResult = ParseUtils.parsePercentage(blacknessNode, { clamp: true });
		if (!bResult.ok) {
			return err(`Invalid blackness: ${bResult.error}`);
		}
		const b = bResult.value;

		// Parse alpha
		const alphaResult = ParseUtils.parseAlpha(alphaNode, { clamp: true });
		if (!alphaResult.ok) {
			return err(`Invalid alpha: ${alphaResult.error}`);
		}
		const alpha = alphaResult.value;

		const color: HWBColor = { kind: "hwb", h, w, b };
		if (alpha !== undefined && alpha !== 1) {
			color.alpha = alpha;
		}
		return ok(color);
	} else {
		// No alpha: hwb(H W% B%)
		if (valueNodes.length !== 3) {
			return err(`Invalid HWB syntax: expected 3 values, got ${valueNodes.length}`);
		}
		const [hueNode, whitenessNode, blacknessNode] = valueNodes;
		if (!hueNode || !whitenessNode || !blacknessNode) {
			return err("Invalid HWB syntax: missing required values");
		}

		// Parse hue
		const hueResult = ParseUtils.parseHue(hueNode);
		if (!hueResult.ok) {
			return err(`Invalid hue: ${hueResult.error}`);
		}
		const h = hueResult.value;

		// Parse whiteness (percentage)
		const wResult = ParseUtils.parsePercentage(whitenessNode, { clamp: true });
		if (!wResult.ok) {
			return err(`Invalid whiteness: ${wResult.error}`);
		}
		const w = wResult.value;

		// Parse blackness (percentage)
		const bResult = ParseUtils.parsePercentage(blacknessNode, { clamp: true });
		if (!bResult.ok) {
			return err(`Invalid blackness: ${bResult.error}`);
		}
		const b = bResult.value;

		return ok({ kind: "hwb", h, w, b });
	}
}
