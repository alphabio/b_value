// b_path:: src/core/types/shadow.ts
import { z } from "zod";
import type { Color } from "./color";
import type { Length } from "./length-percentage";

/**
 * CSS box-shadow property value.
 *
 * Adds shadow effects around an element's frame.
 * Syntax: [inset?] offset-x offset-y [blur-radius] [spread-radius] [color]
 *
 * Multiple shadows can be stacked by comma separation.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow}
 *
 * @example
 * ```typescript
 * import type { BoxShadow } from "@/core/types/shadow";
 *
 * const shadow: BoxShadow = {
 *   kind: "box-shadow",
 *   shadows: [{
 *     offsetX: { value: 2, unit: "px" },
 *     offsetY: { value: 2, unit: "px" },
 *     blurRadius: { value: 4, unit: "px" },
 *     color: { kind: "named", name: "black" }
 *   }]
 * };
 * // CSS: 2px 2px 4px black
 * ```
 *
 * @public
 */
export const boxShadowSchema = z.object({
	kind: z.literal("box-shadow"),
	shadows: z.array(
		z.object({
			inset: z.boolean().optional(),
			offsetX: z.custom<Length>(),
			offsetY: z.custom<Length>(),
			blurRadius: z.custom<Length>().optional(),
			spreadRadius: z.custom<Length>().optional(),
			color: z.custom<Color>().optional(),
		}),
	),
});

/**
 * TypeScript type for box-shadow property.
 * @public
 */
export type BoxShadow = z.infer<typeof boxShadowSchema>;

/**
 * Single shadow layer in box-shadow.
 * @public
 */
export type BoxShadowLayer = BoxShadow["shadows"][number];

/**
 * CSS text-shadow property value.
 *
 * Adds shadow to text content.
 * Syntax: offset-x offset-y [blur-radius] [color]
 *
 * Multiple shadows can be stacked by comma separation.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/text-shadow}
 *
 * @example
 * ```typescript
 * import type { TextShadow } from "@/core/types/shadow";
 *
 * const shadow: TextShadow = {
 *   kind: "text-shadow",
 *   shadows: [{
 *     offsetX: { value: 1, unit: "px" },
 *     offsetY: { value: 1, unit: "px" },
 *     blurRadius: { value: 2, unit: "px" },
 *     color: { kind: "named", name: "gray" }
 *   }]
 * };
 * // CSS: 1px 1px 2px gray
 * ```
 *
 * @public
 */
export const textShadowSchema = z.object({
	kind: z.literal("text-shadow"),
	shadows: z.array(
		z.object({
			offsetX: z.custom<Length>(),
			offsetY: z.custom<Length>(),
			blurRadius: z.custom<Length>().optional(),
			color: z.custom<Color>().optional(),
		}),
	),
});

/**
 * TypeScript type for text-shadow property.
 * @public
 */
export type TextShadow = z.infer<typeof textShadowSchema>;

/**
 * Single shadow layer in text-shadow.
 * @public
 */
export type TextShadowLayer = TextShadow["shadows"][number];
