// b_path:: src/parse/clip-path/inset.ts
import type { CssNode } from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import * as ParseUtils from "@/utils/parse";
import { parseShapeFunction } from "./utils";

/**
 * Parse CSS inset() function for clip-path.
 *
 * Accepts 1-4 length-percentage values for inset offsets (TRBL),
 * optionally followed by 'round' keyword and border-radius values.
 *
 * Syntax: inset( <length-percentage>{1,4} [ round <border-radius> ]? )
 *
 * @param css - CSS inset() function (e.g., "inset(10px round 5px)")
 * @returns Result with ClipPathInset IR or error message
 *
 * @example
 * Simple inset:
 * ```typescript
 * const result = parse("inset(10px)");
 * // { kind: "clip-path-inset", top: 10px, right: 10px, bottom: 10px, left: 10px }
 * ```
 *
 * @example
 * With border-radius:
 * ```typescript
 * const result = parse("inset(10px 20px round 5px)");
 * // { kind: "clip-path-inset", top: 10px, right: 20px, ..., borderRadius: { ... } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape/inset | MDN: inset()}
 */
export function parse(css: string): Result<Type.ClipPathInset, string> {
	return parseShapeFunction(css, "inset", parseInsetArgs);
}

function parseInsetArgs(args: CssNode[]): Result<Type.ClipPathInset, string> {
	if (args.length === 0) {
		return err("inset() requires at least one value");
	}

	// Parse optional border-radius (using utility)
	const roundResult = ParseUtils.parseRoundBorderRadius(args);
	if (!roundResult.ok) return roundResult;
	const { roundIndex, borderRadius } = roundResult.value;

	// Parse TRBL values (before 'round' or all args if no 'round')
	const trblNodes = roundIndex !== -1 ? args.slice(0, roundIndex) : args;

	if (trblNodes.length === 0 || trblNodes.length > 4) {
		return err("inset() accepts 1-4 length-percentage values");
	}

	// Parse each inset value
	const insetValues: Type.LengthPercentage[] = [];

	for (const node of trblNodes) {
		const lpResult = ParseUtils.parseLengthPercentageNode(node);
		if (!lpResult.ok) {
			return err(`Invalid inset value: ${lpResult.error}`);
		}
		insetValues.push(lpResult.value);
	}

	// Expand TRBL values (1-4 values → 4 values)
	const [val0, val1, val2, val3] = insetValues;
	let top: Type.LengthPercentage;
	let right: Type.LengthPercentage;
	let bottom: Type.LengthPercentage;
	let left: Type.LengthPercentage;

	if (insetValues.length === 1 && val0) {
		top = right = bottom = left = val0;
	} else if (insetValues.length === 2 && val0 && val1) {
		top = bottom = val0;
		right = left = val1;
	} else if (insetValues.length === 3 && val0 && val1 && val2) {
		top = val0;
		right = left = val1;
		bottom = val2;
	} else if (insetValues.length === 4 && val0 && val1 && val2 && val3) {
		top = val0;
		right = val1;
		bottom = val2;
		left = val3;
	} else {
		return err("inset() requires valid values");
	}

	return ok({
		kind: "clip-path-inset",
		top,
		right,
		bottom,
		left,
		borderRadius,
	});
}
