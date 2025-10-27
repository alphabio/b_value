// b_path:: src/core/types/length-percentage.ts
import { z } from "zod";
import * as Unit from "@/core/units";

/**
 * All CSS length unit identifiers.
 *
 * Union of absolute, font-relative, and viewport-relative length units.
 * Per CSS Values & Units Module Level 4 specification.
 *
 * @see {@link https://www.w3.org/TR/css-values-4/#lengths}
 *
 * @internal
 */
const allLengthUnitsSchema = z.union(
	[Unit.absoluteLengthUnitSchema, Unit.fontLengthUnitSchema, Unit.viewportLengthUnitSchema],
	{
		error: (issue) =>
			issue.code === "invalid_union"
				? "Invalid length unit. Expected absolute (px, pt, cm, etc.), font-relative (em, rem, etc.), or viewport (vw, vh, etc.) units."
				: "Invalid input",
	},
);

/**
 * CSS `<length>` dimension.
 *
 * A length is a distance measurement consisting of a number and a unit.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/length}
 *
 * @example
 * ```typescript
 * import { lengthSchema } from "@/core/types/length-percentage";
 *
 * const size: Length = { value: 100, unit: "px" };
 * const fontSize: Length = { value: 1.5, unit: "rem" };
 * ```
 *
 * @public
 */
export const lengthSchema = z.object({
	value: z.number(),
	unit: allLengthUnitsSchema,
});

/**
 * TypeScript type for `<length>` dimension.
 *
 * @public
 */
export type Length = z.infer<typeof lengthSchema>;

/**
 * CSS `<length-percentage>` data type.
 *
 * A type that can accept either a `<length>` or a `<percentage>` value.
 * This is a CSS spec-defined composite type.
 *
 * Per CSS spec: <length-percentage> = <length> | <percentage>
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/length-percentage}
 *
 * @example
 * ```typescript
 * import { lengthPercentageSchema } from "@/core/types/length-percentage";
 *
 * // Percentage
 * const size1: LengthPercentage = { value: 50, unit: "%" };
 *
 * // Length (px)
 * const size2: LengthPercentage = { value: 100, unit: "px" };
 *
 * // Length (em)
 * const size3: LengthPercentage = { value: 2, unit: "em" };
 * ```
 *
 * @public
 */
export const lengthPercentageSchema = z.union([lengthSchema, Unit.percentageSchema], {
	error: (issue) =>
		issue.code === "invalid_union"
			? "Invalid length-percentage. Expected a length (with unit) or percentage."
			: "Invalid input",
});

/**
 * TypeScript type for `<length-percentage>` values.
 *
 * @public
 */
export type LengthPercentage = z.infer<typeof lengthPercentageSchema>;

/**
 * CSS `<length-percentage>` with `auto` keyword.
 *
 * Extends `<length-percentage>` to also accept the `auto` keyword.
 * Used in properties like `background-size` where auto is valid.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/length-percentage}
 *
 * @example
 * ```typescript
 * import { lengthPercentageAutoSchema } from "@/core/types/length-percentage";
 *
 * // Auto keyword
 * const size1: LengthPercentageAuto = "auto";
 *
 * // Percentage
 * const size2: LengthPercentageAuto = { value: 50, unit: "%" };
 *
 * // Length
 * const size3: LengthPercentageAuto = { value: 100, unit: "px" };
 * ```
 *
 * @public
 */
export const lengthPercentageAutoSchema = z.union([z.literal("auto"), lengthPercentageSchema], {
	error: (issue) =>
		issue.code === "invalid_union"
			? 'Invalid value. Expected "auto", a length (with unit), or a percentage.'
			: "Invalid input",
});

/**
 * TypeScript type for `<length-percentage>` with `auto`.
 *
 * @public
 */
export type LengthPercentageAuto = z.infer<typeof lengthPercentageAutoSchema>;
