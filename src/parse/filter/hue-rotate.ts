// b_path:: src/parse/filter/hue-rotate.ts
import { err, ok, type Result } from "@/core/result";
import type { HueRotateFilter } from "@/core/types/filter";
import * as ASTUtils from "@/utils/ast";
import * as ParseUtils from "@/utils/parse";

/**
 * Parse CSS hue-rotate() filter function.
 *
 * Parses hue-rotate filter with angle value (deg, grad, rad, turn).
 * Value: Angle dimension representing hue rotation.
 * Any angle value is allowed (positive or negative).
 *
 * @param input - CSS string like "hue-rotate(90deg)" or "hue-rotate(0.5turn)"
 * @returns Result with HueRotateFilter IR or error message
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/hue-rotate}
 *
 * @example
 * ```typescript
 * import { parse } from "@/parse/filter/hue-rotate";
 *
 * const result = parse("hue-rotate(90deg)");
 * // { ok: true, value: { kind: "hue-rotate", angle: { value: 90, unit: "deg" } } }
 *
 * const result2 = parse("hue-rotate(0.5turn)");
 * // { ok: true, value: { kind: "hue-rotate", angle: { value: 0.5, unit: "turn" } } }
 * ```
 *
 * @public
 */
export function parse(input: string): Result<HueRotateFilter, string> {
	// Parse CSS string to AST
	const astResult = ASTUtils.parseCssString(input, "value");
	if (!astResult.ok) {
		return err(astResult.error);
	}

	// Find hue-rotate() function
	const funcResult = ASTUtils.findFunctionNode(astResult.value, "hue-rotate");
	if (!funcResult.ok) {
		return err(funcResult.error);
	}

	const fn = funcResult.value;

	// Get function arguments
	const children = ASTUtils.parseFunctionArguments(fn);

	// Expect exactly one argument
	if (children.length !== 1) {
		return err(`hue-rotate() expects 1 argument, got ${children.length}`);
	}

	const valueNode = children[0];
	if (!valueNode) {
		return err("hue-rotate() expects 1 argument");
	}

	// Parse angle value
	const angleResult = ParseUtils.parseAngleNode(valueNode);
	if (!angleResult.ok) {
		return err(angleResult.error);
	}

	const angle = angleResult.value;

	return ok({ kind: "hue-rotate", angle });
}
