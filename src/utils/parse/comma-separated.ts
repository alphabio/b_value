// b_path:: src/utils/parse/comma-separated.ts
import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";

/**
 * Parse comma-separated list where each item is a single AST node.
 *
 * This helper handles the common pattern of splitting comma-separated values
 * where each item between commas is exactly one value (not a complex expression).
 *
 * Examples:
 * - animation-name: fade, slide, bounce
 * - transition-property: opacity, transform
 * - animation-delay: 1s, 500ms, 2s
 * - background-image: linear-gradient(...), url(img.png)
 *
 * @param css - CSS value string to parse
 * @param itemParser - Function to parse each individual item node
 * @param propertyName - Property name for error messages
 * @returns Result with array of parsed items or error
 *
 * @example
 * ```typescript
 * const result = parseCommaSeparatedSingle(
 *   "fade, slide, bounce",
 *   (node) => parseAnimationName(node),
 *   "animation-name"
 * );
 * // result.value = [{ type: "identifier", value: "fade" }, ...]
 * ```
 *
 * @internal
 */
export function parseCommaSeparatedSingle<T>(
	css: string,
	itemParser: (node: csstree.CssNode) => Result<T, string>,
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
				if (currentNodes.length === 1 && currentNodes[0]) {
					const itemResult = itemParser(currentNodes[0]);
					if (!itemResult.ok) {
						return err(`${propertyName}: ${itemResult.error}`);
					}
					results.push(itemResult.value);
					currentNodes = [];
				} else if (currentNodes.length === 0) {
					return err(`${propertyName}: Empty value before comma`);
				} else {
					return err(`${propertyName}: Expected single value between commas, got ${currentNodes.length} values`);
				}
			} else {
				currentNodes.push(node);
			}
		}

		if (currentNodes.length === 1 && currentNodes[0]) {
			const itemResult = itemParser(currentNodes[0]);
			if (!itemResult.ok) {
				return err(`${propertyName}: ${itemResult.error}`);
			}
			results.push(itemResult.value);
		} else if (currentNodes.length === 0) {
			return err(`${propertyName}: Empty value`);
		} else {
			return err(`${propertyName}: Expected single value, got ${currentNodes.length} values`);
		}

		if (results.length === 0) {
			return err(`${propertyName}: Requires at least one value`);
		}

		return ok(results);
	} catch (e) {
		return err(`Failed to parse ${propertyName}: ${e instanceof Error ? e.message : String(e)}`);
	}
}
