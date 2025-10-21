// b_path:: src/generate/position/position-generate.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type * as Type from "@/core/types";
import * as Position from "./position";

/**
 * Generate CSS from Position2D IR.
 *
 * Wraps the existing position generator with GenerateResult for consistent API.
 *
 * @param position - Position2D IR
 * @returns GenerateResult with CSS string or error
 *
 * @example
 * ```typescript
 * generate({ horizontal: "center", vertical: "center" })
 * // → { ok: true, value: "center center", issues: [] }
 * ```
 *
 * @public
 */
export function generate(position: Type.Position2D): GenerateResult {
	if (!position || typeof position !== "object") {
		return generateErr("invalid-ir", "Invalid position IR", {
			suggestion: "Ensure IR was parsed correctly",
		});
	}

	try {
		const css = Position.toCss(position);
		return generateOk(css);
	} catch (error) {
		return generateErr("invalid-ir", `Failed to generate position: ${error}`, {
			suggestion: "Check that position IR is valid",
		});
	}
}
