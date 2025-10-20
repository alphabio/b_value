// b_path:: src/utils/parse/color-components.ts
import type * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import * as ParseUtils from "@/utils/parse";

/**
 * Options for parsing alpha values.
 */
export interface ParseAlphaOptions {
	/**
	 * If true, clamp values to 0-1 range instead of returning errors.
	 * Default: false (return errors for out-of-range values)
	 */
	clamp?: boolean;
}

/**
 * Parse an alpha (transparency) value from a CSS AST node.
 *
 * Accepts:
 * - Number: 0-1 range
 * - Percentage: 0%-100% (converted to 0-1)
 *
 * @param node - CSS AST node to parse
 * @param options - Parsing options (clamping behavior)
 * @returns Result containing alpha value (0-1) or error message
 *
 * @example
 * ```typescript
 * import { parseAlpha } from "@/utils/parse/color-components";
 *
 * // Number (0-1)
 * const alpha1 = parseAlpha(numberNode);
 * // => { ok: true, value: 0.5 }
 *
 * // Percentage (0%-100%)
 * const alpha2 = parseAlpha(percentageNode);
 * // => { ok: true, value: 0.5 }
 *
 * // With clamping
 * const alpha3 = parseAlpha(invalidNode, { clamp: true });
 * // => { ok: true, value: 1 } // clamped from 1.5
 * ```
 *
 * @public
 */
export function parseAlpha(node: csstree.CssNode, options?: ParseAlphaOptions): Result<number, string> {
	const clamp = options?.clamp ?? false;

	// Try parsing as number (0-1)
	if (node.type === "Number") {
		const numResult = ParseUtils.parseNumberNode(node);
		if (!numResult.ok) {
			return err(numResult.error);
		}
		const value = numResult.value;

		if (clamp) {
			return ok(Math.max(0, Math.min(1, value)));
		}

		if (value < 0 || value > 1) {
			return err(`Alpha value must be between 0 and 1, got ${value}`);
		}
		return ok(value);
	}

	// Try parsing as percentage (0%-100%)
	if (node.type === "Percentage") {
		const value = Number.parseFloat(node.value);
		if (Number.isNaN(value)) {
			return err("Invalid percentage value for alpha");
		}

		// Convert percentage to 0-1 range
		const alphaValue = value / 100;

		if (clamp) {
			return ok(Math.max(0, Math.min(1, alphaValue)));
		}

		if (value < 0 || value > 100) {
			return err(`Alpha percentage must be between 0% and 100%, got ${value}%`);
		}
		return ok(alphaValue);
	}

	return err(`Expected number or percentage for alpha, got ${node.type}`);
}

/**
 * Parse a hue value from a CSS AST node.
 *
 * Accepts:
 * - Number: Unitless degrees
 * - Dimension: Angle with unit (deg, rad, grad, turn)
 *
 * Hue is normalized to 0-360 degrees range with wrapping.
 *
 * @param node - CSS AST node to parse
 * @returns Result containing hue value (0-360 degrees) or error message
 *
 * @example
 * ```typescript
 * import { parseHue } from "@/utils/parse/color-components";
 *
 * // Unitless number (defaults to degrees)
 * const hue1 = parseHue(numberNode);
 * // => { ok: true, value: 120 }
 *
 * // Angle with unit
 * const hue2 = parseHue(angleNode);
 * // => { ok: true, value: 180 } // converted from 0.5turn
 *
 * // Wrapping (negative values)
 * const hue3 = parseHue(negativeNode);
 * // => { ok: true, value: 330 } // -30 wraps to 330
 * ```
 *
 * @public
 */
export function parseHue(node: csstree.CssNode): Result<number, string> {
	// Unitless number (defaults to degrees)
	if (node.type === "Number") {
		const numResult = ParseUtils.parseNumberNode(node);
		if (!numResult.ok) {
			return err(numResult.error);
		}
		return ok(normalizeHue(numResult.value));
	}

	// Angle with unit
	if (node.type === "Dimension") {
		const angleResult = ParseUtils.parseAngleNode(node);
		if (!angleResult.ok) {
			return err(angleResult.error);
		}

		const angle = angleResult.value;
		// Convert to degrees
		let degrees: number;
		switch (angle.unit) {
			case "deg":
				degrees = angle.value;
				break;
			case "rad":
				degrees = (angle.value * 180) / Math.PI;
				break;
			case "grad":
				degrees = (angle.value * 360) / 400;
				break;
			case "turn":
				degrees = angle.value * 360;
				break;
			default:
				return err(`Unsupported angle unit: ${angle.unit}`);
		}

		return ok(normalizeHue(degrees));
	}

	return err(`Expected number or angle for hue, got ${node.type}`);
}

