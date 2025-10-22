// b_path:: src/generate/gradient/radial.ts

import { type GenerateResult, generateOk } from "@/core/result";
import type * as Type from "@/core/types";
import * as ColorStop from "./color-stop";

/**
 * Generate CSS position string from Position2D IR.
 *
 * @param position - Position2D IR object
 * @returns CSS position string (e.g., "center", "left top", "50% 50%")
 *
 * @internal
 */
function positionToCss(position: Type.Position2D): GenerateResult {
	const h =
		typeof position.horizontal === "string"
			? position.horizontal
			: `${position.horizontal.value}${position.horizontal.unit}`;
	const v =
		typeof position.vertical === "string" ? position.vertical : `${position.vertical.value}${position.vertical.unit}`;
	return generateOk(`${h} ${v}`);
}

/**
 * Generate CSS radial gradient size string from IR.
 *
 * @param size - RadialGradientSize IR object
 * @returns CSS size string
 *
 * @internal
 */
function sizeToCss(size: Type.RadialGradientSize): string {
	if (size.kind === "keyword") {
		return size.value;
	}

	if (size.kind === "circle-explicit") {
		return `${size.radius.value}${size.radius.unit}`;
	}

	// ellipse-explicit
	return `${size.radiusX.value}${size.radiusX.unit} ${size.radiusY.value}${size.radiusY.unit}`;
}

/**
 * Generate a CSS radial gradient string from intermediate representation (IR).
 *
 * Converts a RadialGradient IR object into a valid CSS `radial-gradient()` or
 * `repeating-radial-gradient()` function string. Handles all gradient components:
 * shape, size, position, color interpolation, and color stops.
 *
 * The generated CSS string is spec-compliant and can be used directly in CSS
 * properties like `background-image`, `background`, or `mask-image`.
 *
 * This function performs the inverse operation of `Parse.Gradient.Radial.parse()`,
 * enabling bidirectional transformation between CSS and IR.
 *
 * @param ir - RadialGradient IR object to convert to CSS
 * @returns CSS radial gradient function string
 *
 * @public
 *
 * @example
 * Simple gradient:
 * ```typescript
 * import { Generate } from "b_value";
 *
 * const css = Generate.Gradient.Radial.generate({
 *   kind: "radial",
 *   colorStops: [{ color: "red" }, { color: "blue" }],
 *   repeating: false
 * });
 * console.log(css); // "radial-gradient(red, blue)"
 * ```
 *
 * @example
 * Circle with keyword size:
 * ```typescript
 * const css = Generate.Gradient.Radial.generate({
 *   kind: "radial",
 *   shape: "circle",
 *   size: { kind: "keyword", value: "closest-side" },
 *   colorStops: [{ color: "red" }, { color: "blue" }],
 *   repeating: false
 * });
 * console.log(css); // "radial-gradient(circle closest-side, red, blue)"
 * ```
 *
 * @example
 * Positioned gradient:
 * ```typescript
 * const css = Generate.Gradient.Radial.generate({
 *   kind: "radial",
 *   shape: "ellipse",
 *   position: { horizontal: "left", vertical: "top" },
 *   colorStops: [{ color: "red" }, { color: "blue" }],
 *   repeating: false
 * });
 * console.log(css); // "radial-gradient(ellipse at left top, red, blue)"
 * ```
 *
 * @example
 * With explicit size:
 * ```typescript
 * const css = Generate.Gradient.Radial.generate({
 *   kind: "radial",
 *   shape: "circle",
 *   size: { kind: "circle-explicit", radius: { value: 100, unit: "px" } },
 *   colorStops: [{ color: "red" }, { color: "blue" }],
 *   repeating: false
 * });
 * console.log(css); // "radial-gradient(circle 100px, red, blue)"
 * ```
 *
 * @example
 * With color interpolation:
 * ```typescript
 * const css = Generate.Gradient.Radial.generate({
 *   kind: "radial",
 *   colorSpace: "oklch",
 *   colorStops: [
 *     { color: "red", position: { value: 0, unit: "%" } },
 *     { color: "blue", position: { value: 100, unit: "%" } }
 *   ],
 *   repeating: false
 * });
 * console.log(css); // "radial-gradient(in oklch, red 0%, blue 100%)"
 * ```
 *
 * @example
 * Repeating gradient:
 * ```typescript
 * const css = Generate.Gradient.Radial.generate({
 *   kind: "radial",
 *   shape: "circle",
 *   colorStops: [
 *     { color: "red", position: { value: 0, unit: "px" } },
 *     { color: "blue", position: { value: 20, unit: "px" } }
 *   ],
 *   repeating: true
 * });
 * console.log(css); // "repeating-radial-gradient(circle, red 0px, blue 20px)"
 * ```
 *
 * @example
 * Round-trip transformation (parse → generate):
 * ```typescript
 * import { Parse, Generate } from "b_value";
 *
 * const original = "radial-gradient(circle closest-side, red, blue)";
 * const parsed = Parse.Gradient.Radial.parse(original);
 *
 * if (parsed.ok) {
 *   const generated = Generate.Gradient.Radial.generate(parsed.value);
 *   console.log(generated === original); // true - perfect round-trip!
 * }
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/radial-gradient | MDN: radial-gradient()}
 * @see {@link https://www.w3.org/TR/css-images-3/#radial-gradients | W3C Spec: Radial Gradients}
 */
export function generate(ir: Type.RadialGradient): GenerateResult {
	const parts: string[] = [];
	const shapeAndSize: string[] = [];

	// Build shape and size part
	if (ir.shape) {
		shapeAndSize.push(ir.shape);
	}

	if (ir.size) {
		shapeAndSize.push(sizeToCss(ir.size));
	}

	// Combine shape/size with position
	const shapeAndSizeStr = shapeAndSize.join(" ");
	if (ir.position) {
		const posStr = positionToCss(ir.position);
		if (shapeAndSizeStr) {
			parts.push(`${shapeAndSizeStr} at ${posStr}`);
		} else {
			parts.push(`at ${posStr}`);
		}
	} else if (shapeAndSizeStr) {
		parts.push(shapeAndSizeStr);
	}

	// Add color interpolation if present
	if (ir.colorSpace) {
		if (parts.length > 0) {
			// Append to last part without comma
			parts[parts.length - 1] = `${parts[parts.length - 1]} in ${ir.colorSpace}`;
		} else {
			parts.push(`in ${ir.colorSpace}`);
		}
	}

	// Add color stops
	for (const stop of ir.colorStops) {
		const result = ColorStop.generate(stop);
		if (!result.ok) return result;
		parts.push(result.value);
	}

	// Generate function
	const functionName = ir.repeating ? "repeating-radial-gradient" : "radial-gradient";
	return generateOk(`${functionName}(${parts.join(", ")})`);
}
