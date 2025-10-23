// b_path:: src/generate/shadow/text-shadow.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { TextShadow } from "@/core/types/shadow";
import { generateColor } from "@/utils/generate/color";

/**
 * Generate CSS text-shadow property value from IR.
 *
 * Outputs text-shadow with required offsets and optional blur and color.
 * Preserves the original units from the IR.
 * Supports multiple comma-separated shadow layers.
 *
 * @param shadow - TextShadow IR
 * @returns CSS string like "1px 1px" or "1px 1px 2px gray, -1px -1px 2px white"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/text-shadow}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/shadow/text-shadow";
 *
 * // Basic shadow
 * const css1 = toCss({
 *   kind: "text-shadow",
 *   shadows: [{
 *     offsetX: { value: 1, unit: "px" },
 *     offsetY: { value: 1, unit: "px" }
 *   }]
 * });
 * // "1px 1px"
 *
 * // With blur radius
 * const css2 = toCss({
 *   kind: "text-shadow",
 *   shadows: [{
 *     offsetX: { value: 1, unit: "px" },
 *     offsetY: { value: 1, unit: "px" },
 *     blurRadius: { value: 2, unit: "px" }
 *   }]
 * });
 * // "1px 1px 2px"
 *
 * // With color
 * const css3 = toCss({
 *   kind: "text-shadow",
 *   shadows: [{
 *     offsetX: { value: 1, unit: "px" },
 *     offsetY: { value: 1, unit: "px" },
 *     blurRadius: { value: 2, unit: "px" },
 *     color: { kind: "named", name: "gray" }
 *   }]
 * });
 * // "1px 1px 2px gray"
 *
 * // Multiple shadows
 * const css4 = toCss({
 *   kind: "text-shadow",
 *   shadows: [
 *     {
 *       offsetX: { value: 1, unit: "px" },
 *       offsetY: { value: 1, unit: "px" },
 *       blurRadius: { value: 2, unit: "px" },
 *       color: { kind: "named", name: "black" }
 *     },
 *     {
 *       offsetX: { value: -1, unit: "px" },
 *       offsetY: { value: -1, unit: "px" },
 *       blurRadius: { value: 2, unit: "px" },
 *       color: { kind: "named", name: "white" }
 *     }
 *   ]
 * });
 * // "1px 1px 2px black, -1px -1px 2px white"
 * ```
 *
 * @public
 */
export function generate(shadow: TextShadow): GenerateResult {
	if (shadow === undefined || shadow === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	const layers = shadow.shadows.map((layer) => {
		const { offsetX, offsetY, blurRadius, color } = layer;

		const parts: string[] = [];

		// Add required offset values
		parts.push(`${offsetX.value}${offsetX.unit}`);
		parts.push(`${offsetY.value}${offsetY.unit}`);

		// Add optional blur radius
		if (blurRadius !== undefined) {
			parts.push(`${blurRadius.value}${blurRadius.unit}`);
		}

		// Add optional color
		if (color !== undefined) {
			parts.push(generateColor(color));
		}

		return parts.join(" ");
	});

	return generateOk(layers.join(", "));
}
