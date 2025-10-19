// b_path:: src/parse/clip-path/none.ts

import { err, ok, type Result } from "@/core/result";
import type { ClipPathNone } from "@/core/types/clip-path";

/**
 * Parse clip-path none keyword.
 *
 * Parses the "none" keyword which indicates no clipping is applied.
 * This is the initial/default value for clip-path.
 *
 * @param css - CSS string containing "none"
 * @returns Result with ClipPathNone IR or error message
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path}
 *
 * @example
 * ```typescript
 * import { Parse } from "b_value";
 *
 * const result = Parse.ClipPath.None.parse("none");
 * // { ok: true, value: { kind: "clip-path-none" } }
 * ```
 *
 * @public
 */
export function parse(css: string): Result<ClipPathNone, string> {
	const trimmed = css.trim();

	if (trimmed !== "none") {
		return err(`Invalid clip-path none value: "${css}"`);
	}

	return ok({ kind: "clip-path-none" });
}
