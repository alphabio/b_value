// b_path:: src/parse/clip-path/path.ts
import type csstree from "css-tree";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import { parseShapeFunction } from "./utils";

/**
 * Parse CSS path() function for clip-path.
 *
 * Accepts an optional fill-rule keyword followed by an SVG path data string.
 *
 * Syntax: path( [<fill-rule>,]? <string> )
 *
 * @param css - CSS path() function (e.g., "path('M 10,10 L 90,10 L 50,90 Z')")
 * @returns Result with ClipPathPath IR or error message
 *
 * @example
 * Simple path:
 * ```typescript
 * const result = parse("path('M 10,10 L 90,10 L 50,90 Z')");
 * // { kind: "clip-path-path", pathData: "M 10,10 L 90,10 L 50,90 Z" }
 * ```
 *
 * @example
 * With fill-rule:
 * ```typescript
 * const result = parse("path(evenodd, 'M 10,10 L 90,10 Z')");
 * // { kind: "clip-path-path", fillRule: "evenodd", pathData: "M 10,10 L 90,10 Z" }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape/path | MDN: path()}
 */
export function parse(css: string): Result<Type.ClipPathPath, string> {
	return parseShapeFunction(css, "path", parsePathArgs);
}

function parsePathArgs(args: csstree.CssNode[]): Result<Type.ClipPathPath, string> {
	if (args.length === 0) {
		return err("path() requires a path data string");
	}

	// Check if first argument is fill-rule keyword
	let fillRule: "nonzero" | "evenodd" | undefined;
	let pathDataNode: csstree.CssNode;

	if (args.length === 1) {
		// Only path data
		const arg0 = args[0];
		if (!arg0) {
			return err("path() requires a path data string");
		}
		pathDataNode = arg0;
	} else if (args.length >= 2) {
		// Check if first argument is fill-rule
		const firstArg = args[0];
		const secondArg = args[1];

		if (!firstArg || !secondArg) {
			return err("path() requires valid arguments");
		}

		if (firstArg.type === "Identifier") {
			const keyword = firstArg.name.toLowerCase();
			if (keyword === "nonzero" || keyword === "evenodd") {
				fillRule = keyword;
				pathDataNode = secondArg;
			} else {
				return err(`Invalid fill-rule: ${firstArg.name}. Expected 'nonzero' or 'evenodd'`);
			}
		} else {
			return err("First argument must be fill-rule keyword or path data string");
		}
	} else {
		return err("path() requires a path data string");
	}

	// Extract string value
	if (pathDataNode.type !== "String") {
		return err("Path data must be a string");
	}

	const pathData = pathDataNode.value;

	// Validate path data contains valid SVG commands
	const validationResult = validatePathData(pathData);
	if (!validationResult.ok) {
		return err(validationResult.error);
	}

	return ok({
		kind: "clip-path-path",
		fillRule,
		pathData,
	});
}

/**
 * Validate SVG path data string.
 *
 * Checks for valid SVG path commands (M, L, H, V, C, S, Q, T, A, Z).
 * Does not perform deep validation of coordinate syntax.
 *
 * @internal
 */
function validatePathData(pathData: string): Result<void, string> {
	if (!pathData || pathData.trim() === "") {
		return err("Path data cannot be empty");
	}

	// Check for valid SVG path commands
	const pathCommandRegex = /[MmLlHhVvCcSsQqTtAaZz]/;
	if (!pathCommandRegex.test(pathData)) {
		return err("Path data must contain valid SVG commands (M, L, H, V, C, S, Q, T, A, Z)");
	}

	// Path data should start with M or m (moveto)
	const trimmed = pathData.trim();
	if (!trimmed.match(/^[Mm]/)) {
		return err("Path data should start with M or m (moveto) command");
	}

	return ok(undefined);
}
