// b_path:: src/parse/filter/brightness.ts
import { err, ok, type Result } from "@/core/result";
import type { BrightnessFilter } from "@/core/types/filter";
import * as ASTUtils from "@/utils/ast";
import * as ParseUtils from "@/utils/parse";

/**
 * Parse CSS brightness() filter function.
 *
 * Parses brightness filter with number or percentage value.
 * Number values: 1 = 100% brightness (no change)
 * Percentage values: converted to decimal (150% → 1.5)
 * Value range: 0 to infinity (0 = completely black)
 *
 * @param input - CSS string like "brightness(1.5)" or "brightness(150%)"
 * @returns Result with BrightnessFilter IR or error message
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/brightness}
 *
 * @example
 * ```typescript
 * import { parse } from "@/parse/filter/brightness";
 *
 * const result = parse("brightness(1.5)");
 * // { ok: true, value: { kind: "brightness", value: 1.5 } }
 *
 * const result2 = parse("brightness(150%)");
 * // { ok: true, value: { kind: "brightness", value: 1.5 } }
 * ```
 *
 * @public
 */
export function parse(input: string): Result<BrightnessFilter, string> {
	// Parse CSS string to AST
	const astResult = ASTUtils.parseCssString(input, "value");
	if (!astResult.ok) {
		return err(astResult.error);
	}

	// Find brightness() function
	const funcResult = ASTUtils.findFunctionNode(astResult.value, "brightness");
	if (!funcResult.ok) {
		return err(funcResult.error);
	}

	const fn = funcResult.value;

	// Get function arguments
	const children = ASTUtils.parseFunctionArguments(fn);

	// Expect exactly one argument
	if (children.length !== 1) {
		return err(`brightness() expects 1 argument, got ${children.length}`);
	}

	const valueNode = children[0];

	// Parse number or percentage
	let value: number;

	if (valueNode.type === "Percentage") {
		// Parse percentage value - brightness allows > 100%
		const rawValue = Number.parseFloat(valueNode.value);
		if (Number.isNaN(rawValue)) {
			return err("Invalid percentage value");
		}
		if (rawValue < 0) {
			return err(`brightness() value must be non-negative, got ${rawValue}%`);
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
		return err(`brightness() value must be non-negative, got ${value}`);
	}

	return ok({ kind: "brightness", value });
}
