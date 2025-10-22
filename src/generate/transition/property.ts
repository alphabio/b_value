// b_path:: src/generate/transition/property.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type * as Type from "@/core/types";

/**
 * Generate CSS transition-property property value from IR.
 *
 * Converts TransitionProperty IR to CSS string representation.
 *
 * Per CSS Transitions Level 1 specification.
 *
 * @param ir - TransitionProperty IR object
 * @returns CSS transition-property value string
 *
 * @example
 * Single property:
 * ```typescript
 * const css = toCss({
 *   kind: "transition-property",
 *   properties: [{ type: "identifier", value: "opacity" }]
 * });
 * // "opacity"
 * ```
 *
 * @example
 * Multiple properties:
 * ```typescript
 * const css = toCss({
 *   kind: "transition-property",
 *   properties: [
 *     { type: "identifier", value: "opacity" },
 *     { type: "identifier", value: "transform" }
 *   ]
 * });
 * // "opacity, transform"
 * ```
 *
 * @example
 * Keyword:
 * ```typescript
 * const css = toCss({
 *   kind: "transition-property",
 *   properties: [{ type: "all" }]
 * });
 * // "all"
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transition-property | MDN: transition-property}
 * @see {@link https://www.w3.org/TR/css-transitions-1/#transition-property-property | W3C Spec}
 */
export function generate(ir: Type.TransitionProperty): GenerateResult {
	if (ir === undefined || ir === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	return ir.properties
		.map((prop) => {
			if (prop.type === "none" || prop.type === "all") {
				return generateOk(prop.type);
			}
			return generateOk(prop.value);
		})
		.join(", ");
}
