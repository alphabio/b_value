// b_path:: src/core/types/layout.ts
import { z } from "zod";
import { cursorKeywordsSchema } from "../keywords/cursor-keywords";
import { displayKeywordsSchema } from "../keywords/display-keywords";
import { overflowKeywordsSchema } from "../keywords/overflow-keywords";
import { positionPropertyKeywordsSchema } from "../keywords/position-property-keywords";
import { visibilityKeywordsSchema } from "../keywords/visibility-keywords";
import { lengthPercentageAutoSchema, lengthPercentageSchema } from "./length-percentage";

/**
 * CSS display property IR.
 *
 * The display property controls how an element is displayed in the layout,
 * including its box generation, inner layout type, and outer display type.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/display}
 *
 * @example
 * ```typescript
 * const display: Display = {
 *   kind: "display",
 *   value: "flex"
 * };
 * // CSS: display: flex;
 * ```
 *
 * @public
 */
export const displaySchema = z.object({
	kind: z.literal("display"),
	value: displayKeywordsSchema,
});

/**
 * TypeScript type for display property.
 *
 * @public
 */
export type Display = z.infer<typeof displaySchema>;

/**
 * CSS visibility property IR.
 *
 * The visibility property controls whether an element is visible or hidden.
 * Unlike display: none, visibility: hidden elements still take up space in the layout.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/visibility}
 *
 * @example
 * ```typescript
 * const visibility: Visibility = {
 *   kind: "visibility",
 *   value: "hidden"
 * };
 * // CSS: visibility: hidden;
 * ```
 *
 * @public
 */
export const visibilitySchema = z.object({
	kind: z.literal("visibility"),
	value: visibilityKeywordsSchema,
});

/**
 * TypeScript type for visibility property.
 *
 * @public
 */
export type Visibility = z.infer<typeof visibilitySchema>;

/**
 * CSS opacity property IR.
 *
 * The opacity property sets the opacity level for an element.
 * Value range: 0 (fully transparent) to 1 (fully opaque).
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/opacity}
 *
 * @example
 * ```typescript
 * const opacity: Opacity = {
 *   kind: "opacity",
 *   value: 0.5
 * };
 * // CSS: opacity: 0.5;
 * ```
 *
 * @public
 */
export const opacitySchema = z.object({
	kind: z.literal("opacity"),
	value: z.number().min(0).max(1),
});

/**
 * TypeScript type for opacity property.
 *
 * @public
 */
export type Opacity = z.infer<typeof opacitySchema>;

/**
 * CSS cursor property IR.
 *
 * The cursor property sets the mouse cursor to display when the mouse pointer is over an element.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/cursor}
 *
 * @example
 * ```typescript
 * const cursor: Cursor = {
 *   kind: "cursor",
 *   value: "pointer"
 * };
 * // CSS: cursor: pointer;
 * ```
 *
 * @public
 */
export const cursorSchema = z.object({
	kind: z.literal("cursor"),
	value: cursorKeywordsSchema,
});

/**
 * TypeScript type for cursor property.
 *
 * @public
 */
export type Cursor = z.infer<typeof cursorSchema>;

/**
 * CSS overflow-x property IR.
 *
 * The overflow-x property controls what happens when content overflows
 * an element's box horizontally (left and right edges).
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-x}
 *
 * @example
 * ```typescript
 * const overflowX: OverflowX = {
 *   kind: "overflow-x",
 *   value: "hidden"
 * };
 * // CSS: overflow-x: hidden;
 * ```
 *
 * @public
 */
export const overflowXSchema = z.object({
	kind: z.literal("overflow-x"),
	value: overflowKeywordsSchema,
});

/**
 * TypeScript type for overflow-x property.
 *
 * @public
 */
export type OverflowX = z.infer<typeof overflowXSchema>;

/**
 * CSS overflow-y property IR.
 *
 * The overflow-y property controls what happens when content overflows
 * an element's box vertically (top and bottom edges).
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-y}
 *
 * @example
 * ```typescript
 * const overflowY: OverflowY = {
 *   kind: "overflow-y",
 *   value: "scroll"
 * };
 * // CSS: overflow-y: scroll;
 * ```
 *
 * @public
 */
