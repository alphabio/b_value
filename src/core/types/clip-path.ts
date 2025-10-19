// b_path:: src/core/types/clip-path.ts

import { z } from "zod";
import type { GeometryBoxKeyword } from "@/core/keywords/geometry-box";
import type { Url } from "./url";

/**
 * CSS clip-path value.
 *
 * Defines the visible region of an element by clipping.
 * Can be a URL reference to SVG clipPath, geometry-box keyword, or 'none'.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path}
 *
 * @public
 */
export type ClipPathValue = Url | ClipPathNone | ClipPathGeometryBox;

/**
 * 'none' keyword for clip-path.
 *
 * No clipping is applied; the element is fully visible.
 *
 * @public
 */
export const clipPathNoneSchema = z.object({
	kind: z.literal("clip-path-none"),
});

export type ClipPathNone = z.infer<typeof clipPathNoneSchema>;

/**
 * Geometry box keyword for clip-path.
 *
 * Defines the reference box for clipping. Can be a visual box
 * (content-box, padding-box, border-box), shape box (adds margin-box),
 * or SVG-specific box (fill-box, stroke-box, view-box).
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path#geometry-box}
 *
 * @public
 */
export const clipPathGeometryBoxSchema = z.object({
	kind: z.literal("clip-path-geometry-box"),
	value: z.custom<GeometryBoxKeyword>(),
});

export type ClipPathGeometryBox = z.infer<typeof clipPathGeometryBoxSchema>;
