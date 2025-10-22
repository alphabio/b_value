// b_path:: src/parse/layout/float.ts

import type { Result } from "../../core/result";

/**
 * CSS float values
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/float
 */
export type Float = "left" | "right" | "none" | "inline-start" | "inline-end";

/**
 * Parse CSS float value.
 *
 * Valid values:
 * - left: Float to the left side
 * - right: Float to the right side
 * - none: No floating
 * - inline-start: Float to start side of containing block
 * - inline-end: Float to end side of containing block
 *
 * @param value - CSS float value
 * @returns Result with Float type or error message
 *
 * @example
 * parse("left")  // Ok("left")
 * parse("right") // Ok("right")
 * parse("none")  // Ok("none")
 */
export function parse(value: string): Result<Float, string> {
	const normalized = value.trim().toLowerCase();

	if (
		normalized === "left" ||
		normalized === "right" ||
		normalized === "none" ||
		normalized === "inline-start" ||
		normalized === "inline-end"
	) {
		return { ok: true, value: normalized, error: undefined };
	}

	return {
		ok: false,
		value: undefined,
		error: `Invalid float value: "${value}". Expected: left, right, none, inline-start, or inline-end`,
	};
}
