// b_path:: src/parse/clip-path/polygon.ts

import { err, ok, type Result } from "@/core/result";
import * as Type from "@/core/types";
import * as AstUtils from "@/utils/ast";
import * as ParseUtils from "@/utils/parse";

/**
 * Parse polygon() basic shape function.
 *
 * Syntax: polygon( <fill-rule>? , <shape-arg># )
 *
 * where:
 *   <fill-rule> = nonzero | evenodd
 *   <shape-arg> = <length-percentage> <length-percentage>
 *
 * @example
 * parse("polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)");
 * // { kind: "clip-path-polygon", points: [{x: 50%, y: 0%}, {x: 100%, y: 50%}, ...] }
 *
 * parse("polygon(nonzero, 0px 0px, 100px 0px, 100px 100px)");
 * // { kind: "clip-path-polygon", fillRule: "nonzero", points: [...] }
 *
 * @public
 */
export function parse(css: string): Result<Type.ClipPathPolygon, string> {
	try {
		const astResult = AstUtils.parseCssString(css);
		if (!astResult.ok) {
			return err(astResult.error);
		}

		const fnResult = AstUtils.findFunctionNode(astResult.value, "polygon");
		if (!fnResult.ok) {
			return err(fnResult.error);
		}

		const children = fnResult.value.children.toArray();
		let idx = 0;

		let fillRule: Type.ClipPathPolygon["fillRule"];
		const points: Type.ClipPathPolygon["points"] = [];

		// Check for optional fill-rule keyword
		if (idx < children.length) {
			const firstNode = children[idx];
			if (firstNode?.type === "Identifier") {
				const keyword = firstNode.name.toLowerCase();
				if (keyword === "nonzero" || keyword === "evenodd") {
					fillRule = keyword;
					idx++;

					// After fill-rule, require a comma
					if (!AstUtils.isCommaAt(children, idx)) {
						return err("Expected comma after fill-rule");
					}
					idx = AstUtils.skipComma(children, idx);
				}
			}
		}

		// Split remaining nodes into point pairs (x y, x y, ...)
		const pointGroups = AstUtils.splitNodesByComma(children, {
			startIndex: idx,
		});

		// Parse each point pair
		for (const group of pointGroups) {
			if (group.length !== 2) {
				return err("Each point must have exactly 2 coordinates (x y), separated by spaces");
			}

			const xNode = group[0];
			const yNode = group[1];
			if (!xNode || !yNode) {
				return err("Invalid point coordinates");
			}

			const xResult = ParseUtils.parseLengthPercentageNode(xNode);
			if (!xResult.ok) return xResult;

			const yResult = ParseUtils.parseLengthPercentageNode(yNode);
			if (!yResult.ok) return yResult;

			points.push({ x: xResult.value, y: yResult.value });
		}

		// Validate minimum 3 points
		if (points.length < 3) {
			return err("polygon() requires at least 3 points");
		}

		const polygon: Type.ClipPathPolygon = {
			kind: "clip-path-polygon",
			...(fillRule !== undefined && { fillRule }),
			points,
		};

		const validated = Type.clipPathPolygonSchema.safeParse(polygon);
		if (!validated.success) {
			return err(`Invalid polygon: ${validated.error.message}`);
		}

		return ok(validated.data);
	} catch (e) {
		return err(`Failed to parse polygon(): ${e}`);
	}
}
