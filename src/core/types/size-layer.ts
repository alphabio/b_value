// b_path:: src/core/types/size-layer.ts
import { z } from "zod";
import * as Keyword from "../keywords";
import * as Type from "../types";

/**
 * CSS size layer value.
 *
 * Represents a single layer value for sizing properties.
 * Can be a sizing keyword, auto, or explicit dimensions.
 *
 * Per CSS spec, size values accept:
 * - Keywords: `cover` | `contain`
 * - Single value: `<length-percentage>` | `auto`
 * - Two values: `<length-percentage>` | `auto` for width and height
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/background-size}
 *
 * @example
 * ```typescript
 * import { sizeLayerSchema } from "@/core/types/size-layer";
 *
 * // Keyword
 * const layer1: SizeLayer = { kind: "keyword", value: "cover" };
 *
 * // Auto
 * const layer2: SizeLayer = { kind: "auto" };
 *
 * // Single value
 * const layer3: SizeLayer = {
 *   kind: "one-value",
 *   value: { value: 50, unit: "%" }
 * };
 *
 * // Two values
 * const layer4: SizeLayer = {
 *   kind: "two-value",
 *   width: { value: 100, unit: "px" },
 *   height: "auto"
 * };
 * ```
 *
 * @public
 */
export const sizeLayerSchema = z.discriminatedUnion("kind", [
	// Sizing keywords: cover, contain
	z.object({
		kind: z.literal("keyword"),
		value: Keyword.sizingKeywordsSchema,
	}),

	// Auto keyword
	z.object({
		kind: z.literal("auto"),
	}),

	// Single value: <length-percentage> or auto
	// Applies to both width and height (maintaining aspect ratio)
	z.object({
		kind: z.literal("one-value"),
		value: Type.lengthPercentageAutoSchema,
	}),

	// Two values: width height
	// Each can be <length-percentage> or auto
	z.object({
		kind: z.literal("two-value"),
		width: Type.lengthPercentageAutoSchema,
		height: Type.lengthPercentageAutoSchema,
	}),
]);

/**
 * TypeScript type for size layer.
 * @public
 */
export type SizeLayer = z.infer<typeof sizeLayerSchema>;

/**
 * CSS size property (reusable across properties).
 *
 * Specifies the size of elements. Used in:
 * - `background-size` - Background image sizing
 * - `object-fit` - Replaced element sizing
 * - `column-size` - Multi-column sizing
 * - `box-size` - Box sizing (future)
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/background-size}
 *
 * @example
 * ```typescript
 * import { sizeSchema, type Size } from "@/core/types/size-layer";
 *
 * // Single keyword
 * const size1: Size = {
 *   layers: [{ kind: "keyword", value: "cover" }]
 * };
 *
 * // Multiple layers
 * const size2: Size = {
 *   layers: [
 *     { kind: "keyword", value: "cover" },
 *     { kind: "two-value", width: { value: 100, unit: "px" }, height: "auto" },
 *     { kind: "keyword", value: "contain" }
 *   ]
 * };
 *
 * // Single value
 * const size3: Size = {
 *   layers: [{ kind: "one-value", value: { value: 50, unit: "%" } }]
 * };
 * ```
 *
 * @public
 */
export const sizeSchema = z.object({
	layers: z.array(sizeLayerSchema).min(1),
});

/**
 * TypeScript type for size property.
 * @public
 */
export type Size = z.infer<typeof sizeSchema>;
