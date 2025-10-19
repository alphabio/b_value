// b_path:: src/core/types/layout.ts
import { z } from "zod";
import { cursorKeywordsSchema } from "../keywords/cursor-keywords";
import { displayKeywordsSchema } from "../keywords/display-keywords";
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
