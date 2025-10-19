// b_path:: src/parse/animation/direction.ts
import * as csstree from "css-tree";
import { ANIMATION_DIRECTION_KEYWORDS } from "@/core/keywords/animation";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";

/**
 * Parse direction keyword from AST node.
 *
 * @param node - CSS tree node to parse
 * @returns Result with direction keyword or error
 *
 * @internal
 */
function parseDirection(node: csstree.CssNode): Result<Type.AnimationDirection["directions"][number], string> {
	if (node.type !== "Identifier") {
		return err(`Expected direction keyword, got: ${node.type}`);
	}

	const keyword = node.name.toLowerCase();
	if (!ANIMATION_DIRECTION_KEYWORDS.includes(keyword as (typeof ANIMATION_DIRECTION_KEYWORDS)[number])) {
		return err(
			`Invalid animation-direction keyword: ${keyword}. Expected one of: ${ANIMATION_DIRECTION_KEYWORDS.join(", ")}`,
		);
	}

	return ok(keyword as Type.AnimationDirection["directions"][number]);
}

/**
 * Parse CSS animation-direction property value.
 *
 * Parses comma-separated list of direction keywords.
 *
 * Per CSS Animations Level 1 specification.
 *
 * @param css - CSS animation-direction value (e.g., "normal, reverse, alternate")
 * @returns Result with AnimationDirection IR or error message
 *
 * @example
 * Single direction:
 * ```typescript
 * const result = parse("normal");
 * // { ok: true, value: { kind: "animation-direction", directions: ["normal"] } }
 * ```
 *
 * @example
 * Multiple directions:
 * ```typescript
 * const result = parse("normal, reverse, alternate");
 * // { ok: true, value: { kind: "animation-direction", directions: ["normal", "reverse", "alternate"] } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/animation-direction | MDN: animation-direction}
 * @see {@link https://www.w3.org/TR/css-animations-1/#animation-direction | W3C Spec}
 */
export function parse(css: string): Result<Type.AnimationDirection, string> {
	try {
		const ast = csstree.parse(css, { context: "value" });

		if (ast.type !== "Value") {
			return err("Expected Value node");
		}

		const children = ast.children.toArray();

		const directions: Type.AnimationDirection["directions"] = [];
		let currentNodes: csstree.CssNode[] = [];

		for (const node of children) {
			if (node.type === "Operator" && "value" in node && node.value === ",") {
				if (currentNodes.length === 1 && currentNodes[0]) {
					const directionResult = parseDirection(currentNodes[0]);
					if (!directionResult.ok) {
						return err(directionResult.error);
					}
					directions.push(directionResult.value);
					currentNodes = [];
				} else if (currentNodes.length === 0) {
					return err("Empty value before comma");
				} else {
					return err("Expected single direction keyword between commas");
				}
			} else {
				currentNodes.push(node);
			}
		}

		// Handle last value
		if (currentNodes.length === 1 && currentNodes[0]) {
			const directionResult = parseDirection(currentNodes[0]);
			if (!directionResult.ok) {
				return err(directionResult.error);
			}
			directions.push(directionResult.value);
		} else if (currentNodes.length === 0) {
			return err("Empty animation-direction value");
		} else {
			return err("Expected single direction keyword");
		}

		if (directions.length === 0) {
			return err("animation-direction requires at least one value");
		}

		return ok({
			kind: "animation-direction",
			directions,
		});
	} catch (e) {
		return err(`Failed to parse animation-direction: ${e instanceof Error ? e.message : String(e)}`);
	}
}
