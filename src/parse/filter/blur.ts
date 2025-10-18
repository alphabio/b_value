// b_path:: src/parse/filter/blur.ts
import { err, ok, type Result } from "@/core/result";
import type { BlurFilter } from "@/core/types/filter";
import * as ASTUtils from "@/utils/ast";
import * as ParseUtils from "@/utils/parse";

/**
 * Parse CSS blur() filter function.
 *
 * Parses blur filter with length value (px, em, rem, etc.).
 * Value: Length dimension representing blur radius.
 * Negative values are not allowed.
 *
 * @param input - CSS string like "blur(5px)" or "blur(1rem)"
 * @returns Result with BlurFilter IR or error message
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/blur}
 *
 * @example
 * ```typescript
 * import { parse } from "@/parse/filter/blur";
 *
 * const result = parse("blur(5px)");
 * // { ok: true, value: { kind: "blur", radius: { value: 5, unit: "px" } } }
 *
 * const result2 = parse("blur(1rem)");
 * // { ok: true, value: { kind: "blur", radius: { value: 1, unit: "rem" } } }
 * ```
 *
 * @public
 */
export function parse(input: string): Result<BlurFilter, string> {
	// Parse CSS string to AST
	const astResult = ASTUtils.parseCssString(input, "value");
	if (!astResult.ok) {
		return err(astResult.error);
	}

	// Find blur() function
	const funcResult = ASTUtils.findFunctionNode(astResult.value, "blur");
	if (!funcResult.ok) {
		return err(funcResult.error);
	}

	const fn = funcResult.value;

	// Get function arguments
	const children = ASTUtils.parseFunctionArguments(fn);

	// Expect exactly one argument
	if (children.length !== 1) {
		return err(`blur() expects 1 argument, got ${children.length}`);
	}

	const valueNode = children[0];
	if (!valueNode) {
		return err("blur() expects 1 argument");
	}

	// Parse length value
	const lengthResult = ParseUtils.parseLengthNode(valueNode);
	if (!lengthResult.ok) {
		return err(lengthResult.error);
	}

	const radius = lengthResult.value;

	// Validate non-negative
	if (radius.value < 0) {
		return err(`blur() radius must be non-negative, got ${radius.value}${radius.unit}`);
	}

	return ok({ kind: "blur", radius });
}
