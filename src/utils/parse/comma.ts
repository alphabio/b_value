// b_path:: src/utils/parse/comma.ts
import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";

/**
 * Split comma-separated VALUES where each value is a complete independent item.
 *
 * A "value" can be:
 * - A keyword: fade, slide, bounce
 * - A function: url(...), linear-gradient(...)
 * - A complex expression: calc(100% - 20px)
 *
 * Use for properties where commas separate independent complete values.
 * These represent parallel behaviors, fallbacks, or multiple targets.
 *
 * Examples:
 * - animation-name: fade, slide, bounce
 * - background-image: url(a.png), linear-gradient(red, blue)
 * - transition-property: opacity, transform
 * - font-family: Arial, "Times New Roman", sans-serif
 *
 * @param css - CSS value string
 * @param valueParser - Parser for each complete value (receives single node)
 * @param propertyName - Property name for error messages
 * @returns Result with array of parsed values or error
 *
 * @example
 * ```typescript
 * const result = splitValue(
 *   "fade, slide, bounce",
 *   (node) => parseAnimationName(node),
 *   "animation-name"
 * );
 * // result.value = [{ type: "identifier", value: "fade" }, ...]
 * ```
 *
 * @public
 */
export function splitValue<T>(
	css: string,
	valueParser: (node: csstree.CssNode) => Result<T, string>,
	propertyName: string,
): Result<T[], string> {
	try {
		const ast = csstree.parse(css, { context: "value" });

		if (ast.type !== "Value") {
			return err(`${propertyName}: Expected Value node`);
		}

		const children = ast.children.toArray();
		const results: T[] = [];
		let currentNodes: csstree.CssNode[] = [];

		for (const node of children) {
			if (node.type === "Operator" && "value" in node && node.value === ",") {
				// Found value separator
				if (currentNodes.length === 1 && currentNodes[0]) {
					const valueResult = valueParser(currentNodes[0]);
					if (!valueResult.ok) {
						return err(`${propertyName}: ${valueResult.error}`);
					}
					results.push(valueResult.value);
					currentNodes = [];
				} else if (currentNodes.length === 0) {
					return err(`${propertyName}: Empty value before comma`);
				} else {
					return err(`${propertyName}: Expected single value between commas, got ${currentNodes.length} nodes`);
				}
			} else {
				currentNodes.push(node);
			}
		}

		// Process last value
		if (currentNodes.length === 1 && currentNodes[0]) {
			const valueResult = valueParser(currentNodes[0]);
			if (!valueResult.ok) {
				return err(`${propertyName}: ${valueResult.error}`);
			}
			results.push(valueResult.value);
		} else if (currentNodes.length === 0) {
			return err(`${propertyName}: Empty value`);
		} else {
			return err(`${propertyName}: Expected single value, got ${currentNodes.length} nodes`);
		}

		if (results.length === 0) {
			return err(`${propertyName}: Requires at least one value`);
		}

		return ok(results);
	} catch (e) {
		return err(`Failed to parse ${propertyName}: ${e instanceof Error ? e.message : String(e)}`);
	}
}

/**
 * Split comma-separated LAYERS where each layer has multiple components.
 *
 * A "layer" is a comma-separated group of tokens that together form one
 * visual layer/effect. Each layer is parsed as a unit with multiple components.
 *
 * Use for properties where commas separate layers in actual rendering order.
 * These represent layered visual effects that stack on top of each other.
 *
 * Examples:
 * - box-shadow: 2px 2px 5px red, 3px 3px blue
 * - text-shadow: 1px 1px red, 2px 2px blue
 * - background: url(a.png) center / cover, linear-gradient(red, blue)
 * - filter: drop-shadow(1px 1px red), blur(5px)
 *
 * @param css - CSS value string
 * @param layerParser - Parser for each layer (receives array of nodes for one layer)
 * @param propertyName - Property name for error messages
 * @returns Result with array of parsed layers or error
 *
 * @example
 * ```typescript
 * const result = splitLayer(
 *   "2px 2px 5px red, 3px 3px blue",
 *   (nodes) => parseShadowLayer(nodes),
 *   "box-shadow"
 * );
 * // result.value = [{ offsetX: ..., offsetY: ..., ... }, { ... }]
 * ```
 *
 * @public
 */
export function splitLayer<T>(
	css: string,
	layerParser: (nodes: csstree.CssNode[]) => Result<T, string>,
	propertyName: string,
): Result<T[], string> {
	try {
		const ast = csstree.parse(css, { context: "value" });

		if (ast.type !== "Value") {
			return err(`${propertyName}: Expected Value node`);
		}

		const children = ast.children.toArray();
		const results: T[] = [];
		let currentNodes: csstree.CssNode[] = [];

		for (const node of children) {
			if (node.type === "Operator" && "value" in node && node.value === ",") {
				// Found layer separator
				if (currentNodes.length > 0) {
					const layerResult = layerParser(currentNodes);
					if (!layerResult.ok) {
						return err(`${propertyName}: ${layerResult.error}`);
					}
					results.push(layerResult.value);
					currentNodes = [];
				} else {
					return err(`${propertyName}: Empty layer before comma`);
				}
			} else {
				currentNodes.push(node);
			}
		}

		// Process last layer (allow trailing comma - it's valid CSS)
		if (currentNodes.length > 0) {
			const layerResult = layerParser(currentNodes);
			if (!layerResult.ok) {
				return err(`${propertyName}: ${layerResult.error}`);
			}
			results.push(layerResult.value);
		}

		if (results.length === 0) {
			return err(`${propertyName}: Requires at least one layer`);
		}

		return ok(results);
	} catch (e) {
		return err(`Failed to parse ${propertyName}: ${e instanceof Error ? e.message : String(e)}`);
	}
}
