// b_path:: src/parse/layout/float.ts

import type { Float } from "@/core/types";
import type { Result } from "../../core/result";

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
 * @returns Result with Float IR or error message
 *
 * @example
 * parse("left")  // Ok({ kind: "float", value: "left" })
 * parse("right") // Ok({ kind: "float", value: "right" })
 * parse("none")  // Ok({ kind: "float", value: "none" })
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/float
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
		return {
			ok: true,
			value: {
				kind: "float",
				value: normalized as Float["value"],
			},
			error: undefined,
		};
	}

	return {
		ok: false,
		value: undefined,
		error: `Invalid float value: "${value}". Expected: left, right, none, inline-start, or inline-end`,
	};
}
