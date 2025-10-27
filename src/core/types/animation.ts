// b_path:: src/core/types/animation.ts
import { z } from "zod";
import * as Keyword from "../keywords/animation";
import { autoSchema } from "./auto";
import { timeSchema } from "./time";

/**
 * CSS animation-delay property IR.
 *
 * Specifies when an animation should start.
 * Comma-separated list of time values.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/animation-delay}
 * @see {@link https://www.w3.org/TR/css-animations-1/#animation-delay}
 *
 * @public
 */
export const animationDelaySchema = z.object({
	kind: z.literal("animation-delay"),
	delays: z.array(timeSchema).min(1),
});

/**
 * CSS animation-delay type.
 *
 * @public
 */
export type AnimationDelay = z.infer<typeof animationDelaySchema>;

/**
 * CSS animation-duration property IR.
 *
 * Specifies how long an animation should take to complete one cycle.
 * Comma-separated list of time values or 'auto'.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/animation-duration}
 * @see {@link https://www.w3.org/TR/css-animations-1/#animation-duration}
 *
 * @public
 */

const timeExtendedSchema = timeSchema.extend({
	type: z.literal("time"),
});

export const animationDurationSchema = z.object({
	kind: z.literal("animation-duration"),
	durations: z.array(z.discriminatedUnion("type", [autoSchema, timeExtendedSchema])).min(1),
});

/**
 * CSS animation-duration type.
 *
 * @public
 */
export type AnimationDuration = z.infer<typeof animationDurationSchema>;

/**
 * CSS animation-iteration-count property IR.
 *
 * Specifies the number of times an animation should repeat.
 * Comma-separated list of numbers or 'infinite'.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/animation-iteration-count}
 * @see {@link https://www.w3.org/TR/css-animations-1/#animation-iteration-count}
 *
 * @public
 */
export const animationIterationCountSchema = z.object({
	kind: z.literal("animation-iteration-count"),
	counts: z
		.array(
			z.union(
				[
					z.object({ type: z.literal("infinite") }),
					z.object({ type: z.literal("number"), value: z.number().nonnegative() }),
				],
				{
					error: (issue) =>
						issue.code === "invalid_union"
							? 'Invalid iteration count. Expected { type: "infinite" } or { type: "number", value: <non-negative number> }.'
							: "Invalid input",
				},
			),
		)
		.min(1),
});

/**
 * CSS animation-iteration-count type.
 *
 * @public
 */
export type AnimationIterationCount = z.infer<typeof animationIterationCountSchema>;

/**
 * CSS animation-direction property IR.
 *
 * Specifies whether an animation should play forwards, backwards, or alternate.
 * Comma-separated list of direction keywords.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/animation-direction}
 * @see {@link https://www.w3.org/TR/css-animations-1/#animation-direction}
 *
 * @public
 */
export const animationDirectionSchema = z.object({
	kind: z.literal("animation-direction"),
	directions: z.array(z.enum(Keyword.ANIMATION_DIRECTION_KEYWORDS)).min(1),
});

/**
 * CSS animation-direction type.
 *
 * @public
 */
export type AnimationDirection = z.infer<typeof animationDirectionSchema>;

/**
 * CSS animation-fill-mode property IR.
 *
 * Specifies how styles are applied before/after animation execution.
 * Comma-separated list of fill mode keywords.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode}
 * @see {@link https://www.w3.org/TR/css-animations-1/#animation-fill-mode}
 *
 * @public
 */
export const animationFillModeSchema = z.object({
	kind: z.literal("animation-fill-mode"),
	modes: z.array(z.enum(Keyword.ANIMATION_FILL_MODE_KEYWORDS)).min(1),
});

/**
 * CSS animation-fill-mode type.
 *
 * @public
 */
export type AnimationFillMode = z.infer<typeof animationFillModeSchema>;

/**
 * CSS animation-play-state property IR.
 *
 * Specifies whether an animation is running or paused.
 * Comma-separated list of play state keywords.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/animation-play-state}
 * @see {@link https://www.w3.org/TR/css-animations-1/#animation-play-state}
 *
 * @public
 */
export const animationPlayStateSchema = z.object({
	kind: z.literal("animation-play-state"),
	states: z.array(z.enum(Keyword.ANIMATION_PLAY_STATE_KEYWORDS)).min(1),
});

/**
 * CSS animation-play-state type.
 *
 * @public
 */
export type AnimationPlayState = z.infer<typeof animationPlayStateSchema>;

