// b_path:: src/utils/parse/nodes/border-radius.ts
import type * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import { parseLengthPercentageNode } from "./length";

/**
 * Parse CSS 4-value syntax (top, right, bottom, left).
 *
 * Accepts 1-4 length-percentage values following CSS 4-value expansion:
 * - 1 value: all sides
 * - 2 values: vertical | horizontal
 * - 3 values: top | horizontal | bottom
 * - 4 values: top | right | bottom | left (clockwise)
 *
 * Commonly used by margin, padding, inset(), scroll-margin, etc.
 *
 * @param nodes - Array of 1-4 CSS nodes
 * @returns Result with TRBL values or error
 *
 * @example
 * ```typescript
 * // Parse "10px 20px"
 * const result = parseTRBLLengthPercentage([node1, node2]);
 * // { top: 10px, right: 20px, bottom: 10px, left: 20px }
 * ```
 */
export function parseTRBLLengthPercentage(nodes: csstree.CssNode[]): Result<
	{
		top: Type.LengthPercentage;
		right: Type.LengthPercentage;
		bottom: Type.LengthPercentage;
		left: Type.LengthPercentage;
	},
	string
> {
	// Validate count
	if (nodes.length < 1 || nodes.length > 4) {
		return err(`Expected 1-4 length-percentage values, got ${nodes.length}`);
	}

	// Parse all values
	const values: Type.LengthPercentage[] = [];
	for (const node of nodes) {
		// Handle unitless zero
		if (node.type === "Number") {
			const val = Number.parseFloat(node.value);
			if (val !== 0) {
				return err("Unitless values must be zero");
			}
			values.push({ value: 0, unit: "px" });
			continue;
		}

		// Parse length-percentage
		const result = parseLengthPercentageNode(node);
		if (!result.ok) {
			return err(result.error);
		}
		values.push(result.value);
	}

	// Expand per CSS 4-value syntax
	switch (values.length) {
		case 1:
			return ok({
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				top: values[0]!,
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				right: values[0]!,
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				bottom: values[0]!,
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				left: values[0]!,
			});
		case 2:
			return ok({
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				top: values[0]!,
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				right: values[1]!,
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				bottom: values[0]!,
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				left: values[1]!,
			});
		case 3:
			return ok({
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				top: values[0]!,
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				right: values[1]!,
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				bottom: values[2]!,
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				left: values[1]!,
			});
		case 4:
			return ok({
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				top: values[0]!,
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				right: values[1]!,
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				bottom: values[2]!,
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				left: values[3]!,
			});
		default:
			return err("Invalid number of values");
	}
}

/**
 * Parse CSS corner values using TRBL expansion rules.
 *
 * This function parses 1-4 length-percentage values and expands them to
 * all 4 corners using the same expansion logic as CSS box model properties.
 * It is used by clip-path shapes (inset, rect, xywh) for border-radius values
 * after the 'round' keyword.
 *
 * **IMPORTANT**: This is NOT a CSS property parser. It parses multi-value
 * syntax used WITHIN other values. The actual border-radius property parser
 * is in `src/parse/border/radius.ts` and only accepts single values (longhand).
 *
 * Expansion rules (same as margin/padding):
 * - 1 value: all corners
 * - 2 values: (top-left/bottom-right) (top-right/bottom-left)
 * - 3 values: top-left (top-right/bottom-left) bottom-right
 * - 4 values: top-left top-right bottom-right bottom-left (clockwise from top-left)
 *
 * @param nodes - Array of 1-4 CSS nodes (length-percentage values, non-negative)
 * @returns Result with 4 corner values or error
 *
 * @example
 * Used in clip-path shapes:
 * ```typescript
 * // inset(10px round 5px 10px)
 * //                  ^^^^^^^^ these nodes
 * const result = parseCornerValues(radiusNodes);
 * // { topLeft: 5px, topRight: 10px, bottomRight: 5px, bottomLeft: 10px }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape/inset | MDN: inset()}
 */
export function parseCornerValues(nodes: csstree.CssNode[]): Result<
	{
		topLeft: Type.LengthPercentage;
		topRight: Type.LengthPercentage;
		bottomRight: Type.LengthPercentage;
		bottomLeft: Type.LengthPercentage;
	},
	string
