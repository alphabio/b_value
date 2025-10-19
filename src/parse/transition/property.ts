// b_path:: src/parse/transition/property.ts
import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";

/**
 * Parse property name from AST node.
 *
 * @param node - CSS tree node to parse
 * @returns Result with property object or error
 *
 * @internal
 */
function parseProperty(node: csstree.CssNode): Result<Type.TransitionProperty["properties"][number], string> {
	if (node.type !== "Identifier") {
		return err(`Expected identifier for property name, got: ${node.type}`);
	}

	const value = node.name.toLowerCase();

	if (value === "none") {
		return ok({ type: "none" });
	}

	if (value === "all") {
		return ok({ type: "all" });
	}

	// Accept any identifier as a property name (including custom properties)
	return ok({ type: "identifier", value: node.name });
}

/**
 * Parse CSS transition-property property value.
 *
 * Parses comma-separated list of property names, 'none', or 'all'.
 *
 * Per CSS Transitions Level 1 specification.
 *
 * @param css - CSS transition-property value (e.g., "opacity, transform", "all", "none")
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
 * Keywords:
 * ```typescript
 * const result = parse("all");
 * // { ok: true, value: { kind: "transition-property", properties: [{ type: "all" }] } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transition-property | MDN: transition-property}
 * @see {@link https://www.w3.org/TR/css-transitions-1/#transition-property-property | W3C Spec}
 */
export function parse(css: string): Result<Type.TransitionProperty, string> {
	try {
		const ast = csstree.parse(css, { context: "value" });

		if (ast.type !== "Value") {
			return err("Expected Value node");
		}

		const children = ast.children.toArray();

		const properties: Type.TransitionProperty["properties"] = [];
		let currentNodes: csstree.CssNode[] = [];

		for (const node of children) {
			if (node.type === "Operator" && "value" in node && node.value === ",") {
				if (currentNodes.length === 1 && currentNodes[0]) {
					const propResult = parseProperty(currentNodes[0]);
					if (!propResult.ok) {
						return err(propResult.error);
					}
					properties.push(propResult.value);
					currentNodes = [];
				} else if (currentNodes.length === 0) {
					return err("Empty value before comma");
				} else {
					return err("Expected single property name between commas");
				}
			} else {
				currentNodes.push(node);
			}
		}

		// Handle last value
		if (currentNodes.length === 1 && currentNodes[0]) {
			const propResult = parseProperty(currentNodes[0]);
			if (!propResult.ok) {
				return err(propResult.error);
			}
			properties.push(propResult.value);
		} else if (currentNodes.length === 0) {
			return err("Empty transition-property value");
		} else {
			return err("Expected single property name");
		}

		if (properties.length === 0) {
			return err("transition-property requires at least one value");
		}

		return ok({
			kind: "transition-property",
			properties,
		});
	} catch (e) {
		return err(`Failed to parse transition-property: ${e instanceof Error ? e.message : String(e)}`);
	}
}
