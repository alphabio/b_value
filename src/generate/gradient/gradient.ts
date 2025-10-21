// b_path:: src/generate/gradient/gradient.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type * as Type from "@/core/types";
import * as Conic from "./conic";
import * as Linear from "./linear";
import * as Radial from "./radial";

/**
 * Generate CSS from gradient IR with auto-detection.
 *
 * Automatically detects gradient type from IR.kind and generates appropriate CSS.
 * Supports linear, radial, and conic gradients.
 *
 * @param gradient - Gradient IR
 * @returns GenerateResult with CSS string or error
 *
 * @example
 * ```typescript
 * generate({ kind: "linear", ... })
 * // → { ok: true, value: "linear-gradient(...)", issues: [] }
 *
 * generate({ kind: "radial", ... })
 * // → { ok: true, value: "radial-gradient(...)", issues: [] }
 * ```
 *
 * @public
 */
export function generate(gradient: Type.Gradient): GenerateResult {
	// Validate IR has 'kind' field
	if (!gradient || typeof gradient !== "object" || !("kind" in gradient)) {
		return generateErr("Invalid gradient IR: missing 'kind' field", {
			suggestion: "Ensure IR was parsed correctly",
		});
	}

	// Dispatch based on kind
	switch (gradient.kind) {
		case "linear":
			return generateOk(Linear.toCss(gradient));

		case "radial":
			return generateOk(Radial.toCss(gradient));

		case "conic":
			return generateOk(Conic.toCss(gradient));

		default:
			return generateErr(`Unknown gradient kind: ${(gradient as { kind?: string }).kind}`, {
				suggestion: "Check that gradient IR is valid",
			});
	}
}
