// b_path:: src/parse/animation/timing-function.ts
import * as csstree from "css-tree";
import { EASING_KEYWORD_KEYWORDS, STEP_POSITION_KEYWORDS } from "@/core/keywords/animation";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";

/**
 * Parse cubic-bezier() function from AST node.
 *
 * @param node - CSS tree Function node
 * @returns Result with CubicBezier object or error
 *
 * @internal
 */
function parseCubicBezier(node: csstree.FunctionNode): Result<Type.CubicBezier, string> {
	const children = node.children.toArray();
	const numbers: number[] = [];

	for (const child of children) {
		if (child.type === "Number") {
			numbers.push(Number.parseFloat(child.value));
		} else if (child.type === "Operator" && "value" in child && child.value === ",") {
		} else {
			return err(`Invalid node in cubic-bezier: ${child.type}`);
		}
	}

	if (numbers.length !== 4) {
		return err(`cubic-bezier requires exactly 4 numbers, got ${numbers.length}`);
	}

	const [x1, y1, x2, y2] = numbers;

	return ok({
		type: "cubic-bezier",
		x1: x1 as number,
		y1: y1 as number,
		x2: x2 as number,
		y2: y2 as number,
	});
}

/**
 * Parse steps() function from AST node.
 *
 * @param node - CSS tree Function node
 * @returns Result with Steps object or error
 *
 * @internal
 */
function parseSteps(node: csstree.FunctionNode): Result<Type.Steps, string> {
	const children = node.children.toArray();
	let steps: number | undefined;
	let position: Type.Steps["position"] | undefined;

	for (const child of children) {
		if (child.type === "Number") {
			const value = Number.parseFloat(child.value);
			if (value <= 0 || !Number.isInteger(value)) {
				return err(`steps() requires a positive integer, got ${value}`);
			}
			steps = value;
		} else if (child.type === "Identifier") {
			const keyword = child.name.toLowerCase();
			if (STEP_POSITION_KEYWORDS.includes(keyword as (typeof STEP_POSITION_KEYWORDS)[number])) {
				position = keyword as Type.Steps["position"];
			} else {
				return err(`Invalid step position keyword: ${keyword}`);
			}
		} else if (child.type === "Operator" && "value" in child && child.value === ",") {
		} else {
			return err(`Invalid node in steps(): ${child.type}`);
		}
	}

	if (steps === undefined) {
		return err("steps() requires a step count");
	}

	return ok({
		type: "steps",
		steps,
		position,
	});
}

/**
 * Parse linear() function from AST node.
 *
 * @param node - CSS tree Function node
 * @returns Result with LinearEasing object or error
 *
 * @internal
 */
function parseLinear(node: csstree.FunctionNode): Result<Type.LinearEasing, string> {
	const children = node.children.toArray();
	const stops: Type.LinearStop[] = [];
	let currentOutput: number | undefined;
	let currentInput: number | undefined;

	for (let i = 0; i < children.length; i++) {
		const child = children[i];

		if (child?.type === "Number") {
			const value = Number.parseFloat(child.value);

			// Check if next node is a percentage (input value)
			const nextNode = children[i + 1];
			if (nextNode?.type === "Percentage") {
				currentOutput = value;
				currentInput = Number.parseFloat(nextNode.value) / 100;
				i++; // Skip the percentage node in next iteration

				stops.push({
					output: currentOutput,
					input: currentInput,
				});
				currentOutput = undefined;
				currentInput = undefined;
			} else {
				// Just an output value without input
				stops.push({
					output: value,
				});
			}
		} else if (child?.type === "Operator" && "value" in child && child.value === ",") {
		} else if (child?.type !== "WhiteSpace") {
			return err(`Invalid node in linear(): ${child?.type}`);
		}
	}

	if (stops.length === 0) {
		return err("linear() requires at least one stop");
	}

	return ok({
		type: "linear",
		stops,
	});
}

/**
 * Parse easing function from AST node.
 *
 * @param node - CSS tree node to parse
 * @returns Result with EasingFunction or error
 *
 * @internal
 */
function parseEasingFunction(node: csstree.CssNode): Result<Type.EasingFunction, string> {
	// Keyword
	if (node.type === "Identifier") {
		const keyword = node.name.toLowerCase();
		if (EASING_KEYWORD_KEYWORDS.includes(keyword as (typeof EASING_KEYWORD_KEYWORDS)[number])) {
			return ok(keyword as (typeof EASING_KEYWORD_KEYWORDS)[number]);
		}
		return err(`Invalid easing keyword: ${keyword}`);
	}

	// Function
	if (node.type === "Function") {
		const name = node.name.toLowerCase();

		if (name === "cubic-bezier") {
			return parseCubicBezier(node);
		}

		if (name === "steps") {
			return parseSteps(node);
		}

		if (name === "linear") {
			return parseLinear(node);
		}

		return err(`Unknown easing function: ${name}`);
	}

	return err(`Expected easing function or keyword, got: ${node.type}`);
}

/**
 * Parse CSS animation-timing-function property value.
 *
 * Parses comma-separated list of easing functions.
 *
 * Per CSS Animations Level 1 specification.
 *
 * @param css - CSS animation-timing-function value (e.g., "ease-in, cubic-bezier(0.1, 0.7, 1.0, 0.1)")
 * @returns Result with AnimationTimingFunction IR or error message
 *
 * @example
 * Keyword:
 * ```typescript
 * const result = parse("ease-in");
 * // { ok: true, value: { kind: "animation-timing-function", functions: ["ease-in"] } }
 * ```
 *
 * @example
 * Cubic bezier:
 * ```typescript
 * const result = parse("cubic-bezier(0.1, 0.7, 1.0, 0.1)");
 * // { ok: true, value: { kind: "animation-timing-function", functions: [{ type: "cubic-bezier", x1: 0.1, ... }] } }
 * ```
 *
 * @public
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function | MDN: animation-timing-function}
 * @see {@link https://www.w3.org/TR/css-animations-1/#animation-timing-function | W3C Spec}
 */
export function parse(css: string): Result<Type.AnimationTimingFunction, string> {
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
					const funcResult = parseEasingFunction(currentNodes[0]);
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
			const funcResult = parseEasingFunction(currentNodes[0]);
			if (!funcResult.ok) {
				return err(funcResult.error);
			}
			functions.push(funcResult.value);
		} else if (currentNodes.length === 0) {
			return err("Empty animation-timing-function value");
		} else {
			return err("Expected single easing function");
		}

		if (functions.length === 0) {
			return err("animation-timing-function requires at least one value");
		}

		return ok({
			kind: "animation-timing-function",
			functions,
		});
	} catch (e) {
		return err(`Failed to parse animation-timing-function: ${e instanceof Error ? e.message : String(e)}`);
	}
}
