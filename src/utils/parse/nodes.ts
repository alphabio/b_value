// b_path:: src/utils/parse/nodes.ts
import type * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import { parseLengthPercentageNode } from "./nodes/length";

/**
 * Parse a CSS identifier node into a string.
 *
 * @param node - CSS AST identifier node
 * @returns Result containing string or error message
 *
 * @public
 */
export function parseIdentifierNode(node: csstree.CssNode): Result<string, string> {
	if (node.type === "Identifier") {
		return ok(node.name.toLowerCase());
	}
	return err("Expected identifier");
}

/**
 * Parse a CSS value node into a PositionValue IR.
 *
 * Handles keywords, lengths, and percentages for position values.
 *
 * @param node - CSS AST node
 * @returns Result containing PositionValue IR or error message
 *
 * @public
 */
export function parsePositionValueNode(node: csstree.CssNode): Result<Type.PositionValue, string> {
	// Check for keyword first
	if (node.type === "Identifier") {
		const keyword = node.name.toLowerCase();
		// Position keywords
		if (["center", "left", "right", "top", "bottom"].includes(keyword)) {
			return ok(keyword as Type.PositionValue);
		}
		return err(`Invalid position keyword: ${keyword}`);
	}

	// Try parsing as length-percentage
	const lengthResult = parseLengthPercentageNode(node);
	if (lengthResult.ok) {
		return lengthResult;
	}

	return err("Expected position keyword, length, or percentage");
}

/**
 * Parse 2D position from CSS nodes.
 *
 * Handles CSS position syntax with 1-2 values.
 *
 * @param nodes - Array of CSS nodes
 * @param startIdx - Index to start parsing from
 * @returns Result containing Position2D IR and next index, or error message
 *
 * @example
 * ```typescript
 * // Parse "center top"
 * const result = parsePosition2D([centerNode, topNode], 0);
 * // { position: { horizontal: "center", vertical: "top" }, nextIdx: 2 }
 * ```
 *
 * @public
 */
export function parsePosition2D(
	nodes: csstree.CssNode[],
	startIdx: number,
): Result<{ position: Type.Position2D; nextIdx: number }, string> {
	let idx = startIdx;

	const positionValues: Type.PositionValue[] = [];

	if (idx >= nodes.length) {
		return err("Expected position value");
	}

	const firstNode = nodes[idx];
	if (!firstNode) return err("Missing first position value");
	const firstValue = parsePositionValueNode(firstNode);
	if (!firstValue.ok) {
		return err(`Invalid first position value: ${firstValue.error}`);
	}
	positionValues.push(firstValue.value);
	idx++;

	if (idx < nodes.length) {
		const secondNode = nodes[idx];
		if (secondNode) {
			const secondValue = parsePositionValueNode(secondNode);
			if (secondValue.ok) {
				positionValues.push(secondValue.value);
				idx++;
			}
		}
	}

	let position: Type.Position2D;

	if (positionValues.length === 1) {
		const val = positionValues[0];
		if (!val) {
			return err("Missing position value");
		}
		if (typeof val === "string") {
			if (val === "top" || val === "bottom") {
				position = { horizontal: "center", vertical: val };
			} else {
				position = { horizontal: val, vertical: "center" };
			}
		} else {
			position = { horizontal: val, vertical: "center" };
		}
	} else {
		const h = positionValues[0];
		const v = positionValues[1];
		if (!h || !v) {
			return err("Missing position values");
		}
		position = { horizontal: h, vertical: v };
	}

	return ok({ position, nextIdx: idx });
}

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

/**
 * Parse optional 'at <position>' clause from AST children.
 *
 * Finds 'at' keyword and parses subsequent position values.
 * Used by circle() and ellipse() shape functions for center position.
 *
 * @param children - AST nodes (may contain 'at' keyword)
 * @param startIdx - Index to start parsing from
 * @returns Result with optional position and nextIdx
 *
 * @example
 * Basic usage:
 * ```typescript
 * // children = [50px, 'at', 'center', 'top']
 * const result = parseAtPosition(children, 1);
 * // { position: { horizontal: 'center', vertical: 'top' }, nextIdx: 4 }
 * ```
 *
 * @example
 * No 'at' keyword:
 * ```typescript
 * // children = [50px, 100px]
 * const result = parseAtPosition(children, 2);
 * // { position: undefined, nextIdx: 2 }
 * ```
 *
 * @example
 * Error case:
 * ```typescript
 * // children = [50px, 'at'] // no position values!
 * const result = parseAtPosition(children, 1);
 * // err("Expected position after 'at'")
 * ```
 *
 * @public
 */
