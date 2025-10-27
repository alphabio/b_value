// b_path:: src/parse/gradient/color-stop.ts
import type * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import { parseNode as parseColorNode } from "@/parse/color";

/**
 * Parse color stop from CSS AST nodes.
 *
 * A color stop consists of a color value and an optional position.
 * Per CSS spec: <color-stop> = <color> [ <length-percentage> ]?
 *
 * @param nodes - Array of CSS AST nodes (color and optional position)
 * @returns Result containing ColorStop IR or error message
 *
 * @example
 * ```typescript
 * // Color only: red
 * const result1 = fromNodes([colorNode]);
 *
 * // Color with percentage: red 50%
 * const result2 = fromNodes([colorNode, percentageNode]);
 *
 * // Color with length: blue 100px
 * const result3 = fromNodes([colorNode, lengthNode]);
 * ```
 *
 * @internal
 */
export function fromNodes(nodes: csstree.CssNode[]): Result<Type.ColorStop, string> {
	if (nodes.length === 0) {
		return err("Color stop requires at least a color value");
	}

	const firstNode = nodes[0];
	if (!firstNode) {
		return err("Color stop requires at least a color value");
	}

	// Extract and parse color value
	// Parse color directly from AST node (efficient - no string round-trip)
	const colorResult = parseColorNode(firstNode);
	if (!colorResult.ok) {
		return err(`Invalid color value: ${colorResult.error}`);
	}
	const color = colorResult.value;

	// Check for optional position (second node)
	if (nodes.length >= 2) {
		const posNode = nodes[1];
		if (!posNode) {
			return ok({ color });
		}

		// Parse position as length or percentage
		if (posNode.type === "Percentage") {
			const value = Number.parseFloat(posNode.value);
			return ok({
				color,
				position: { value, unit: "%" },
			});
		}

		if (posNode.type === "Dimension") {
			const value = Number.parseFloat(posNode.value);
			const unit = posNode.unit.toLowerCase();
			// Type assertion needed for unit validation
			return ok({
				color,
				position: { value, unit } as Type.LengthPercentage,
			});
		}

		return err(`Invalid position type: ${posNode.type}`);
	}

	// Color only
	return ok({ color });
}
