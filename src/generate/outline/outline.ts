// b_path:: src/generate/outline/outline.ts

import { type GenerateResult, generateErr, generateOk } from "@/core/result";
import type * as Type from "@/core/types/outline";
import * as Color from "./color";
import * as Offset from "./offset";
import * as Style from "./style";
import * as Width from "./width";

/**
 * Generate CSS from outline property IR with auto-detection.
 *
 * Automatically detects outline property type from IR.kind and generates appropriate CSS.
 * Supports outline-width, outline-style, outline-color, and outline-offset.
 *
 * @param outline - Outline property IR
 * @returns GenerateResult with CSS string or error
 *
 * @example
 * Outline width:
 * ```typescript
 * import { Generate } from "b_value";
 *
 * const result = Generate.Outline.generate({
 *   kind: "outline-width",
 *   width: { value: 2, unit: "px" }
 * });
 * // → { ok: true, value: "2px", issues: [] }
 * ```
 *
 * @example
 * Outline style:
 * ```typescript
 * const result = Generate.Outline.generate({
 *   kind: "outline-style",
 *   style: "dashed"
 * });
 * // → { ok: true, value: "dashed", issues: [] }
 * ```
 *
 * @example
 * Outline color:
 * ```typescript
 * const result = Generate.Outline.generate({
 *   kind: "outline-color",
 *   color: "red"
 * });
 * // → { ok: true, value: "red", issues: [] }
 * ```
 *
 * @example
 * Outline offset:
 * ```typescript
 * const result = Generate.Outline.generate({
 *   kind: "outline-offset",
 *   offset: { value: 4, unit: "px" }
 * });
 * // → { ok: true, value: "4px", issues: [] }
 * ```
 *
 * @example
 * Invalid IR:
 * ```typescript
 * const result = Generate.Outline.generate(null);
 * // → { ok: false, issues: [{ severity: "error", message: "Invalid outline IR: missing 'kind' field" }] }
 *
 * const result2 = Generate.Outline.generate({ kind: "unknown" });
 * // → { ok: false, issues: [{ severity: "error", message: "Unknown outline kind: unknown" }] }
 * ```
 *
 * @public
 */
export function generate(
	outline: Type.OutlineWidthValue | Type.OutlineStyleValue | Type.OutlineColorValue | Type.OutlineOffsetValue,
): GenerateResult {
	// Validate IR has 'kind' field
	if (!outline || typeof outline !== "object" || !("kind" in outline)) {
		return generateErr("missing-required-field", "Invalid outline IR: missing 'kind' field", {
			suggestion: "Ensure IR was parsed correctly",
		});
	}

	// Dispatch based on kind
	switch (outline.kind) {
		case "outline-width":
			return generateOk(Width.toCss(outline));

		case "outline-style":
			return generateOk(Style.toCss(outline));

		case "outline-color":
			return generateOk(Color.toCss(outline));

		case "outline-offset":
			return generateOk(Offset.toCss(outline));

		default:
			return generateErr("unsupported-kind", `Unknown outline kind: ${(outline as { kind?: string }).kind}`, {
				suggestion:
					"Expected 'outline-width', 'outline-style', 'outline-color', or 'outline-offset'. Check that outline IR is valid.",
			});
	}
}
