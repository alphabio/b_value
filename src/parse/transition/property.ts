// b_path:: src/parse/transition/property.ts
import type * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import { parseCommaSeparatedSingle } from "@/utils/parse/comma-separated";

/**
 * Parse property value from AST node.
 *
 * @param node - CSS tree node to parse
 * @returns Result with TransitionProperty property object or error
 *
 * @internal
 */
function parseProperty(node: csstree.CssNode): Result<Type.TransitionProperty["properties"][number], string> {
	if (node.type !== "Identifier") {
		return err(`Expected identifier, got: ${node.type}`);
	}

	const value = node.name.toLowerCase();

	if (value === "none") {
		return ok({ type: "none" });
	}

	if (value === "all") {
		return ok({ type: "all" });
	}

	// CSS property name (identifier)
	return ok({ type: "identifier", value: node.name });
}

/**
 * Parse CSS transition-property property value.
 *
 * Parses comma-separated list of property names, 'all', or 'none'.
 *
 * Per CSS Transitions Level 1 specification.
 *
 * @param css - CSS transition-property value (e.g., "opacity, transform")
 * @returns Result with TransitionProperty IR or error message
 *
 * @example
 * Single property:
 * ```typescript
 * const result = parse("opacity");
 * // { ok: true, value: { kind: "transition-property", properties: [{ type: "identifier", value: "opacity" }] } }
 * ```
 *
 * @example
 * Multiple properties:
 * ```typescript
 * const result = parse("opacity, transform");
 * // { ok: true, value: { kind: "transition-property", properties: [...] } }
 * ```
 *
 * @example
 * Keyword:
 * ```typescript
 * const result = parse("all");
 * // { ok: true, value: { kind: "transition-property", properties: [{ type: "all" }] } }
 * ```
 *
 * @public
 *
 * @see {@link https://github.com/mdn/data/blob/main/css/properties.json | MDN Data}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transition-property | MDN: transition-property}
 * @see {@link https://www.w3.org/TR/css-transitions-1/#transition-property-property | W3C Spec}
 */
export function parse(css: string): Result<Type.TransitionProperty, string> {
	const propertiesResult = parseCommaSeparatedSingle(css, parseProperty, "transition-property");

	if (!propertiesResult.ok) {
		return err(propertiesResult.error);
	}

	return ok({
		kind: "transition-property",
		properties: propertiesResult.value,
	});
}
