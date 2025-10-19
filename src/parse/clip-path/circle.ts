// b_path:: src/parse/clip-path/circle.ts
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import * as AstUtils from "@/utils/ast";
import * as ParseUtils from "@/utils/parse";

/**
 * Parse circle() shape function.
 *
 * Syntax: circle( <length-percentage>? [ at <position> ]? )
 *
 * @param css - CSS string
 * @returns Result with ClipPathCircle IR or error
 *
 * @example
 * ```typescript
 * parse("circle()");
 * parse("circle(50px)");
 * parse("circle(closest-side at center)");
 * parse("circle(50% at 30px 40px)");
 * ```
 *
 * @public
 */
export function parse(css: string): Result<Type.ClipPathCircle, string> {
	try {
		const astResult = AstUtils.parseCssString(css);
		if (!astResult.ok) {
			return err(astResult.error);
		}

		const fnResult = AstUtils.findFunctionNode(astResult.value, "circle");
		if (!fnResult.ok) {
			return err(fnResult.error);
		}

		const children = fnResult.value.children.toArray();

		if (children.length === 0) {
			return ok({
				kind: "clip-path-circle",
			});
		}

		let idx = 0;
		let radius: Type.ClipPathCircle["radius"];
		let position: Type.Position2D | undefined;

		// Parse optional radius
		const firstNode = children[idx];
		if (firstNode && firstNode.type === "Identifier") {
			const keyword = firstNode.name.toLowerCase();
			if (keyword === "closest-side" || keyword === "farthest-side") {
				radius = keyword;
				idx++;
			}
		} else if (firstNode) {
			const lpResult = ParseUtils.parseLengthPercentageNode(firstNode);
			if (lpResult.ok) {
				if (lpResult.value.value < 0) {
					return err("circle() radius must be non-negative");
				}
				radius = lpResult.value;
				idx++;
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
			return err("Unexpected content after circle() arguments");
		}

		return ok({
			kind: "clip-path-circle",
			...(radius !== undefined && { radius }),
			...(position !== undefined && { position }),
		});
	} catch (e) {
		return err(`Failed to parse circle(): ${e instanceof Error ? e.message : String(e)}`);
	}
}
