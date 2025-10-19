// b_path:: src/parse/animation/iteration-count.ts
import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";

/**
 * Parse iteration count value from AST node.
 *
 * @param node - CSS tree node to parse
 * @returns Result with iteration count object or error
 *
 * @internal
 */
function parseIterationCount(
	node: csstree.CssNode,
): Result<{ type: "infinite" } | { type: "number"; value: number }, string> {
	if (node.type === "Identifier" && node.name.toLowerCase() === "infinite") {
		return ok({ type: "infinite" as const });
	}

	if (node.type !== "Number") {
		return err(`Expected number or 'infinite', got: ${node.type}`);
	}

	const value = Number.parseFloat(node.value);

	if (value < 0) {
		return err(`animation-iteration-count must be non-negative, got: ${value}`);
	}

	return ok({
		type: "number" as const,
		value,
	});
}

/**
 * Parse CSS animation-iteration-count property value.
 *
 * Parses comma-separated list of numbers or 'infinite'.
 * Number values must be non-negative.
 *
 * Per CSS Animations Level 1 specification.
 *
 * @param css - CSS animation-iteration-count value (e.g., "infinite, 2, 0.5")
 * @returns Result with AnimationIterationCount IR or error message
 *
 * @example
 * Number count:
 * ```typescript
 * const result = parse("3");
 * // { ok: true, value: { kind: "animation-iteration-count", counts: [{ type: "number", value: 3 }] } }
 * ```
 *
 * @example
 * Infinite keyword:
 * ```typescript
 * const result = parse("infinite");
 * // { ok: true, value: { kind: "animation-iteration-count", counts: [{ type: "infinite" }] } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/animation-iteration-count | MDN: animation-iteration-count}
 * @see {@link https://www.w3.org/TR/css-animations-1/#animation-iteration-count | W3C Spec}
 */
export function parse(css: string): Result<Type.AnimationIterationCount, string> {
	try {
		const ast = csstree.parse(css, { context: "value" });

		if (ast.type !== "Value") {
			return err("Expected Value node");
		}

		const children = ast.children.toArray();

		const counts: Type.AnimationIterationCount["counts"] = [];
		let currentNodes: csstree.CssNode[] = [];

		for (const node of children) {
			if (node.type === "Operator" && "value" in node && node.value === ",") {
				if (currentNodes.length === 1 && currentNodes[0]) {
					const countResult = parseIterationCount(currentNodes[0]);
					if (!countResult.ok) {
						return err(countResult.error);
					}
					counts.push(countResult.value);
					currentNodes = [];
				} else if (currentNodes.length === 0) {
					return err("Empty value before comma");
				} else {
					return err("Expected single iteration count between commas");
				}
			} else {
				currentNodes.push(node);
			}
		}

		// Handle last value
		if (currentNodes.length === 1 && currentNodes[0]) {
			const countResult = parseIterationCount(currentNodes[0]);
			if (!countResult.ok) {
				return err(countResult.error);
			}
			counts.push(countResult.value);
		} else if (currentNodes.length === 0) {
			return err("Empty animation-iteration-count value");
		} else {
			return err("Expected single iteration count");
		}

		if (counts.length === 0) {
			return err("animation-iteration-count requires at least one value");
		}

		return ok({
			kind: "animation-iteration-count",
			counts,
		});
	} catch (e) {
		return err(`Failed to parse animation-iteration-count: ${e instanceof Error ? e.message : String(e)}`);
	}
}
