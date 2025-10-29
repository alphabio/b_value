// b_path:: src/parse/layout/clear.ts

import type { Clear } from "@/core/types";
import type { Result } from "../../core/result";

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
 * @returns Result with Clear IR or error message
 *
 * @example
 * parse("both")  // Ok({ kind: "clear", value: "both" })
 * parse("left")  // Ok({ kind: "clear", value: "left" })
 * parse("none")  // Ok({ kind: "clear", value: "none" })
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/clear
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
		return {
			ok: true,
			value: {
				kind: "clear",
				value: normalized as Clear["value"],
			},
			error: undefined,
		};
	}

	return {
		ok: false,
		value: undefined,
		error: `Invalid clear value: "${value}". Expected: left, right, both, none, inline-start, or inline-end`,
	};
}
