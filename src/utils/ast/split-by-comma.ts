import type * as csstree from "css-tree";

export interface SplitByCommaOptions {
	/** Start index in nodes array (default: 0) */
	startIndex?: number;

	/** Allow empty groups between commas (default: false) */
	allowEmpty?: boolean;

	/** Skip whitespace nodes (default: true) */
	trimWhitespace?: boolean;
}

/**
 * Split array of AST nodes by comma operators.
 *
 * Used for parsing comma-separated function arguments.
 * Returns array of node groups, where each group is the nodes between commas.
 *
 * @param nodes - Array of AST nodes to split
 * @param options - Parsing options
 * @returns Array of node groups (each group is nodes between commas)
 *
 * @example
 * ```typescript
 * // For polygon(50% 0%, 100% 50%, 0% 100%)
 * const functionNode = findFunctionNode(ast, "polygon");
 * const children = functionNode.children.toArray();
 * const groups = splitNodesByComma(children);
 * // Returns: [[50%, 0%], [100%, 50%], [0%, 100%]]
 * ```
 *
 * @example
 * ```typescript
 * // For linear-gradient(45deg, red, blue 50%, green)
 * // After parsing direction, start from index 2
 * const groups = splitNodesByComma(children, { startIndex: 2 });
 * // Returns: [[red], [blue, 50%], [green]]
 * ```
 *
 * @internal
 */
export function splitNodesByComma(nodes: csstree.CssNode[], options: SplitByCommaOptions = {}): csstree.CssNode[][] {
	const { startIndex = 0, allowEmpty = false, trimWhitespace = true } = options;

	const groups: csstree.CssNode[][] = [];
	let currentGroup: csstree.CssNode[] = [];

	for (let i = startIndex; i < nodes.length; i++) {
		const node = nodes[i];
		if (!node) continue;

		// Skip whitespace nodes if requested
		if (trimWhitespace && node.type === "WhiteSpace") {
			continue;
		}

		// Check for comma operator
		if (node.type === "Operator" && "value" in node && node.value === ",") {
			// End current group
			if (currentGroup.length > 0 || allowEmpty) {
				groups.push(currentGroup);
				currentGroup = [];
			}
		} else {
			currentGroup.push(node);
		}
	}

	// Push final group
	if (currentGroup.length > 0 || allowEmpty) {
		groups.push(currentGroup);
	}

	return groups;
}

/**
 * Check if a comma exists at the given index.
 *
 * Helper for optional comma checking in function parsers.
 *
 * @param nodes - Array of AST nodes
 * @param index - Index to check
 * @returns True if node at index is a comma operator
 *
 * @internal
 */
export function isCommaAt(nodes: csstree.CssNode[], index: number): boolean {
	const node = nodes[index];
	return Boolean(node && node.type === "Operator" && "value" in node && node.value === ",");
}

/**
 * Skip comma at index if present, return next index.
 *
 * Helper for optional comma handling in function parsers.
 *
 * @param nodes - Array of AST nodes
 * @param index - Current index
 * @returns Index after comma if present, otherwise same index
 *
 * @example
 * ```typescript
 * let idx = 5;
 * idx = skipComma(children, idx); // Skips comma if at index 5
 * ```
 *
 * @internal
 */
export function skipComma(nodes: csstree.CssNode[], index: number): number {
	return isCommaAt(nodes, index) ? index + 1 : index;
}
