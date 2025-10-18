// b_path:: src/generate/transform/index.ts
import type * as Type from "@/core/types";

/**
 * Generate CSS length/percentage string from IR value.
 *
 * @param value - LengthPercentage IR object
 * @returns CSS length/percentage string
 *
 * @internal
 */
function lengthPercentageToCss(value: Type.LengthPercentage): string {
	return `${value.value}${value.unit}`;
}

/**
 * Generate CSS length string from IR value.
 *
 * @param value - Length IR object
 * @returns CSS length string
 *
 * @internal
 */
function lengthToCss(value: Type.Length): string {
	return `${value.value}${value.unit}`;
}

/**
 * Generate CSS angle string from IR value.
 *
 * @param value - Angle IR object
 * @returns CSS angle string
 *
 * @internal
 */
function angleToCss(value: Type.Angle): string {
	return `${value.value}${value.unit}`;
}

/**
 * Generate CSS transform function string from TransformFunction IR.
 *
 * Converts a single TransformFunction IR object into a valid CSS transform function string.
 *
 * @param ir - TransformFunction IR object to convert to CSS
 * @returns CSS transform function string
 *
 * @public
 *
 * @example
 * Translation:
 * ```typescript
 * import { Generate } from "b_value";
 *
 * const css = Generate.Transform.toFunctionCss({
 *   kind: "translate",
 *   x: { value: 100, unit: "px" },
 *   y: { value: 50, unit: "px" }
 * });
 * console.log(css); // "translate(100px, 50px)"
 * ```
 *
 * @example
 * Rotation:
 * ```typescript
 * const css = Generate.Transform.toFunctionCss({
 *   kind: "rotate",
 *   angle: { value: 45, unit: "deg" }
 * });
 * console.log(css); // "rotate(45deg)"
 * ```
 *
 * @example
 * Scale:
 * ```typescript
 * const css = Generate.Transform.toFunctionCss({
 *   kind: "scale",
 *   x: 1.5,
 *   y: 2
 * });
 * console.log(css); // "scale(1.5, 2)"
 * ```
 */
export function toFunctionCss(ir: Type.TransformFunction): string {
	switch (ir.kind) {
		case "translate":
			if (ir.y) {
				return `translate(${lengthPercentageToCss(ir.x)}, ${lengthPercentageToCss(ir.y)})`;
			}
			return `translate(${lengthPercentageToCss(ir.x)})`;

		case "translateX":
			return `translateX(${lengthPercentageToCss(ir.x)})`;

		case "translateY":
			return `translateY(${lengthPercentageToCss(ir.y)})`;

		case "translateZ":
			return `translateZ(${lengthToCss(ir.z)})`;

		case "translate3d":
			return `translate3d(${lengthPercentageToCss(ir.x)}, ${lengthPercentageToCss(ir.y)}, ${lengthToCss(ir.z)})`;

		case "rotate":
			return `rotate(${angleToCss(ir.angle)})`;

		case "rotateX":
			return `rotateX(${angleToCss(ir.angle)})`;

		case "rotateY":
			return `rotateY(${angleToCss(ir.angle)})`;

		case "rotateZ":
			return `rotateZ(${angleToCss(ir.angle)})`;

		case "rotate3d":
			return `rotate3d(${ir.x}, ${ir.y}, ${ir.z}, ${angleToCss(ir.angle)})`;

		case "scale":
			if (ir.y) {
				return `scale(${ir.x}, ${ir.y})`;
			}
			return `scale(${ir.x})`;

		case "scaleX":
			return `scaleX(${ir.x})`;

		case "scaleY":
			return `scaleY(${ir.y})`;

		case "scaleZ":
			return `scaleZ(${ir.z})`;

		case "scale3d":
			return `scale3d(${ir.x}, ${ir.y}, ${ir.z})`;

		case "skew":
			if (ir.y) {
				return `skew(${angleToCss(ir.x)}, ${angleToCss(ir.y)})`;
			}
			return `skew(${angleToCss(ir.x)})`;

		case "skewX":
			return `skewX(${angleToCss(ir.x)})`;

		case "skewY":
			return `skewY(${angleToCss(ir.y)})`;

		case "matrix":
			return `matrix(${ir.a}, ${ir.b}, ${ir.c}, ${ir.d}, ${ir.e.value}, ${ir.f.value})`;

		case "matrix3d":
			return `matrix3d(${ir.values.join(", ")})`;

		case "perspective":
			return `perspective(${lengthToCss(ir.depth)})`;

		default: {
			// Exhaustive check - TypeScript will ensure all cases are handled
			const _exhaustiveCheck: never = ir;
			throw new Error(`Unknown transform function kind: ${(_exhaustiveCheck as any).kind}`);
		}
	}
}

