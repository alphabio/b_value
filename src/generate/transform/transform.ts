// b_path:: src/generate/transform/transform.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type * as Type from "@/core/types";
import * as Utils from "./utils";

/**
 * Generate CSS from Transform IR.
 *
 * Wraps the existing transform generator with GenerateResult for consistent API.
 *
 * @param transform - Transform IR (array of transform functions)
 * @returns GenerateResult with CSS string or error
 *
 * @example
 * ```typescript
 * generate([
 *   { kind: "translateX", x: { value: 100, unit: "px" } },
 *   { kind: "rotate", angle: { value: 45, unit: "deg" } }
 * ])
 * // → { ok: true, value: "translateX(100px) rotate(45deg)", issues: [] }
 * ```
 *
 * @public
 */
export function generate(transform: Type.Transform): GenerateResult {
	if (!transform || !Array.isArray(transform)) {
		return generateErr("invalid-ir", "Invalid transform IR: must be an array", {
			suggestion: "Ensure IR was parsed correctly",
		});
	}

	if (transform.length === 0) {
		return generateErr("invalid-ir", "Transform array cannot be empty", {
			suggestion: "Provide at least one transform function",
		});
	}

	try {
		const css = Utils.generate(transform);
		return generateOk(css);
	} catch (error) {
		return generateErr("invalid-ir", `Failed to generate transform: ${error}`, {
			suggestion: "Check that transform IR is valid",
		});
	}
}