export const overflowYSchema = z.object({
	kind: z.literal("overflow-y"),
	value: overflowKeywordsSchema,
});

/**
 * TypeScript type for overflow-y property.
 *
 * @public
 */
export type OverflowY = z.infer<typeof overflowYSchema>;

/**
 * CSS position property IR.
 *
 * The position property sets how an element is positioned in a document.
 * The top, right, bottom, and left properties determine the final location
 * of positioned elements.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/position}
 *
 * @example
 * ```typescript
 * const position: PositionProperty = {
 *   kind: "position-property",
 *   value: "absolute"
 * };
 * // CSS: position: absolute;
 * ```
 *
 * @public
 */
export const positionPropertySchema = z.object({
	kind: z.literal("position-property"),
	value: positionPropertyKeywordsSchema,
});

/**
 * TypeScript type for position property.
 *
 * @public
 */
export type PositionProperty = z.infer<typeof positionPropertySchema>;

/**
 * CSS z-index property IR.
 *
 * The z-index property sets the z-order (stack level) of a positioned element.
 * Only works on positioned elements (position other than static).
 * Accepts integer values (positive, negative, or zero) or the keyword "auto".
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/z-index}
 *
 * @example
 * ```typescript
 * const zIndex: ZIndex = {
 *   kind: "z-index",
 *   value: 10
 * };
 * // CSS: z-index: 10;
 * ```
 *
 * @example
 * ```typescript
 * const zIndex: ZIndex = {
 *   kind: "z-index",
 *   value: "auto"
 * };
 * // CSS: z-index: auto;
 * ```
 *
 * @public
 */
export const zIndexSchema = z.object({
	kind: z.literal("z-index"),
	value: z.union([z.number().int(), z.literal("auto")]),
});

/**
 * TypeScript type for z-index property.
 *
 * @public
 */
export type ZIndex = z.infer<typeof zIndexSchema>;

/**
 * CSS top property IR.
 *
 * The top property affects the vertical position of a positioned element.
 * Accepts length-percentage values or the keyword "auto".
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/top}
 *
 * @example
 * ```typescript
 * const top: Top = {
 *   kind: "top",
 *   value: { value: 10, unit: "px" }
 * };
 * // CSS: top: 10px;
 * ```
 *
 * @example
 * ```typescript
 * const top: Top = {
 *   kind: "top",
 *   value: "auto"
 * };
 * // CSS: top: auto;
 * ```
 *
 * @public
 */
export const topSchema = z.object({
	kind: z.literal("top"),
	value: lengthPercentageAutoSchema,
});

/**
 * TypeScript type for top property.
 *
 * @public
 */
export type Top = z.infer<typeof topSchema>;

/**
 * CSS right property IR.
 *
 * The right property affects the horizontal position of a positioned element.
 * Accepts length-percentage values or the keyword "auto".
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/right}
 *
 * @example
 * ```typescript
 * const right: Right = {
 *   kind: "right",
 *   value: { value: 10, unit: "px" }
 * };
 * // CSS: right: 10px;
 * ```
 *
 * @example
 * ```typescript
 * const right: Right = {
 *   kind: "right",
 *   value: "auto"
 * };
 * // CSS: right: auto;
 * ```
 *
 * @public
 */
export const rightSchema = z.object({
	kind: z.literal("right"),
	value: lengthPercentageAutoSchema,
});

/**
 * TypeScript type for right property.
 *
 * @public
 */
export type Right = z.infer<typeof rightSchema>;

/**
 * CSS bottom property IR.
 *
 * The bottom property affects the vertical position of a positioned element.
 * Accepts length-percentage values or the keyword "auto".
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/bottom}
 *
 * @example
 * ```typescript
 * const bottom: Bottom = {
 *   kind: "bottom",
 *   value: { value: 10, unit: "px" }
 * };
 * // CSS: bottom: 10px;
 * ```
 *
 * @example
 * ```typescript
 * const bottom: Bottom = {
 *   kind: "bottom",
 *   value: "auto"
 * };
 * // CSS: bottom: auto;
 * ```
 *
 * @public
 */
