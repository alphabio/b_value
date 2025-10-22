// b_path:: src/parse/typography/font-family.ts
import * as csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";

/**
 * Parse CSS font-family property value.
 *
 * Accepts comma-separated list of font family names and/or generic family keywords.
 * Per CSS Fonts Module Level 4 specification.
 *
 * @param css - CSS font-family value (e.g., "Arial, sans-serif", "'Times New Roman', serif")
 * @returns Result with FontFamily IR or error message
 *
 * @example
 * Single family:
 * ```typescript
 * const result = parse("Arial");
 * // { ok: true, value: { kind: "font-family", families: ["Arial"] } }
 * ```
 *
 * @example
 * Multiple families:
 * ```typescript
 * const result = parse("Arial, sans-serif");
 * // { ok: true, value: { kind: "font-family", families: ["Arial", "sans-serif"] } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/font-family | MDN: font-family}
 * @see {@link https://www.w3.org/TR/css-fonts-4/#font-family-prop | W3C Spec}
 */
export function parse(css: string): Result<Type.FontFamily, string> {
	try {
		const ast = csstree.parse(css, { context: "value" });

		if (ast.type !== "Value") {
			return err("Expected Value node");
		}

		const families: string[] = [];
		let currentFamily: string[] = [];

		for (const node of ast.children) {
			if (node.type === "Operator" && node.value === ",") {
				if (currentFamily.length > 0) {
					families.push(currentFamily.join(" "));
					currentFamily = [];
				}
				continue;
			}

			if (node.type === "Identifier") {
				currentFamily.push(node.name);
			} else if (node.type === "String") {
				// Remove quotes from string values
				const unquoted = node.value.replace(/^["']|["']$/g, "");
				currentFamily.push(unquoted);
			} else if (node.type === "WhiteSpace") {
			}
		}

		// Add last family
		if (currentFamily.length > 0) {
			families.push(currentFamily.join(" "));
		}

		if (families.length === 0) {
			return err("Expected at least one font family");
		}

		return ok({
			kind: "font-family",
			families,
		});
	} catch (error) {
		return err(`Failed to parse font-family: ${error instanceof Error ? error.message : String(error)}`);
	}
}
