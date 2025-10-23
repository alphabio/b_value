// b_path:: src/generate/gradient/conic.ts

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
function positionToCss(position: Type.Position2D): string {
	const h =
		typeof position.horizontal === "string"
			? position.horizontal
			: `${position.horizontal.value}${position.horizontal.unit}`;
	const v =
		typeof position.vertical === "string" ? position.vertical : `${position.vertical.value}${position.vertical.unit}`;
	return `${h} ${v}`;
}

/**
 * Generate a CSS conic gradient string from intermediate representation (IR).
 *
 * Converts a ConicGradient IR object into a valid CSS `conic-gradient()` or
 * `repeating-conic-gradient()` function string. Handles all gradient components:
 * starting angle, position, color interpolation, and color stops.
 *
 * The generated CSS string is spec-compliant and can be used directly in CSS
 * properties like `background-image`, `background`, or `mask-image`.
 *
 * This function performs the inverse operation of `Parse.Gradient.Conic.parse()`,
 * enabling bidirectional transformation between CSS and IR.
 *
 * @param ir - ConicGradient IR object to convert to CSS
 * @returns CSS conic gradient function string
 *
 * @public
 *
 * @example
 * Simple gradient:
 * ```typescript
 * import { Generate } from "b_value";
 *
 * const css = Generate.Gradient.Conic.generate({
 *   kind: "conic",
 *   colorStops: [{ color: "red" }, { color: "blue" }],
 *   repeating: false
 * });
 * console.log(css); // "conic-gradient(red, blue)"
 * ```
 *
 * @example
 * With starting angle:
 * ```typescript
 * const css = Generate.Gradient.Conic.generate({
 *   kind: "conic",
 *   fromAngle: { value: 45, unit: "deg" },
 *   colorStops: [{ color: "red" }, { color: "blue" }],
 *   repeating: false
 * });
 * console.log(css); // "conic-gradient(from 45deg, red, blue)"
 * ```
 *
 * @example
 * At specific position:
 * ```typescript
 * const css = Generate.Gradient.Conic.generate({
 *   kind: "conic",
 *   position: { horizontal: "left", vertical: "top" },
 *   colorStops: [{ color: "red" }, { color: "blue" }],
 *   repeating: false
 * });
 * console.log(css); // "conic-gradient(at left top, red, blue)"
 * ```
 *
 * @example
 * With both angle and position:
 * ```typescript
 * const css = Generate.Gradient.Conic.generate({
 *   kind: "conic",
 *   fromAngle: { value: 90, unit: "deg" },
 *   position: { horizontal: { value: 50, unit: "%" }, vertical: { value: 50, unit: "%" } },
 *   colorStops: [
 *     { color: "red", position: { value: 0, unit: "deg" } },
 *     { color: "blue", position: { value: 180, unit: "deg" } }
 *   ],
 *   repeating: false
 * });
 * console.log(css); // "conic-gradient(from 90deg at 50% 50%, red 0deg, blue 180deg)"
 * ```
 *
 * @example
 * With color interpolation:
 * ```typescript
 * const css = Generate.Gradient.Conic.generate({
 *   kind: "conic",
 *   colorSpace: "oklch",
 *   colorStops: [
 *     { color: "red", position: { value: 0, unit: "deg" } },
 *     { color: "blue", position: { value: 180, unit: "deg" } }
 *   ],
 *   repeating: false
 * });
 * console.log(css); // "conic-gradient(in oklch, red 0deg, blue 180deg)"
 * ```
 *
 * @example
 * Repeating gradient:
 * ```typescript
 * const css = Generate.Gradient.Conic.generate({
 *   kind: "conic",
 *   colorStops: [
 *     { color: "red", position: { value: 0, unit: "deg" } },
 *     { color: "blue", position: { value: 45, unit: "deg" } }
 *   ],
 *   repeating: true
 * });
 * console.log(css); // "repeating-conic-gradient(red 0deg, blue 45deg)"
 * ```
 *
 * @example
 * Round-trip transformation (parse → generate):
 * ```typescript
 * import { Parse, Generate } from "b_value";
 *
 * const original = "conic-gradient(from 45deg, red, blue)";
 * const parsed = Parse.Gradient.Conic.parse(original);
 *
 * if (parsed.ok) {
 *   const generated = Generate.Gradient.Conic.generate(parsed.value);
 *   console.log(generated === original); // true - perfect round-trip!
 * }
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/gradient/conic-gradient | MDN: conic-gradient()}
 * @see {@link https://www.w3.org/TR/css-images-4/#conic-gradients | W3C Spec: Conic Gradients}
 */
export function generate(ir: Type.ConicGradient): GenerateResult {
	const parts: string[] = [];
	const angleAndPos: string[] = [];

	// Build from angle and position part
	if (ir.fromAngle) {
		angleAndPos.push(`from ${ir.fromAngle.value}${ir.fromAngle.unit}`);
	}

	if (ir.position) {
		angleAndPos.push(`at ${positionToCss(ir.position)}`);
	}

	// Combine angle/position with color space
	const angleAndPosStr = angleAndPos.join(" ");
	if (ir.colorSpace) {
		if (angleAndPosStr) {
			parts.push(`${angleAndPosStr} in ${ir.colorSpace}`);
		} else {
			parts.push(`in ${ir.colorSpace}`);
		}
	} else if (angleAndPosStr) {
		parts.push(angleAndPosStr);
	}

	// Add color stops
	for (const stop of ir.colorStops) {
		const result = ColorStop.generate(stop);
		if (!result.ok) return result;
		parts.push(result.value);
	}

	// Generate function
	const functionName = ir.repeating ? "repeating-conic-gradient" : "conic-gradient";
	return generateOk(`${functionName}(${parts.join(", ")})`);
}
