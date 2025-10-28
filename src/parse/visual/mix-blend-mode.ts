// b_path:: src/parse/visual/mix-blend-mode.ts

import * as csstree from "css-tree";
import { BLEND_MODE_KEYWORDS } from "@/core/keywords/blend-mode-keywords";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";

/**
 * Parse CSS mix-blend-mode property value.
 *
 * Accepts blend mode keywords like multiply, screen, overlay, etc.
 * Per CSS Compositing and Blending Level 1 specification.
 *
 * @param css - CSS mix-blend-mode value (e.g., "screen", "overlay")
 * @returns Result with MixBlendMode IR or error message
 *
 * @example
 * Blend mode value:
 * ```typescript
 * const result = parse("screen");
 * // { ok: true, value: { kind: "mix-blend-mode", mode: "screen" } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode | MDN: mix-blend-mode}
 * @see {@link https://www.w3.org/TR/compositing-1/#mix-blend-mode | W3C Spec}
 */
export function parse(css: string): Result<Type.MixBlendMode, string> {
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

		if (!BLEND_MODE_KEYWORDS.includes(keyword as Type.MixBlendMode["mode"])) {
			return err(`Invalid mix-blend-mode: ${keyword}`);
		}

		return ok({
			kind: "mix-blend-mode",
			mode: keyword as Type.MixBlendMode["mode"],
		});
	} catch (error) {
		return err(`Failed to parse mix-blend-mode: ${error instanceof Error ? error.message : String(error)}`);
	}
}

// Legacy export for backward compatibility
export const parseMixBlendMode = parse;
