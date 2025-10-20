// b_path:: src/parse/clip-path/xywh.ts
import type { CssNode } from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import * as ParseUtils from "@/utils/parse";
import { parseShapeFunction } from "./utils";

/**
 * Parse CSS xywh() function for clip-path.
 *
 * Accepts 4 length-percentage values for position (x, y) and dimensions (width, height),
 * optionally followed by 'round' keyword and border-radius values.
 *
 * Syntax: xywh( <length-percentage>{4} [ round <border-radius> ]? )
 *
 * @param css - CSS xywh() function (e.g., "xywh(10px 20px 100px 50px round 5px)")
 * @returns Result with ClipPathXywh IR or error message
 *
 * @example
 * Simple xywh:
 * ```typescript
 * const result = parse("xywh(10px 20px 100px 50px)");
 * // { kind: "clip-path-xywh", x: 10px, y: 20px, width: 100px, height: 50px }
 * ```
 *
 * @example
 * With border-radius:
 * ```typescript
 * const result = parse("xywh(0 0 100% 100% round 10px)");
 * // { kind: "clip-path-xywh", x: 0, y: 0, ..., borderRadius: { ... } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape/xywh | MDN: xywh()}
 */
export function parse(css: string): Result<Type.ClipPathXywh, string> {
	return parseShapeFunction(css, "xywh", parseXywhArgs);
}

function parseXywhArgs(args: CssNode[]): Result<Type.ClipPathXywh, string> {
	if (args.length === 0) {
		return err("xywh() requires exactly 4 values");
	}

	// Find 'round' keyword (if present)
	const roundIndex = args.findIndex((node) => node.type === "Identifier" && node.name.toLowerCase() === "round");

	// Parse position/size values (before 'round' or all args if no 'round')
	const xywhNodes = roundIndex !== -1 ? args.slice(0, roundIndex) : args;

	if (xywhNodes.length !== 4) {
		return err("xywh() requires exactly 4 values (x, y, width, height)");
	}

	// Parse x, y, width, height
	const [xNode, yNode, widthNode, heightNode] = xywhNodes;

	if (!xNode || !yNode || !widthNode || !heightNode) {
		return err("xywh() requires exactly 4 values (x, y, width, height)");
	}

	const xResult = ParseUtils.parseLengthPercentageNode(xNode);
	if (!xResult.ok) {
		return err(`Invalid x value: ${xResult.error}`);
	}

	const yResult = ParseUtils.parseLengthPercentageNode(yNode);
	if (!yResult.ok) {
		return err(`Invalid y value: ${yResult.error}`);
	}

	const widthResult = ParseUtils.parseLengthPercentageNode(widthNode);
	if (!widthResult.ok) {
		return err(`Invalid width value: ${widthResult.error}`);
	}

	const heightResult = ParseUtils.parseLengthPercentageNode(heightNode);
	if (!heightResult.ok) {
		return err(`Invalid height value: ${heightResult.error}`);
	}

	// Validate non-negative width and height
	if (widthResult.value.value < 0) {
		return err("Width must be non-negative");
	}

	if (heightResult.value.value < 0) {
		return err("Height must be non-negative");
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
		kind: "clip-path-xywh",
		x: xResult.value,
		y: yResult.value,
		width: widthResult.value,
		height: heightResult.value,
		borderRadius,
	});
}