/**
 * CSS animation-name property IR.
 *
 * Specifies the names of @keyframes at-rules.
 * Comma-separated list of identifiers or 'none'.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/animation-name}
 * @see {@link https://www.w3.org/TR/css-animations-1/#animation-name}
 *
 * @public
 */
export const animationNameSchema = z.object({
	kind: z.literal("animation-name"),
	names: z
		.array(
			z.union([z.object({ type: z.literal("none") }), z.object({ type: z.literal("identifier"), value: z.string() })], {
				error: (issue) =>
					issue.code === "invalid_union"
						? 'Invalid animation name. Expected { type: "none" } or { type: "identifier", value: <string> }.'
						: "Invalid input",
			}),
		)
		.min(1),
});

/**
 * CSS animation-name type.
 *
 * @public
 */
export type AnimationName = z.infer<typeof animationNameSchema>;

/**
 * CSS cubic-bezier() easing function IR.
 *
 * Defines a cubic Bezier curve for easing.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function#cubic-bezier}
 * @see {@link https://www.w3.org/TR/css-easing-1/#cubic-bezier-easing-functions}
 *
 * @public
 */
export const cubicBezierSchema = z.object({
	type: z.literal("cubic-bezier"),
	x1: z.number().min(0).max(1),
	y1: z.number(),
	x2: z.number().min(0).max(1),
	y2: z.number(),
});

/**
 * CSS cubic-bezier() type.
 *
 * @public
 */
export type CubicBezier = z.infer<typeof cubicBezierSchema>;

/**
 * CSS steps() easing function IR.
 *
 * Defines a step easing function.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function#steps}
 * @see {@link https://www.w3.org/TR/css-easing-1/#step-easing-functions}
 *
 * @public
 */
export const stepsSchema = z.object({
	type: z.literal("steps"),
	steps: z.number().positive().int(),
	position: z.enum(Keyword.STEP_POSITION_KEYWORDS).optional(),
});

/**
 * CSS steps() type.
 *
 * @public
 */
export type Steps = z.infer<typeof stepsSchema>;

/**
 * CSS linear() stop IR.
 *
 * A single stop in a linear() easing function.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function#linear}
 * @see {@link https://www.w3.org/TR/css-easing-1/#linear-easing-function}
 *
 * @public
 */
export const linearStopSchema = z.object({
	output: z.number(),
	input: z.number().min(0).max(1).optional(),
});

/**
 * CSS linear() stop type.
 *
 * @public
 */
export type LinearStop = z.infer<typeof linearStopSchema>;

/**
 * CSS linear() easing function IR.
 *
 * Defines a piecewise linear easing function.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function#linear}
 * @see {@link https://www.w3.org/TR/css-easing-1/#linear-easing-function}
 *
 * @public
 */
export const linearEasingSchema = z.object({
	type: z.literal("linear"),
	stops: z.array(linearStopSchema).min(1),
});

/**
 * CSS linear() type.
 *
 * @public
 */
export type LinearEasing = z.infer<typeof linearEasingSchema>;

/**
 * CSS easing function IR.
 *
 * Union of all easing function types: keywords, cubic-bezier(), steps(), linear().
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function}
 * @see {@link https://www.w3.org/TR/css-easing-1/#easing-functions}
 *
 * @public
 */
export const easingFunctionSchema = z.union(
	[z.enum(Keyword.EASING_KEYWORD_KEYWORDS), cubicBezierSchema, stepsSchema, linearEasingSchema],
	{
		error: (issue) =>
			issue.code === "invalid_union"
				? "Invalid easing function. Expected a keyword (ease, linear, etc.), cubic-bezier(), steps(), or linear()."
				: "Invalid input",
	},
);

/**
 * CSS easing function type.
 *
 * @public
 */
export type EasingFunction = z.infer<typeof easingFunctionSchema>;

/**
 * CSS animation-timing-function property IR.
 *
 * Specifies the timing function for animations.
 * Comma-separated list of easing functions.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function}
 * @see {@link https://www.w3.org/TR/css-animations-1/#animation-timing-function}
 *
 * @public
 */
export const animationTimingFunctionSchema = z.object({
	kind: z.literal("animation-timing-function"),
	functions: z.array(easingFunctionSchema).min(1),
});

/**
 * CSS animation-timing-function type.
 *
 * @public
 */
export type AnimationTimingFunction = z.infer<typeof animationTimingFunctionSchema>;
