// b_path:: src/parse/clip-path/rect.ts
import type { CssNode } from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import * as ParseUtils from "@/utils/parse";
import { parseShapeFunction } from "./utils";

/**
 * Parse CSS rect() function for clip-path.
 *
 * Accepts 1-4 length-percentage or 'auto' values for edge offsets (TRBL),
 * optionally followed by 'round' keyword and border-radius values.
 *
 * Syntax: rect( [<length-percentage> | auto]{1,4} [ round <border-radius> ]? )
 *
 * @param css - CSS rect() function (e.g., "rect(10px auto 20px auto round 5px)")
 * @returns Result with ClipPathRect IR or error message
 *
 * @example
 * Simple rect:
 * ```typescript
 * const result = parse("rect(10px 20px 30px 40px)");
 * // { kind: "clip-path-rect", top: 10px, right: 20px, bottom: 30px, left: 40px }
 * ```
 *
 * @example
 * With auto:
 * ```typescript
 * const result = parse("rect(10px auto 20px auto)");
 * // { kind: "clip-path-rect", top: 10px, right: "auto", bottom: 20px, left: "auto" }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape/rect | MDN: rect()}
 */
export function parse(css: string): Result<Type.ClipPathRect, string> {
	return parseShapeFunction(css, "rect", parseRectArgs);
}

function parseRectArgs(args: CssNode[]): Result<Type.ClipPathRect, string> {
	if (args.length === 0) {
		return err("rect() requires at least one value");
	}

	// Find 'round' keyword (if present)
	const roundIndex = args.findIndex((node) => node.type === "Identifier" && node.name.toLowerCase() === "round");

	// Parse TRBL values (before 'round' or all args if no 'round')
	const trblNodes = roundIndex !== -1 ? args.slice(0, roundIndex) : args;

	if (trblNodes.length === 0) {
		return err("rect() requires at least one edge value");
	}

	// Parse each edge value (can be length-percentage or 'auto')
	const edgeValues: (Type.LengthPercentage | "auto")[] = [];

	for (const node of trblNodes) {
		// Check for 'auto' keyword
		if (node.type === "Identifier" && node.name.toLowerCase() === "auto") {
			edgeValues.push("auto");
			continue;
		}

		// Parse as length-percentage
		const lpResult = ParseUtils.parseLengthPercentageNode(node);
		if (!lpResult.ok) {
			return err(`Invalid edge value: ${lpResult.error}`);
		}

		edgeValues.push(lpResult.value);
	}

	// Expand TRBL values (1-4 values → 4 values)
	if (edgeValues.length < 1 || edgeValues.length > 4) {
		return err("rect() accepts 1-4 edge values");
	}

	const [val0, val1, val2, val3] = edgeValues;
	let top: Type.LengthPercentage | "auto";
	let right: Type.LengthPercentage | "auto";
	let bottom: Type.LengthPercentage | "auto";
	let left: Type.LengthPercentage | "auto";

	if (edgeValues.length === 1 && val0) {
		top = right = bottom = left = val0;
	} else if (edgeValues.length === 2 && val0 && val1) {
		top = bottom = val0;
		right = left = val1;
	} else if (edgeValues.length === 3 && val0 && val1 && val2) {
		top = val0;
		right = left = val1;
		bottom = val2;
	} else if (edgeValues.length === 4 && val0 && val1 && val2 && val3) {
		top = val0;
		right = val1;
		bottom = val2;
		left = val3;
	} else {
		return err("rect() requires valid edge values");
	}

	// Parse optional border-radius (after 'round')
	let borderRadius: Type.InsetBorderRadius | undefined;
	if (roundIndex !== -1) {
		const radiusNodes = args.slice(roundIndex + 1);

		if (radiusNodes.length === 0) {
			return err("Expected border-radius values after 'round' keyword");
		}

		const radiusResult = ParseUtils.parseBorderRadiusShorthand(radiusNodes);
		if (!radiusResult.ok) {
			return err(`Invalid border-radius: ${radiusResult.error}`);
		}

		borderRadius = radiusResult.value;
	}

	return ok({
		kind: "clip-path-rect",
		top,
		right,
		bottom,
		left,
		borderRadius,
	});
}
