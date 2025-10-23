// b_path:: src/generate/shadow/box-shadow.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type { BoxShadow } from "@/core/types/shadow";
import { generateColor } from "@/utils/generate/color";

/**
 * Generate CSS box-shadow property value from IR.
 *
 * Outputs box-shadow with required offsets and optional inset, blur, spread, and color.
 * Preserves the original units from the IR.
 * Supports multiple comma-separated shadow layers.
 *
 * @param shadow - BoxShadow IR
 * @returns CSS string like "2px 2px" or "inset 0 0 10px 2px rgba(0,0,0,0.5), 2px 2px 4px black"
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow}
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/shadow/box-shadow";
 *
 * // Basic shadow
 * const css1 = toCss({
 *   kind: "box-shadow",
 *   shadows: [{
 *     offsetX: { value: 2, unit: "px" },
 *     offsetY: { value: 2, unit: "px" }
 *   }]
 * });
 * // "2px 2px"
 *
 * // With blur and spread
 * const css2 = toCss({
 *   kind: "box-shadow",
 *   shadows: [{
 *     offsetX: { value: 2, unit: "px" },
 *     offsetY: { value: 2, unit: "px" },
 *     blurRadius: { value: 4, unit: "px" },
 *     spreadRadius: { value: 2, unit: "px" }
 *   }]
 * });
 * // "2px 2px 4px 2px"
 *
 * // Inset shadow with color
 * const css3 = toCss({
 *   kind: "box-shadow",
 *   shadows: [{
 *     inset: true,
 *     offsetX: { value: 0, unit: "px" },
 *     offsetY: { value: 0, unit: "px" },
 *     blurRadius: { value: 10, unit: "px" },
 *     color: { kind: "named", name: "black" }
 *   }]
 * });
 * // "inset 0px 0px 10px black"
 *
 * // Multiple shadows
 * const css4 = toCss({
 *   kind: "box-shadow",
 *   shadows: [
 *     {
 *       offsetX: { value: 2, unit: "px" },
 *       offsetY: { value: 2, unit: "px" },
 *       color: { kind: "named", name: "black" }
 *     },
 *     {
 *       inset: true,
 *       offsetX: { value: 0, unit: "px" },
 *       offsetY: { value: 0, unit: "px" },
 *       blurRadius: { value: 10, unit: "px" },
 *       color: { kind: "named", name: "white" }
 *     }
 *   ]
 * });
 * // "2px 2px black, inset 0px 0px 10px white"
 * ```
 *
 * @public
 */
export function generate(shadow: BoxShadow): GenerateResult {
	if (shadow === undefined || shadow === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	const layers = shadow.shadows.map((layer) => {
		const { inset, offsetX, offsetY, blurRadius, spreadRadius, color } = layer;

		const parts: string[] = [];

		// Add inset keyword if present
		if (inset) {
			parts.push("inset");
		}

		// Add required offset values
		parts.push(`${offsetX.value}${offsetX.unit}`);
		parts.push(`${offsetY.value}${offsetY.unit}`);

		// Add optional blur radius
		if (blurRadius !== undefined) {
			parts.push(`${blurRadius.value}${blurRadius.unit}`);
		}

		// Add optional spread radius
		if (spreadRadius !== undefined) {
			parts.push(`${spreadRadius.value}${spreadRadius.unit}`);
		}

		// Add optional color
		if (color !== undefined) {
			parts.push(generateColor(color));
		}

		return parts.join(" ");
	});

	return generateOk(layers.join(", "));
}
