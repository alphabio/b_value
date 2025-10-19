// b_path:: src/utils/parse/url.ts

import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type { Url } from "@/core/types/url";
import * as ASTUtils from "@/utils/ast";

/**
 * Parse CSS url() function.
 *
 * Shared utility for parsing URL references across different CSS properties.
 * Handles quoted and unquoted URLs, fragment identifiers, file paths, etc.
 *
 * @param input - CSS string like "url(#id)" or "url('path.svg')"
 * @returns Result with Url IR or error message
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/url_function}
 *
 * @example
 * ```typescript
 * import { parseUrl } from "@/utils/parse/url";
 *
 * const result = parseUrl("url(#clip-shape)");
 * // { ok: true, value: { kind: "url", value: "#clip-shape" } }
 *
 * const result2 = parseUrl("url('shapes.svg#clip')");
 * // { ok: true, value: { kind: "url", value: "shapes.svg#clip" } }
 * ```
 *
 * @public
 */
export function parseUrl(input: string): Result<Url, string> {
	const astResult = ASTUtils.parseCssString(input, "value");
	if (!astResult.ok) {
		return err(astResult.error);
	}

	const ast = astResult.value;
	let foundUrl = "";

	csstree.walk(ast, {
		visit: "Url",
		enter(node: csstree.Url) {
			foundUrl = node.value;
			return false;
		},
	});

	if (foundUrl === "") {
		return err("Expected url() function");
	}

	return ok({ kind: "url", value: foundUrl });
}
