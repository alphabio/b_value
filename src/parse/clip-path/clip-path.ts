// b_path:: src/parse/clip-path/clip-path.ts

import type { CssNode } from "css-tree";
import * as cssTree from "css-tree";
import { err, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import * as Circle from "./circle";
import * as Ellipse from "./ellipse";
import * as GeometryBox from "./geometry-box";
import * as Inset from "./inset";
import * as None from "./none";
import * as Path from "./path";
import * as Polygon from "./polygon";
import * as Rect from "./rect";
import * as Url from "./url";
import * as Xywh from "./xywh";

/**
 * Parse clip-path value with auto-detection.
 *
 * Automatically detects and parses any clip-path value:
 * - Basic shapes: circle(), ellipse(), inset(), polygon(), rect(), xywh(), path()
 * - Reference: url()
 * - Keyword: none
 * - Geometry box: border-box, padding-box, content-box, etc.
 *
 * @param value - CSS clip-path value string
 * @returns Result with ClipPathValue IR or error
 *
 * @example
 * ```typescript
 * parse("circle(50%)");           // Auto-detects circle
 * parse("polygon(0 0, 100% 0, 100% 100%)"); // Auto-detects polygon
 * parse("none");                  // Auto-detects keyword
 * parse("url(#clip)");            // Auto-detects reference
 * ```
 *
 * @public
 */
export function parse(value: string): Result<Type.ClipPathValue, string> {
	const ast = cssTree.parse(value, { context: "value" }) as cssTree.Value;
	if (!ast.children) return err("Empty value");
	const first = ast.children.first;
	if (!first) return err("Empty value");
	return parseNode(first);
}

/**
 * Parse clip-path AST node with auto-detection.
 *
 * @param node - CSS AST node
 * @returns Result with ClipPathValue IR or error
 *
 * @public
 */
export function parseNode(node: CssNode): Result<Type.ClipPathValue, string> {
	// Keyword: none
	if (node.type === "Identifier" && node.name === "none") {
		return None.parse("none");
	}

	// URL reference
	if (node.type === "Url") {
		const css = cssTree.generate(node);
		return Url.parse(css);
	}

	// Basic shapes (function)
	if (node.type === "Function") {
		const css = cssTree.generate(node);
		switch (node.name.toLowerCase()) {
			case "circle":
				return Circle.parse(css);
			case "ellipse":
				return Ellipse.parse(css);
			case "inset":
				return Inset.parse(css);
			case "polygon":
				return Polygon.parse(css);
			case "rect":
				return Rect.parse(css);
			case "xywh":
				return Xywh.parse(css);
			case "path":
				return Path.parse(css);
			default:
				return err(`Unknown clip-path function: ${node.name}`);
		}
	}

	// Geometry-box keyword
	if (node.type === "Identifier") {
		return GeometryBox.parse(node.name);
	}

	return err(`Invalid clip-path node type: ${node.type}`);
}
