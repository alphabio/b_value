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

/**
 * CSS `<time>` dimension for delay values.
 *
 * A delay time value consists of a number and a time unit (s or ms).
 * Unlike durations, delays can be negative to indicate the animation should start partway through.
 *
 * Used in animation-delay and transition-delay properties.
 *
 * Per CSS Animations Module Level 1 specification.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/animation-delay}
 * @see {@link https://www.w3.org/TR/css-animations-1/#animation-delay}
 *
 * @example
 * ```typescript
 * import { delayTimeSchema } from "@/core/types/time";
 *
 * const delay: DelayTime = { value: -500, unit: "ms" };
 * const positiveDelay: DelayTime = { value: 1, unit: "s" };
 * ```
 *
 * @public
 */
export const delayTimeSchema = z.object({
	value: z.number(),
	unit: Unit.timeUnitSchema,
});

/**
 * CSS delay `<time>` type.
 *
 * @public
 */
export type DelayTime = z.infer<typeof delayTimeSchema>;
