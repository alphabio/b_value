// b_path:: src/generate/filter/drop-shadow.ts
import type { DropShadowFilter } from "@/core/types/filter";
import { generateColor } from "@/utils/generate/color";

/**
 * Generate CSS drop-shadow() filter function from IR.
 *
 * Outputs drop-shadow with offset-x, offset-y, and optional blur-radius and color.
 * Preserves the original units from the IR.
 * Optional parameters are only included if present in the IR.
 *
 * @param filter - DropShadowFilter IR
 * @returns CSS string like "drop-shadow(2px 2px)" or "drop-shadow(2px 2px 4px black)"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/drop-shadow}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/filter/drop-shadow";
 *
 * // Basic drop shadow
 * const css1 = toCss({
 *   kind: "drop-shadow",
 *   offsetX: { value: 2, unit: "px" },
 *   offsetY: { value: 2, unit: "px" }
 * });
 * // "drop-shadow(2px 2px)"
 *
 * // With blur radius
 * const css2 = toCss({
 *   kind: "drop-shadow",
 *   offsetX: { value: 2, unit: "px" },
 *   offsetY: { value: 2, unit: "px" },
 *   blurRadius: { value: 4, unit: "px" }
 * });
 * // "drop-shadow(2px 2px 4px)"
 *
 * // With color
 * const css3 = toCss({
 *   kind: "drop-shadow",
 *   offsetX: { value: 2, unit: "px" },
 *   offsetY: { value: 2, unit: "px" },
 *   blurRadius: { value: 4, unit: "px" },
 *   color: { kind: "named", name: "black" }
 * });
 * // "drop-shadow(2px 2px 4px black)"
 * ```
 *
 * @public
 */
export function toCss(filter: DropShadowFilter): string {
	const { offsetX, offsetY, blurRadius, color } = filter;

	// Start with required offset values
	let css = `drop-shadow(${offsetX.value}${offsetX.unit} ${offsetY.value}${offsetY.unit}`;

	// Add optional blur radius
	if (blurRadius !== undefined) {
		css += ` ${blurRadius.value}${blurRadius.unit}`;
	}

	// Add optional color
	if (color !== undefined) {
		css += ` ${generateColor(color)}`;
	}

	// Close function
	css += ")";

	return css;
}
