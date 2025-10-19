// b_path:: src/parse/clip-path/url.ts

import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type { Url } from "@/core/types/url";
import * as ASTUtils from "@/utils/ast";

/**
 * Parse CSS url() for clip-path property.
 *
 * Parses URL references to SVG clipping paths.
 * Accepts fragment identifiers (#id) or file paths.
 * Supports quoted and unquoted URLs.
 *
 * @param input - CSS string like "url(#clip)" or "url('shapes.svg#clip')"
 * @returns Result with Url IR or error message
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path}
 *
 * @example
 * ```typescript
 * import { Parse } from "b_value";
 *
 * const result = Parse.ClipPath.Url.parse("url(#clip-shape)");
 * // { ok: true, value: { kind: "url", value: "#clip-shape" } }
 *
 * const result2 = Parse.ClipPath.Url.parse("url('shapes.svg#clip')");
 * // { ok: true, value: { kind: "url", value: "shapes.svg#clip" } }
 * ```
 *
 * @public
 */
export function parse(input: string): Result<Url, string> {
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
