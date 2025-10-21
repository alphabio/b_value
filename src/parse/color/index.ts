// b_path:: src/parse/color/index.ts

/**
 * CSS color parsers - convert color strings to structured IR.
 *
 * All color parsers return Result<T, string> for type-safe error handling.
 *
 * @module Parse.Color
 * @public
 */

export { parse } from "./color";

/**
 * Parse color() function values.
 *
 * @see {@link ColorFunction.parse}
 */
export * as ColorFunction from "./color-function";
/**
 * Parse hex color values.
 *
 * @see {@link Hex.parse}
 */
export * as Hex from "./hex";
/**
 * Parse HSL color values.
 *
 * @see {@link Hsl.parse}
 */
export * as Hsl from "./hsl";
/**
 * Parse HWB color values.
 *
 * @see {@link Hwb.parse}
 */
export * as Hwb from "./hwb";
/**
 * Parse LAB color values.
 *
 * @see {@link Lab.parse}
 */
export * as Lab from "./lab";
/**
 * Parse LCH color values.
 *
 * @see {@link Lch.parse}
 */
export * as Lch from "./lch";
/**
 * Parse named color values.
 *
 * @see {@link Named.parse}
 */
export * as Named from "./named";
/**
 * Parse OKLab color values.
 *
 * @see {@link Oklab.parse}
 */
export * as Oklab from "./oklab";
/**
 * Parse OKLCH color values.
 *
 * @see {@link Oklch.parse}
 */
export * as Oklch from "./oklch";
/**
 * Parse RGB color values.
 *
 * @see {@link Rgb.parse}
 */
export * as Rgb from "./rgb";
/**
 * Parse special color values (transparent, currentcolor).
 *
 * @see {@link Special.parse}
 */
export * as Special from "./special";
/**
 * Parse system color values.
 *
 * @see {@link System.parse}
 */
export * as System from "./system";
