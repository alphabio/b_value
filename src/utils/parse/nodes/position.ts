/**
 * Position value parsing utilities.
 *
 * This module handles:
 * - CSS position values (background-position, object-position, etc.)
 * - 2D position parsing (x, y coordinates)
 * - Position keywords (top, bottom, left, right, center)
 * - "at" keyword position parsing (for clip-path, gradients)
 *
 * @module utils/parse/nodes/position
 */

// b_path:: src/utils/parse/nodes/position.ts
import type * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import { parseLengthPercentageNode } from "./length";

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
 * Parse optional position prefixed by 'at' keyword.
 *
 * Used by circle(), ellipse(), radial-gradient(), etc.
 *
 * Handles:
 * - No 'at' keyword: Returns { nextIdx } (no position parsed)
 * - 'at' keyword present: Parses following position, returns { position, nextIdx }
 * - 'at' without position: Error
 *
 * @param children - Array of CSS nodes
 * @param startIdx - Index to start parsing (should point at potential 'at' keyword)
 * @returns Result with optional position and nextIdx, or error
 *
 * @example
 * No 'at' keyword:
 * ```typescript
 * // children = [50px, 100px] // no 'at' keyword
 * const result = parseAtPosition(children, 0);
 * // ok({ nextIdx: 0 }) - no position parsed
 * ```
 *
 * @example
 * With 'at' and position:
 * ```typescript
 * // children = ['at', 'center', 'top']
 * const result = parseAtPosition(children, 0);
 * // ok({ position: { horizontal: "center", vertical: "top" }, nextIdx: 3 })
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
