// b_path:: src/generate/border/border.ts

import { type GenerateResult, generateErr } from "@/core/result";
import type * as Type from "@/core/types/border";
import * as Color from "./color";
import * as Radius from "./radius";
import * as Style from "./style";
import * as Width from "./width";

/**
 * Generate CSS from border property IR with auto-detection.
 *
 * Automatically detects border property type from IR.kind and generates appropriate CSS.
 * Supports border-width, border-style, border-color, and border-radius.
 *
 * @param border - Border property IR
 * @returns GenerateResult with CSS string or error
 *
 * @example
 * Border width:
 * ```typescript
 * import { Generate } from "b_value";
 *
 * const result = Generate.Border.generate({
 *   kind: "border-width",
 *   width: { value: 2, unit: "px" }
 * });
 * // → { ok: true, value: "2px", issues: [] }
 * ```
 *
 * @example
 * Border style:
 * ```typescript
 * const result = Generate.Border.generate({
 *   kind: "border-style",
 *   style: "solid"
 * });
 * // → { ok: true, value: "solid", issues: [] }
 * ```
 *
 * @example
 * Border color:
 * ```typescript
 * const result = Generate.Border.generate({
 *   kind: "border-color",
 *   color: "red"
 * });
 * // → { ok: true, value: "red", issues: [] }
 * ```
 *
 * @example
 * Border radius:
 * ```typescript
 * const result = Generate.Border.generate({
 *   kind: "border-radius",
 *   radius: { value: 4, unit: "px" }
 * });
 * // → { ok: true, value: "4px", issues: [] }
 * ```
 *
 * @example
 * Invalid IR:
 * ```typescript
 * const result = Generate.Border.generate(null);
 * // → { ok: false, issues: [{ severity: "error", message: "Invalid border IR: missing 'kind' field" }] }
 *
 * const result2 = Generate.Border.generate({ kind: "unknown" });
 * // → { ok: false, issues: [{ severity: "error", message: "Unknown border kind: unknown" }] }
 * ```
 *
 * @public
 */
export function generate(
	border: Type.BorderWidthValue | Type.BorderStyleValue | Type.BorderColorValue | Type.BorderRadiusValue,
): GenerateResult {
	// Validate IR has 'kind' field
	if (!border || typeof border !== "object" || !("kind" in border)) {
		return generateErr("missing-required-field", "Invalid border IR: missing 'kind' field", {
			suggestion: "Ensure IR was parsed correctly",
		});
	}

	// Dispatch based on kind
	switch (border.kind) {
		case "border-width":
			return Width.generate(border);

		case "border-style":
			return Style.generate(border);

		case "border-color":
			return Color.generate(border);

		case "border-radius":
			return Radius.generate(border);

		default:
			return generateErr("unsupported-kind", `Unknown border kind: ${(border as { kind?: string }).kind}`, {
				suggestion:
					"Expected 'border-width', 'border-style', 'border-color', or 'border-radius'. Check that border IR is valid.",
			});
	}
}
