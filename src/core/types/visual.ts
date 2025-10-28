// b_path:: src/core/types/visual.ts
import { z } from "zod";
import { blendModeKeywordsSchema } from "../keywords/blend-mode-keywords";

/**
 * CSS background-blend-mode property IR.
 *
 * The background-blend-mode property defines how an element's background images
 * should blend with each other and with the background color.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/background-blend-mode}
 *
 * @example
 * ```typescript
 * const bgBlend: BackgroundBlendMode = {
 *   kind: "background-blend-mode",
 *   mode: "multiply"
 * };
 * // CSS: background-blend-mode: multiply;
 * ```
 *
 * @public
 */
export const backgroundBlendModeSchema = z.object({
	kind: z.literal("background-blend-mode"),
	mode: blendModeKeywordsSchema,
});

/**
 * TypeScript type for background-blend-mode property.
 *
 * @public
 */
export type BackgroundBlendMode = z.infer<typeof backgroundBlendModeSchema>;

/**
 * CSS mix-blend-mode property IR.
 *
 * The mix-blend-mode property defines how an element's content should blend
 * with its backdrop (the content of the element's parent and the element's background).
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode}
 *
 * @example
 * ```typescript
 * const mixBlend: MixBlendMode = {
 *   kind: "mix-blend-mode",
 *   mode: "screen"
 * };
 * // CSS: mix-blend-mode: screen;
 * ```
 *
 * @public
 */
export const mixBlendModeSchema = z.object({
	kind: z.literal("mix-blend-mode"),
	mode: blendModeKeywordsSchema,
});

/**
 * TypeScript type for mix-blend-mode property.
 *
 * @public
 */
export type MixBlendMode = z.infer<typeof mixBlendModeSchema>;
