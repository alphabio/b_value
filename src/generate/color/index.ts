// b_path:: src/generate/color/index.ts

/**
 * CSS color generators - convert color IR to CSS strings.
 *
 * All color generators return CSS strings directly.
 *
 * @module Generate.Color
 * @public
 */

/**
 * Generate hex color CSS strings.
 *
 * @see {@link Hex.toCss}
 */
export * as Hex from "./hex";
/**
 * Generate HSL color CSS strings.
 *
 * @see {@link Hsl.toCss}
 */
export * as Hsl from "./hsl";
/**
 * Generate HWB color CSS strings.
 *
 * @see {@link Hwb.toCss}
 */
export * as Hwb from "./hwb";
/**
 * Generate LAB color CSS strings.
 *
 * @see {@link Lab.toCss}
 */
export * as Lab from "./lab";
/**
 * Generate LCH color CSS strings.
 *
 * @see {@link Lch.toCss}
 */
export * as Lch from "./lch";
/**
 * Generate named color CSS strings.
 *
 * @see {@link Named.toCss}
 */
export * as Named from "./named";
/**
 * Generate OKLab color CSS strings.
 *
 * @see {@link Oklab.toCss}
 */
export * as Oklab from "./oklab";
/**
 * Generate OKLCH color CSS strings.
 *
 * @see {@link Oklch.toCss}
 */
export * as Oklch from "./oklch";
/**
 * Generate RGB color CSS strings.
 *
 * @see {@link Rgb.toCss}
 */
export * as Rgb from "./rgb";
/**
 * Generate special color CSS strings (transparent, currentcolor).
 *
 * @see {@link Special.toCss}
 */
export * as Special from "./special";
/**
 * Generate system color CSS strings.
 *
 * @see {@link System.toCss}
 */
export * as System from "./system";
