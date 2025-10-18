// b_path:: src/core/units/length.absolute.ts
import { z } from "zod";

/**
 * CSS absolute length unit identifiers.
 *
 * Absolute length units specify a length using physical units.
 * These units are fixed and do not scale relative to other elements.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/length#absolute_length_units}
 *
 * @example
 * ```typescript
 * import { absoluteLengthUnitSchema } from "../units/length.absolute";
 *
 * const unit = absoluteLengthUnitSchema.parse("px"); // "px"
 * ```
 *
 * @public
 */
export const absoluteLengthUnitSchema = z
	.union([
		z.literal("px").describe("pixels - 1/96th of 1 inch"),
		z.literal("pt").describe("points - 1/72nd of 1 inch"),
		z.literal("cm").describe("centimeters"),
		z.literal("mm").describe("millimeters"),
		z.literal("Q").describe("quarter-millimeters - 1/40th of 1 centimeter"),
		z.literal("in").describe("inches - 2.54 centimeters"),
		z.literal("pc").describe("picas - 12 points"),
	])
	.describe(
		"Absolute length units specify a length using physical units. " +
			"These units are fixed and do not scale relative to other elements.",
	);

/**
 * Array of all absolute length unit values.
 *
 * @example
 * ```typescript
 * import { ABSOLUTE_LENGTH_UNITS } from "../units/length.absolute";
 *
 * console.log(ABSOLUTE_LENGTH_UNITS); // ["px", "pt", "cm", "mm", "Q", "in", "pc"]
 * ```
 *
 * @public
 */
export const ABSOLUTE_LENGTH_UNITS = absoluteLengthUnitSchema.options.map((option) => option.value);

/**
 * TypeScript type for absolute length units.
 *
 * @public
 */
export type AbsoluteLengthUnit = z.infer<typeof absoluteLengthUnitSchema>;

/**
 * Metadata for absolute length unit options.
 *
 * Provides value and description for each absolute length unit,
 * useful for Studio UI generation.
 *
 * @example
 * ```typescript
 * import { absoluteLengthUnitOptions } from "../units/length.absolute";
 *
 * absoluteLengthUnitOptions.forEach(({ value, description }) => {
 *   <Option value={value} description={description} />
 * });
 * ```
 *
 * @public
 */
export const absoluteLengthUnitOptions = absoluteLengthUnitSchema.options.map((option) => ({
	value: option.value,
	description: option.description,
}));

/**
 * Type for absolute length unit options metadata.
 *
 * @public
 */
export type AbsoluteLengthUnitOptions = typeof absoluteLengthUnitOptions;