/**
 * Normalize hue to 0-360 degrees range with wrapping.
 *
 * @param hue - Hue value in degrees
 * @returns Normalized hue (0-360)
 *
 * @internal
 */
function normalizeHue(hue: number): number {
	// Wrap to 0-360 range
	const normalized = hue % 360;
	// Handle negative values
	const positive = normalized < 0 ? normalized + 360 : normalized;
	// Ensure positive zero (avoid -0)
	return positive === 0 ? 0 : positive;
}

/**
 * Range specification for lightness values.
 */
export type LightnessRange = "0-1" | "0-100";

/**
 * Parse a lightness value from a CSS AST node.
 *
 * Accepts:
 * - Number: Unitless value in specified range
 * - Percentage: 0%-100% (converted to specified range)
 *
 * Values are clamped to the specified range.
 *
 * @param node - CSS AST node to parse
 * @param range - Expected range for lightness ("0-1" or "0-100")
 * @returns Result containing lightness value (clamped) or error message
 *
 * @example
 * ```typescript
 * import { parseLightness } from "@/utils/parse/color-components";
 *
 * // Number in 0-100 range (for LAB/LCH)
 * const lightness1 = parseLightness(numberNode, "0-100");
 * // => { ok: true, value: 50 }
 *
 * // Number in 0-1 range (for OKLab/OKLCH)
 * const lightness2 = parseLightness(numberNode, "0-1");
 * // => { ok: true, value: 0.5 }
 *
 * // Percentage (converts to range)
 * const lightness3 = parseLightness(percentageNode, "0-100");
 * // => { ok: true, value: 50 } // from 50%
 * ```
 *
 * @public
 */
export function parseLightness(node: csstree.CssNode, range: LightnessRange): Result<number, string> {
	const maxValue = range === "0-1" ? 1 : 100;

	// Try percentage first
	if (node.type === "Percentage") {
		const value = Number.parseFloat(node.value);
		if (Number.isNaN(value)) {
			return err("Invalid percentage value for lightness");
		}
		// Convert percentage to range and clamp
		const lightness = (value / 100) * maxValue;
		return ok(Math.max(0, Math.min(maxValue, lightness)));
	}

	// Try number
	if (node.type === "Number") {
		const numResult = ParseUtils.parseNumberNode(node);
		if (!numResult.ok) {
			return err(numResult.error);
		}
		// Clamp to range
		return ok(Math.max(0, Math.min(maxValue, numResult.value)));
	}

	return err(`Expected number or percentage for lightness, got ${node.type}`);
}

/**
 * Options for parsing percentage values.
 */
export interface ParsePercentageOptions {
	/**
	 * If true, clamp values to 0-100 range instead of returning errors.
	 * Default: false (return errors for out-of-range values)
	 */
	clamp?: boolean;
}

/**
 * Parse a percentage value from a CSS AST node.
 *
 * Accepts:
 * - Percentage: 0%-100%
 *
 * @param node - CSS AST node to parse
 * @param options - Parsing options (clamping behavior)
 * @returns Result containing percentage value (0-100) or error message
 *
 * @example
 * ```typescript
 * import { parsePercentage } from "@/utils/parse/color-components";
 *
 * // Valid percentage
 * const pct1 = parsePercentage(percentageNode);
 * // => { ok: true, value: 50 }
 *
 * // With clamping
 * const pct2 = parsePercentage(invalidNode, { clamp: true });
 * // => { ok: true, value: 100 } // clamped from 150
 * ```
 *
 * @public
 */
export function parsePercentage(node: csstree.CssNode, options?: ParsePercentageOptions): Result<number, string> {
	const clamp = options?.clamp ?? false;

	if (node.type === "Percentage") {
		const value = Number.parseFloat(node.value);
		if (Number.isNaN(value)) {
			return err("Invalid percentage value");
		}

		if (clamp) {
			return ok(Math.max(0, Math.min(100, value)));
		}

		if (value < 0 || value > 100) {
			return err(`Percentage must be between 0% and 100%, got ${value}%`);
		}
		return ok(value);
	}

	return err(`Expected percentage, got ${node.type}`);
}
