// b_path:: src/parse/color/color.ts

import type { CssNode } from "css-tree";
import * as cssTree from "css-tree";
import { err, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import * as ColorFunction from "./color-function";
import * as Hex from "./hex";
import * as Hsl from "./hsl";
import * as Hwb from "./hwb";
import * as Lab from "./lab";
import * as Lch from "./lch";
import * as Named from "./named";
import * as Oklab from "./oklab";
import * as Oklch from "./oklch";
import * as Rgb from "./rgb";
import * as Special from "./special";
import * as System from "./system";

/**
 * Parse color value with auto-detection.
 *
 * Automatically detects and parses any CSS color format:
 * - Hex: #rgb, #rrggbb, #rrggbbaa
 * - RGB: rgb(), rgba()
 * - HSL: hsl(), hsla()
 * - HWB: hwb()
 * - LAB: lab()
 * - LCH: lch()
 * - OKLab: oklab()
 * - OKLCH: oklch()
 * - Color function: color()
 * - Named colors: red, blue, cornflowerblue, etc.
 * - Special: transparent, currentcolor
 * - System colors: Canvas, ButtonText, etc.
 *
 * @param value - CSS color value string
 * @returns Result with Color IR or error
 *
 * @example
 * ```typescript
 * parse("#ff0000");              // Auto-detects hex
 * parse("rgb(255, 0, 0)");       // Auto-detects rgb
 * parse("hsl(0, 100%, 50%)");    // Auto-detects hsl
 * parse("red");                  // Auto-detects named
 * parse("transparent");          // Auto-detects special
 * ```
 *
 * @public
 */
export function parse(value: string): Result<Type.Color, string> {
	const ast = cssTree.parse(value, { context: "value" }) as cssTree.Value;
	if (!ast.children) return err("Empty value");
	const first = ast.children.first;
	if (!first) return err("Empty value");
	return parseNode(first);
}

/**
 * Parse color AST node with auto-detection.
 *
 * @param node - CSS AST node
 * @returns Result with Color IR or error
 *
 * @public
 */
export function parseNode(node: CssNode): Result<Type.Color, string> {
	// 1. Hex color (Hash node)
	if (node.type === "Hash") {
		const css = `#${node.value}`;
		return Hex.parse(css);
	}

	// 2. Color functions
	if (node.type === "Function") {
		const css = cssTree.generate(node);
		switch (node.name.toLowerCase()) {
			case "rgb":
			case "rgba":
				return Rgb.parse(css);
			case "hsl":
			case "hsla":
				return Hsl.parse(css);
			case "hwb":
				return Hwb.parse(css);
			case "lab":
				return Lab.parse(css);
			case "lch":
				return Lch.parse(css);
			case "oklab":
				return Oklab.parse(css);
			case "oklch":
				return Oklch.parse(css);
			case "color":
				return ColorFunction.parse(css);
			default:
				return err(`Unknown color function: ${node.name}`);
		}
	}

	// 3. Identifier (named, special, or system colors)
	if (node.type === "Identifier") {
		const keyword = node.name.toLowerCase();

		// Special keywords (transparent, currentcolor)
		if (keyword === "transparent" || keyword === "currentcolor") {
			return Special.parse(node.name);
		}

		// Try system colors first (smaller set, more specific)
		const systemResult = System.parse(node.name);
		if (systemResult.ok) return systemResult;

		// Fallback to named colors (larger set)
		return Named.parse(node.name);
	}

	return err(`Invalid color node type: ${node.type}`);
}
