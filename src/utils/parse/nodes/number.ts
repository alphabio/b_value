// b_path:: src/utils/parse/nodes/number.ts
/**
 * Number and identifier parsing utilities.
 *
 * This module handles:
 * - CSS identifier nodes
 * - Keyword extraction
 * - String values
 *
 * @module utils/parse/nodes/number
 */

// b_path:: src/utils/parse/nodes/number.ts
import type * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";

/**
 * Parse a CSS identifier node into a string.
 *
 * @param node - CSS AST identifier node
 * @returns Result containing string or error message
 *
 * @public
 */
export function parseIdentifierNode(node: csstree.CssNode): Result<string, string> {
	if (node.type === "Identifier") {
		return ok(node.name.toLowerCase());
	}
	return err("Expected identifier");
}