export function parseAtPosition(
	children: csstree.CssNode[],
	startIdx: number,
): Result<{ position?: Type.Position2D; nextIdx: number }, string> {
	let idx = startIdx;

	// Check if we have an 'at' keyword at current position
	if (idx >= children.length) {
		return ok({ nextIdx: idx });
	}

	const atNode = children[idx];
	if (atNode?.type !== "Identifier" || atNode.name.toLowerCase() !== "at") {
		// No 'at' keyword - valid case (position is optional)
		return ok({ nextIdx: idx });
	}

	// Found 'at' keyword - advance past it
	idx++;

	// Must have position values after 'at'
	const positionNodes = children.slice(idx);
	if (positionNodes.length === 0) {
		return err("Expected position after 'at'");
	}

	// Parse position using existing utility
	const posResult = parsePosition2D(positionNodes, 0);
	if (!posResult.ok) return posResult;

	return ok({
		position: posResult.value.position,
		nextIdx: idx + posResult.value.nextIdx,
	});
}

/**
 * Parse radial size value (keyword or length-percentage).
 *
 * Handles both radial extent keywords (closest-side, farthest-side)
 * and numeric length-percentage values. Validates non-negative values.
 *
 * Used by circle() and ellipse() shape functions for radius values.
 *
 * @param node - AST node to parse (may be undefined)
 * @param propertyName - Name for error messages (e.g., "radius", "radiusX")
 * @param allowAtKeyword - If true, 'at' keyword returns undefined (not error)
 * @returns Result with parsed size value or undefined if node is undefined or 'at'
 *
 * @example
 * With keyword:
 * ```typescript
 * // node = Identifier { name: "closest-side" }
 * const result = parseRadialSize(node, "radius");
 * // ok("closest-side")
 * ```
 *
 * @example
 * With length-percentage:
 * ```typescript
 * // node = Dimension { value: 50, unit: "px" }
 * const result = parseRadialSize(node, "radiusX");
 * // ok({ value: 50, unit: "px" })
 * ```
 *
 * @example
 * No node (undefined):
 * ```typescript
 * const result = parseRadialSize(undefined, "radius");
 * // ok(undefined)
 * ```
 *
 * @example
 * 'at' keyword with allowAtKeyword=true:
 * ```typescript
 * // node = Identifier { name: "at" }
 * const result = parseRadialSize(node, "radiusX", true);
 * // ok(undefined) - signals to stop radius parsing
 * ```
 *
 * @example
 * Error - negative value:
 * ```typescript
 * // node = Dimension { value: -10, unit: "px" }
 * const result = parseRadialSize(node, "radius");
 * // err("radius must be non-negative")
 * ```
 *
 * @example
 * Error - invalid keyword:
 * ```typescript
 * // node = Identifier { name: "invalid" }
 * const result = parseRadialSize(node, "radius");
 * // err("Invalid keyword for radius: invalid")
 * ```
 *
 * @public
 */
export function parseRadialSize(
	node: csstree.CssNode | undefined,
	propertyName: string,
	allowAtKeyword = false,
): Result<"closest-side" | "farthest-side" | Type.LengthPercentage | undefined, string> {
	// No node provided - valid case
	if (!node) {
		return ok(undefined);
	}

	// Check for radial extent keywords
	if (node.type === "Identifier") {
		const keyword = node.name.toLowerCase();

		// Valid radial extent keywords
		if (keyword === "closest-side" || keyword === "farthest-side") {
			return ok(keyword);
		}

		// 'at' keyword handling (for ellipse - signals end of radius parsing)
		if (keyword === "at" && allowAtKeyword) {
			return ok(undefined);
		}

		// Invalid keyword
		return err(`Invalid keyword for ${propertyName}: ${keyword}`);
	}

	// Try parsing as length-percentage
	const lpResult = parseLengthPercentageNode(node);
	if (!lpResult.ok) {
		return lpResult;
	}

	// Validate non-negative
	if (lpResult.value.value < 0) {
		return err(`${propertyName} must be non-negative`);
	}

	return ok(lpResult.value);
}