> {
	// Validate count
	if (nodes.length < 1 || nodes.length > 4) {
		return err(`Expected 1-4 border-radius values, got ${nodes.length}`);
	}

	// Parse all values
	const values: Type.LengthPercentage[] = [];
	for (const node of nodes) {
		// Handle unitless zero
		if (node.type === "Number") {
			const val = Number.parseFloat(node.value);
			if (val !== 0) {
				return err("Unitless values must be zero");
			}
			values.push({ value: 0, unit: "px" });
			continue;
		}

		// Parse length-percentage
		const result = parseLengthPercentageNode(node);
		if (!result.ok) {
			return err(result.error);
		}

		// Validate non-negative
		if (result.value.value < 0) {
			return err("border-radius values must be non-negative");
		}

		values.push(result.value);
	}

	// Expand per CSS 4-value syntax (clockwise from top-left)
	switch (values.length) {
		case 1:
			return ok({
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				topLeft: values[0]!,
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				topRight: values[0]!,
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				bottomRight: values[0]!,
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				bottomLeft: values[0]!,
			});
		case 2:
			return ok({
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				topLeft: values[0]!,
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				topRight: values[1]!,
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				bottomRight: values[0]!,
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				bottomLeft: values[1]!,
			});
		case 3:
			return ok({
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				topLeft: values[0]!,
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				topRight: values[1]!,
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				bottomRight: values[2]!,
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				bottomLeft: values[1]!,
			});
		case 4:
			return ok({
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				topLeft: values[0]!,
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				topRight: values[1]!,
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				bottomRight: values[2]!,
				// biome-ignore lint/style/noNonNullAssertion: length validated by switch
				bottomLeft: values[3]!,
			});
		default:
			return err("Invalid number of values");
	}
}

/**
 * Parse optional 'round <border-radius>' clause from function arguments.
 *
 * Finds 'round' keyword and parses subsequent border-radius values.
 * Used by inset(), rect(), and xywh() shape functions.
 *
 * @param args - Function arguments (may contain 'round' keyword)
 * @returns Result with roundIndex and optional borderRadius
 *
 * @example
 * Basic usage:
 * ```typescript
 * // args = [10px, 20px, 'round', 5px, 10px]
 * const result = parseRoundBorderRadius(args);
 * // { roundIndex: 2, borderRadius: { topLeft: {...}, ... } }
 * ```
 *
 * @example
 * No 'round' keyword:
 * ```typescript
 * // args = [10px, 20px, 30px, 40px]
 * const result = parseRoundBorderRadius(args);
 * // { roundIndex: -1, borderRadius: undefined }
 * ```
 *
 * @example
 * Error case:
 * ```typescript
 * // args = [10px, 'round'] // no radius values!
 * const result = parseRoundBorderRadius(args);
 * // err("Expected border-radius values after 'round' keyword")
 * ```
 *
 * @public
 */
export function parseRoundBorderRadius(args: csstree.CssNode[]): Result<
	{
		roundIndex: number;
		borderRadius?: {
			topLeft: Type.LengthPercentage;
			topRight: Type.LengthPercentage;
			bottomRight: Type.LengthPercentage;
			bottomLeft: Type.LengthPercentage;
		};
	},
	string
> {
	// Find 'round' keyword position
	const roundIndex = args.findIndex((node) => node.type === "Identifier" && node.name.toLowerCase() === "round");

	// No 'round' keyword found - valid case
	if (roundIndex === -1) {
		return ok({ roundIndex: -1 });
	}

	// Get border-radius values (everything after 'round')
	const radiusNodes = args.slice(roundIndex + 1);

	// Must have at least one radius value
	if (radiusNodes.length === 0) {
		return err("Expected border-radius values after 'round' keyword");
	}

	// Parse border-radius using existing utility
	const radiusResult = parseCornerValues(radiusNodes);
	if (!radiusResult.ok) {
		return err(`Invalid border-radius: ${radiusResult.error}`);
	}

	return ok({
		roundIndex,
		borderRadius: radiusResult.value,
	});
}
