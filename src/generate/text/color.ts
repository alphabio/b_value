// b_path:: src/generate/text/color.ts
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
 * const css = Generate.Text.Color.toCss({ kind: "named", name: "red" });
 * console.log(css); // "red"
 * ```
 */
export function toCss(color: Color): string {
	switch (color.kind) {
		case "hex":
			return ColorGenerators.Hex.toCss(color);
		case "named":
			return ColorGenerators.Named.toCss(color);
		case "rgb":
			return ColorGenerators.Rgb.toCss(color);
		case "hsl":
			return ColorGenerators.Hsl.toCss(color);
		case "hwb":
			return ColorGenerators.Hwb.toCss(color);
		case "lab":
			return ColorGenerators.Lab.toCss(color);
		case "lch":
			return ColorGenerators.Lch.toCss(color);
		case "oklab":
			return ColorGenerators.Oklab.toCss(color);
		case "oklch":
			return ColorGenerators.Oklch.toCss(color);
		case "system":
			return ColorGenerators.System.toCss(color);
		case "special":
			return ColorGenerators.Special.toCss(color);
		case "color":
			return ColorGenerators.ColorFunction.toCss(color);
	}
}
