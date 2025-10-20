// b_path:: src/parse/clip-path/ellipse.ts
import type { CssNode } from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import * as ParseUtils from "@/utils/parse";
import { parseShapeFunctionRaw } from "./utils";

/**
 * Parse ellipse() shape function.
 *
 * Syntax: ellipse( <radial-size>{2}? [ at <position> ]? )
 *
 * @param css - CSS string
 * @returns Result with ClipPathEllipse IR or error
 *
 * @example
 * ```typescript
 * parse("ellipse()");
 * parse("ellipse(50px 100px)");
 * parse("ellipse(closest-side farthest-side at center)");
 * parse("ellipse(50% 100% at 30px 40px)");
 * ```
 *
 * @public
 */
export function parse(css: string): Result<Type.ClipPathEllipse, string> {
	return parseShapeFunctionRaw(css, "ellipse", parseEllipseChildren);
}

function parseEllipseChildren(children: CssNode[]): Result<Type.ClipPathEllipse, string> {
	if (children.length === 0) {
		return ok({
			kind: "clip-path-ellipse",
		});
	}

	let idx = 0;
	let radiusX: Type.ClipPathEllipse["radiusX"];
	let radiusY: Type.ClipPathEllipse["radiusY"];
	let position: Type.Position2D | undefined;

	// Parse optional radiusX
	const firstNode = children[idx];
	if (firstNode && firstNode.type === "Identifier") {
		const keyword = firstNode.name.toLowerCase();
		if (keyword === "closest-side" || keyword === "farthest-side") {
			radiusX = keyword;
			idx++;
		} else if (keyword !== "at") {
			return err(`Invalid keyword for ellipse radiusX: ${keyword}`);
		}
	} else if (firstNode) {
		const lpResult = ParseUtils.parseLengthPercentageNode(firstNode);
		if (lpResult.ok) {
			if (lpResult.value.value < 0) {
				return err("ellipse() radiusX must be non-negative");
			}
			radiusX = lpResult.value;
			idx++;
		}
	}

	// Parse optional radiusY (if radiusX was parsed)
	if (radiusX !== undefined && idx < children.length) {
		const secondNode = children[idx];
		if (secondNode && secondNode.type === "Identifier") {
			const keyword = secondNode.name.toLowerCase();
			if (keyword === "closest-side" || keyword === "farthest-side") {
				radiusY = keyword;
				idx++;
			} else if (keyword !== "at") {
				return err(`Invalid keyword for ellipse radiusY: ${keyword}`);
			}
		} else if (secondNode) {
			const lpResult = ParseUtils.parseLengthPercentageNode(secondNode);
			if (lpResult.ok) {
				if (lpResult.value.value < 0) {
					return err("ellipse() radiusY must be non-negative");
				}
				radiusY = lpResult.value;
				idx++;
			}
		}
	}

	// Parse optional position after 'at'
	if (idx < children.length) {
		const atNode = children[idx];
		if (atNode?.type !== "Identifier" || atNode.name.toLowerCase() !== "at") {
			return err("Expected 'at' keyword before position");
		}
		idx++;

		const positionNodes = children.slice(idx);
		if (positionNodes.length === 0) {
			return err("Expected position after 'at'");
		}

		const posResult = ParseUtils.parsePosition2D(positionNodes, 0);
		if (!posResult.ok) return posResult;

		position = posResult.value.position;
		idx += posResult.value.nextIdx;
	}

	// Check for extra content
	if (idx < children.length) {
		return err("Unexpected content after ellipse() arguments");
	}

	return ok({
		kind: "clip-path-ellipse",
		...(radiusX !== undefined && { radiusX }),
		...(radiusY !== undefined && { radiusY }),
		...(position !== undefined && { position }),
	});
}
