// b_path:: src/parse/gradient/gradient.ts

import type { CssNode } from "css-tree";
import * as cssTree from "css-tree";
import { err, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import * as Conic from "./conic";
import * as Linear from "./linear";
import * as Radial from "./radial";

/**
 * Parse gradient value with auto-detection.
 *
 * Automatically detects and parses any CSS gradient function:
 * - linear-gradient(), repeating-linear-gradient()
 * - radial-gradient(), repeating-radial-gradient()
 * - conic-gradient(), repeating-conic-gradient()
 *
 * @param value - CSS gradient value string
 * @returns Result with Gradient IR or error
 *
 * @example
 * ```typescript
 * parse("linear-gradient(red, blue)");
 * parse("radial-gradient(circle, red, blue)");
 * parse("conic-gradient(red, blue)");
 * parse("repeating-linear-gradient(red 0%, blue 10%)");
 * ```
 *
 * @public
 */
export function parse(value: string): Result<Type.Gradient, string> {
	const ast = cssTree.parse(value, { context: "value" }) as cssTree.Value;
	if (!ast.children) return err("Empty value");
	const first = ast.children.first;
	if (!first) return err("Empty value");
	return parseNode(first);
}

/**
 * Parse gradient AST node with auto-detection.
 *
 * @param node - CSS AST node
 * @returns Result with Gradient IR or error
 *
 * @public
 */
export function parseNode(node: CssNode): Result<Type.Gradient, string> {
	// All gradients are Function nodes
	if (node.type === "Function") {
		const css = cssTree.generate(node);
		switch (node.name.toLowerCase()) {
			case "linear-gradient":
			case "repeating-linear-gradient":
				return Linear.parse(css);
			case "radial-gradient":
			case "repeating-radial-gradient":
				return Radial.parse(css);
			case "conic-gradient":
			case "repeating-conic-gradient":
				return Conic.parse(css);
			default:
				return err(`Unknown gradient function: ${node.name}`);
		}
	}

	return err("Invalid gradient value");
}
