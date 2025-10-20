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

	// Parse optional radiusX (using utility, allow 'at' keyword)
	const radiusXResult = ParseUtils.parseRadialSize(children[idx], "ellipse() radiusX", true);
	if (!radiusXResult.ok) return radiusXResult;
	if (radiusXResult.value !== undefined) {
		radiusX = radiusXResult.value;
		idx++;
	}

	// Parse optional radiusY (if radiusX was parsed, also allow 'at' keyword)
	if (radiusX !== undefined && idx < children.length) {
		const radiusYResult = ParseUtils.parseRadialSize(children[idx], "ellipse() radiusY", true);
		if (!radiusYResult.ok) return radiusYResult;
		if (radiusYResult.value !== undefined) {
			radiusY = radiusYResult.value;
			idx++;
		}
	}

	// Parse optional position after 'at' (using utility)
	let position: Type.Position2D | undefined;
	if (idx < children.length) {
		const atResult = ParseUtils.parseAtPosition(children, idx);
		if (!atResult.ok) return atResult;

		// If position is undefined, there was content but no 'at' keyword
		if (atResult.value.position === undefined) {
			return err("Expected 'at' keyword before position");
		}

		position = atResult.value.position;
		idx = atResult.value.nextIdx;
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
