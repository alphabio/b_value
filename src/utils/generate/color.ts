// b_path:: src/utils/generate/color.ts
import type { Color } from "@/core/types/color";
import * as ColorGenerate from "@/generate/color";

/**
 * Generate CSS from any Color IR format.
 *
 * Convenience helper that dispatches to appropriate color generator
 * based on the color's kind field.
 *
 * @param color - Color IR to convert
 * @returns CSS color string
 *
 * @internal
 */
export function generateColor(color: Color): string {
	switch (color.kind) {
		case "hex":
			return ColorGenerate.Hex.toCss(color);
		case "named":
			return ColorGenerate.Named.toCss(color);
		case "rgb":
			return ColorGenerate.Rgb.toCss(color);
		case "hsl":
			return ColorGenerate.Hsl.toCss(color);
		case "hwb":
			return ColorGenerate.Hwb.toCss(color);
		case "lab":
			return ColorGenerate.Lab.toCss(color);
		case "lch":
			return ColorGenerate.Lch.toCss(color);
		case "oklab":
			return ColorGenerate.Oklab.toCss(color);
		case "oklch":
			return ColorGenerate.Oklch.toCss(color);
		case "system":
			return ColorGenerate.System.toCss(color);
		case "special":
			return ColorGenerate.Special.toCss(color);
		case "color":
			return ColorGenerate.ColorFunction.toCss(color);
	}
}
