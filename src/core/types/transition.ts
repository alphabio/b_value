// b_path:: src/core/types/transition.ts
import { z } from "zod";
import { easingFunctionSchema } from "./animation";
import { timeSchema } from "./time";

/**
 * CSS transition-delay property IR.
 *
 * Specifies when a transition should start.
 * Comma-separated list of time values.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transition-delay}
 * @see {@link https://www.w3.org/TR/css-transitions-1/#transition-delay-property}
 *
 * @public
 */
export const transitionDelaySchema = z.object({
	kind: z.literal("transition-delay"),
	delays: z.array(timeSchema).min(1),
});

/**
 * CSS transition-delay type.
 *
 * @public
 */
export type TransitionDelay = z.infer<typeof transitionDelaySchema>;

/**
 * CSS transition-duration property IR.
 *
 * Specifies how long a transition should take to complete.
 * Comma-separated list of time values (non-negative only).
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transition-duration}
 * @see {@link https://www.w3.org/TR/css-transitions-1/#transition-duration-property}
 *
 * @public
 */
export const transitionDurationSchema = z.object({
	kind: z.literal("transition-duration"),
	durations: z.array(timeSchema).min(1),
});

/**
 * CSS transition-duration type.
 *
 * @public
 */
export type TransitionDuration = z.infer<typeof transitionDurationSchema>;

/**
 * CSS transition-timing-function property IR.
 *
 * Specifies the timing function for transitions.
 * Comma-separated list of easing functions.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function}
 * @see {@link https://www.w3.org/TR/css-transitions-1/#transition-timing-function-property}
 *
 * @public
 */
export const transitionTimingFunctionSchema = z.object({
	kind: z.literal("transition-timing-function"),
	functions: z.array(easingFunctionSchema).min(1),
});

/**
 * CSS transition-timing-function type.
 *
 * @public
 */
export type TransitionTimingFunction = z.infer<typeof transitionTimingFunctionSchema>;

/**
 * CSS transition-property property IR.
 *
 * Specifies which CSS properties should be transitioned.
 * Comma-separated list of property names, 'none', or 'all'.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transition-property}
 * @see {@link https://www.w3.org/TR/css-transitions-1/#transition-property-property}
 *
 * @public
 */
export const transitionPropertySchema = z.object({
	kind: z.literal("transition-property"),
	properties: z
		.array(
			z.union(
				[
					z.object({ type: z.literal("none") }),
					z.object({ type: z.literal("all") }),
					z.object({ type: z.literal("identifier"), value: z.string() }),
				],
				{
					error: (issue) =>
						issue.code === "invalid_union"
							? 'Invalid transition property. Expected { type: "none" }, { type: "all" }, or { type: "identifier", value: <string> }.'
							: "Invalid input",
				},
			),
		)
		.min(1),
});

/**
 * CSS transition-property type.
 *
 * @public
 */
export type TransitionProperty = z.infer<typeof transitionPropertySchema>;
