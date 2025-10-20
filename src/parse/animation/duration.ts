// b_path:: src/parse/animation/duration.ts
import type * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import { parseCommaSeparatedSingle } from "@/utils/parse/comma-separated";

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
	const durationsResult = parseCommaSeparatedSingle(css, parseDuration, "animation-duration");

	if (!durationsResult.ok) {
		return err(durationsResult.error);
	}

	return ok({
		kind: "animation-duration",
		durations: durationsResult.value,
	});
}
