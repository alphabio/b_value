// b_path:: src/generate/clip-path/circle.ts
import type * as Type from "@/core/types";
import * as Generate from "@/generate";
import * as GenerateUtils from "@/utils/generate";

/**
 * Convert circle() IR to CSS string.
 *
 * Generates optimized CSS for circle() shape function.
 * Omits defaults (no radius = closest-side, no position = center).
 *
 * @param value - ClipPathCircle IR
 * @returns CSS string
 *
 * @example
 * ```typescript
 * toCss({ kind: "clip-path-circle" });
 * // "circle()"
 *
 * toCss({ kind: "clip-path-circle", radius: { value: 50, unit: "px" } });
 * // "circle(50px)"
 *
 * toCss({
 *   kind: "clip-path-circle",
 *   radius: { value: 50, unit: "px" },
 *   position: { horizontal: "center", vertical: "center" }
 * });
 * // "circle(50px at center)"
 * ```
 *
 * @public
 */
export function toCss(value: Type.ClipPathCircle): string {
	const parts: string[] = ["circle("];

	// Add radius if present
	if (value.radius !== undefined) {
		if (typeof value.radius === "string") {
			parts.push(value.radius);
		} else {
			parts.push(GenerateUtils.lengthPercentageToCss(value.radius));
		}
	}

	// Add position if present
	if (value.position !== undefined) {
		if (parts.length > 1) {
			parts.push(" ");
		}
		parts.push("at ");
		parts.push(Generate.Position.Position.toCss(value.position));
	}

	parts.push(")");
	return parts.join("");
}
