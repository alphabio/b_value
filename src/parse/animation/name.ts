// b_path:: src/parse/animation/name.ts
import type * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import { parseCommaSeparatedSingle } from "@/utils/parse/comma-separated";

/**
 * Parse animation name from AST node.
 *
 * @param node - CSS tree node to parse
 * @returns Result with animation name object or error
 *
 * @internal
 */
function parseAnimationName(
	node: csstree.CssNode,
): Result<{ type: "none" } | { type: "identifier"; value: string }, string> {
	if (node.type !== "Identifier") {
		return err(`Expected identifier or 'none', got: ${node.type}`);
	}

	const name = node.name;

	if (name.toLowerCase() === "none") {
		return ok({ type: "none" as const });
	}

	return ok({
		type: "identifier" as const,
		value: name,
	});
}

/**
 * Parse CSS animation-name property value.
 *
 * Parses comma-separated list of keyframe names or 'none'.
 *
 * Per CSS Animations Level 1 specification.
 *
 * @param css - CSS animation-name value (e.g., "slideIn, fadeOut")
 * @returns Result with AnimationName IR or error message
 *
 * @example
 * Single name:
 * ```typescript
 * const result = parse("slideIn");
 * // { ok: true, value: { kind: "animation-name", names: [{ type: "identifier", value: "slideIn" }] } }
 * ```
 *
 * @example
 * None keyword:
 * ```typescript
 * const result = parse("none");
 * // { ok: true, value: { kind: "animation-name", names: [{ type: "none" }] } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/animation-name | MDN: animation-name}
 * @see {@link https://www.w3.org/TR/css-animations-1/#animation-name | W3C Spec}
 */
export function parse(css: string): Result<Type.AnimationName, string> {
	const namesResult = parseCommaSeparatedSingle(css, parseAnimationName, "animation-name");

	if (!namesResult.ok) {
		return err(namesResult.error);
	}

	return ok({
		kind: "animation-name",
		names: namesResult.value,
	});
}
