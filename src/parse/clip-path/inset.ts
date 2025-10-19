// b_path:: src/parse/clip-path/inset.ts
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import * as AstUtils from "@/utils/ast";
import * as ParseUtils from "@/utils/parse";

/**
 * Parse CSS inset() function for clip-path.
 *
 * Accepts 1-4 length-percentage values for inset offsets (TRBL),
 * optionally followed by 'round' keyword and border-radius values.
 *
 * Syntax: inset( <length-percentage>{1,4} [ round <border-radius> ]? )
 *
 * @param css - CSS inset() function (e.g., "inset(10px round 5px)")
 * @returns Result with ClipPathInset IR or error message
 *
 * @example
 * Simple inset:
 * ```typescript
 * const result = parse("inset(10px)");
 * // { kind: "clip-path-inset", top: 10px, right: 10px, bottom: 10px, left: 10px }
 * ```
 *
 * @example
 * With border-radius:
 * ```typescript
 * const result = parse("inset(10px 20px round 5px)");
 * // { kind: "clip-path-inset", top: 10px, right: 20px, ..., borderRadius: { ... } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape/inset | MDN: inset()}
 */
export function parse(css: string): Result<Type.ClipPathInset, string> {
	try {
		// Parse CSS
		const astResult = AstUtils.parseCssString(css);
		if (!astResult.ok) {
			return err(astResult.error);
		}

		// Find inset() function
		const fnResult = AstUtils.findFunctionNode(astResult.value, "inset");
		if (!fnResult.ok) {
			return err(fnResult.error);
		}

		// Get function arguments
		const args = AstUtils.parseFunctionArguments(fnResult.value);

		if (args.length === 0) {
			return err("inset() requires at least one value");
		}

		// Find 'round' keyword (if present)
		const roundIndex = args.findIndex((node) => node.type === "Identifier" && node.name.toLowerCase() === "round");

		// Parse TRBL values (before 'round' or all args if no 'round')
		const trblNodes = roundIndex !== -1 ? args.slice(0, roundIndex) : args;

		if (trblNodes.length === 0) {
			return err("inset() requires at least one inset value");
		}

		const trblResult = ParseUtils.parseTRBLLengthPercentage(trblNodes);
		if (!trblResult.ok) {
			return err(`Invalid inset values: ${trblResult.error}`);
		}

		// Parse optional border-radius (after 'round')
		let borderRadius: Type.InsetBorderRadius | undefined;
		if (roundIndex !== -1) {
			const radiusNodes = args.slice(roundIndex + 1);

			if (radiusNodes.length === 0) {
				return err("Expected border-radius values after 'round' keyword");
			}

			const radiusResult = ParseUtils.parseBorderRadiusShorthand(radiusNodes);
			if (!radiusResult.ok) {
				return err(`Invalid border-radius: ${radiusResult.error}`);
			}

			borderRadius = radiusResult.value;
		}

		// Build IR
		return ok({
			kind: "clip-path-inset",
			top: trblResult.value.top,
			right: trblResult.value.right,
			bottom: trblResult.value.bottom,
			left: trblResult.value.left,
			borderRadius,
		});
	} catch (e) {
		return err(`Failed to parse inset(): ${e instanceof Error ? e.message : String(e)}`);
	}
}
