// b_path:: src/parse/visual/background-blend-mode.ts

import * as csstree from "css-tree";
import { BLEND_MODE_KEYWORDS } from "@/core/keywords/blend-mode-keywords";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";

/**
 * Parse CSS background-blend-mode property value.
 *
 * Accepts blend mode keywords like multiply, screen, overlay, etc.
 * Per CSS Compositing and Blending Level 1 specification.
 *
 * @param css - CSS background-blend-mode value (e.g., "multiply", "screen")
 * @returns Result with BackgroundBlendMode IR or error message
 *
 * @example
 * Blend mode value:
 * ```typescript
 * const result = parse("multiply");
 * // { ok: true, value: { kind: "background-blend-mode", mode: "multiply" } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/background-blend-mode | MDN: background-blend-mode}
 * @see {@link https://www.w3.org/TR/compositing-1/#background-blend-mode | W3C Spec}
 */
export function parse(css: string): Result<Type.BackgroundBlendMode, string> {
	try {
		const ast = csstree.parse(css, { context: "value" });

		if (ast.type !== "Value") {
			return err("Expected Value node");
		}

		const children = ast.children.toArray();

		if (children.length !== 1) {
			return err(`Expected single value, got ${children.length} values`);
		}

		const node = children[0];
		if (!node || node.type !== "Identifier") {
			return err(`Expected keyword identifier, got: ${node?.type || "nothing"}`);
		}

		const keyword = node.name.toLowerCase();

		if (!BLEND_MODE_KEYWORDS.includes(keyword as Type.BackgroundBlendMode["mode"])) {
			return err(`Invalid background-blend-mode: ${keyword}`);
		}

		return ok({
			kind: "background-blend-mode",
			mode: keyword as Type.BackgroundBlendMode["mode"],
		});
	} catch (error) {
		return err(`Failed to parse background-blend-mode: ${error instanceof Error ? error.message : String(error)}`);
	}
}

// Legacy export for backward compatibility
export const parseBackgroundBlendMode = parse;
