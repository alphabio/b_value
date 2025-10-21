// b_path:: src/generate/animation/animation.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
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
 * Generate CSS from animation property IR with auto-detection.
 *
 * Automatically detects animation property type from IR.kind and generates appropriate CSS.
 * Supports all animation longhand properties.
 *
 * @param animation - Animation property IR
 * @returns GenerateResult with CSS string or error
 *
 * @example
 * Animation duration:
 * ```typescript
 * import { Generate } from "b_value";
 *
 * const result = Generate.Animation.generate({
 *   kind: "animation-duration",
 *   durations: [{ type: "time", value: 1, unit: "s" }]
 * });
 * // → { ok: true, value: "1s", issues: [] }
 * ```
 *
 * @example
 * Animation delay:
 * ```typescript
 * const result = Generate.Animation.generate({
 *   kind: "animation-delay",
 *   delays: [{ value: 500, unit: "ms" }]
 * });
 * // → { ok: true, value: "500ms", issues: [] }
 * ```
 *
 * @example
 * Animation timing function:
 * ```typescript
 * const result = Generate.Animation.generate({
 *   kind: "animation-timing-function",
 *   functions: [{ type: "keyword", value: "ease-in-out" }]
 * });
 * // → { ok: true, value: "ease-in-out", issues: [] }
 * ```
 *
 * @example
 * Animation iteration count:
 * ```typescript
 * const result = Generate.Animation.generate({
 *   kind: "animation-iteration-count",
 *   counts: [{ type: "infinite" }]
 * });
 * // → { ok: true, value: "infinite", issues: [] }
 * ```
 *
 * @example
 * Invalid IR:
 * ```typescript
 * const result = Generate.Animation.generate(null);
 * // → { ok: false, issues: [{ severity: "error", message: "Invalid animation IR: missing 'kind' field" }] }
 * ```
 *
 * @public
 */
export function generate(animation: Animation): GenerateResult {
	// Validate IR has 'kind' field
	if (!animation || typeof animation !== "object" || !("kind" in animation)) {
		return generateErr("Invalid animation IR: missing 'kind' field", {
			suggestion: "Ensure IR was parsed correctly",
		});
	}

	// Dispatch based on kind
	switch (animation.kind) {
		case "animation-delay":
			return generateOk(Delay.toCss(animation));

		case "animation-direction":
			return generateOk(Direction.toCss(animation));

		case "animation-duration":
			return generateOk(Duration.toCss(animation));

		case "animation-fill-mode":
			return generateOk(FillMode.toCss(animation));

		case "animation-iteration-count":
			return generateOk(IterationCount.toCss(animation));

		case "animation-name":
			return generateOk(Name.toCss(animation));

		case "animation-play-state":
			return generateOk(PlayState.toCss(animation));

		case "animation-timing-function":
			return generateOk(TimingFunction.toCss(animation));

		default:
			return generateErr(`Unknown animation kind: ${(animation as { kind?: string }).kind}`, {
				suggestion:
					"Expected one of: animation-delay, animation-direction, animation-duration, animation-fill-mode, animation-iteration-count, animation-name, animation-play-state, or animation-timing-function. Check that animation IR is valid.",
			});
	}
}