export const bottomSchema = z.object({
	kind: z.literal("bottom"),
	value: lengthPercentageAutoSchema,
});

/**
 * TypeScript type for bottom property.
 *
 * @public
 */
export type Bottom = z.infer<typeof bottomSchema>;

/**
 * CSS left property IR.
 *
 * The left property affects the horizontal position of a positioned element.
 * Accepts length-percentage values or the keyword "auto".
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/left}
 *
 * @example
 * ```typescript
 * const left: Left = {
 *   kind: "left",
 *   value: { value: 10, unit: "px" }
 * };
 * // CSS: left: 10px;
 * ```
 *
 * @example
 * ```typescript
 * const left: Left = {
 *   kind: "left",
 *   value: "auto"
 * };
 * // CSS: left: auto;
 * ```
 *
 * @public
 */
export const leftSchema = z.object({
	kind: z.literal("left"),
	value: lengthPercentageAutoSchema,
});

/**
 * TypeScript type for left property.
 *
 * @public
 */
export type Left = z.infer<typeof leftSchema>;

/**
 * CSS width property IR.
 *
 * The width property sets the width of an element.
 * Accepts length-percentage, auto, or intrinsic sizing keywords.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/width}
 *
 * @example
 * ```typescript
 * const width: Width = {
 *   kind: "width",
 *   value: { value: 200, unit: "px" }
 * };
 * // CSS: width: 200px;
 * ```
 *
 * @example
 * ```typescript
 * const width: Width = {
 *   kind: "width",
 *   value: "auto"
 * };
 * // CSS: width: auto;
 * ```
 *
 * @example
 * ```typescript
 * const width: Width = {
 *   kind: "width",
 *   value: "min-content"
 * };
 * // CSS: width: min-content;
 * ```
 *
 * @public
 */
export const widthSchema = z.object({
	kind: z.literal("width"),
	value: z.union([lengthPercentageAutoSchema, z.enum(["min-content", "max-content", "fit-content"])]),
});

/**
 * TypeScript type for width property.
 *
 * @public
 */
export type Width = z.infer<typeof widthSchema>;

/**
 * CSS height property IR.
 *
 * The height property sets the height of an element.
 * Accepts length-percentage, auto, or intrinsic sizing keywords.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/height}
 *
 * @example
 * ```typescript
 * const height: Height = {
 *   kind: "height",
 *   value: { value: 100, unit: "px" }
 * };
 * // CSS: height: 100px;
 * ```
 *
 * @example
 * ```typescript
 * const height: Height = {
 *   kind: "height",
 *   value: "auto"
 * };
 * // CSS: height: auto;
 * ```
 *
 * @example
 * ```typescript
 * const height: Height = {
 *   kind: "height",
 *   value: "max-content"
 * };
 * // CSS: height: max-content;
 * ```
 *
 * @public
 */
export const heightSchema = z.object({
	kind: z.literal("height"),
	value: z.union([lengthPercentageAutoSchema, z.enum(["min-content", "max-content", "fit-content"])]),
});

/**
 * TypeScript type for height property.
 *
 * @public
 */
export type Height = z.infer<typeof heightSchema>;

/**
 * CSS min-width property IR.
 *
 * The min-width property sets the minimum width of an element.
 * Accepts length-percentage, auto, or intrinsic sizing keywords.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/min-width}
 *
 * @public
 */
export const minWidthSchema = z.object({
	kind: z.literal("min-width"),
	value: z.union([lengthPercentageAutoSchema, z.enum(["min-content", "max-content", "fit-content"])]),
});

export type MinWidth = z.infer<typeof minWidthSchema>;

/**
 * CSS max-width property IR.
 *
 * The max-width property sets the maximum width of an element.
 * Accepts length-percentage, none keyword, or intrinsic sizing keywords.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/max-width}
 *
 * @public
 */
export const maxWidthSchema = z.object({
	kind: z.literal("max-width"),
	value: z.union([lengthPercentageSchema, z.literal("none"), z.enum(["min-content", "max-content", "fit-content"])]),
});

export type MaxWidth = z.infer<typeof maxWidthSchema>;

