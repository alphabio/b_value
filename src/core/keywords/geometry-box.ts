// b_path:: src/core/keywords/geometry-box.ts

import { z } from "zod";

/**
 * Visual box keywords used in layout and clipping contexts.
 *
 * Defines the box model edges for visual rendering:
 * - content-box: Content area only
 * - padding-box: Content + padding
 * - border-box: Content + padding + border
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/box-edge}
 *
 * @public
 */
export const visualBoxKeywords = ["content-box", "padding-box", "border-box"] as const;

export const visualBoxKeywordsSchema = z.enum(visualBoxKeywords);
export type VisualBoxKeyword = z.infer<typeof visualBoxKeywordsSchema>;

/**
 * Shape box keywords extend visual box with margin-box.
 *
 * Used for shape-outside and clip-path to define the reference box
 * for shape positioning.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/box-edge}
 *
 * @public
 */
export const shapeBoxKeywords = [...visualBoxKeywords, "margin-box"] as const;

export const shapeBoxKeywordsSchema = z.enum(shapeBoxKeywords);
export type ShapeBoxKeyword = z.infer<typeof shapeBoxKeywordsSchema>;

/**
 * Geometry box keywords extend shape box with SVG-specific keywords.
 *
 * Used for clip-path to define the clipping region reference box.
 * SVG keywords (fill-box, stroke-box, view-box) only apply in SVG context.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path#geometry-box}
 *
 * @public
 */
export const geometryBoxKeywords = [...shapeBoxKeywords, "fill-box", "stroke-box", "view-box"] as const;

export const geometryBoxKeywordsSchema = z.enum(geometryBoxKeywords);
export type GeometryBoxKeyword = z.infer<typeof geometryBoxKeywordsSchema>;
