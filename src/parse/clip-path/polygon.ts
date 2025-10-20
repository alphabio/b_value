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

					// After fill-rule, expect a comma
					const commaNode = children[idx];
					if (!commaNode || commaNode.type !== "Operator") {
						return err("Expected comma after fill-rule");
					}
					if ("value" in commaNode && commaNode.value === ",") {
						idx++; // Skip comma
					} else {
						return err("Expected comma after fill-rule");
					}
				}
			}
		}

		// Parse points (comma-separated x,y pairs)
		while (idx < children.length) {
			// Parse x coordinate
			const xNode = children[idx];
			if (!xNode) break;

			// Skip commas between points
			if (xNode.type === "Operator" && xNode.value === ",") {
				idx++;
				continue;
			}

			const xResult = ParseUtils.parseLengthPercentageNode(xNode);
			if (!xResult.ok) return xResult;
			const x = xResult.value;
			idx++;

			// Parse y coordinate
			const yNode = children[idx];
			if (!yNode) {
				return err("Expected y coordinate after x coordinate");
			}

			const yResult = ParseUtils.parseLengthPercentageNode(yNode);
			if (!yResult.ok) return yResult;
			const y = yResult.value;
			idx++;

			points.push({ x, y });
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
