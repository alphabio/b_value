// b_path:: src/generate/clip-path/geometry-box.ts

import type { ClipPathGeometryBox } from "@/core/types/clip-path";

/**
 * Generate CSS geometry-box keyword for clip-path property.
 *
 * Converts ClipPathGeometryBox IR to CSS keyword string.
 *
 * @param value - ClipPathGeometryBox IR value
 * @returns CSS string like "content-box" or "fill-box"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path#geometry-box}
 *
 * @example
 * ```typescript
 * import { Generate } from "b_value";
 *
 * const css = Generate.ClipPath.GeometryBox.toCss({
 *   kind: "clip-path-geometry-box",
 *   value: "padding-box"
 * });
 * // "padding-box"
 * ```
 *
 * @public
 */
export function toCss(value: ClipPathGeometryBox): string {
	return value.value;
}
