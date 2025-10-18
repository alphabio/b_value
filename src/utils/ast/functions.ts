// b_path:: src/utils/ast/functions.ts
import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";

/**
 * Find a function node by name in a CSS AST.
 *
 * Walks the AST to find the first function node with the specified name.
 * Function name matching is case-insensitive to match CSS spec behavior.
 * Commonly used pattern across all parsers.
 *
 * @param ast - CSS AST to search
 * @param functionNames - Function name(s) to search for (case-insensitive)
 * @returns Result containing FunctionNode or error message
 *
 * @public
 *
 * @example
 * ```typescript
 * import { findFunctionNode } from "@/utils/ast/functions";
 *
 * const result = findFunctionNode(ast, ["linear-gradient", "repeating-linear-gradient"]);
 * if (result.ok) {
 *   console.log(result.value.name); // "linear-gradient"
 * }
 * ```
 */
export function findFunctionNode(
	ast: csstree.CssNode,
	functionNames: string | string[],
): Result<csstree.FunctionNode, string> {
	const names = Array.isArray(functionNames) ? functionNames : [functionNames];
	const lowerNames = names.map((name) => name.toLowerCase());
	let foundNode: csstree.FunctionNode | null = null;

	try {
		csstree.walk(ast, {
			visit: "Function",
			enter(node: csstree.FunctionNode) {
				if (lowerNames.includes(node.name.toLowerCase())) {
					foundNode = node;
					// Stop traversal once found
					return false;
				}
			},
		});

		if (!foundNode) {
			return err(`No function found with name(s): ${names.join(", ")}`);
		}

		return ok(foundNode);
	} catch (e) {
		return err(`Failed to search AST: ${e instanceof Error ? e.message : String(e)}`);
	}
}

/**
 * Parse comma-separated values from a CSS AST.
 *
 * Handles the common pattern of parsing comma-separated arguments
 * in CSS functions like gradients, transforms, etc.
 *
 * @param ast - CSS AST to parse
 * @returns Array of CSS node arrays, split by commas
 *
 * @public
 *
 * @example
 * ```typescript
 * import { parseCommaSeparatedValues } from "@/utils/ast/functions";
 *
 * const groups = parseCommaSeparatedValues(ast);
 * console.log(groups.length); // Number of comma-separated groups
 * console.log(groups[0]); // First group of nodes
 * ```
 */
export function parseCommaSeparatedValues(ast: csstree.CssNode): csstree.CssNode[][] {
	const groups: csstree.CssNode[][] = [[]];

	csstree.walk(ast, {
		enter(node: csstree.CssNode) {
			if (node.type === "Operator" && "value" in node && node.value === ",") {
				// Start new group
				groups.push([]);
			} else if (node.type !== "Value") {
				// Add to current group (skip Value wrapper node)
				const currentGroup = groups[groups.length - 1];
				if (currentGroup) {
					currentGroup.push(node);
				}
			}
		},
	});

	return groups;
}

/**
 * Parse function arguments from a function node.
 *
 * Extracts the arguments from a CSS function, filtering out operators.
 * Commonly used pattern in all function parsers.
 *
 * @param fn - CSS Function AST node
 * @returns Array of CSS nodes representing function arguments
 *
 * @public
 *
 * @example
 * ```typescript
 * import { parseFunctionArguments } from "@/utils/ast/functions";
 *
 * const args = parseFunctionArguments(functionNode);
 * console.log(args.length); // Number of arguments
 * console.log(args[0].type); // Type of first argument
 * ```
 */
export function parseFunctionArguments(fn: csstree.FunctionNode): csstree.CssNode[] {
	return fn.children.toArray().filter((node) => node.type !== "Operator");
}

/**
 * Parse CSS string into AST with error handling.
 *
 * Common pattern for parsing CSS strings with proper error handling.
 *
 * @param css - CSS string to parse
 * @param context - CSS parsing context ("value", "declaration", etc.)
 * @returns Result containing CSS AST or error message
 *
 * @public
 */
export function parseCssString(
	css: string,
	context: "value" | "declaration" = "value",
): Result<csstree.CssNode, string> {
	try {
		const ast = csstree.parse(css, { context });
		return ok(ast);
	} catch (e) {
		return err(`Failed to parse CSS: ${e instanceof Error ? e.message : String(e)}`);
	}
}
