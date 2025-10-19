// b_path:: src/parse/filter/drop-shadow.ts
import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type { Color } from "@/core/types/color";
import type { DropShadowFilter } from "@/core/types/filter";
import type { Length } from "@/core/types/length-percentage";
import * as ASTUtils from "@/utils/ast";
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
 * Parse CSS drop-shadow() filter function.
 *
 * Applies a drop shadow effect to the element.
 * Syntax: drop-shadow(offset-x offset-y [blur-radius] [color])
 *
 * @param input - CSS string like "drop-shadow(2px 2px)" or "drop-shadow(2px 2px 4px rgba(0,0,0,0.5))"
 * @returns Result with DropShadowFilter IR or error message
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/drop-shadow}
 *
 * @example
 * ```typescript
 * import { parse } from "@/parse/filter/drop-shadow";
 *
 * // Basic drop shadow
 * const result = parse("drop-shadow(2px 2px)");
 * // { ok: true, value: { kind: "drop-shadow", offsetX: { value: 2, unit: "px" }, offsetY: { value: 2, unit: "px" } } }
 *
 * // With blur radius
 * const result2 = parse("drop-shadow(2px 2px 4px)");
 * // { ok: true, value: { kind: "drop-shadow", offsetX: { value: 2, unit: "px" }, offsetY: { value: 2, unit: "px" }, blurRadius: { value: 4, unit: "px" } } }
 *
 * // With color
 * const result3 = parse("drop-shadow(2px 2px 4px black)");
 * // { ok: true, value: { kind: "drop-shadow", offsetX: { value: 2, unit: "px" }, offsetY: { value: 2, unit: "px" }, blurRadius: { value: 4, unit: "px" }, color: { kind: "named", name: "black" } } }
 * ```
 *
 * @public
 */
export function parse(input: string): Result<DropShadowFilter, string> {
	// Parse CSS string to AST
	const astResult = ASTUtils.parseCssString(input, "value");
	if (!astResult.ok) {
		return err(astResult.error);
	}

	// Find drop-shadow() function
	const funcResult = ASTUtils.findFunctionNode(astResult.value, "drop-shadow");
	if (!funcResult.ok) {
		return err(funcResult.error);
	}

	const fn = funcResult.value;

	// Get function arguments
	const children = ASTUtils.parseFunctionArguments(fn);

	// Expect at least 2 arguments (offset-x and offset-y are required)
	if (children.length < 2) {
		return err(`drop-shadow() expects at least 2 arguments, got ${children.length}`);
	}

	// Parse arguments - need to identify lengths vs color
	return parseDropShadowArguments(children);
}

/**
 * Parse drop-shadow function arguments from AST nodes.
 *
 * Handles the complexity of identifying which arguments are lengths vs color.
 * Color can appear in any position after the first two required length arguments.
 *
 * @param nodes - Array of CSS AST nodes from function arguments
 * @returns Result containing parsed DropShadowFilter or error message
 *
 * @internal
 */
function parseDropShadowArguments(nodes: csstree.CssNode[]): Result<DropShadowFilter, string> {
	// First two arguments are always offset-x and offset-y (required lengths)
	const firstNode = nodes[0];
	const secondNode = nodes[1];

	if (!firstNode) {
		return err("drop-shadow() missing offset-x");
	}
	if (!secondNode) {
		return err("drop-shadow() missing offset-y");
	}

	const offsetXResult = ParseUtils.parseLengthNode(firstNode);
	if (!offsetXResult.ok) {
		return err(`drop-shadow() offset-x: ${offsetXResult.error}`);
	}

	const offsetYResult = ParseUtils.parseLengthNode(secondNode);
	if (!offsetYResult.ok) {
		return err(`drop-shadow() offset-y: ${offsetYResult.error}`);
	}

	const offsetX = offsetXResult.value;
	const offsetY = offsetYResult.value;

	// Default values
	let blurRadius: Length | undefined;
	let color: Color | undefined;

	// Process remaining arguments (2-4 total, so 0-2 more arguments)
	const remainingNodes = nodes.slice(2);

	// If we have remaining arguments, determine their types
	if (remainingNodes.length > 0) {
		const result = parseRemainingArguments(remainingNodes);
		if (!result.ok) {
			return err(result.error);
		}

		({ blurRadius, color } = result.value);
	}

	return ok({
		kind: "drop-shadow",
		offsetX,
		offsetY,
		blurRadius,
		color,
	});
}

/**
 * Parse the remaining arguments after offset-x and offset-y.
 *
 * Handles the complexity where:
 * - blur-radius is optional length
 * - color is optional and can appear in any position
 * - We need to distinguish between length and color arguments
 *
 * @param nodes - Remaining AST nodes to parse
 * @returns Result with parsed blurRadius and color, or error
 *
 * @internal
 */
function parseRemainingArguments(
	nodes: csstree.CssNode[],
): Result<{ blurRadius: Length | undefined; color: Color | undefined }, string> {
	let blurRadius: Length | undefined;
	let color: Color | undefined;

	// Process each remaining node
	for (const node of nodes) {
		// Skip operators (like commas if present)
		if (node.type === "Operator") {
			continue;
		}

		// Try parsing as length first (for blur-radius)
		const lengthResult = ParseUtils.parseLengthNode(node);
		if (lengthResult.ok) {
			if (blurRadius !== undefined) {
				return err("drop-shadow() can have at most one blur-radius");
			}
			blurRadius = lengthResult.value;
			continue;
		}

		// If not a length, try parsing as color
		const colorResult = parseColor(nodeToString(node));
		if (colorResult.ok) {
			if (color !== undefined) {
				return err("drop-shadow() can have at most one color");
			}
			color = colorResult.value;
			continue;
		}

		// If neither length nor color, it's an invalid argument
		return err(`drop-shadow() invalid argument: ${nodeToString(node)}. Expected length or color.`);
	}

	// Check for too many arguments (more than 2 remaining = more than 4 total)
	if (nodes.length > 2) {
		return err(`drop-shadow() expects at most 4 arguments, got ${nodes.length + 2}`);
	}

	return ok({ blurRadius, color });
}
