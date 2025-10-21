// b_path:: src/parse/transform/origin.ts
import { err, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import * as Position from "../position/position";

/**
 * Parse transform-origin value (2D or 3D).
 *
 * Parses CSS transform-origin values that define the point around which
 * a transformation is applied. Supports 2D positions (x y) and 3D positions (x y z).
 *
 * Syntax:
 * - 2D: [ <length-percentage> | left | center | right ] [ <length-percentage> | top | center | bottom ]?
 * - 3D: [ <length-percentage> | left | center | right ] [ <length-percentage> | top | center | bottom ]? <length>
 *
 * @param css - CSS string containing transform-origin value
 * @returns Result containing Position2D or Position3D IR, or error message
 *
 * @public
 *
 * @example
 * 2D origin with keywords:
 * ```typescript
 * import { Parse } from "b_value";
 *
 * const result = Parse.Transform.Origin.parse("center top");
 * if (result.ok) {
 *   console.log(result.value);
 *   // { horizontal: "center", vertical: "top" }
 * }
 * ```
 *
 * @example
 * 2D origin with values:
 * ```typescript
 * const result = Parse.Transform.Origin.parse("50% 100px");
 * if (result.ok) {
 *   console.log(result.value);
 *   // { horizontal: { value: 50, unit: "%" }, vertical: { value: 100, unit: "px" } }
 * }
 * ```
 *
 * @example
 * 3D origin:
 * ```typescript
 * const result = Parse.Transform.Origin.parse("left top 10px");
 * if (result.ok) {
 *   console.log(result.value);
 *   // { x: "left", y: "top", z: { value: 10, unit: "px" } }
 * }
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin | MDN: transform-origin}
 * @see {@link https://www.w3.org/TR/css-transforms-1/#transform-origin-property | W3C Spec: transform-origin}
 */
export function parse(css: string): Result<Type.Position2D | Type.Position3D, string> {
	// Try 3D first (if it has 3 values)
	const parts = css.trim().split(/\s+/);

	if (parts.length === 3) {
		// Try 3D parsing
		const result3D = Position.parse3D(css);
		if (result3D.ok) {
			return result3D;
		}
	}

	// Fall back to 2D parsing
	const result2D = Position.parse(css);
	if (!result2D.ok) {
		const errorMsg = result2D.issues[0]?.message || "Invalid transform-origin";
		return err(errorMsg);
	}

	// Convert ParseResult to Result
	return result2D.value ? { ok: true, value: result2D.value, error: undefined } : err("Missing position value");
}

/**
 * Parse perspective-origin value (2D only).
 *
 * Parses CSS perspective-origin values that define the position at which
 * the viewer is looking. Only supports 2D positions.
 *
 * Syntax: [ <length-percentage> | left | center | right ] [ <length-percentage> | top | center | bottom ]?
 *
 * @param css - CSS string containing perspective-origin value
 * @returns Result containing Position2D IR, or error message
 *
 * @public
 *
 * @example
 * ```typescript
 * import { Parse } from "b_value";
 *
 * const result = Parse.Transform.PerspectiveOrigin.parse("50% 50%");
 * if (result.ok) {
 *   console.log(result.value);
 *   // { horizontal: { value: 50, unit: "%" }, vertical: { value: 50, unit: "%" } }
 * }
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/perspective-origin | MDN: perspective-origin}
 * @see {@link https://www.w3.org/TR/css-transforms-1/#perspective-origin-property | W3C Spec: perspective-origin}
 */
export function parsePerspectiveOrigin(css: string): Result<Type.Position2D, string> {
	const result = Position.parse(css);
	if (!result.ok) {
		const errorMsg = result.issues[0]?.message || "Invalid perspective-origin";
		return err(errorMsg);
	}
	// Convert ParseResult to Result
	return result.value ? { ok: true, value: result.value, error: undefined } : err("Missing position value");
}
