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
		const hueResult = parseHue(hueNode);
		if (!hueResult.ok) {
			return err(`Invalid hue: ${hueResult.error}`);
		}
		const h = hueResult.value;

		// Parse whiteness (percentage)
		const wResult = parsePercentage(whitenessNode);
		if (!wResult.ok) {
			return err(`Invalid whiteness: ${wResult.error}`);
		}
		const w = wResult.value;

		// Parse blackness (percentage)
		const bResult = parsePercentage(blacknessNode);
		if (!bResult.ok) {
			return err(`Invalid blackness: ${bResult.error}`);
		}
		const b = bResult.value;

		// Parse alpha
		const alphaResult = parseAlpha(alphaNode);
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
		const hueResult = parseHue(hueNode);
		if (!hueResult.ok) {
			return err(`Invalid hue: ${hueResult.error}`);
		}
		const h = hueResult.value;

		// Parse whiteness (percentage)
		const wResult = parsePercentage(whitenessNode);
		if (!wResult.ok) {
			return err(`Invalid whiteness: ${wResult.error}`);
		}
		const w = wResult.value;

		// Parse blackness (percentage)
		const bResult = parsePercentage(blacknessNode);
		if (!bResult.ok) {
			return err(`Invalid blackness: ${bResult.error}`);
		}
		const b = bResult.value;

		return ok({ kind: "hwb", h, w, b });
	}
}

/**
 * Parse a hue value (angle or unitless number).
 * Accepts unitless numbers (as degrees), deg, rad, grad, turn.
 * Normalizes to 0-360 degrees with wrapping.
 *
 * @internal
 */
function parseHue(node: csstree.CssNode): Result<number, string> {
	// Unitless number (defaults to degrees)
	if (node.type === "Number") {
		const numResult = ParseUtils.parseNumberNode(node);
		if (!numResult.ok) {
			return err(numResult.error);
		}
		return ok(normalizeHue(numResult.value));
	}

	// Angle with unit
	if (node.type === "Dimension") {
		const angleResult = ParseUtils.parseAngleNode(node);
		if (!angleResult.ok) {
			return err(angleResult.error);
		}

		const angle = angleResult.value;
		// Convert to degrees
		let degrees: number;
		switch (angle.unit) {
			case "deg":
				degrees = angle.value;
				break;
			case "rad":
				degrees = (angle.value * 180) / Math.PI;
				break;
			case "grad":
				degrees = (angle.value * 360) / 400;
				break;
			case "turn":
				degrees = angle.value * 360;
				break;
			default:
				return err(`Unsupported angle unit: ${angle.unit}`);
		}

		return ok(normalizeHue(degrees));
	}

	return err(`Expected number or angle for hue, got ${node.type}`);
}

/**
 * Normalize hue to 0-360 degrees range with wrapping.
 *
 * @internal
 */
function normalizeHue(degrees: number): number {
	// Wrap hue to 0-360 range
	let normalized = degrees % 360;
	if (normalized < 0) {
		normalized += 360;
	}
	// Ensure positive zero (JavaScript quirk with -0)
	return normalized === 0 ? 0 : normalized;
}

/**
 * Parse a percentage value.
 * Clamps to 0-100 range.
 *
 * @internal
 */
function parsePercentage(node: csstree.CssNode): Result<number, string> {
	if (node.type !== "Percentage") {
		return err("Expected percentage");
	}
	const value = Number.parseFloat(node.value);
	if (Number.isNaN(value)) {
		return err("Invalid percentage value");
	}
	// Clamp to 0-100 range
	return ok(Math.max(0, Math.min(100, value)));
}

/**
 * Parse an alpha value.
 * Accepts numbers (0-1) or percentages (0%-100%).
 * Clamps to 0-1 range.
 *
 * @internal
 */
function parseAlpha(node: csstree.CssNode): Result<number, string> {
	if (node.type === "Number") {
		const numResult = ParseUtils.parseNumberNode(node);
		if (!numResult.ok) {
			return err(numResult.error);
		}
		// Clamp to 0-1 range
		return ok(Math.max(0, Math.min(1, numResult.value)));
	}

	if (node.type === "Percentage") {
		const value = Number.parseFloat(node.value);
		if (Number.isNaN(value)) {
			return err("Invalid percentage value for alpha");
		}
		// Convert percentage to 0-1 range and clamp
		const alphaValue = value / 100;
		return ok(Math.max(0, Math.min(1, alphaValue)));
	}

	return err("Expected number or percentage for alpha");
}
