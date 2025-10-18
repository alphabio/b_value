// b_path:: src/parse/color/hsl.ts
import type * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type { HSLColor } from "@/core/types/color";
import * as ASTUtils from "@/utils/ast";
import * as ParseUtils from "@/utils/parse";

/**
 * Parse a CSS HSL color value.
 *
 * Supports all HSL syntax variations:
 * - Modern space-separated: `hsl(120 100% 50%)`, `hsl(120deg 100% 50%)`
 * - Modern with alpha: `hsl(120 100% 50% / 0.5)`
 * - Legacy comma-separated: `hsl(120, 100%, 50%)`
 * - Legacy hsla: `hsla(120, 100%, 50%, 0.5)`
 * - Angle units: deg, rad, grad, turn (or unitless defaults to deg)
 *
 * Hue is normalized to 0-360 degrees range with wrapping.
 *
 * @param input - The HSL color string to parse
 * @returns Result containing the parsed HSLColor or error message
 *
 * @example
 * ```typescript
 * import { parse } from "@/parse/color/hsl";
 *
 * // Modern syntax
 * const color1 = parse("hsl(120 100% 50%)");
 * // => { ok: true, value: { kind: "hsl", h: 120, s: 100, l: 50 } }
 *
 * // With angle unit
 * const color2 = parse("hsl(1turn 100% 50%)");
 * // => { ok: true, value: { kind: "hsl", h: 360, s: 100, l: 50 } }
 *
 * // With alpha
 * const color3 = parse("hsl(120 100% 50% / 0.5)");
 * // => { ok: true, value: { kind: "hsl", h: 120, s: 100, l: 50, alpha: 0.5 } }
 * ```
 *
 * @public
 */
export function parse(input: string): Result<HSLColor, string> {
	// Parse CSS string to AST
	const astResult = ASTUtils.parseCssString(input, "value");
	if (!astResult.ok) {
		return err(astResult.error);
	}

	// Find hsl() or hsla() function
	const funcResult = ASTUtils.findFunctionNode(astResult.value, ["hsl", "hsla"]);
	if (!funcResult.ok) {
		return err(funcResult.error);
	}

	const fn = funcResult.value;
	const children = fn.children.toArray();

	// Parse arguments - handle both comma and space syntax
	return parseHSLArguments(children);
}

/**
 * Parse HSL function arguments from AST nodes.
 *
 * @internal
 */
function parseHSLArguments(nodes: csstree.CssNode[]): Result<HSLColor, string> {
	// Check if we have comma separators (legacy syntax)
	const hasComma = nodes.some((node) => node.type === "Operator" && "value" in node && node.value === ",");

	if (hasComma) {
		return parseCommaHSL(nodes);
	}
	return parseSpaceHSL(nodes);
}

/**
 * Parse space-separated HSL syntax: hsl(H S% L%) or hsl(H S% L% / A)
 *
 * @internal
 */
function parseSpaceHSL(nodes: csstree.CssNode[]): Result<HSLColor, string> {
	let h: number | undefined;
	let s: number | undefined;
	let l: number | undefined;
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
			const alphaResult = ParseUtils.parseAlpha(node);
			if (!alphaResult.ok) {
				return err(alphaResult.error);
			}
			alpha = alphaResult.value;
			break;
		}

		// Parse H, S, L components
		if (componentIndex === 0) {
			// Hue (angle or unitless number)
			const hueResult = ParseUtils.parseHue(node);
			if (!hueResult.ok) {
				return err(hueResult.error);
			}
			h = hueResult.value;
		} else if (componentIndex === 1 || componentIndex === 2) {
			// Saturation or Lightness (percentage)
			const percentResult = ParseUtils.parsePercentage(node, { clamp: true });
			if (!percentResult.ok) {
				return err(percentResult.error);
			}
			if (componentIndex === 1) {
				s = percentResult.value;
			} else {
				l = percentResult.value;
			}
		}
		componentIndex++;
	}

	if (h === undefined || s === undefined || l === undefined) {
		return err("Expected 3 HSL values (hue, saturation, lightness)");
	}

	const color: HSLColor = { kind: "hsl", h, s, l };
	if (alpha !== undefined) {
		color.alpha = alpha;
	}

	return ok(color);
}

/**
 * Parse comma-separated HSL syntax: hsl(H, S%, L%) or hsla(H, S%, L%, A)
 *
 * @internal
 */
function parseCommaHSL(nodes: csstree.CssNode[]): Result<HSLColor, string> {
	// Filter out comma operators
	const valueNodes = nodes.filter((node) => !(node.type === "Operator" && "value" in node && node.value === ","));

	if (valueNodes.length !== 3 && valueNodes.length !== 4) {
		return err(`Expected 3 or 4 values (H, S, L, [A]), got ${valueNodes.length}`);
	}

	// Parse hue
	const hueNode = valueNodes[0];
	if (!hueNode) {
		return err("Missing hue value");
	}
	const hueResult = ParseUtils.parseHue(hueNode);
	if (!hueResult.ok) {
		return err(hueResult.error);
	}
	const h = hueResult.value;

	// Parse saturation
	const satNode = valueNodes[1];
	if (!satNode) {
		return err("Missing saturation value");
	}
	const satResult = ParseUtils.parsePercentage(satNode);
	if (!satResult.ok) {
		return err(satResult.error);
	}
	const s = satResult.value;

	// Parse lightness
	const lightNode = valueNodes[2];
	if (!lightNode) {
		return err("Missing lightness value");
	}
	const lightResult = ParseUtils.parsePercentage(lightNode);
	if (!lightResult.ok) {
		return err(lightResult.error);
	}
	const l = lightResult.value;

	const color: HSLColor = { kind: "hsl", h, s, l };

	// Parse alpha if present (4th value)
	if (valueNodes.length === 4) {
		const alphaNode = valueNodes[3];
		if (!alphaNode) {
			return err("Invalid alpha value");
		}
		const alphaResult = ParseUtils.parseAlpha(alphaNode);
		if (!alphaResult.ok) {
			return err(alphaResult.error);
		}
		color.alpha = alphaResult.value;
	}

	return ok(color);
}
