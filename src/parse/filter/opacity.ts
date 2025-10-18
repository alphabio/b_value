// b_path:: src/parse/filter/opacity.ts
import { err, ok, type Result } from "@/core/result";
import type { OpacityFilter } from "@/core/types/filter";
import * as ASTUtils from "@/utils/ast";
import * as ParseUtils from "@/utils/parse";

/**
 * Parse CSS opacity() filter function.
 *
 * Parses opacity filter with number or percentage value.
 * Number values: 0 to 1, where 1 = 100% opacity
 * Percentage values: converted to decimal (50% → 0.5)
 * Value range: 0 to 1 (clamped)
 *
 * @param input - CSS string like "opacity(0.5)" or "opacity(50%)"
 * @returns Result with OpacityFilter IR or error message
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/opacity}
 *
 * @example
 * ```typescript
 * import { parse } from "@/parse/filter/opacity";
 *
 * const result = parse("opacity(0.5)");
 * // { ok: true, value: { kind: "opacity", value: 0.5 } }
 *
 * const result2 = parse("opacity(50%)");
 * // { ok: true, value: { kind: "opacity", value: 0.5 } }
 * ```
 *
 * @public
 */
export function parse(input: string): Result<OpacityFilter, string> {
	// Parse CSS string to AST
	const astResult = ASTUtils.parseCssString(input, "value");
	if (!astResult.ok) {
		return err(astResult.error);
	}

	// Find opacity() function
	const funcResult = ASTUtils.findFunctionNode(astResult.value, "opacity");
	if (!funcResult.ok) {
		return err(funcResult.error);
	}

	const fn = funcResult.value;

	// Get function arguments
	const children = ASTUtils.parseFunctionArguments(fn);

	// Expect exactly one argument
	if (children.length !== 1) {
		return err(`opacity() expects 1 argument, got ${children.length}`);
	}

	const valueNode = children[0];
	if (!valueNode) {
		return err("opacity() expects 1 argument");
	}

	// Parse number or percentage
	let value: number;

	if (valueNode.type === "Percentage") {
		// Parse percentage value - opacity bounded 0-100%
		const rawValue = Number.parseFloat(valueNode.value);
		if (Number.isNaN(rawValue)) {
			return err("Invalid percentage value");
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

	// Validate range (0 to 1)
	if (value < 0 || value > 1) {
		return err(`opacity() value must be between 0 and 1, got ${value}`);
	}

	return ok({ kind: "opacity", value });
}
