// b_path:: src/utils/parse/nodes/radial.ts
import type * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import { parseLengthPercentageNode } from "./length";

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
