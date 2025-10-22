// b_path:: src/generate/color/color.ts

import { type GenerateResult, generateErr } from "@/core/result";
import type * as Type from "@/core/types";
import * as ColorFunction from "./color-function";
import * as Hex from "./hex";
import * as Hsl from "./hsl";
import * as Hwb from "./hwb";
import * as Lab from "./lab";
import * as Lch from "./lch";
import * as Named from "./named";
import * as Oklab from "./oklab";
import * as Oklch from "./oklch";
import * as Rgb from "./rgb";
import * as Special from "./special";
import * as System from "./system";

/**
 * Generate CSS from color IR with auto-detection.
 *
 * Automatically detects color format from IR.kind and generates appropriate CSS.
 * Supports all 12 CSS color formats.
 *
 * @param color - Color IR
 * @returns GenerateResult with CSS string or error
 *
 * @example
 * ```typescript
 * generate({ kind: "hex", value: "#FF0000" })
 * // → { ok: true, value: "#FF0000", issues: [] }
 *
 * generate({ kind: "rgb", r: 255, g: 0, b: 0 })
 * // → { ok: true, value: "rgb(255 0 0)", issues: [] }
 *
 * generate({ kind: "hsl", h: 120, s: 100, l: 50 })
 * // → { ok: true, value: "hsl(120 100% 50%)", issues: [] }
 * ```
 *
 * @public
 */
export function generate(color: Type.Color): GenerateResult {
	// Validate IR has 'kind' field
	if (!color || typeof color !== "object" || !("kind" in color)) {
		return generateErr("missing-required-field", "Invalid color IR: missing 'kind' field", {
			suggestion: "Ensure IR was parsed correctly",
		});
	}

	// Dispatch based on kind
	switch (color.kind) {
		case "hex":
			return Hex.generate(color);

		case "named":
			return Named.generate(color);

		case "rgb":
			return Rgb.generate(color);

		case "hsl":
			return Hsl.generate(color);

		case "hwb":
			return Hwb.generate(color);

		case "lab":
			return Lab.generate(color);

		case "lch":
			return Lch.generate(color);

		case "oklab":
			return Oklab.generate(color);

		case "oklch":
			return Oklch.generate(color);

		case "system":
			return System.generate(color);

		case "special":
			return Special.generate(color);

		case "color":
			return ColorFunction.generate(color);

		default:
			return generateErr("unsupported-kind", `Unknown color kind: ${(color as { kind?: string }).kind}`, {
				suggestion: "Check that color IR is valid",
			});
	}
}
