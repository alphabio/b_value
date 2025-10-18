// b_path:: src/parse/color/rgb.ts
import type * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type { RGBColor } from "@/core/types/color";
import * as ASTUtils from "@/utils/ast";
import * as ParseUtils from "@/utils/parse";

/**
 * Parse a CSS RGB color value.
 *
 * Supports all RGB syntax variations:
 * - Modern space-separated: `rgb(255 0 0)`, `rgb(255 0 0 / 0.5)`
 * - Legacy comma-separated: `rgb(255, 0, 0)`, `rgba(255, 0, 0, 0.5)`
 * - Percentage values: `rgb(100% 0% 0%)`
 * - Mixed formats handled according to CSS spec
 *
 * @param input - The RGB color string to parse
 * @returns Result containing the parsed RGBColor or error message
 *
 * @example
 * ```typescript
 * import { parse } from "@/parse/color/rgb";
 *
 * // Modern syntax
 * const color1 = parse("rgb(255 0 0)");
 * // => { ok: true, value: { kind: "rgb", r: 255, g: 0, b: 0 } }
 *
 * // With alpha
 * const color2 = parse("rgb(255 0 0 / 0.5)");
 * // => { ok: true, value: { kind: "rgb", r: 255, g: 0, b: 0, alpha: 0.5 } }
 *
 * // Legacy comma syntax
 * const color3 = parse("rgb(255, 0, 0)");
 * // => { ok: true, value: { kind: "rgb", r: 255, g: 0, b: 0 } }
 *
 * // Percentage values
 * const color4 = parse("rgb(100% 0% 0%)");
 * // => { ok: true, value: { kind: "rgb", r: 255, g: 0, b: 0 } }
 * ```
 *
 * @public
 */
export function parse(input: string): Result<RGBColor, string> {
	// Parse CSS string to AST
	const astResult = ASTUtils.parseCssString(input, "value");
	if (!astResult.ok) {
		return err(astResult.error);
	}

	// Find rgb() or rgba() function
	const funcResult = ASTUtils.findFunctionNode(astResult.value, ["rgb", "rgba"]);
	if (!funcResult.ok) {
		return err(funcResult.error);
	}

	const fn = funcResult.value;

	// Get all children nodes (arguments)
	const children = fn.children.toArray();

	// Parse arguments - handle both comma and space syntax
	return parseRGBArguments(children);
}

/**
 * Parse RGB function arguments from AST nodes.
 *
 * Handles both comma-separated and space-separated syntax:
 * - Space: rgb(255 0 0) or rgb(255 0 0 / 0.5)
 * - Comma: rgb(255, 0, 0) or rgba(255, 0, 0, 0.5)
 *
 * @param nodes - Array of CSS AST nodes from function arguments
 * @returns Result containing parsed RGBColor or error message
 *
 * @internal
 */
function parseRGBArguments(nodes: csstree.CssNode[]): Result<RGBColor, string> {
	// Check if we have comma separators (legacy syntax)
	const hasComma = nodes.some((node) => node.type === "Operator" && "value" in node && node.value === ",");

	if (hasComma) {
		return parseCommaRGB(nodes);
	}
	return parseSpaceRGB(nodes);
}

/**
 * Parse space-separated RGB syntax: rgb(255 0 0) or rgb(255 0 0 / 0.5)
 *
 * @internal
 */
function parseSpaceRGB(nodes: csstree.CssNode[]): Result<RGBColor, string> {
	const values: number[] = [];
	let alpha: number | undefined;
	let foundSlash = false;

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

		// Parse RGB component (number or percentage)
		const componentResult = parseRGBComponent(node);
		if (!componentResult.ok) {
			return err(componentResult.error);
		}
		values.push(componentResult.value);
	}

	if (values.length !== 3) {
		return err(`Expected 3 RGB values, got ${values.length}`);
	}

	const [r, g, b] = values;
	if (r === undefined || g === undefined || b === undefined) {
		return err("Missing RGB values");
	}

	const color: RGBColor = { kind: "rgb", r, g, b };
	if (alpha !== undefined) {
		color.alpha = alpha;
	}

	return ok(color);
}

/**
 * Parse comma-separated RGB syntax: rgb(255, 0, 0) or rgba(255, 0, 0, 0.5)
 *
 * @internal
 */
function parseCommaRGB(nodes: csstree.CssNode[]): Result<RGBColor, string> {
	// Filter out comma operators
	const valueNodes = nodes.filter((node) => !(node.type === "Operator" && "value" in node && node.value === ","));

	if (valueNodes.length !== 3 && valueNodes.length !== 4) {
		return err(`Expected 3 or 4 values (R, G, B, [A]), got ${valueNodes.length}`);
	}

	const values: number[] = [];

	// Parse RGB components
	for (let i = 0; i < 3; i++) {
		const node = valueNodes[i];
		if (!node) {
			return err(`Missing RGB component at position ${i}`);
		}
		const componentResult = parseRGBComponent(node);
		if (!componentResult.ok) {
			return err(componentResult.error);
		}
		values.push(componentResult.value);
	}

	const [r, g, b] = values;
	if (r === undefined || g === undefined || b === undefined) {
		return err("Missing RGB values");
	}

	const color: RGBColor = { kind: "rgb", r, g, b };

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

/**
 * Parse an RGB component (R, G, or B value).
 *
 * Accepts:
 * - Integer: 0-255 (values are clamped to range after rounding)
 * - Percentage: 0%-100% (converted to 0-255, clamped)
 *
 * @internal
 */
function parseRGBComponent(node: csstree.CssNode): Result<number, string> {
	// Try parsing as number (0-255)
	if (node.type === "Number") {
		const numResult = ParseUtils.parseNumberNode(node);
		if (!numResult.ok) {
			return err(numResult.error);
		}
		const value = numResult.value;
		// Round first, then clamp to 0-255 range
		const rounded = Math.round(value);
		const clamped = Math.max(0, Math.min(255, rounded));
		return ok(clamped);
	}

	// Try parsing as percentage (0%-100%)
	if (node.type === "Percentage") {
		const value = Number.parseFloat(node.value);
		if (Number.isNaN(value)) {
			return err("Invalid percentage value");
		}
		// Convert percentage to 0-255 range, then clamp
		const converted = (value / 100) * 255;
		const rounded = Math.round(converted);
		const clamped = Math.max(0, Math.min(255, rounded));
		return ok(clamped);
	}

	return err(`Expected number or percentage for RGB component, got ${node.type}`);
}
