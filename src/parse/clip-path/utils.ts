// b_path:: src/parse/clip-path/utils.ts
import type { CssNode } from "css-tree";
import { err, type Result } from "@/core/result";
import * as AstUtils from "@/utils/ast";

/**
 * Common wrapper for parsing CSS basic shape functions.
 *
 * Eliminates boilerplate of:
 * - Parsing CSS string to AST
 * - Finding the function node
 * - Extracting function arguments
 * - Error handling and try/catch
 *
 * @param css - CSS string to parse (e.g., "rect(10px 20px 30px 40px)")
 * @param functionName - Name of the shape function (e.g., "rect", "circle")
 * @param parser - Function to parse shape-specific arguments
 * @returns Result with parsed shape IR or error
 *
 * @example
 * Basic usage:
 * ```typescript
 * export function parse(css: string): Result<ClipPathRect, string> {
 *   return parseShapeFunction(css, "rect", parseRectArgs);
 * }
 *
 * function parseRectArgs(args: CssNode[]): Result<ClipPathRect, string> {
 *   // Parse rect-specific arguments
 *   return ok({ kind: "clip-path-rect", ... });
 * }
 * ```
 *
 * @example
 * With error handling:
 * ```typescript
 * function parseRectArgs(args: CssNode[]): Result<ClipPathRect, string> {
 *   if (args.length === 0) {
 *     return err("rect() requires at least one value");
 *   }
 *   // ... parse logic ...
 * }
 * ```
 *
 * @public
 */
export function parseShapeFunction<T>(
	css: string,
	functionName: string,
	parser: (args: CssNode[]) => Result<T, string>,
): Result<T, string> {
	try {
		// Parse CSS string to AST
		const astResult = AstUtils.parseCssString(css);
		if (!astResult.ok) {
			return err(astResult.error);
		}

		// Find the shape function node
		const fnResult = AstUtils.findFunctionNode(astResult.value, functionName);
		if (!fnResult.ok) {
			return err(fnResult.error);
		}

		// Extract function arguments (commas removed)
		const args = AstUtils.parseFunctionArguments(fnResult.value);

		// Delegate to shape-specific parser
		return parser(args);
	} catch (e) {
		return err(`Failed to parse ${functionName}(): ${e instanceof Error ? e.message : String(e)}`);
	}
}

/**
 * Similar to parseShapeFunction but returns raw AST children.
 *
 * Use this variant when you need direct access to AST nodes with commas
 * preserved (e.g., polygon needs to split by commas manually).
 *
 * @param css - CSS string to parse
 * @param functionName - Name of the shape function
 * @param parser - Function to parse raw AST children
 * @returns Result with parsed shape IR or error
 *
 * @example
 * For shapes that need comma handling:
 * ```typescript
 * export function parse(css: string): Result<ClipPathPolygon, string> {
 *   return parseShapeFunctionRaw(css, "polygon", parsePolygonChildren);
 * }
 *
 * function parsePolygonChildren(children: CssNode[]): Result<ClipPathPolygon, string> {
 *   // Split by commas manually
 *   const pointGroups = AstUtils.splitNodesByComma(children);
 *   // ... parse points ...
 * }
 * ```
 *
 * @public
 */
export function parseShapeFunctionRaw<T>(
	css: string,
	functionName: string,
	parser: (children: CssNode[]) => Result<T, string>,
): Result<T, string> {
	try {
		// Parse CSS string to AST
		const astResult = AstUtils.parseCssString(css);
		if (!astResult.ok) {
			return err(astResult.error);
		}

		// Find the shape function node
		const fnResult = AstUtils.findFunctionNode(astResult.value, functionName);
		if (!fnResult.ok) {
			return err(fnResult.error);
		}

		// Get raw children (commas included)
		const children = fnResult.value.children ? Array.from(fnResult.value.children) : [];

		// Delegate to shape-specific parser
		return parser(children);
	} catch (e) {
		return err(`Failed to parse ${functionName}(): ${e instanceof Error ? e.message : String(e)}`);
	}
}
