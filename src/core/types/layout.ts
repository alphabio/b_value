// b_path:: src/core/types/layout.ts
import { z } from "zod";
import { cursorKeywordsSchema } from "../keywords/cursor-keywords";
import { displayKeywordsSchema } from "../keywords/display-keywords";
import { overflowKeywordsSchema } from "../keywords/overflow-keywords";
import { positionPropertyKeywordsSchema } from "../keywords/position-property-keywords";
import { visibilityKeywordsSchema } from "../keywords/visibility-keywords";

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
