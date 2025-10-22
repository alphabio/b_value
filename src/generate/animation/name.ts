// b_path:: src/generate/animation/name.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type * as Type from "@/core/types";

/**
 * Generate CSS animation-name property value from IR.
 *
 * Converts AnimationName IR to CSS string representation.
 *
 * Per CSS Animations Level 1 specification.
 *
 * @param ir - AnimationName IR object
 * @returns CSS animation-name value string
 *
 * @example
 * Identifier name:
 * ```typescript
 * const css = toCss({
 *   kind: "animation-name",
 *   names: [{ type: "identifier", value: "slideIn" }]
 * });
 * // "slideIn"
 * ```
 *
 * @example
 * None keyword:
 * ```typescript
 * const css = toCss({
 *   kind: "animation-name",
 *   names: [{ type: "none" }]
 * });
 * // "none"
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/animation-name | MDN: animation-name}
 * @see {@link https://www.w3.org/TR/css-animations-1/#animation-name | W3C Spec}
 */
export function generate(ir: Type.AnimationName): GenerateResult {
	if (ir === undefined || ir === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	const values = ir.names
		.map((name) => {
			if (name.type === "none") {
				return "none";
			}
			return name.value;
		})
		.join(", ");
	return generateOk(values);
}
