// b_path:: src/core/types/clip-path.ts

import { z } from "zod";
import type { GeometryBoxKeyword } from "@/core/keywords/geometry-box";
import { lengthPercentageSchema } from "./length-percentage";
import { position2DSchema } from "./position";
import type { Url } from "./url";

/**
 * CSS clip-path value.
 *
 * Defines the visible region of an element by clipping.
 * Can be a URL reference to SVG clipPath, geometry-box keyword, basic shape, or 'none'.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path}
 *
 * @public
 */
export type ClipPathValue =
	| Url
	| ClipPathNone
	| ClipPathGeometryBox
	| ClipPathInset
	| ClipPathCircle
	| ClipPathEllipse
	| ClipPathPolygon
	| ClipPathRect
	| ClipPathXywh
	| ClipPathPath;

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

/**
 * Border-radius shorthand for inset() shapes.
 *
 * Simplified version without elliptical corners.
 * All corners use same radius for horizontal and vertical.
 *
 * @public
 */
export type InsetBorderRadius = {
	topLeft: z.infer<typeof lengthPercentageSchema>;
	topRight: z.infer<typeof lengthPercentageSchema>;
	bottomRight: z.infer<typeof lengthPercentageSchema>;
	bottomLeft: z.infer<typeof lengthPercentageSchema>;
};

/**
 * inset() basic shape function.
 *
 * Defines an inset rectangle by specifying offsets from each edge.
 * Optionally accepts rounded corners via border-radius syntax.
 *
 * Syntax: inset( <length-percentage>{1,4} [ round <border-radius> ]? )
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape/inset}
 *
 * @public
 */
export const clipPathInsetSchema = z.object({
	kind: z.literal("clip-path-inset"),
	top: lengthPercentageSchema,
	right: lengthPercentageSchema,
	bottom: lengthPercentageSchema,
	left: lengthPercentageSchema,
	borderRadius: z
		.object({
			topLeft: lengthPercentageSchema,
			topRight: lengthPercentageSchema,
			bottomRight: lengthPercentageSchema,
			bottomLeft: lengthPercentageSchema,
		})
		.optional(),
});

export type ClipPathInset = z.infer<typeof clipPathInsetSchema>;

/**
 * circle() basic shape function.
 *
 * Defines a circular clipping region with an optional radius and center position.
 *
 * Syntax: circle( <length-percentage>? [ at <position> ]? )
 *
 * Defaults: radius = "closest-side", position = center
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape/circle}
 *
 * @public
 */
export const clipPathCircleSchema = z.object({
	kind: z.literal("clip-path-circle"),
	radius: z.union([lengthPercentageSchema, z.enum(["closest-side", "farthest-side"])]).optional(),
	position: position2DSchema.optional(),
});

export type ClipPathCircle = z.infer<typeof clipPathCircleSchema>;

/**
 * ellipse() basic shape function.
 *
 * Defines an elliptical clipping region with optional horizontal/vertical radii and center position.
 *
 * Syntax: ellipse( <radial-size>{2}? [ at <position> ]? )
 *
 * Defaults: radiusX = "closest-side", radiusY = "closest-side", position = center
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape/ellipse}
 *
 * @public
 */
export const clipPathEllipseSchema = z.object({
	kind: z.literal("clip-path-ellipse"),
	radiusX: z.union([lengthPercentageSchema, z.enum(["closest-side", "farthest-side"])]).optional(),
	radiusY: z.union([lengthPercentageSchema, z.enum(["closest-side", "farthest-side"])]).optional(),
	position: position2DSchema.optional(),
});

export type ClipPathEllipse = z.infer<typeof clipPathEllipseSchema>;

/**
 * polygon() basic shape function.
 *
 * Defines a polygonal clipping region from a list of coordinate pairs.
 * Optionally accepts a fill-rule to determine interior points.
 *
 * Syntax: polygon( <fill-rule>? , <shape-arg># )
 *
 * Default: fillRule = "nonzero" (per CSS spec)
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape/polygon}
 *
 * @public
 */
export const clipPathPolygonSchema = z.object({
	kind: z.literal("clip-path-polygon"),
	fillRule: z.enum(["nonzero", "evenodd"]).optional(),
	points: z.array(
		z.object({
			x: lengthPercentageSchema,
			y: lengthPercentageSchema,
		}),
	),
});

export type ClipPathPolygon = z.infer<typeof clipPathPolygonSchema>;

/**
 * rect() basic shape function.
 *
 * Defines a rectangle using edge offsets (TRBL).
 * Each edge can be a length-percentage or 'auto'.
 * Optionally accepts rounded corners via border-radius syntax.
 *
 * Syntax: rect( [<length-percentage> | auto]{1,4} [ round <border-radius> ]? )
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape/rect}
 *
 * @public
 */
export const clipPathRectSchema = z.object({
	kind: z.literal("clip-path-rect"),
	top: z.union([lengthPercentageSchema, z.literal("auto")]),
	right: z.union([lengthPercentageSchema, z.literal("auto")]),
	bottom: z.union([lengthPercentageSchema, z.literal("auto")]),
	left: z.union([lengthPercentageSchema, z.literal("auto")]),
	borderRadius: z
		.object({
			topLeft: lengthPercentageSchema,
			topRight: lengthPercentageSchema,
			bottomRight: lengthPercentageSchema,
			bottomLeft: lengthPercentageSchema,
		})
		.optional(),
});

export type ClipPathRect = z.infer<typeof clipPathRectSchema>;

/**
 * xywh() basic shape function.
 *
 * Defines a rectangle using position (x, y) and dimensions (width, height).
 * All values are length-percentages. Width and height must be non-negative.
 * Optionally accepts rounded corners via border-radius syntax.
 *
 * Syntax: xywh( <length-percentage>{4} [ round <border-radius> ]? )
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape/xywh}
 *
 * @public
 */
export const clipPathXywhSchema = z.object({
	kind: z.literal("clip-path-xywh"),
	x: lengthPercentageSchema,
	y: lengthPercentageSchema,
	width: lengthPercentageSchema,
	height: lengthPercentageSchema,
	borderRadius: z
		.object({
			topLeft: lengthPercentageSchema,
			topRight: lengthPercentageSchema,
			bottomRight: lengthPercentageSchema,
			bottomLeft: lengthPercentageSchema,
		})
		.optional(),
});

export type ClipPathXywh = z.infer<typeof clipPathXywhSchema>;

/**
 * path() basic shape function.
 *
 * Defines a clipping region using SVG path data.
 * Optionally accepts a fill-rule to determine interior points.
 *
 * Syntax: path( [<fill-rule>,]? <string> )
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape/path}
 *
 * @public
 */
export const clipPathPathSchema = z.object({
	kind: z.literal("clip-path-path"),
	fillRule: z.enum(["nonzero", "evenodd"]).optional(),
	pathData: z.string(),
});

export type ClipPathPath = z.infer<typeof clipPathPathSchema>;
