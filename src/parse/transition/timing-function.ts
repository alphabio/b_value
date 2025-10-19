// b_path:: src/parse/transition/timing-function.ts
import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import { EasingFunction } from "@/utils/parse/easing";

/**
 * Parse CSS transition-timing-function property value.
 *
 * Parses comma-separated list of easing functions.
 *
 * Per CSS Transitions Level 1 specification.
 *
 * @param css - CSS transition-timing-function value (e.g., "ease-in, cubic-bezier(0.1, 0.7, 1.0, 0.1)")
 * @returns Result with TransitionTimingFunction IR or error message
 *
 * @example
 * Keyword:
 * ```typescript
 * const result = parse("ease-in");
 * // { ok: true, value: { kind: "transition-timing-function", functions: ["ease-in"] } }
 * ```
 *
 * @example
 * Cubic bezier:
 * ```typescript
 * const result = parse("cubic-bezier(0.1, 0.7, 1.0, 0.1)");
 * // { ok: true, value: { kind: "transition-timing-function", functions: [{ type: "cubic-bezier", x1: 0.1, ... }] } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function | MDN: transition-timing-function}
 * @see {@link https://www.w3.org/TR/css-transitions-1/#transition-timing-function-property | W3C Spec}
 */
export function parse(css: string): Result<Type.TransitionTimingFunction, string> {
	try {
		const ast = csstree.parse(css, { context: "value" });

		if (ast.type !== "Value") {
			return err("Expected Value node");
		}

		const children = ast.children.toArray();

		const functions: Type.EasingFunction[] = [];
		let currentNodes: csstree.CssNode[] = [];

		for (const node of children) {
			if (node.type === "Operator" && "value" in node && node.value === ",") {
				if (currentNodes.length === 1 && currentNodes[0]) {
					const funcResult = EasingFunction.parseEasingFunction(currentNodes[0]);
					if (!funcResult.ok) {
						return err(funcResult.error);
					}
					functions.push(funcResult.value);
					currentNodes = [];
				} else if (currentNodes.length === 0) {
					return err("Empty value before comma");
				} else {
					return err("Expected single easing function between commas");
				}
			} else {
				currentNodes.push(node);
			}
		}

		// Handle last value
		if (currentNodes.length === 1 && currentNodes[0]) {
			const funcResult = EasingFunction.parseEasingFunction(currentNodes[0]);
			if (!funcResult.ok) {
				return err(funcResult.error);
			}
			functions.push(funcResult.value);
		} else if (currentNodes.length === 0) {
			return err("Empty transition-timing-function value");
		} else {
			return err("Expected single easing function");
		}

		if (functions.length === 0) {
			return err("transition-timing-function requires at least one value");
		}

		return ok({
			kind: "transition-timing-function",
			functions,
		});
	} catch (e) {
		return err(`Failed to parse transition-timing-function: ${e instanceof Error ? e.message : String(e)}`);
	}
}
