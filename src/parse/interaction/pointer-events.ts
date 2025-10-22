// b_path:: src/parse/interaction/pointer-events.ts
import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";

/**
 * Parse CSS pointer-events property value.
 *
 * Accepts keyword values: auto, none, visiblePainted, visibleFill, visibleStroke,
 * visible, painted, fill, stroke, all, bounding-box.
 * Per CSS Basic User Interface Module Level 4 and SVG specifications.
 *
 * @param css - CSS pointer-events value (e.g., "none", "auto", "visiblePainted")
 * @returns Result with PointerEvents IR or error message
 *
 * @example
 * Standard values:
 * ```typescript
 * const result = parse("none");
 * // { ok: true, value: { kind: "pointer-events", value: "none" } }
 * ```
 *
 * @example
 * SVG values:
 * ```typescript
 * const result = parse("visiblePainted");
 * // { ok: true, value: { kind: "pointer-events", value: "visiblePainted" } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events | MDN: pointer-events}
 * @see {@link https://www.w3.org/TR/css-ui-4/#pointer-events | W3C Spec}
 */
export function parse(css: string): Result<Type.PointerEvents, string> {
	try {
		const ast = csstree.parse(css, { context: "value" });

		if (ast.type !== "Value") {
			return err("Expected Value node");
		}

		const children = ast.children.toArray();

		if (children.length !== 1) {
			return err(`Expected single value, got ${children.length} values`);
		}

		const node = children[0];
		if (!node) {
			return err("Expected pointer-events value");
		}

		if (node.type === "Identifier") {
			const keyword = node.name;

			const validKeywords = [
				"auto",
				"none",
				"visiblePainted",
				"visibleFill",
				"visibleStroke",
				"visible",
				"painted",
				"fill",
				"stroke",
				"all",
				"bounding-box",
			];

			if (validKeywords.includes(keyword)) {
				return ok({
					kind: "pointer-events",
					value: keyword as Type.PointerEvents["value"],
				});
			}

			return err(`Invalid pointer-events keyword: ${keyword}`);
		}

		return err("Expected keyword for pointer-events");
	} catch (error) {
		return err(`Failed to parse pointer-events: ${error instanceof Error ? error.message : String(error)}`);
	}
}
