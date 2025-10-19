// b_path:: src/parse/shadow/text-shadow.ts
import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type { Color } from "@/core/types/color";
import type { Length } from "@/core/types/length-percentage";
import type { TextShadow, TextShadowLayer } from "@/core/types/shadow";
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
 * Parse a single text-shadow layer from AST nodes.
 *
 * Syntax: offset-x offset-y [blur-radius] [color]
 *
 * @param nodes - Array of CSS AST nodes for one shadow layer
 * @returns Result with parsed TextShadowLayer or error
 *
 * @internal
 */
function parseShadowLayer(nodes: csstree.CssNode[]): Result<TextShadowLayer, string> {
	if (nodes.length < 2) {
		return err(`text-shadow layer expects at least 2 arguments (offset-x, offset-y), got ${nodes.length}`);
	}

	let offsetX: Length | undefined;
	let offsetY: Length | undefined;
	let blurRadius: Length | undefined;
	let color: Color | undefined;

	const lengthValues: Length[] = [];

	for (const node of nodes) {
		// Handle unitless zero (number node with value 0)
		if (node.type === "Number") {
			const value = Number.parseFloat(node.value);
			if (value === 0) {
				lengthValues.push({ value: 0, unit: "px" });
				continue;
			}
			return err(`text-shadow: unitless numbers are only allowed for zero, got ${value}`);
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
				return err("text-shadow: duplicate color");
			}
			color = colorResult.value;
			continue;
		}

		// Invalid argument
		return err(`text-shadow: invalid argument '${nodeToString(node)}'. Expected length or color.`);
	}

	// Assign length values in order: offset-x, offset-y, blur-radius
	if (lengthValues.length < 2) {
		return err(`text-shadow: requires at least 2 length values (offset-x, offset-y), got ${lengthValues.length}`);
	}

	if (lengthValues.length > 3) {
		return err(`text-shadow: expects at most 3 length values, got ${lengthValues.length}`);
	}

	offsetX = lengthValues[0];
	offsetY = lengthValues[1];

	if (lengthValues.length >= 3) {
		blurRadius = lengthValues[2];
	}

	return ok({
		offsetX: offsetX as Length,
		offsetY: offsetY as Length,
		blurRadius,
		color,
	});
}

/**
 * Parse CSS text-shadow property value.
 *
 * Adds shadow to text content. Supports multiple comma-separated shadows.
 *
 * Per CSS Text Decoration Module Level 3 specification.
 *
 * @param css - CSS text-shadow value (e.g., "1px 1px 2px gray", "2px 2px 4px black, -2px -2px 4px white")
 * @returns Result with TextShadow IR or error message
 *
 * @example
 * Basic shadow:
 * ```typescript
 * const result = parse("1px 1px");
 * // { ok: true, value: { kind: "text-shadow", shadows: [{ offsetX: { value: 1, unit: "px" }, offsetY: { value: 1, unit: "px" } }] } }
 * ```
 *
 * @example
 * With blur and color:
 * ```typescript
 * const result = parse("1px 1px 2px gray");
 * // { ok: true, value: { kind: "text-shadow", shadows: [{ offsetX: { value: 1, unit: "px" }, offsetY: { value: 1, unit: "px" }, blurRadius: { value: 2, unit: "px" }, color: { kind: "named", name: "gray" } }] } }
 * ```
 *
 * @example
 * Multiple shadows:
 * ```typescript
 * const result = parse("1px 1px 2px black, -1px -1px 2px white");
 * // { ok: true, value: { kind: "text-shadow", shadows: [{ ... }, { ... }] } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/text-shadow | MDN: text-shadow}
 * @see {@link https://www.w3.org/TR/css-text-decor-3/#text-shadow-property | W3C Spec}
 */
export function parse(css: string): Result<TextShadow, string> {
	try {
		const ast = csstree.parse(css, { context: "value" });

		if (ast.type !== "Value") {
			return err("Expected Value node");
		}

		const children = ast.children.toArray();

		const shadows: TextShadowLayer[] = [];
		let currentNodes: csstree.CssNode[] = [];

		for (const node of children) {
			if (node.type === "Operator" && "value" in node && node.value === ",") {
				// Parse current shadow layer
				if (currentNodes.length > 0) {
					const layerResult = parseShadowLayer(currentNodes);
					if (!layerResult.ok) {
						return err(layerResult.error);
					}
					shadows.push(layerResult.value);
					currentNodes = [];
				} else {
					return err("text-shadow: empty shadow layer before comma");
				}
			} else {
				currentNodes.push(node);
			}
		}

		// Parse last shadow layer
		if (currentNodes.length > 0) {
			const layerResult = parseShadowLayer(currentNodes);
			if (!layerResult.ok) {
				return err(layerResult.error);
			}
			shadows.push(layerResult.value);
		}

		if (shadows.length === 0) {
			return err("text-shadow: requires at least one shadow");
		}

		return ok({
			kind: "text-shadow",
			shadows,
		});
	} catch (e) {
		return err(`Failed to parse text-shadow: ${e instanceof Error ? e.message : String(e)}`);
	}
}
