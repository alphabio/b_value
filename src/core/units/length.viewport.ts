// b_path:: src/core/units/length.viewport.ts
import { z } from "zod";

/**
 * CSS viewport-percentage length unit identifiers.
 *
 * Viewport-percentage length units are relative to the size of the initial containing block.
 * They provide different sizing strategies for responsive design across various viewport states.
 *
 * Includes default (large), small, large (explicit), and dynamic viewport units.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/length#viewport-percentage_lengths}
 *
 * @example
 * ```typescript
 * import { viewportLengthUnitSchema } from "../units/length.viewport";
 *
 * const unit = viewportLengthUnitSchema.parse("vw"); // "vw"
 * ```
 *
 * @public
 */
export const viewportLengthUnitSchema = z
	.union([
		// Default/Large viewport units
		z
			.literal("vw")
			.describe("1% of the width of the large viewport size"),
		z.literal("vh").describe("1% of the height of the large viewport size"),
		z.literal("vi").describe("1% of the large viewport size in the inline axis"),
		z.literal("vb").describe("1% of the large viewport size in the block axis"),
		z.literal("vmin").describe("smaller of vw or vh"),
		z.literal("vmax").describe("larger of vw or vh"),

		// Small viewport units
		z
			.literal("svw")
			.describe("1% of the width of the small viewport size"),
		z.literal("svh").describe("1% of the height of the small viewport size"),
		z.literal("svi").describe("1% of the small viewport size in the inline axis"),
		z.literal("svb").describe("1% of the small viewport size in the block axis"),
		z.literal("svmin").describe("smaller of svw or svh"),
		z.literal("svmax").describe("larger of svw or svh"),

		// Large viewport units (explicit)
		z
			.literal("lvw")
			.describe("1% of the width of the large viewport size"),
		z.literal("lvh").describe("1% of the height of the large viewport size"),
		z.literal("lvi").describe("1% of the large viewport size in the inline axis"),
		z.literal("lvb").describe("1% of the large viewport size in the block axis"),
		z.literal("lvmin").describe("smaller of lvw or lvh"),
		z.literal("lvmax").describe("larger of lvw or lvh"),

		// Dynamic viewport units
		z
			.literal("dvw")
			.describe("1% of the width of the dynamic viewport size"),
		z.literal("dvh").describe("1% of the height of the dynamic viewport size"),
		z.literal("dvi").describe("1% of the dynamic viewport size in the inline axis"),
		z.literal("dvb").describe("1% of the dynamic viewport size in the block axis"),
		z.literal("dvmin").describe("smaller of dvw or dvh"),
		z.literal("dvmax").describe("larger of dvw or dvh"),
	])
	.describe(
		"Viewport-percentage length units are relative to the size of the initial containing block. " +
			"They provide different sizing strategies for responsive design across various viewport states.",
	);

/**
 * Array of all viewport-percentage length unit values.
 *
 * @example
 * ```typescript
 * import { VIEWPORT_LENGTH_UNITS } from "../units/length.viewport";
 *
 * console.log(VIEWPORT_LENGTH_UNITS); // ["vw", "vh", "vi", ...]
 * ```
 *
 * @public
 */
export const VIEWPORT_LENGTH_UNITS = viewportLengthUnitSchema.options.map((option) => option.value);

/**
 * TypeScript type for viewport-percentage length units.
 *
 * @public
 */
export type ViewportLengthUnit = z.infer<typeof viewportLengthUnitSchema>;

/**
 * Metadata for viewport-percentage length unit options.
 *
 * Provides value and description for each viewport-percentage length unit,
 * useful for Studio UI generation.
 *
 * @example
 * ```typescript
 * import { viewportLengthUnitOptions } from "../units/length.viewport";
 *
 * viewportLengthUnitOptions.forEach(({ value, description }) => {
 *   <Option value={value} description={description} />
 * });
 * ```
 *
 * @public
 */
export const viewportLengthUnitOptions = viewportLengthUnitSchema.options.map((option) => ({
	value: option.value,
	description: option.description,
}));

/**
 * Type for viewport-percentage length unit options metadata.
 *
 * @public
 */
export type ViewportLengthUnitOptions = typeof viewportLengthUnitOptions;
