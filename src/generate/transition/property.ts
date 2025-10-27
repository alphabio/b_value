// b_path:: src/generate/transition/property.ts

import { type GenerateResult, generateOk } from "@/core/result";
import type * as Type from "@/core/types";
import { transitionPropertySchema } from "@/core/types/transition";
import { zodErrorToIssues } from "@/utils/generate";

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
 * Keywords:
 * ```typescript
 * const css = toCss({ kind: "transition-property", properties: [{ type: "all" }] });
 * // "all"
 *
 * const css2 = toCss({ kind: "transition-property", properties: [{ type: "none" }] });
 * // "none"
 * ```
 *
 * @public
 *
 * @see {@link https://github.com/mdn/data/blob/main/css/properties.json | MDN Data}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transition-property | MDN: transition-property}
 * @see {@link https://www.w3.org/TR/css-transitions-1/#transition-property-property | W3C Spec}
 */
export function generate(ir: Type.TransitionProperty): GenerateResult {
	// Validate IR with Zod schema
	const validation = transitionPropertySchema.safeParse(ir);

	if (!validation.success) {
		// Convert Zod errors to Issue array
		const issues = zodErrorToIssues(validation.error);
		return {
			ok: false,
			issues,
		};
	}

	// Generate CSS
	const parts = ir.properties.map((prop) => {
		if (prop.type === "none") return "none";
		if (prop.type === "all") return "all";
		return prop.value; // identifier
	});

	return generateOk(parts.join(", "));
}