/**
 * CSS min-height property IR.
 *
 * The min-height property sets the minimum height of an element.
 * Accepts length-percentage, auto, or intrinsic sizing keywords.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/min-height}
 *
 * @public
 */
export const minHeightSchema = z.object({
	kind: z.literal("min-height"),
	value: z.union([lengthPercentageAutoSchema, z.enum(["min-content", "max-content", "fit-content"])]),
});

export type MinHeight = z.infer<typeof minHeightSchema>;

/**
 * CSS max-height property IR.
 *
 * The max-height property sets the maximum height of an element.
 * Accepts length-percentage, none keyword, or intrinsic sizing keywords.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/max-height}
 *
 * @public
 */
export const maxHeightSchema = z.object({
	kind: z.literal("max-height"),
	value: z.union([lengthPercentageSchema, z.literal("none"), z.enum(["min-content", "max-content", "fit-content"])]),
});

export type MaxHeight = z.infer<typeof maxHeightSchema>;

/**
 * CSS margin-top property IR.
 *
 * The margin-top property sets the top margin of an element.
 * Accepts length-percentage or auto keyword.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/margin-top}
 *
 * @public
 */
export const marginTopSchema = z.object({
	kind: z.literal("margin-top"),
	value: lengthPercentageAutoSchema,
});

export type MarginTop = z.infer<typeof marginTopSchema>;

/**
 * CSS margin-right property IR.
 *
 * The margin-right property sets the right margin of an element.
 * Accepts length-percentage or auto keyword.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/margin-right}
 *
 * @public
 */
export const marginRightSchema = z.object({
	kind: z.literal("margin-right"),
	value: lengthPercentageAutoSchema,
});

export type MarginRight = z.infer<typeof marginRightSchema>;

/**
 * CSS margin-bottom property IR.
 *
 * The margin-bottom property sets the bottom margin of an element.
 * Accepts length-percentage or auto keyword.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/margin-bottom}
 *
 * @public
 */
export const marginBottomSchema = z.object({
	kind: z.literal("margin-bottom"),
	value: lengthPercentageAutoSchema,
});

export type MarginBottom = z.infer<typeof marginBottomSchema>;

/**
 * CSS margin-left property IR.
 *
 * The margin-left property sets the left margin of an element.
 * Accepts length-percentage or auto keyword.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/margin-left}
 *
 * @public
 */
export const marginLeftSchema = z.object({
	kind: z.literal("margin-left"),
	value: lengthPercentageAutoSchema,
});

export type MarginLeft = z.infer<typeof marginLeftSchema>;

/**
 * CSS padding-top property IR.
 *
 * The padding-top property sets the top padding of an element.
 * Accepts length-percentage values (non-negative).
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/padding-top}
 *
 * @public
 */
export const paddingTopSchema = z.object({
	kind: z.literal("padding-top"),
	value: lengthPercentageSchema,
});

export type PaddingTop = z.infer<typeof paddingTopSchema>;

/**
 * CSS padding-right property IR.
 *
 * The padding-right property sets the right padding of an element.
 * Accepts length-percentage values (non-negative).
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/padding-right}
 *
 * @public
 */
export const paddingRightSchema = z.object({
	kind: z.literal("padding-right"),
	value: lengthPercentageSchema,
});

export type PaddingRight = z.infer<typeof paddingRightSchema>;

/**
 * CSS padding-bottom property IR.
 *
 * The padding-bottom property sets the bottom padding of an element.
 * Accepts length-percentage values (non-negative).
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/padding-bottom}
 *
 * @public
 */
export const paddingBottomSchema = z.object({
	kind: z.literal("padding-bottom"),
	value: lengthPercentageSchema,
});

export type PaddingBottom = z.infer<typeof paddingBottomSchema>;

/**
 * CSS padding-left property IR.
 *
 * The padding-left property sets the left padding of an element.
 * Accepts length-percentage values (non-negative).
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/padding-left}
 *
 * @public
 */
export const paddingLeftSchema = z.object({
	kind: z.literal("padding-left"),
	value: lengthPercentageSchema,
});

export type PaddingLeft = z.infer<typeof paddingLeftSchema>;
