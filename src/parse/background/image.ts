// b_path:: src/parse/background/image.ts

import type { CssNode } from "css-tree";
import * as csstree from "css-tree";
import { err, ok, type ParseResult, type Result, toParseResult } from "@/core/result";
import type * as Type from "@/core/types";
import * as GradientParse from "@/parse/gradient/gradient";
import { parseCommaSeparatedSingle } from "@/utils/parse/comma-separated";

/**
 * Background image layer - can be gradient, URL, or none.
 */
export type BackgroundImageLayer = { kind: "none" } | { kind: "url"; url: string } | Type.Gradient;

/**
 * Background image value - array of layers.
 */
export type BackgroundImage = BackgroundImageLayer[];

/**
 * Parse background-image value.
 *
 * Supports comma-separated list of:
 * - Gradients: linear-gradient(), radial-gradient(), conic-gradient()
 * - URLs: url(...)
 * - Keyword: none
 *
 * @param value - CSS background-image value
 * @returns ParseResult with array of layers
 *
 * @example
 * ```typescript
 * parse("linear-gradient(red, blue)");
 * // Returns: [{ kind: "linear", ... }]
 *
 * parse("url(bg.png), linear-gradient(red, blue)");
 * // Returns: [{ kind: "url", url: "bg.png" }, { kind: "linear", ... }]
 *
 * parse("none");
 * // Returns: [{ kind: "none" }]
 * ```
 *
 * @public
 */
export function parse(value: string): ParseResult<BackgroundImage> {
	const result = parseCommaSeparatedSingle(value, parseSingleLayerNode, "background-image");

	return toParseResult(result);
}

/**
 * Parse a single background-image layer from AST node.
 *
 * @param node - CSS AST node for single layer
 * @returns Result with layer or error
 *
 * @internal
 */
function parseSingleLayerNode(node: CssNode): Result<BackgroundImageLayer, string> {
	// Convert node back to CSS string for parsing
	const css = csstree.generate(node);
	const trimmed = css.trim();

	// Check for 'none' keyword
	if (node.type === "Identifier" && trimmed === "none") {
		return ok({ kind: "none" });
	}

	// Check for url() function
	if (node.type === "Url") {
		return parseURLNode(node);
	}

	// Must be a gradient function
	if (node.type === "Function") {
		const gradientResult = GradientParse.parse(css);
		if (!gradientResult.ok) {
			return err(gradientResult.issues[0]?.message || "Invalid gradient syntax");
		}

		if (!gradientResult.value) {
			return err("Gradient parsing returned undefined value");
		}

		return ok(gradientResult.value);
	}

	return err(`Unexpected node type: ${node.type}`);
}

/**
 * Parse url() AST node.
 *
 * @param node - Url AST node
 * @returns Result with URL layer or error
 *
 * @internal
 */
function parseURLNode(node: CssNode): Result<BackgroundImageLayer, string> {
	if (node.type !== "Url") {
		return err("Expected Url node");
	}

	// Convert to CSS and extract URL
	const css = csstree.generate(node);
	const match = css.match(/^url\(\s*(['"]?)([^'"()]+)\1\s*\)$/);

	if (!match || !match[2]) {
		return err("Invalid url() syntax");
	}

	return ok({
		kind: "url",
		url: match[2],
	});
}
