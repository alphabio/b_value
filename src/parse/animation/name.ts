// b_path:: src/parse/animation/name.ts
import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";

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
	try {
		const ast = csstree.parse(css, { context: "value" });

		if (ast.type !== "Value") {
			return err("Expected Value node");
		}

		const children = ast.children.toArray();

		const names: Type.AnimationName["names"] = [];
		let currentNodes: csstree.CssNode[] = [];

		for (const node of children) {
			if (node.type === "Operator" && "value" in node && node.value === ",") {
				if (currentNodes.length === 1 && currentNodes[0]) {
					const nameResult = parseAnimationName(currentNodes[0]);
					if (!nameResult.ok) {
						return err(nameResult.error);
					}
					names.push(nameResult.value);
					currentNodes = [];
				} else if (currentNodes.length === 0) {
					return err("Empty value before comma");
				} else {
					return err("Expected single animation name between commas");
				}
			} else {
				currentNodes.push(node);
			}
		}

		// Handle last value
		if (currentNodes.length === 1 && currentNodes[0]) {
			const nameResult = parseAnimationName(currentNodes[0]);
			if (!nameResult.ok) {
				return err(nameResult.error);
			}
			names.push(nameResult.value);
		} else if (currentNodes.length === 0) {
			return err("Empty animation-name value");
		} else {
			return err("Expected single animation name");
		}

		if (names.length === 0) {
			return err("animation-name requires at least one value");
		}

		return ok({
			kind: "animation-name",
			names,
		});
	} catch (e) {
		return err(`Failed to parse animation-name: ${e instanceof Error ? e.message : String(e)}`);
	}
}
