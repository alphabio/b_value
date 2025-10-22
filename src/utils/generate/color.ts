// b_path:: src/utils/generate/color.ts

import type { GenerateResult } from "@/core/result";
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
	let result: GenerateResult;
	switch (color.kind) {
		case "hex":
			result = ColorGenerate.Hex.generate(color);
			break;
		case "named":
			result = ColorGenerate.Named.generate(color);
			break;
		case "rgb":
			result = ColorGenerate.Rgb.generate(color);
			break;
		case "hsl":
			result = ColorGenerate.Hsl.generate(color);
			break;
		case "hwb":
			result = ColorGenerate.Hwb.generate(color);
			break;
		case "lab":
			result = ColorGenerate.Lab.generate(color);
			break;
		case "lch":
			result = ColorGenerate.Lch.generate(color);
			break;
		case "oklab":
			result = ColorGenerate.Oklab.generate(color);
			break;
		case "oklch":
			result = ColorGenerate.Oklch.generate(color);
			break;
		case "system":
			result = ColorGenerate.System.generate(color);
			break;
		case "special":
			result = ColorGenerate.Special.generate(color);
			break;
		case "color":
			result = ColorGenerate.ColorFunction.generate(color);
			break;
	}
	return result.ok ? result.value : "";
}
