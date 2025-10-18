// b_path:: src/generate/color/index.ts
import type { Color as ColorType } from "@/core/types/color";
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
 * Generate CSS from a Color IR value.
 *
 * Converts any color format back to its CSS string representation.
 * Uses modern syntax where applicable.
 *
 * @param color - The color IR to convert
 * @returns CSS color string
 *
 * @example
 * ```typescript
 * import { toCss } from "@/generate/color";
 *
 * // Hex color
 * const hex = toCss({ kind: "hex", value: "#FF5733" });
 * // => "#FF5733"
 *
 * // RGB color
 * const rgb = toCss({ kind: "rgb", r: 255, g: 87, b: 51 });
 * // => "rgb(255 87 51)"
 *
 * // Named color
 * const named = toCss({ kind: "named", name: "red" });
 * // => "red"
 *
 * // With alpha
 * const rgba = toCss({ kind: "rgb", r: 255, g: 0, b: 0, alpha: 0.5 });
 * // => "rgb(255 0 0 / 0.5)"
 * ```
 *
 * @public
 */
export function toCss(color: ColorType): string {
	switch (color.kind) {
		case "hex":
			return Hex.toCss(color);
		case "named":
			return Named.toCss(color);
		case "rgb":
			return Rgb.toCss(color);
		case "hsl":
			return Hsl.toCss(color);
		case "hwb":
			return Hwb.toCss(color);
		case "lab":
			return Lab.toCss(color);
		case "lch":
			return Lch.toCss(color);
		case "oklab":
			return Oklab.toCss(color);
		case "oklch":
			return Oklch.toCss(color);
		case "system":
			return System.toCss(color);
		case "special":
			return Special.toCss(color);
	}
}

/**
 * Color generation utilities and individual generators.
 *
 * @example
 * ```typescript
 * import { Color } from "@/generate/color";
 *
 * // Use master generator
 * const css = Color.toCss({ kind: "hex", value: "#FF5733" });
 *
 * // Use specific generator
 * const rgb = Color.rgb.toCss({ kind: "rgb", r: 255, g: 87, b: 51 });
 * const hex = Color.hex.toCss({ kind: "hex", value: "#FF5733" });
 * ```
 *
 * @public
 */
export const Color = {
	toCss,
	hex: Hex,
	named: Named,
	rgb: Rgb,
	hsl: Hsl,
	hwb: Hwb,
	lab: Lab,
	lch: Lch,
	oklab: Oklab,
	oklch: Oklch,
	system: System,
	special: Special,
};
