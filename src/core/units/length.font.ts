// b_path:: src/core/units/length.font.ts
import { z } from "zod";

/**
 * CSS font-relative length unit identifiers.
 *
 * Font-relative length units specify a length relative to font metrics.
 * These units allow measurements based on typography and text characteristics.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/length#font-relative_lengths}
 *
 * @example
 * ```typescript
 * import { fontLengthUnitSchema } from "@/core/units/length.font";
 *
 * const unit = fontLengthUnitSchema.parse("em"); // "em"
 * ```
 *
 * @public
 */
export const fontLengthUnitSchema = z
	.union([
		z.literal("em").describe("font size of the element"),
		z.literal("ex").describe("x-height of the element's font"),
		z.literal("cap").describe("cap height of capital letters"),
		z.literal("ch").describe("typical character advance of a narrow glyph"),
		z.literal("ic").describe("typical character advance of a fullwidth glyph"),
		z.literal("rem").describe("font size of the root element"),
		z.literal("rex").describe("x-height of the root element's font"),
		z.literal("rcap").describe("cap height of the root element's font"),
		z.literal("rch").describe("typical character advance of a narrow glyph in root element"),
		z.literal("ric").describe("typical character advance of a fullwidth glyph in root element"),
		z.literal("lh").describe("line height of the element"),
		z.literal("rlh").describe("line height of the root element"),
	])
	.describe(
		"Font-relative length units specify a length relative to font metrics. " +
			"These units allow measurements based on typography and text characteristics.",
	);

/**
 * Array of all font-relative length unit values.
 *
 * @example
 * ```typescript
 * import { FONT_LENGTH_UNITS } from "@/core/units/length.font";
 *
 * console.log(FONT_LENGTH_UNITS); // ["em", "ex", "cap", ...]
 * ```
 *
 * @public
 */
export const FONT_LENGTH_UNITS = fontLengthUnitSchema.options.map((option) => option.value);

/**
 * TypeScript type for font-relative length units.
 *
 * @public
 */
export type FontLengthUnit = z.infer<typeof fontLengthUnitSchema>;

/**
 * Metadata for font-relative length unit options.
 *
 * Provides value and description for each font-relative length unit,
 * useful for Studio UI generation.
 *
 * @example
 * ```typescript
 * import { fontLengthUnitOptions } from "@/core/units/length.font";
 *
 * fontLengthUnitOptions.forEach(({ value, description }) => {
 *   <Option value={value} description={description} />
 * });
 * ```
 *
 * @public
 */
export const fontLengthUnitOptions = fontLengthUnitSchema.options.map((option) => ({
	value: option.value,
	description: option.description,
}));

/**
 * Type for font-relative length unit options metadata.
 *
 * @public
 */
export type FontLengthUnitOptions = typeof fontLengthUnitOptions;
