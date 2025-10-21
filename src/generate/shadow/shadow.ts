// b_path:: src/generate/shadow/shadow.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type * as Type from "@/core/types/shadow";
import * as BoxShadow from "./box-shadow";
import * as TextShadow from "./text-shadow";

/**
 * Generate CSS from shadow IR with auto-detection.
 *
 * Automatically detects shadow type from IR.kind and generates appropriate CSS.
 * Supports both box-shadow and text-shadow formats.
 *
 * @param shadow - Shadow IR (BoxShadow or TextShadow)
 * @returns GenerateResult with CSS string or error
 *
 * @example
 * Box shadow:
 * ```typescript
 * import { Generate } from "b_value";
 *
 * const result = Generate.Shadow.generate({
 *   kind: "box-shadow",
 *   shadows: [{
 *     offsetX: { value: 2, unit: "px" },
 *     offsetY: { value: 2, unit: "px" },
 *     blurRadius: { value: 4, unit: "px" },
 *     color: { kind: "named", name: "black" }
 *   }]
 * });
 * // → { ok: true, value: "2px 2px 4px black", issues: [] }
 * ```
 *
 * @example
 * Text shadow:
 * ```typescript
 * const result = Generate.Shadow.generate({
 *   kind: "text-shadow",
 *   shadows: [{
 *     offsetX: { value: 1, unit: "px" },
 *     offsetY: { value: 1, unit: "px" },
 *     blurRadius: { value: 2, unit: "px" },
 *     color: { kind: "named", name: "gray" }
 *   }]
 * });
 * // → { ok: true, value: "1px 1px 2px gray", issues: [] }
 * ```
 *
 * @example
 * Multiple shadows:
 * ```typescript
 * const result = Generate.Shadow.generate({
 *   kind: "box-shadow",
 *   shadows: [
 *     {
 *       offsetX: { value: 2, unit: "px" },
 *       offsetY: { value: 2, unit: "px" },
 *       color: { kind: "named", name: "black" }
 *     },
 *     {
 *       inset: true,
 *       offsetX: { value: 0, unit: "px" },
 *       offsetY: { value: 0, unit: "px" },
 *       blurRadius: { value: 10, unit: "px" },
 *       color: { kind: "named", name: "white" }
 *     }
 *   ]
 * });
 * // → { ok: true, value: "2px 2px black, inset 0px 0px 10px white", issues: [] }
 * ```
 *
 * @example
 * Invalid IR:
 * ```typescript
 * const result = Generate.Shadow.generate(null);
 * // → { ok: false, issues: [{ severity: "error", message: "Invalid shadow IR: missing 'kind' field" }] }
 *
 * const result2 = Generate.Shadow.generate({ kind: "unknown" });
 * // → { ok: false, issues: [{ severity: "error", message: "Unknown shadow kind: unknown" }] }
 * ```
 *
 * @public
 */
export function generate(shadow: Type.BoxShadow | Type.TextShadow): GenerateResult {
	// Validate IR has 'kind' field
	if (!shadow || typeof shadow !== "object" || !("kind" in shadow)) {
		return generateErr("Invalid shadow IR: missing 'kind' field", {
			suggestion: "Ensure IR was parsed correctly",
		});
	}

	// Dispatch based on kind
	switch (shadow.kind) {
		case "box-shadow":
			return generateOk(BoxShadow.toCss(shadow));

		case "text-shadow":
			return generateOk(TextShadow.toCss(shadow));

		default:
			return generateErr(`Unknown shadow kind: ${(shadow as { kind?: string }).kind}`, {
				suggestion: "Expected 'box-shadow' or 'text-shadow'. Check that shadow IR is valid.",
			});
	}
}
