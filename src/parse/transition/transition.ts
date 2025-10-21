// b_path:: src/parse/transition/transition.ts

import { type ParseResult, parseErr, toParseResult } from "@/core/result";
import type * as Type from "@/core/types/transition";

import * as Delay from "./delay";
import * as Duration from "./duration";
import * as Property from "./property";
import * as TimingFunction from "./timing-function";

export type Transition =
	| Type.TransitionDelay
	| Type.TransitionDuration
	| Type.TransitionProperty
	| Type.TransitionTimingFunction;

export function parse(value: string): ParseResult<Transition> {
	const durationResult = Duration.parse(value);
	if (durationResult.ok) return toParseResult(durationResult);

	const delayResult = Delay.parse(value);
	if (delayResult.ok) return toParseResult(delayResult);

	const timingResult = TimingFunction.parse(value);
	if (timingResult.ok) return toParseResult(timingResult);

	const propertyResult = Property.parse(value);
	if (propertyResult.ok) return toParseResult(propertyResult);

	return parseErr("Invalid transition property value", {
		suggestion: "Expected duration (1s, 500ms), delay, timing-function, or property name",
	});
}
