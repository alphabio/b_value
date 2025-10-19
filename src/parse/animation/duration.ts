// b_path:: src/parse/animation/duration.ts
import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";

/**
 * Parse duration value from AST node.
 *
 * @param node - CSS tree node to parse
 * @returns Result with duration object or error
 *
 * @internal
 */
function parseDuration(node: csstree.CssNode): Result<{ type: "auto" } | (Type.Time & { type: "time" }), string> {
	if (node.type === "Identifier" && node.name.toLowerCase() === "auto") {
		return ok({ type: "auto" as const });
	}

	if (node.type !== "Dimension") {
		return err(`Expected time dimension or 'auto', got: ${node.type}`);
	}

	const value = Number.parseFloat(node.value);
	const unit = node.unit.toLowerCase();

	if (unit !== "s" && unit !== "ms") {
		return err(`Invalid time unit: ${unit}. Expected 's' or 'ms'`);
	}

	if (value < 0) {
		return err(`animation-duration must be non-negative, got: ${value}`);
	}

	return ok({
		type: "time" as const,
		value,
		unit: unit as "s" | "ms",
	});
}

/**
 * Parse CSS animation-duration property value.
 *
 * Parses comma-separated list of time values or 'auto'.
 * Time values must be non-negative.
 *
 * Per CSS Animations Level 1 specification.
 *
 * @param css - CSS animation-duration value (e.g., "1s, auto, 500ms")
 * @returns Result with AnimationDuration IR or error message
 *
 * @example
 * Simple duration:
 * ```typescript
 * const result = parse("1s");
 * // { ok: true, value: { kind: "animation-duration", durations: [{ type: "time", value: 1, unit: "s" }] } }
 * ```
 *
 * @example
 * Auto keyword:
 * ```typescript
 * const result = parse("auto");
 * // { ok: true, value: { kind: "animation-duration", durations: [{ type: "auto" }] } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/animation-duration | MDN: animation-duration}
 * @see {@link https://www.w3.org/TR/css-animations-1/#animation-duration | W3C Spec}
 */
export function parse(css: string): Result<Type.AnimationDuration, string> {
	try {
		const ast = csstree.parse(css, { context: "value" });

		if (ast.type !== "Value") {
			return err("Expected Value node");
		}

		const children = ast.children.toArray();

		const durations: Type.AnimationDuration["durations"] = [];
		let currentNodes: csstree.CssNode[] = [];

		for (const node of children) {
			if (node.type === "Operator" && "value" in node && node.value === ",") {
				if (currentNodes.length === 1 && currentNodes[0]) {
					const durationResult = parseDuration(currentNodes[0]);
					if (!durationResult.ok) {
						return err(durationResult.error);
					}
					durations.push(durationResult.value);
					currentNodes = [];
				} else if (currentNodes.length === 0) {
					return err("Empty value before comma");
				} else {
					return err("Expected single duration value between commas");
				}
			} else {
				currentNodes.push(node);
			}
		}

		// Handle last value
		if (currentNodes.length === 1 && currentNodes[0]) {
			const durationResult = parseDuration(currentNodes[0]);
			if (!durationResult.ok) {
				return err(durationResult.error);
			}
			durations.push(durationResult.value);
		} else if (currentNodes.length === 0) {
			return err("Empty animation-duration value");
		} else {
			return err("Expected single duration value");
		}

		if (durations.length === 0) {
			return err("animation-duration requires at least one value");
		}

		return ok({
			kind: "animation-duration",
			durations,
		});
	} catch (e) {
		return err(`Failed to parse animation-duration: ${e instanceof Error ? e.message : String(e)}`);
	}
}
