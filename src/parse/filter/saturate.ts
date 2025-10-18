// b_path:: src/parse/filter/saturate.ts
import { err, ok, type Result } from "@/core/result";
import type { SaturateFilter } from "@/core/types/filter";
import * as ASTUtils from "@/utils/ast";
import * as ParseUtils from "@/utils/parse";

/**
 * Parse CSS saturate() filter function.
 *
 * Parses saturate filter with number or percentage value.
 * Number values: 1 = 100% saturate (no change)
 * Percentage values: converted to decimal (150% → 1.5)
 * Value range: 0 to infinity (0 = completely black)
 *
 * @param input - CSS string like "saturate(1.5)" or "saturate(150%)"
 * @returns Result with SaturateFilter IR or error message
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/saturate}
 *
 * @example
 * ```typescript
 * import { parse } from "@/parse/filter/saturate";
 *
 * const result = parse("saturate(1.5)");
 * // { ok: true, value: { kind: "saturate", value: 1.5 } }
 *
 * const result2 = parse("saturate(150%)");
 * // { ok: true, value: { kind: "saturate", value: 1.5 } }
 * ```
 *
 * @public
 */
export function parse(input: string): Result<SaturateFilter, string> {
	// Parse CSS string to AST
	const astResult = ASTUtils.parseCssString(input, "value");
	if (!astResult.ok) {
		return err(astResult.error);
	}

	// Find saturate() function
	const funcResult = ASTUtils.findFunctionNode(astResult.value, "saturate");
	if (!funcResult.ok) {
		return err(funcResult.error);
	}

	const fn = funcResult.value;

	// Get function arguments
	const children = ASTUtils.parseFunctionArguments(fn);

	// Expect exactly one argument
	if (children.length !== 1) {
		return err(`saturate() expects 1 argument, got ${children.length}`);
	}

	const valueNode = children[0];
	if (!valueNode) {
		return err("saturate() expects 1 argument");
	}

	// Parse number or percentage
	let value: number;

	if (valueNode.type === "Percentage") {
		// Parse percentage value - saturate allows > 100%
		const rawValue = Number.parseFloat(valueNode.value);
		if (Number.isNaN(rawValue)) {
			return err("Invalid percentage value");
		}
		if (rawValue < 0) {
			return err(`saturate() value must be non-negative, got ${rawValue}%`);
		}
		value = rawValue / 100; // Convert to decimal
	} else if (valueNode.type === "Number") {
		const numberResult = ParseUtils.parseNumberNode(valueNode);
		if (!numberResult.ok) {
			return err(numberResult.error);
		}
		value = numberResult.value;
	} else {
		return err(`Expected number or percentage, got ${valueNode.type}`);
	}

	// Validate range (non-negative)
	if (value < 0) {
		return err(`saturate() value must be non-negative, got ${value}`);
	}

	return ok({ kind: "saturate", value });
}
