// b_path:: src/utils/parse/easing/easing-function.ts
import type * as csstree from "css-tree";
import { EASING_KEYWORD_KEYWORDS, STEP_POSITION_KEYWORDS } from "@/core/keywords/animation";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import { cubicBezierSchema } from "@/core/types/animation";

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

	const candidate = {
		type: "cubic-bezier" as const,
		x1: x1 as number,
		y1: y1 as number,
		x2: x2 as number,
		y2: y2 as number,
	};

	// Validate against schema (x values must be in [0, 1])
	const validation = cubicBezierSchema.safeParse(candidate);
	if (!validation.success) {
		const issue = validation.error.issues[0];
		return err(`cubic-bezier validation failed: ${issue?.path.join(".")} ${issue?.message}`);
	}

	return ok(candidate);
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
 * Supports keywords (ease, ease-in, etc.) and functions (cubic-bezier, steps, linear).
 *
 * @param node - CSS tree node to parse
 * @returns Result with EasingFunction or error
 *
 * @public
 */
export function parseEasingFunction(node: csstree.CssNode): Result<Type.EasingFunction, string> {
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