/**
 * Generate a CSS transform string from intermediate representation (IR).
 *
 * Converts a Transform IR object (array of transform functions) into a valid CSS
 * transform property value string. Multiple transform functions are space-separated.
 *
 * The generated CSS string is spec-compliant and can be used directly in CSS
 * properties like `transform`, `transform-origin`, etc.
 *
 * This function performs the inverse operation of `Parse.Transform.parse()`,
 * enabling bidirectional transformation between CSS and IR.
 *
 * @param ir - Transform IR object to convert to CSS
 * @returns CSS transform property value string
 *
 * @public
 *
 * @example
 * Simple translation:
 * ```typescript
 * import { Generate } from "b_value";
 *
 * const css = Generate.Transform.toCss([{
 *   kind: "translateX",
 *   x: { value: 100, unit: "px" }
 * }]);
 * console.log(css); // "translateX(100px)"
 * ```
 *
 * @example
 * Multiple transforms:
 * ```typescript
 * const css = Generate.Transform.toCss([
 *   { kind: "translate", x: { value: 100, unit: "px" }, y: { value: 50, unit: "px" } },
 *   { kind: "rotate", angle: { value: 45, unit: "deg" } },
 *   { kind: "scale", x: 1.5, y: 1.5 }
 * ]);
 * console.log(css); // "translate(100px, 50px) rotate(45deg) scale(1.5, 1.5)"
 * ```
 *
 * @example
 * 3D transforms:
 * ```typescript
 * const css = Generate.Transform.toCss([
 *   { kind: "translate3d", x: { value: 10, unit: "px" }, y: { value: 20, unit: "px" }, z: { value: 30, unit: "px" } },
 *   { kind: "rotateY", angle: { value: 45, unit: "deg" } }
 * ]);
 * console.log(css); // "translate3d(10px, 20px, 30px) rotateY(45deg)"
 * ```
 *
 * @example
 * Matrix transform:
 * ```typescript
 * const css = Generate.Transform.toCss([{
 *   kind: "matrix",
 *   a: 1, b: 0.5, c: -0.5, d: 1,
 *   e: { value: 10, unit: "px" },
 *   f: { value: 20, unit: "px" }
 * }]);
 * console.log(css); // "matrix(1, 0.5, -0.5, 1, 10, 20)"
 * ```
 *
 * @example
 * Round-trip transformation (parse → generate):
 * ```typescript
 * import { Parse, Generate } from "b_value";
 *
 * const original = "translateX(100px) rotate(45deg) scale(1.5)";
 * const parsed = Parse.Transform.parse(original);
 *
 * if (parsed.ok) {
 *   const generated = Generate.Transform.toCss(parsed.value);
 *   console.log(generated === original); // true - perfect round-trip!
 * }
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform | MDN: transform}
 * @see {@link https://www.w3.org/TR/css-transforms-1/ | W3C Spec: CSS Transforms Level 1}
 * @see {@link https://www.w3.org/TR/css-transforms-2/ | W3C Spec: CSS Transforms Level 2}
 */
export function toCss(ir: Type.Transform): string {
	if (ir.length === 0) {
		return "";
	}

	const functionStrings = ir.map(toFunctionCss);
	return functionStrings.join(" ");
}
