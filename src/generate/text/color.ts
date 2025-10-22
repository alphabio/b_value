// b_path:: src/generate/text/color.ts
import type { GenerateResult } from "@/core/result";
import type { Color } from "@/core/types/color";
import * as ColorGenerators from "../color";

/**
 * Generate CSS text-decoration-color string from Color IR.
 *
 * @param color - Color IR object
 * @returns CSS text-decoration-color string
 *
 * @public
 *
 * @example
 * ```typescript
 * import { Generate } from "b_value";
 *
 * const result = Generate.Text.Color.generate({ kind: "named", name: "red" });
 * if (result.ok) console.log(result.value); // "red"
 * ```
 */
export function generate(color: Color): GenerateResult {
	if (color === undefined || color === null) {
		return generateErr("invalid-ir", "Input must not be null or undefined");
	}
	switch (color.kind) {
		case "hex":
			return ColorGenerators.Hex.generate(color);
		case "named":
			return ColorGenerators.Named.generate(color);
		case "rgb":
			return ColorGenerators.Rgb.generate(color);
		case "hsl":
			return ColorGenerators.Hsl.generate(color);
		case "hwb":
			return ColorGenerators.Hwb.generate(color);
		case "lab":
			return ColorGenerators.Lab.generate(color);
		case "lch":
			return ColorGenerators.Lch.generate(color);
		case "oklab":
			return ColorGenerators.Oklab.generate(color);
		case "oklch":
			return ColorGenerators.Oklch.generate(color);
		case "system":
			return ColorGenerators.System.generate(color);
		case "special":
			return ColorGenerators.Special.generate(color);
		case "color":
			return ColorGenerators.ColorFunction.generate(color);
	}
}
