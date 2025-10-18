// b_path:: src/generate/gradient/radial.ts

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
 * Generate CSS radial gradient function string from IR.
 *
 * Converts radial gradient IR into a valid CSS radial-gradient() or
 * repeating-radial-gradient() function string.
 *
 * @param ir - RadialGradient IR object
 * @returns CSS gradient function string
 *
 * @public
 *
 * @example
 * ```typescript
 * import * as Gradient from "@/ast/generate/gradient";
 *
 * // Simple gradient
 * const css1 = Gradient.Radial.toCss({
 *   kind: "radial",
 *   colorStops: [{ color: "red" }, { color: "blue" }],
 *   repeating: false
 * });
 * // Returns: "radial-gradient(red, blue)"
 *
 * // With shape and size
 * const css2 = Gradient.Radial.toCss({
 *   kind: "radial",
 *   shape: "circle",
 *   size: { kind: "keyword", value: "closest-side" },
 *   colorStops: [{ color: "red" }, { color: "blue" }],
 *   repeating: false
 * });
 * // Returns: "radial-gradient(circle closest-side, red, blue)"
 *
 * // With position
 * const css3 = Gradient.Radial.toCss({
 *   kind: "radial",
 *   shape: "ellipse",
 *   position: { horizontal: "left", vertical: "top" },
 *   colorStops: [{ color: "red" }, { color: "blue" }],
 *   repeating: false
 * });
 * // Returns: "radial-gradient(ellipse at left top, red, blue)"
 *
 * // With explicit size and color interpolation
 * const css4 = Gradient.Radial.toCss({
 *   kind: "radial",
 *   shape: "circle",
 *   size: { kind: "circle-explicit", radius: { value: 100, unit: "px" } },
 *   position: { horizontal: "center", vertical: "center" },
 *   colorSpace: "oklch",
 *   colorStops: [
 *     { color: "red", position: { value: 0, unit: "%" } },
 *     { color: "blue", position: { value: 100, unit: "%" } }
 *   ],
 *   repeating: false
 * });
 * // Returns: "radial-gradient(circle 100px at center center in oklch, red 0%, blue 100%)"
 * ```
 */
export function toCss(ir: Type.RadialGradient): string {
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
	const stopStrings = ir.colorStops.map((stop) => ColorStop.toCss(stop));
	parts.push(...stopStrings);

	// Generate function
	const functionName = ir.repeating ? "repeating-radial-gradient" : "radial-gradient";
	return `${functionName}(${parts.join(", ")})`;
}
