// b_path:: src/parse/layout/overflow.ts

import type { Result } from "../../core/result";

/**
 * CSS overflow values (applies to both x and y axes)
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/overflow
 */
export type Overflow = "visible" | "hidden" | "clip" | "scroll" | "auto";

/**
 * Parse CSS overflow value.
 *
 * Valid values:
 * - visible: Content not clipped, may render outside box
 * - hidden: Content clipped, no scrollbars
 * - clip: Content hard-clipped at padding box
 * - scroll: Content clipped, scrollbars always shown
 * - auto: Content clipped, scrollbars if needed
 *
 * @param value - CSS overflow value
 * @returns Result with Overflow type or error message
 *
 * @example
 * parse("auto")    // Ok("auto")
 * parse("hidden")  // Ok("hidden")
 * parse("invalid") // Err(...)
 */
export function parse(value: string): Result<Overflow, string> {
	const normalized = value.trim().toLowerCase();

	if (
		normalized === "visible" ||
		normalized === "hidden" ||
		normalized === "clip" ||
		normalized === "scroll" ||
		normalized === "auto"
	) {
		return { ok: true, value: normalized, error: undefined };
	}

	return {
		ok: false,
		value: undefined,
		error: `Invalid overflow value: "${value}". Expected: visible, hidden, clip, scroll, or auto`,
	};
}
