// b_path:: src/core/types/time.ts
import { z } from "zod";
import * as Unit from "../units";

/**
 * CSS `<time>` dimension.
 *
 * A time value consists of a number and a time unit (s or ms).
 * Used in animations, transitions, and other time-based CSS properties.
 *
 * Per CSS Values & Units Module Level 4 specification.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/time}
 * @see {@link https://www.w3.org/TR/css-values-4/#time}
 *
 * @example
 * ```typescript
 * import { timeSchema } from "@/core/types/time";
 *
 * const delay: Time = { value: 1, unit: "s" };
 * const duration: Time = { value: 500, unit: "ms" };
 * ```
 *
 * @public
 */
export const timeSchema = z.object({
	value: z.number().nonnegative("Time value must be non-negative"),
	unit: Unit.timeUnitSchema,
});

/**
 * CSS `<time>` type.
 *
 * @public
 */
export type Time = z.infer<typeof timeSchema>;
