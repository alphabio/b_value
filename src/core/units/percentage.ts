// b_path:: src/core/units/percentage.ts
import { z } from "zod";

/**
 * CSS percentage unit identifier.
 *
 * The percentage unit `%` represents a fraction of some reference value.
 * The reference value depends on the property using the percentage.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/percentage}
 *
 * @example
 * ```typescript
 * import { percentageUnitSchema } from "../units/percentage";
 *
 * const unit = percentageUnitSchema.parse("%"); // "%"
 * ```
 *
 * @public
 */
export const percentageUnitSchema = z
	.literal("%")
	.describe("percentage sign - represents a fraction of some reference value");

/**
 * CSS `<percentage>` dimension.
 *
 * A percentage consists of a number followed by the percentage sign (%).
 * May be preceded by + or - sign, with no space between symbol and number.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/percentage}
 *
 * @example
 * ```typescript
 * import { percentageSchema, type Percentage } from "../units/percentage";
 *
 * const size: Percentage = { value: 50, unit: "%" };
 * const opacity: Percentage = { value: 75, unit: "%" };
 *
 * // Validate
 * percentageSchema.parse({ value: 100, unit: "%" }); // Valid
 * ```
 *
 * @public
 */
export const percentageSchema = z
	.object({
		value: z.number().describe("numeric value of the percentage"),
		unit: percentageUnitSchema,
	})
	.describe(
		"Percentage data type consists of a number followed by the percentage sign (%). " +
			"May be preceded by + or - sign, with no space between symbol and number.",
	);

/**
 * Constant for the percentage unit value.
 *
 * @example
 * ```typescript
 * import { PERCENTAGE_UNIT } from "../units/percentage";
 *
 * console.log(PERCENTAGE_UNIT); // "%"
 * ```
 *
 * @public
 */
export const PERCENTAGE_UNIT = percentageUnitSchema.value;

/**
 * TypeScript type for percentage unit.
 *
 * @public
 */
export type PercentageUnit = z.infer<typeof percentageUnitSchema>;

/**
 * TypeScript type for percentage dimension.
 *
 * @public
 */
export type Percentage = z.infer<typeof percentageSchema>;

/**
 * Metadata for percentage unit option.
 *
 * Provides value and description for Studio UI generation.
 *
 * @example
 * ```typescript
 * import { percentageUnitOptions } from "../units/percentage";
 *
 * percentageUnitOptions.forEach(({ value, description }) => {
 *   console.log(`${value}: ${description}`);
 * });
 * ```
 *
 * @public
 */
export const percentageUnitOptions = [
	{
		value: percentageUnitSchema.value,
		description: percentageUnitSchema.description,
	},
];

/**
 * Type for percentage unit options metadata.
 *
 * @public
 */
export type PercentageUnitOptions = typeof percentageUnitOptions;
