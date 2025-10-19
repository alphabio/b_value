// b_path:: src/parse/animation/play-state.ts
import * as csstree from "css-tree";
import { ANIMATION_PLAY_STATE_KEYWORDS } from "@/core/keywords/animation";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";

/**
 * Parse play state keyword from AST node.
 *
 * @param node - CSS tree node to parse
 * @returns Result with play state keyword or error
 *
 * @internal
 */
function parsePlayState(node: csstree.CssNode): Result<Type.AnimationPlayState["states"][number], string> {
	if (node.type !== "Identifier") {
		return err(`Expected play state keyword, got: ${node.type}`);
	}

	const keyword = node.name.toLowerCase();
	if (!ANIMATION_PLAY_STATE_KEYWORDS.includes(keyword as (typeof ANIMATION_PLAY_STATE_KEYWORDS)[number])) {
		return err(
			`Invalid animation-play-state keyword: ${keyword}. Expected one of: ${ANIMATION_PLAY_STATE_KEYWORDS.join(", ")}`,
		);
	}

	return ok(keyword as Type.AnimationPlayState["states"][number]);
}

/**
 * Parse CSS animation-play-state property value.
 *
 * Parses comma-separated list of play state keywords.
 *
 * Per CSS Animations Level 1 specification.
 *
 * @param css - CSS animation-play-state value (e.g., "running, paused")
 * @returns Result with AnimationPlayState IR or error message
 *
 * @example
 * Single play state:
 * ```typescript
 * const result = parse("running");
 * // { ok: true, value: { kind: "animation-play-state", states: ["running"] } }
 * ```
 *
 * @example
 * Multiple play states:
 * ```typescript
 * const result = parse("running, paused");
 * // { ok: true, value: { kind: "animation-play-state", states: ["running", "paused"] } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/animation-play-state | MDN: animation-play-state}
 * @see {@link https://www.w3.org/TR/css-animations-1/#animation-play-state | W3C Spec}
 */
export function parse(css: string): Result<Type.AnimationPlayState, string> {
	try {
		const ast = csstree.parse(css, { context: "value" });

		if (ast.type !== "Value") {
			return err("Expected Value node");
		}

		const children = ast.children.toArray();

		const states: Type.AnimationPlayState["states"] = [];
		let currentNodes: csstree.CssNode[] = [];

		for (const node of children) {
			if (node.type === "Operator" && "value" in node && node.value === ",") {
				if (currentNodes.length === 1 && currentNodes[0]) {
					const stateResult = parsePlayState(currentNodes[0]);
					if (!stateResult.ok) {
						return err(stateResult.error);
					}
					states.push(stateResult.value);
					currentNodes = [];
				} else if (currentNodes.length === 0) {
					return err("Empty value before comma");
				} else {
					return err("Expected single play state keyword between commas");
				}
			} else {
				currentNodes.push(node);
			}
		}

		// Handle last value
		if (currentNodes.length === 1 && currentNodes[0]) {
			const stateResult = parsePlayState(currentNodes[0]);
			if (!stateResult.ok) {
				return err(stateResult.error);
			}
			states.push(stateResult.value);
		} else if (currentNodes.length === 0) {
			return err("Empty animation-play-state value");
		} else {
			return err("Expected single play state keyword");
		}

		if (states.length === 0) {
			return err("animation-play-state requires at least one value");
		}

		return ok({
			kind: "animation-play-state",
			states,
		});
	} catch (e) {
		return err(`Failed to parse animation-play-state: ${e instanceof Error ? e.message : String(e)}`);
	}
}
