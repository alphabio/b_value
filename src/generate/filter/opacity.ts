// b_path:: src/generate/filter/opacity.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { OpacityFilter } from "@/core/types/filter";

/**
 * Generate CSS opacity() filter function from IR.
 *
 * Outputs opacity value as a number (not percentage).
 * 0 = no opacity, 1 = 100% opacity.
 *
 * @param filter - OpacityFilter IR
 * @returns CSS string like "opacity(0.5)"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/opacity}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/filter/opacity";
 *
 * const css = toCss({ kind: "opacity", value: 0.5 });
 * // "opacity(0.5)"
 * ```
 *
 * @public
 */
export function generate(filter: OpacityFilter): GenerateResult {
	if (filter === undefined || filter === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	const { value } = filter;
	return generateOk(`opacity(${value})`);
}
