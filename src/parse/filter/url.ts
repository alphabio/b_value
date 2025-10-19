// b_path:: src/parse/filter/url.ts
import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type { UrlFilter } from "@/core/types/filter";
import * as ASTUtils from "@/utils/ast";

/**
 * Parse CSS url() filter function.
 *
 * Parses url filter for SVG filter references.
 * Accepts fragment identifiers (#id) or file paths.
 * Supports quoted and unquoted URLs.
 *
 * @param input - CSS string like "url(#filter)" or "url('path/to/filter.svg')"
 * @returns Result with UrlFilter IR or error message
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/url}
 *
 * @example
 * ```typescript
 * import { parse } from "@/parse/filter/url";
 *
 * const result = parse("url(#filter-id)");
 * // { ok: true, value: { kind: "url", url: "#filter-id" } }
 *
 * const result2 = parse("url('path/to/filter.svg')");
 * // { ok: true, value: { kind: "url", url: "path/to/filter.svg" } }
 * ```
 *
 * @public
 */
export function parse(input: string): Result<UrlFilter, string> {
	// Parse CSS string to AST
	const astResult = ASTUtils.parseCssString(input, "value");
	if (!astResult.ok) {
		return err(astResult.error);
	}

	// Find url() in the AST
	// url() is represented as a Url node, not a Function node
	const ast = astResult.value;
	let foundUrl = "";

	// Walk the AST to find Url node
	csstree.walk(ast, {
		visit: "Url",
		enter(node: csstree.Url) {
			foundUrl = node.value;
			return false; // Stop walking once found
		},
	});

	if (foundUrl === "") {
		return err("Expected url() function");
	}

	return ok({ kind: "url", url: foundUrl });
}
