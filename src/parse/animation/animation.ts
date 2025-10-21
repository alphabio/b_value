// b_path:: src/parse/animation/animation.ts

import { type ParseResult, parseErr, toParseResult } from "@/core/result";
import type * as Type from "@/core/types/animation";

import * as Delay from "./delay";
import * as Direction from "./direction";
import * as Duration from "./duration";
import * as FillMode from "./fill-mode";
import * as IterationCount from "./iteration-count";
import * as Name from "./name";
import * as PlayState from "./play-state";
import * as TimingFunction from "./timing-function";

/**
 * Animation property type union.
 *
 * @public
 */
export type Animation =
	| Type.AnimationDelay
	| Type.AnimationDirection
	| Type.AnimationDuration
	| Type.AnimationFillMode
	| Type.AnimationIterationCount
	| Type.AnimationName
	| Type.AnimationPlayState
	| Type.AnimationTimingFunction;

/**
 * Parse animation property value with auto-detection.
 *
 * Attempts to parse as each animation property type in order:
 * - duration (time values, auto)
 * - delay (time values)
 * - timing-function (ease, linear, cubic-bezier, steps)
 * - iteration-count (number, infinite)
 * - direction (normal, reverse, alternate, alternate-reverse)
 * - fill-mode (none, forwards, backwards, both)
 * - play-state (running, paused)
 * - name (identifier, none)
 *
 * @param value - CSS animation property value
 * @returns ParseResult with detected animation property IR
 *
 * @example
 * ```typescript
 * parse("1s");                  // duration
 * parse("500ms");               // duration or delay (ambiguous - tries duration first)
 * parse("ease-in-out");         // timing-function
 * parse("infinite");            // iteration-count
 * parse("alternate");           // direction
 * parse("forwards");            // fill-mode
 * parse("paused");              // play-state
 * parse("slideIn");             // name
 * ```
 *
 * @public
 */
export function parse(value: string): ParseResult<Animation> {
	const durationResult = Duration.parse(value);
	if (durationResult.ok) return toParseResult(durationResult);

	const delayResult = Delay.parse(value);
	if (delayResult.ok) return toParseResult(delayResult);

	const timingResult = TimingFunction.parse(value);
	if (timingResult.ok) return toParseResult(timingResult);

	const iterationResult = IterationCount.parse(value);
	if (iterationResult.ok) return toParseResult(iterationResult);

	const directionResult = Direction.parse(value);
	if (directionResult.ok) return toParseResult(directionResult);

	const fillModeResult = FillMode.parse(value);
	if (fillModeResult.ok) return toParseResult(fillModeResult);

	const playStateResult = PlayState.parse(value);
	if (playStateResult.ok) return toParseResult(playStateResult);

	const nameResult = Name.parse(value);
	if (nameResult.ok) return toParseResult(nameResult);

	return parseErr("Invalid animation property value", {
		suggestion:
			"Expected duration (1s, 500ms, auto), delay, timing-function, iteration-count, direction, fill-mode, play-state, or name",
	});
}
