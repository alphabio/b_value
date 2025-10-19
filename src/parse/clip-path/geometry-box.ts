// b_path:: src/parse/clip-path/geometry-box.ts

import { geometryBoxKeywordsSchema } from "@/core/keywords/geometry-box";
import { err, ok, type Result } from "@/core/result";
import type { ClipPathGeometryBox } from "@/core/types/clip-path";

/**
 * Parse geometry-box keyword for clip-path property.
 *
 * Parses box model keywords that define the clipping region reference box.
 * Supports visual boxes (content-box, padding-box, border-box), shape boxes
 * (adds margin-box), and SVG boxes (fill-box, stroke-box, view-box).
 *
 * @param input - CSS string like "content-box" or "padding-box"
 * @returns Result with ClipPathGeometryBox IR or error message
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path#geometry-box}
 *
 * @example
 * ```typescript
 * import { Parse } from "b_value";
 *
 * const result = Parse.ClipPath.GeometryBox.parse("content-box");
 * // { ok: true, value: { kind: "clip-path-geometry-box", value: "content-box" } }
 *
 * const result2 = Parse.ClipPath.GeometryBox.parse("fill-box");
 * // { ok: true, value: { kind: "clip-path-geometry-box", value: "fill-box" } }
 * ```
 *
 * @public
 */
export function parse(input: string): Result<ClipPathGeometryBox, string> {
	const trimmed = input.trim();
	const result = geometryBoxKeywordsSchema.safeParse(trimmed);

	if (!result.success) {
		return err(`Invalid geometry-box value: "${input}"`);
	}

	return ok({
		kind: "clip-path-geometry-box",
		value: result.data,
	});
}
