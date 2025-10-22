// b_path:: src/parse/background/position-x.ts

import { type ParseResult, parseErr, parseOk } from "@/core/result";
import type * as Type from "@/core/types";
import * as ParseUtils from "@/utils/parse";

/**
 * Parse background-position-x value.
 *
 * Parses the horizontal position of a background image.
 * Supports keywords (left, center, right) and length-percentage values.
 *
 * @param css - CSS string containing background-position-x value
 * @returns ParseResult containing PositionValue IR or error
 *
 * @public
 *
 * @example
 * Keyword:
 * ```typescript
 * import { Parse } from "b_value";
 *
 * const result = Parse.Background.PositionX.parse("center");
 * if (result.ok) {
 *   console.log(result.value); // "center"
 * }
 * ```
 *
 * @example
 * Percentage:
 * ```typescript
 * const result = Parse.Background.PositionX.parse("25%");
 * if (result.ok) {
 *   console.log(result.value); // { value: 25, unit: "%" }
 * }
 * ```
 *
 * @example
 * Length:
 * ```typescript
 * const result = Parse.Background.PositionX.parse("10px");
 * if (result.ok) {
 *   console.log(result.value); // { value: 10, unit: "px" }
 * }
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/background-position-x | MDN: background-position-x}
 */
export function parse(css: string): ParseResult<Type.PositionValue> {
	const csstree = require("css-tree");

	try {
		const ast = csstree.parse(css, { context: "value" });
		const children = ast.children.toArray();

		if (children.length === 0) {
			return parseErr("invalid-syntax", "No position value found in CSS string");
		}

		if (children.length > 1) {
			return parseErr("invalid-value", "background-position-x accepts only a single value");
		}

		const node = children[0];
		if (!node) {
			return parseErr("invalid-syntax", "Missing position value");
		}

		const result = ParseUtils.parsePositionValueNode(node);
		if (!result.ok) {
			return parseErr("invalid-value", result.error);
		}

		return parseOk(result.value);
	} catch (e) {
		return parseErr("invalid-syntax", `Failed to parse CSS: ${e instanceof Error ? e.message : String(e)}`);
	}
}
