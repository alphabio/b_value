// b_path:: src/parse/filter/filter.ts

import type { CssNode } from "css-tree";
import * as cssTree from "css-tree";
import { err, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import * as Blur from "./blur";
import * as Brightness from "./brightness";
import * as Contrast from "./contrast";
import * as DropShadow from "./drop-shadow";
import * as Grayscale from "./grayscale";
import * as HueRotate from "./hue-rotate";
import * as Invert from "./invert";
import * as Opacity from "./opacity";
import * as Saturate from "./saturate";
import * as Sepia from "./sepia";
import * as Url from "./url";

/**
 * Parse filter value with auto-detection.
 *
 * Automatically detects and parses any CSS filter function:
 * - blur(), brightness(), contrast(), drop-shadow()
 * - grayscale(), hue-rotate(), invert(), opacity()
 * - saturate(), sepia(), url()
 *
 * @param value - CSS filter value string
 * @returns Result with FilterFunction IR or error
 *
 * @example
 * ```typescript
 * parse("blur(5px)");              // Auto-detects blur
 * parse("brightness(1.5)");        // Auto-detects brightness
 * parse("drop-shadow(2px 2px 4px black)"); // Auto-detects drop-shadow
 * parse("url(#filter)");           // Auto-detects url
 * ```
 *
 * @public
 */
export function parse(value: string): Result<Type.FilterFunction, string> {
	const ast = cssTree.parse(value, { context: "value" }) as cssTree.Value;
	if (!ast.children) return err("Empty value");
	const first = ast.children.first;
	if (!first) return err("Empty value");
	return parseNode(first);
}

/**
 * Parse filter AST node with auto-detection.
 *
 * @param node - CSS AST node
 * @returns Result with FilterFunction IR or error
 *
 * @public
 */
export function parseNode(node: CssNode): Result<Type.FilterFunction, string> {
	// URL filter (special case - Url node type)
	if (node.type === "Url") {
		const css = cssTree.generate(node);
		return Url.parse(css);
	}

	// Filter functions
	if (node.type === "Function") {
		const css = cssTree.generate(node);
		switch (node.name.toLowerCase()) {
			case "blur":
				return Blur.parse(css);
			case "brightness":
				return Brightness.parse(css);
			case "contrast":
				return Contrast.parse(css);
			case "drop-shadow":
				return DropShadow.parse(css);
			case "grayscale":
				return Grayscale.parse(css);
			case "hue-rotate":
				return HueRotate.parse(css);
			case "invert":
				return Invert.parse(css);
			case "opacity":
				return Opacity.parse(css);
			case "saturate":
				return Saturate.parse(css);
			case "sepia":
				return Sepia.parse(css);
			default:
				return err(`Unknown filter function: ${node.name}`);
		}
	}

	return err("Invalid filter value");
}
