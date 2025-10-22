// b_path:: src/generate/transition/transition.ts

import { type GenerateResult, generateErr } from "@/core/result";
import type * as Type from "@/core/types/transition";
import * as Delay from "./delay";
import * as Duration from "./duration";
import * as Property from "./property";
import * as TimingFunction from "./timing-function";

/**
 * Generate CSS from transition IR with auto-detection.
 *
 * Automatically detects transition property type from IR.kind and generates appropriate CSS.
 * Supports transition-delay, transition-duration, transition-property, and transition-timing-function.
 *
 * @param transition - Transition IR
 * @returns GenerateResult with CSS string or error
 *
 * @example
 * Duration:
 * ```typescript
 * import { Generate } from "b_value";
 *
 * const result = Generate.Transition.generate({
 *   kind: "transition-duration",
 *   value: 1,
 *   unit: "s"
 * });
 * // → { ok: true, value: "1s", issues: [] }
 * ```
 *
 * @example
 * Delay:
 * ```typescript
 * const result = Generate.Transition.generate({
 *   kind: "transition-delay",
 *   value: 500,
 *   unit: "ms"
 * });
 * // → { ok: true, value: "500ms", issues: [] }
 * ```
 *
 * @example
 * Timing function:
 * ```typescript
 * const result = Generate.Transition.generate({
 *   kind: "transition-timing-function",
 *   function: "ease-in-out"
 * });
 * // → { ok: true, value: "ease-in-out", issues: [] }
 * ```
 *
 * @example
 * Property:
 * ```typescript
 * const result = Generate.Transition.generate({
 *   kind: "transition-property",
 *   property: "opacity"
 * });
 * // → { ok: true, value: "opacity", issues: [] }
 * ```
 *
 * @example
 * Invalid IR:
 * ```typescript
 * const result = Generate.Transition.generate(null);
 * // → { ok: false, issues: [{ severity: "error", message: "Invalid transition IR: missing 'kind' field" }] }
 * ```
 *
 * @public
 */
export function generate(
	transition: Type.TransitionDelay | Type.TransitionDuration | Type.TransitionProperty | Type.TransitionTimingFunction,
): GenerateResult {
	// Validate IR has 'kind' field
	if (!transition || typeof transition !== "object" || !("kind" in transition)) {
		return generateErr("missing-required-field", "Invalid transition IR: missing 'kind' field", {
			suggestion: "Ensure IR was parsed correctly",
		});
	}

	// Dispatch based on kind
	switch (transition.kind) {
		case "transition-duration":
			return Duration.generate(transition);

		case "transition-delay":
			return Delay.generate(transition);

		case "transition-timing-function":
			return TimingFunction.generate(transition);

		case "transition-property":
			return Property.generate(transition);

		default:
			return generateErr("unsupported-kind", `Unknown transition kind: ${(transition as { kind?: string }).kind}`, {
				suggestion:
					"Expected 'transition-duration', 'transition-delay', 'transition-timing-function', or 'transition-property'",
			});
	}
}
