// b_path:: src/generate/clip-path/polygon.ts

import type * as Type from "@/core/types";
import * as GenerateUtils from "@/utils/generate";

/**
 * Generate CSS polygon() function from ClipPathPolygon IR.
 *
 * Syntax: polygon( <fill-rule>? , <shape-arg># )
 *
 * @param polygon - ClipPathPolygon IR
 * @returns CSS string
 *
 * @example
 * toCss({ kind: "clip-path-polygon", points: [{x: {value:50, unit:"%"}, y: {value:0, unit:"%"}}, ...] });
 * // "polygon(50% 0%, 100% 50%, 50% 100%)"
 *
 * toCss({ kind: "clip-path-polygon", fillRule: "nonzero", points: [...] });
 * // "polygon(nonzero, 50% 0%, 100% 50%, 50% 100%)"
 *
 * @public
 */
export function toCss(polygon: Type.ClipPathPolygon): string {
	const parts: string[] = ["polygon("];

	// Add fill-rule if present
	if (polygon.fillRule) {
		parts.push(polygon.fillRule, ", ");
	}

	// Add points
	const pointStrings = polygon.points.map((point) => {
		const x = GenerateUtils.lengthPercentageToCss(point.x);
		const y = GenerateUtils.lengthPercentageToCss(point.y);
		return `${x} ${y}`;
	});

	parts.push(pointStrings.join(", "));
	parts.push(")");

	return parts.join("");
}
