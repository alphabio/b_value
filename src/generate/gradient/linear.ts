// b_path:: src/generate/gradient/linear.ts

import type * as Type from "@/core/types";
import * as ColorStop from "./color-stop";

/**
 * Generate CSS direction string from GradientDirection IR.
 *
 * @param direction - GradientDirection IR object
 * @returns CSS direction string (e.g., "45deg", "to right", "to top left")
 *
 * @internal
 */
function directionToCss(direction: Type.GradientDirection): string {
	if (direction.kind === "angle") {
		return `${direction.value.value}${direction.value.unit}`;
	}

	if (direction.kind === "to-side") {
		return `to ${direction.value}`;
	}

	// to-corner
	return `to ${direction.value}`;
}

/**
 * Generate a CSS linear gradient string from intermediate representation (IR).
 *
 * Converts a LinearGradient IR object into a valid CSS `linear-gradient()` or
 * `repeating-linear-gradient()` function string. Handles all gradient components:
 * direction, color interpolation, and color stops.
 *
 * The generated CSS string is spec-compliant and can be used directly in CSS
 * properties like `background-image`, `background`, or `mask-image`.
 *
 * This function performs the inverse operation of `Parse.Gradient.Linear.parse()`,
 * enabling bidirectional transformation between CSS and IR.
 *
 * @param ir - LinearGradient IR object to convert to CSS
 * @returns CSS linear gradient function string
 *
 * @public
 *
 * @example
 * Simple gradient:
 * ```typescript
 * import { Generate } from "b_value";
 *
 * const css = Generate.Gradient.Linear.generate({
 *   kind: "linear",
 *   colorStops: [{ color: "red" }, { color: "blue" }],
 *   repeating: false
 * });
 * console.log(css); // "linear-gradient(red, blue)"
 * ```
 *
 * @example
 * With angle direction:
 * ```typescript
 * const css = Generate.Gradient.Linear.generate({
 *   kind: "linear",
 *   direction: { kind: "angle", value: { value: 45, unit: "deg" } },
 *   colorStops: [{ color: "red" }, { color: "blue" }],
 *   repeating: false
 * });
 * console.log(css); // "linear-gradient(45deg, red, blue)"
 * ```
 *
 * @example
 * With side direction:
 * ```typescript
 * const css = Generate.Gradient.Linear.generate({
 *   kind: "linear",
 *   direction: { kind: "to-side", value: "right" },
 *   colorStops: [{ color: "red" }, { color: "blue" }],
 *   repeating: false
 * });
 * console.log(css); // "linear-gradient(to right, red, blue)"
 * ```
 *
 * @example
 * With corner direction:
 * ```typescript
 * const css = Generate.Gradient.Linear.generate({
 *   kind: "linear",
 *   direction: { kind: "to-corner", value: "top right" },
 *   colorStops: [{ color: "red" }, { color: "blue" }],
 *   repeating: false
 * });
 * console.log(css); // "linear-gradient(to top right, red, blue)"
 * ```
 *
 * @example
 * With color interpolation:
 * ```typescript
 * const css = Generate.Gradient.Linear.generate({
 *   kind: "linear",
 *   direction: { kind: "angle", value: { value: 90, unit: "deg" } },
 *   colorSpace: "oklch",
 *   colorStops: [
 *     { color: "red", position: { value: 0, unit: "%" } },
 *     { color: "blue", position: { value: 100, unit: "%" } }
 *   ],
 *   repeating: false
 * });
 * console.log(css); // "linear-gradient(90deg in oklch, red 0%, blue 100%)"
 * ```
 *
 * @example
 * Repeating gradient:
 * ```typescript
 * const css = Generate.Gradient.Linear.generate({
 *   kind: "linear",
 *   direction: { kind: "angle", value: { value: 45, unit: "deg" } },
 *   colorStops: [
 *     { color: "red", position: { value: 0, unit: "px" } },
 *     { color: "blue", position: { value: 20, unit: "px" } }
 *   ],
 *   repeating: true
 * });
 * console.log(css); // "repeating-linear-gradient(45deg, red 0px, blue 20px)"
 * ```
 *
 * @example
 * Round-trip transformation (parse → generate):
 * ```typescript
 * import { Parse, Generate } from "b_value";
 *
 * const original = "linear-gradient(to right, red, blue)";
 * const parsed = Parse.Gradient.Linear.parse(original);
 *
 * if (parsed.ok) {
 *   const generated = Generate.Gradient.Linear.generate(parsed.value);
 *   console.log(generated === original); // true - perfect round-trip!
 * }
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/linear-gradient | MDN: linear-gradient()}
 * @see {@link https://www.w3.org/TR/css-images-3/#linear-gradients | W3C Spec: Linear Gradients}
 */
export function toCss(ir: Type.LinearGradient): string {
	const parts: string[] = [];

	// Add direction if present
	if (ir.direction) {
		const dirStr = directionToCss(ir.direction);
		if (ir.colorSpace) {
			// Direction and color space together
			parts.push(`${dirStr} in ${ir.colorSpace}`);
		} else {
			parts.push(dirStr);
		}
	} else if (ir.colorSpace) {
		// Just color space
		parts.push(`in ${ir.colorSpace}`);
	}

	// Add color stops
	const stopStrings = ir.colorStops.map((stop) => ColorStop.generate(stop));
	parts.push(...stopStrings);

	// Generate function
	const functionName = ir.repeating ? "repeating-linear-gradient" : "linear-gradient";
	return `${functionName}(${parts.join(", ")})`;
}
