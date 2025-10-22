// b_path:: src/generate/clip-path/ellipse.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type * as Type from "@/core/types";
import * as Generate from "@/generate";
import * as GenerateUtils from "@/utils/generate";

/**
 * Convert ellipse() IR to CSS string.
 *
 * Generates optimized CSS for ellipse() shape function.
 * Omits defaults (no radii = closest-side, no position = center).
 *
 * @param value - ClipPathEllipse IR
 * @returns CSS string
 *
 * @example
 * ```typescript
 * toCss({ kind: "clip-path-ellipse" });
 * // "ellipse()"
 *
 * toCss({ kind: "clip-path-ellipse", radiusX: { value: 50, unit: "px" } });
 * // "ellipse(50px)"
 *
 * toCss({
 *   kind: "clip-path-ellipse",
 *   radiusX: { value: 50, unit: "px" },
 *   radiusY: { value: 100, unit: "px" }
 * });
 * // "ellipse(50px 100px)"
 * ```
 *
 * @public
 */
export function generate(value: Type.ClipPathEllipse): GenerateResult {
	if (value === undefined || value === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	const parts: string[] = ["ellipse("];

	// Add radiusX if present
	if (value.radiusX !== undefined) {
		if (typeof value.radiusX === "string") {
			parts.push(value.radiusX);
		} else {
			parts.push(GenerateUtils.lengthPercentageToCss(value.radiusX));
		}
	}

	// Add radiusY if present
	if (value.radiusY !== undefined) {
		if (parts.length > 1) {
			parts.push(" ");
		}
		if (typeof value.radiusY === "string") {
			parts.push(value.radiusY);
		} else {
			parts.push(GenerateUtils.lengthPercentageToCss(value.radiusY));
		}
	}

	// Add position if present
	if (value.position !== undefined) {
		if (parts.length > 1) {
			parts.push(" ");
		}
		parts.push("at ");
		parts.push(Generate.Position.Utils.generate(value.position));
	}

	parts.push(")");
	return generateOk(parts.join(""));
}
