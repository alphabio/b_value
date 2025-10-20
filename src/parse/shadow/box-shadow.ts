// b_path:: src/parse/shadow/box-shadow.ts
import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type { Color } from "@/core/types/color";
import type { Length } from "@/core/types/length-percentage";
import type { BoxShadow, BoxShadowLayer } from "@/core/types/shadow";
import * as ParseUtils from "@/utils/parse";
import { parseColor } from "@/utils/parse/color";

/**
 * Convert an AST node to string representation for error messages.
 *
 * @param node - CSS AST node
 * @returns String representation of the node
 * @internal
 */
function nodeToString(node: csstree.CssNode): string {
	try {
		return csstree.generate(node);
	} catch {
		return node.type;
	}
}

/**
 * Parse a single box-shadow layer from AST nodes.
 *
 * Syntax: [inset?] offset-x offset-y [blur-radius] [spread-radius] [color]
 *
 * @param nodes - Array of CSS AST nodes for one shadow layer
 * @returns Result with parsed BoxShadowLayer or error
 *
 * @internal
 */
function parseShadowLayer(nodes: csstree.CssNode[]): Result<BoxShadowLayer, string> {
	if (nodes.length < 2) {
		return err(`box-shadow layer expects at least 2 arguments (offset-x, offset-y), got ${nodes.length}`);
	}

	let inset = false;
	let blurRadius: Length | undefined;
	let spreadRadius: Length | undefined;
	let color: Color | undefined;

	const lengthValues: Length[] = [];

	for (const node of nodes) {
		if (node.type === "WhiteSpace") continue;

		// Check for inset keyword
		if (node.type === "Identifier" && node.name.toLowerCase() === "inset") {
			if (inset) {
				return err("box-shadow: duplicate 'inset' keyword");
			}
			inset = true;
			continue;
		}

		// Handle unitless zero (number node with value 0)
		if (node.type === "Number") {
			const value = Number.parseFloat(node.value);
			if (value === 0) {
				lengthValues.push({ value: 0, unit: "px" });
				continue;
			}
			return err(`box-shadow: unitless numbers are only allowed for zero, got ${value}`);
		}

		// Try parsing as length
		const lengthResult = ParseUtils.parseLengthNode(node);
		if (lengthResult.ok) {
			lengthValues.push(lengthResult.value);
			continue;
		}

		// Try parsing as color
		const colorResult = parseColor(nodeToString(node));
		if (colorResult.ok) {
			if (color !== undefined) {
				return err("box-shadow: duplicate color");
			}
			color = colorResult.value;
			continue;
		}

		// Invalid argument
		return err(`box-shadow: invalid argument '${nodeToString(node)}'. Expected length, color, or 'inset' keyword.`);
	}

	// Assign length values in order: offset-x, offset-y, blur-radius, spread-radius
	if (lengthValues.length < 2) {
		return err(`box-shadow: requires at least 2 length values (offset-x, offset-y), got ${lengthValues.length}`);
	}

	if (lengthValues.length > 4) {
		return err(`box-shadow: expects at most 4 length values, got ${lengthValues.length}`);
	}

	const offsetX = lengthValues[0] as Length;
	const offsetY = lengthValues[1] as Length;

	if (lengthValues.length >= 3) {
		blurRadius = lengthValues[2];
	}

	if (lengthValues.length >= 4) {
		spreadRadius = lengthValues[3];
	}

	return ok({
		inset: inset || undefined,
		offsetX,
		offsetY,
		blurRadius,
		spreadRadius,
		color,
	});
}

/**
 * Parse CSS box-shadow property value.
 *
 * Adds shadow effects around an element's frame. Supports multiple comma-separated shadows.
 *
 * Per CSS Backgrounds and Borders Module Level 3 specification.
 *
 * @param css - CSS box-shadow value (e.g., "2px 2px 4px black", "inset 0 0 10px rgba(0,0,0,0.5))")
 * @returns Result with BoxShadow IR or error message
 *
 * @example
 * Basic shadow:
 * ```typescript
 * const result = parse("2px 2px");
 * // { ok: true, value: { kind: "box-shadow", shadows: [{ offsetX: { value: 2, unit: "px" }, offsetY: { value: 2, unit: "px" } }] } }
 * ```
 *
 * @example
 * With blur and color:
 * ```typescript
 * const result = parse("2px 2px 4px black");
 * // { ok: true, value: { kind: "box-shadow", shadows: [{ offsetX: { value: 2, unit: "px" }, offsetY: { value: 2, unit: "px" }, blurRadius: { value: 4, unit: "px" }, color: { kind: "named", name: "black" } }] } }
 * ```
 *
 * @example
 * Inset shadow:
 * ```typescript
 * const result = parse("inset 0 0 10px rgba(0,0,0,0.5)");
 * // { ok: true, value: { kind: "box-shadow", shadows: [{ inset: true, offsetX: { value: 0, unit: "px" }, offsetY: { value: 0, unit: "px" }, blurRadius: { value: 10, unit: "px" }, color: { kind: "rgb", ... } }] } }
 * ```
 *
 * @example
 * Multiple shadows:
 * ```typescript
 * const result = parse("2px 2px 4px black, inset 0 0 10px white");
 * // { ok: true, value: { kind: "box-shadow", shadows: [{ ... }, { inset: true, ... }] } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow | MDN: box-shadow}
 * @see {@link https://www.w3.org/TR/css-backgrounds-3/#box-shadow | W3C Spec}
 */
export function parse(css: string): Result<BoxShadow, string> {
	const result = ParseUtils.splitLayer(css, parseShadowLayer, "box-shadow");
	if (!result.ok) return result;

	return ok({
		kind: "box-shadow",
		shadows: result.value,
	});
}
