// b_path:: src/parse/animation/fill-mode.ts
import * as csstree from "css-tree";
import { ANIMATION_FILL_MODE_KEYWORDS } from "@/core/keywords/animation";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";

/**
 * Parse fill mode keyword from AST node.
 *
 * @param node - CSS tree node to parse
 * @returns Result with fill mode keyword or error
 *
 * @internal
 */
function parseFillMode(node: csstree.CssNode): Result<Type.AnimationFillMode["modes"][number], string> {
	if (node.type !== "Identifier") {
		return err(`Expected fill mode keyword, got: ${node.type}`);
	}

	const keyword = node.name.toLowerCase();
	if (!ANIMATION_FILL_MODE_KEYWORDS.includes(keyword as (typeof ANIMATION_FILL_MODE_KEYWORDS)[number])) {
		return err(
			`Invalid animation-fill-mode keyword: ${keyword}. Expected one of: ${ANIMATION_FILL_MODE_KEYWORDS.join(", ")}`,
		);
	}

	return ok(keyword as Type.AnimationFillMode["modes"][number]);
}

/**
 * Parse CSS animation-fill-mode property value.
 *
 * Parses comma-separated list of fill mode keywords.
 *
 * Per CSS Animations Level 1 specification.
 *
 * @param css - CSS animation-fill-mode value (e.g., "none, forwards, both")
 * @returns Result with AnimationFillMode IR or error message
 *
 * @example
 * Single fill mode:
 * ```typescript
 * const result = parse("forwards");
 * // { ok: true, value: { kind: "animation-fill-mode", modes: ["forwards"] } }
 * ```
 *
 * @example
 * Multiple fill modes:
 * ```typescript
 * const result = parse("none, forwards, both");
 * // { ok: true, value: { kind: "animation-fill-mode", modes: ["none", "forwards", "both"] } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode | MDN: animation-fill-mode}
 * @see {@link https://www.w3.org/TR/css-animations-1/#animation-fill-mode | W3C Spec}
 */
export function parse(css: string): Result<Type.AnimationFillMode, string> {
	try {
		const ast = csstree.parse(css, { context: "value" });

		if (ast.type !== "Value") {
			return err("Expected Value node");
		}

		const children = ast.children.toArray();

		const modes: Type.AnimationFillMode["modes"] = [];
		let currentNodes: csstree.CssNode[] = [];

		for (const node of children) {
			if (node.type === "Operator" && "value" in node && node.value === ",") {
				if (currentNodes.length === 1 && currentNodes[0]) {
					const modeResult = parseFillMode(currentNodes[0]);
					if (!modeResult.ok) {
						return err(modeResult.error);
					}
					modes.push(modeResult.value);
					currentNodes = [];
				} else if (currentNodes.length === 0) {
					return err("Empty value before comma");
				} else {
					return err("Expected single fill mode keyword between commas");
				}
			} else {
				currentNodes.push(node);
			}
		}

		// Handle last value
		if (currentNodes.length === 1 && currentNodes[0]) {
			const modeResult = parseFillMode(currentNodes[0]);
			if (!modeResult.ok) {
				return err(modeResult.error);
			}
			modes.push(modeResult.value);
		} else if (currentNodes.length === 0) {
			return err("Empty animation-fill-mode value");
		} else {
			return err("Expected single fill mode keyword");
		}

		if (modes.length === 0) {
			return err("animation-fill-mode requires at least one value");
		}

		return ok({
			kind: "animation-fill-mode",
			modes,
		});
	} catch (e) {
		return err(`Failed to parse animation-fill-mode: ${e instanceof Error ? e.message : String(e)}`);
	}
}
