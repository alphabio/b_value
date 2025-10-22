// b_path:: src/parse/layout/clear.ts

import type { Result } from "../../core/result";

/**
 * CSS clear values
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/clear
 */
export type Clear = "left" | "right" | "both" | "none" | "inline-start" | "inline-end";

/**
 * Parse CSS clear value.
 *
 * Valid values:
 * - left: Clear past left floats
 * - right: Clear past right floats
 * - both: Clear past both left and right floats
 * - none: No clearing
 * - inline-start: Clear past floats on start side
 * - inline-end: Clear past floats on end side
 *
 * @param value - CSS clear value
 * @returns Result with Clear type or error message
 *
 * @example
 * parse("both")  // Ok("both")
 * parse("left")  // Ok("left")
 * parse("none")  // Ok("none")
 */
export function parse(value: string): Result<Clear, string> {
	const normalized = value.trim().toLowerCase();

	if (
		normalized === "left" ||
		normalized === "right" ||
		normalized === "both" ||
		normalized === "none" ||
		normalized === "inline-start" ||
		normalized === "inline-end"
	) {
		return { ok: true, value: normalized, error: undefined };
	}

	return {
		ok: false,
		value: undefined,
		error: `Invalid clear value: "${value}". Expected: left, right, both, none, inline-start, or inline-end`,
	};
}
