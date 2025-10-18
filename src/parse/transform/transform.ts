// b_path:: src/parse/transform/transform.ts
import type * as csstree from "css-tree";
import { TRANSFORM_FUNCTION_NAMES } from "@/core/keywords";
import { err, ok, type Result } from "@/core/result";
import type * as Type from "@/core/types";
import * as Unit from "@/core/units";

/**
 * Parse transform function from CSS function AST node.
 *
 * Handles all CSS transform functions including translate, rotate, scale, skew, matrix, etc.
 *
 * @param fn - CSS Function AST node
 * @returns Result containing TransformFunction IR or error message
 *
 * @internal
 */
export function fromFunction(fn: csstree.FunctionNode, canonicalName?: string): Result<Type.TransformFunction, string> {
	const functionName = canonicalName || fn.name.toLowerCase();

	// Get all children nodes, filtering out operators (commas)
	const children = fn.children.toArray().filter((node) => node.type !== "Operator");
	if (children.length === 0) {
		return err("Transform function requires arguments");
	}

	try {
		switch (functionName) {
			case "translate": {
				if (children.length < 1 || children.length > 2) {
					return err("translate() expects 1 or 2 arguments");
				}

				const xNode = children[0];
				if (!xNode) return err("Missing x value");
				const x = parseLengthPercentage(xNode);
				if (!x.ok) return err(`Invalid x value: ${x.error}`);

				const y = children[1] ? parseLengthPercentage(children[1]) : ok(undefined);
				if (!y.ok) return err(`Invalid y value: ${y.error}`);

				return ok({
					kind: "translate",
					x: x.value,
					y: y.value,
				});
			}

			case "translatex": {
				if (children.length !== 1) {
					return err("translateX() expects 1 argument");
				}

				const xNode = children[0];
				if (!xNode) return err("Missing x value");
				const x = parseLengthPercentage(xNode);
				if (!x.ok) return err(`Invalid x value: ${x.error}`);

				return ok({
					kind: "translateX",
					x: x.value,
				});
			}

			case "translatey": {
				if (children.length !== 1) {
					return err("translateY() expects 1 argument");
				}

				const yNode = children[0];
				if (!yNode) return err("Missing y value");
				const y = parseLengthPercentage(yNode);
				if (!y.ok) return err(`Invalid y value: ${y.error}`);

				return ok({
					kind: "translateY",
					y: y.value,
				});
			}

			case "translatez": {
				if (children.length !== 1) {
					return err("translateZ() expects 1 argument");
				}

				const zNode = children[0];
				if (!zNode) return err("Missing z value");
				const z = parseLength(zNode);
				if (!z.ok) return err(`Invalid z value: ${z.error}`);

				return ok({
					kind: "translateZ",
					z: z.value,
				});
			}

			case "translate3d": {
				if (children.length !== 3) {
					return err("translate3d() expects 3 arguments");
				}

				const xNode = children[0];
				const yNode = children[1];
				const zNode = children[2];

				if (!xNode) return err("Missing x value");
				if (!yNode) return err("Missing y value");
				if (!zNode) return err("Missing z value");

				const x = parseLengthPercentage(xNode);
				const y = parseLengthPercentage(yNode);
				const z = parseLength(zNode);

				if (!x.ok) return err(`Invalid x value: ${x.error}`);
				if (!y.ok) return err(`Invalid y value: ${y.error}`);
				if (!z.ok) return err(`Invalid z value: ${z.error}`);

				return ok({
					kind: "translate3d",
					x: x.value,
					y: y.value,
					z: z.value,
				});
			}

			case "rotate": {
				if (children.length !== 1) {
					return err("rotate() expects 1 argument");
				}

				const angleNode = children[0];
				if (!angleNode) return err("Missing angle value");
				const angle = parseAngle(angleNode);
				if (!angle.ok) return err(`Invalid angle: ${angle.error}`);

				return ok({
					kind: "rotate",
					angle: angle.value,
				});
			}

			case "rotatex":
			case "rotatey":
			case "rotatez": {
				if (children.length !== 1) {
					return err(`${functionName}() expects 1 argument`);
				}

				const angleNode = children[0];
				if (!angleNode) return err("Missing angle value");
				const angle = parseAngle(angleNode);
				if (!angle.ok) return err(`Invalid angle: ${angle.error}`);

				// Map lowercase to camelCase
				const kindMap = {
					rotatex: "rotateX",
					rotatey: "rotateY",
					rotatez: "rotateZ",
				} as const;

				return ok({
					kind: kindMap[functionName as keyof typeof kindMap],
					angle: angle.value,
				});
			}

			case "rotate3d": {
				if (children.length !== 4) {
					return err("rotate3d() expects 4 arguments");
				}

				const xNode = children[0];
				const yNode = children[1];
				const zNode = children[2];
				const angleNode = children[3];

				if (!xNode) return err("Missing x value");
				if (!yNode) return err("Missing y value");
				if (!zNode) return err("Missing z value");
				if (!angleNode) return err("Missing angle value");

				const x = parseNumber(xNode);
				const y = parseNumber(yNode);
				const z = parseNumber(zNode);
				const angle = parseAngle(angleNode);

				if (!x.ok) return err(`Invalid x value: ${x.error}`);
				if (!y.ok) return err(`Invalid y value: ${y.error}`);
				if (!z.ok) return err(`Invalid z value: ${z.error}`);
				if (!angle.ok) return err(`Invalid angle: ${angle.error}`);

				return ok({
					kind: "rotate3d",
					x: x.value,
					y: y.value,
					z: z.value,
					angle: angle.value,
				});
			}

			case "scale": {
				if (children.length < 1 || children.length > 2) {
					return err("scale() expects 1 or 2 arguments");
				}

				const xNode = children[0];
				if (!xNode) return err("Missing x value");
				const x = parseNumber(xNode);
				if (!x.ok) return err(`Invalid x value: ${x.error}`);

				const y = children[1] ? parseNumber(children[1]) : ok(x.value);
				if (!y.ok) return err(`Invalid y value: ${y.error}`);

				return ok({
					kind: "scale",
					x: x.value,
					y: y.value,
				});
			}

			case "scalex": {
				if (children.length !== 1) {
					return err("scaleX() expects 1 argument");
				}

				const xNode = children[0];
				if (!xNode) return err("Missing x value");
				const x = parseNumber(xNode);
				if (!x.ok) return err(`Invalid x value: ${x.error}`);

				return ok({
					kind: "scaleX",
					x: x.value,
				});
			}

			case "scaley": {
				if (children.length !== 1) {
					return err("scaleY() expects 1 argument");
				}

				const yNode = children[0];
				if (!yNode) return err("Missing y value");
				const y = parseNumber(yNode);
				if (!y.ok) return err(`Invalid y value: ${y.error}`);

				return ok({
					kind: "scaleY",
					y: y.value,
				});
			}

			case "scalez": {
				if (children.length !== 1) {
					return err("scaleZ() expects 1 argument");
				}

				const zNode = children[0];
				if (!zNode) return err("Missing z value");
				const z = parseNumber(zNode);
				if (!z.ok) return err(`Invalid z value: ${z.error}`);

				return ok({
					kind: "scaleZ",
					z: z.value,
				});
			}

			case "scale3d": {
				if (children.length !== 3) {
					return err("scale3d() expects 3 arguments");
				}

				const xNode = children[0];
				const yNode = children[1];
				const zNode = children[2];

				if (!xNode) return err("Missing x value");
				if (!yNode) return err("Missing y value");
				if (!zNode) return err("Missing z value");

				const x = parseNumber(xNode);
				const y = parseNumber(yNode);
				const z = parseNumber(zNode);

				if (!x.ok) return err(`Invalid x value: ${x.error}`);
				if (!y.ok) return err(`Invalid y value: ${y.error}`);
				if (!z.ok) return err(`Invalid z value: ${z.error}`);

				return ok({
					kind: "scale3d",
					x: x.value,
					y: y.value,
					z: z.value,
				});
			}

			case "skew": {
				if (children.length < 1 || children.length > 2) {
					return err("skew() expects 1 or 2 arguments");
				}

				const xNode = children[0];
				if (!xNode) return err("Missing x angle");
				const x = parseAngle(xNode);
				if (!x.ok) return err(`Invalid x angle: ${x.error}`);

				const yNode = children[1];
				const y = yNode ? parseAngle(yNode) : ok({ value: 0, unit: "deg" as const });
				if (!y.ok) return err(`Invalid y angle: ${y.error}`);

				return ok({
					kind: "skew",
					x: x.value,
					y: y.value,
				});
			}

			case "skewx": {
				if (children.length !== 1) {
					return err("skewX() expects 1 argument");
				}

				const xNode = children[0];
				if (!xNode) return err("Missing x angle");
				const x = parseAngle(xNode);
				if (!x.ok) return err(`Invalid x angle: ${x.error}`);

				return ok({
					kind: "skewX",
					x: x.value,
				});
			}

			case "skewy": {
				if (children.length !== 1) {
					return err("skewY() expects 1 argument");
				}

				const yNode = children[0];
				if (!yNode) return err("Missing y angle");
				const y = parseAngle(yNode);
				if (!y.ok) return err(`Invalid y angle: ${y.error}`);

				return ok({
					kind: "skewY",
					y: y.value,
				});
			}

			case "matrix": {
				if (children.length !== 6) {
					return err("matrix() expects 6 arguments");
				}

				const values: number[] = [];
				for (let i = 0; i < 6; i++) {
					const node = children[i];
					if (!node) return err(`Missing matrix value at position ${i + 1}`);
					const num = parseNumber(node);
					if (!num.ok) return err(`Invalid matrix value at position ${i + 1}: ${num.error}`);
					values.push(num.value);
				}

				// Validate we have exactly 6 values
				if (values.length !== 6) {
					return err("matrix() requires exactly 6 values");
				}

				// Destructure to satisfy TypeScript - we know length is 6
				const [a, b, c, d, e, f] = values;

				return ok({
					kind: "matrix",
					a: a as number,
					b: b as number,
					c: c as number,
					d: d as number,
					e: { value: e as number, unit: "px" },
					f: { value: f as number, unit: "px" },
				});
			}

			case "matrix3d": {
				if (children.length !== 16) {
					return err("matrix3d() expects 16 arguments");
				}

				const values: number[] = [];
				for (let i = 0; i < 16; i++) {
					const node = children[i];
					if (!node) return err(`Missing matrix3d value at position ${i + 1}`);
					const num = parseNumber(node);
					if (!num.ok) return err(`Invalid matrix3d value at position ${i + 1}: ${num.error}`);
					values.push(num.value);
				}

				// Validate we have exactly 16 values
				if (values.length !== 16) {
					return err("matrix3d() requires exactly 16 values");
				}

				return ok({
					kind: "matrix3d",
					values,
				});
			}

			case "perspective": {
				if (children.length !== 1) {
					return err("perspective() expects 1 argument");
				}

				const depthNode = children[0];
				if (!depthNode) return err("Missing depth value");
				const depth = parseLength(depthNode);
				if (!depth.ok) return err(`Invalid depth value: ${depth.error}`);

				return ok({
					kind: "perspective",
					depth: depth.value,
				});
			}

			default:
				return err(`Unknown transform function: ${functionName}`);
		}
	} catch (e) {
		return err(`Failed to parse transform function: ${e instanceof Error ? e.message : String(e)}`);
	}
}

/**
 * Parse a CSS transform value into structured intermediate representation (IR).
 *
 * Parses CSS transform property values containing transform functions like
 * translate(), rotate(), scale(), etc. into type-safe IR objects.
 *
 * Supports all CSS transform functions per CSS Transforms Module Level 1 & 2:
 * - Translation: translate(), translateX(), translateY(), translateZ(), translate3d()
 * - Rotation: rotate(), rotateX(), rotateY(), rotateZ(), rotate3d()
 * - Scaling: scale(), scaleX(), scaleY(), scaleZ(), scale3d()
 * - Skewing: skew(), skewX(), skewY()
 * - Matrix: matrix(), matrix3d()
 * - Perspective: perspective()
 *
 * @param css - CSS string containing transform functions
 * @returns Result containing Transform IR on success, or error message on failure
 *
 * @public
 *
 * @example
 * Simple translation:
 * ```typescript
 * import { Parse } from "b_value";
 *
 * const result = Parse.Transform.parse("translate(100px, 50px)");
 * if (result.ok) {
 *   console.log(result.value);
 *   // [{ kind: "translate", x: { value: 100, unit: "px" }, y: { value: 50, unit: "px" } }]
 * }
 * ```
 *
 * @example
 * Multiple transforms:
 * ```typescript
 * const result = Parse.Transform.parse("translateX(100px) rotate(45deg) scale(1.5)");
 * if (result.ok) {
 *   console.log(result.value.length); // 3
 *   console.log(result.value[0].kind); // "translateX"
 *   console.log(result.value[1].kind); // "rotate"
 *   console.log(result.value[2].kind); // "scale"
 * }
 * ```
 *
 * @example
 * 3D transforms:
 * ```typescript
 * const result = Parse.Transform.parse("translate3d(10px, 20px, 30px) rotateY(45deg)");
 * if (result.ok) {
 *   console.log(result.value[0].kind); // "translate3d"
 *   console.log(result.value[1].kind); // "rotateY"
 * }
 * ```
 *
 * @example
 * Error handling:
 * ```typescript
 * const result = Parse.Transform.parse("invalid syntax");
 * if (!result.ok) {
 *   console.error(result.error); // Error message string
 * }
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform | MDN: transform}
 * @see {@link https://www.w3.org/TR/css-transforms-1/ | W3C Spec: CSS Transforms Level 1}
 * @see {@link https://www.w3.org/TR/css-transforms-2/ | W3C Spec: CSS Transforms Level 2}
 */
export function parse(css: string): Result<Type.Transform, string> {
	const csstree = require("css-tree");

	try {
		// Parse as a value
		const ast = csstree.parse(css, { context: "value" });

		// Find all function nodes
		const transformFunctions: Type.TransformFunction[] = [];
		const errors: string[] = [];

		csstree.walk(ast, {
			visit: "Function",
			enter(node: csstree.FunctionNode) {
				// Check if it's a transform function
				const functionName = node.name.toLowerCase();

				if (TRANSFORM_FUNCTION_NAMES.includes(functionName as (typeof TRANSFORM_FUNCTION_NAMES)[number])) {
					// Use the canonical function name for parsing
					const canonicalName = TRANSFORM_FUNCTION_NAMES.find((name) => name === functionName) || functionName;
					const funcResult = fromFunction(node, canonicalName);
					if (funcResult.ok) {
						transformFunctions.push(funcResult.value);
					} else {
						errors.push(`${functionName}(): ${funcResult.error}`);
					}
				}
			},
		});

		if (transformFunctions.length === 0) {
			if (errors.length > 0) {
				return err(errors.join("; "));
			}
			return err("No valid transform functions found in CSS string");
		}

		return ok(transformFunctions);
	} catch (e) {
		return err(`Failed to parse CSS: ${e instanceof Error ? e.message : String(e)}`);
	}
}

// Helper functions for parsing different value types

function parseLength(node: csstree.CssNode): Result<Type.Length, string> {
	if (node.type === "Dimension") {
		const value = Number.parseFloat(node.value);
		if (Number.isNaN(value)) {
			return err("Invalid length value");
		}

		// Use core unit validation
		const allLengthUnits = [...Unit.ABSOLUTE_LENGTH_UNITS, ...Unit.FONT_LENGTH_UNITS, ...Unit.VIEWPORT_LENGTH_UNITS];

		if (!allLengthUnits.includes(node.unit as (typeof allLengthUnits)[number])) {
			return err(`Invalid length unit: ${node.unit}`);
		}

		return ok({
			value,
			unit: node.unit as (typeof allLengthUnits)[number],
		});
	}
	return err("Expected length dimension");
}

function parseLengthPercentage(node: csstree.CssNode): Result<Type.LengthPercentage, string> {
	if (node.type === "Dimension") {
		const value = Number.parseFloat(node.value);
		if (Number.isNaN(value)) {
			return err("Invalid length value");
		}

		// Use core unit validation for length units
		const allLengthUnits = [...Unit.ABSOLUTE_LENGTH_UNITS, ...Unit.FONT_LENGTH_UNITS, ...Unit.VIEWPORT_LENGTH_UNITS];

		if (!allLengthUnits.includes(node.unit as (typeof allLengthUnits)[number])) {
			return err(`Invalid length unit: ${node.unit}`);
		}

		return ok({
			value,
			unit: node.unit as (typeof allLengthUnits)[number],
		});
	}
	if (node.type === "Percentage") {
		const value = Number.parseFloat(node.value);
		if (Number.isNaN(value)) {
			return err("Invalid percentage value");
		}
		return ok({ value, unit: Unit.PERCENTAGE_UNIT });
	}
	return err("Expected length or percentage");
}

function parseAngle(node: csstree.CssNode): Result<Type.Angle, string> {
	if (node.type === "Dimension") {
		const value = Number.parseFloat(node.value);
		if (Number.isNaN(value)) {
			return err("Invalid angle value");
		}

		// Use core unit validation
		if (!Unit.ANGLE_UNITS.includes(node.unit as (typeof Unit.ANGLE_UNITS)[number])) {
			return err(`Invalid angle unit: ${node.unit}`);
		}

		return ok({ value, unit: node.unit as (typeof Unit.ANGLE_UNITS)[number] });
	}
	return err("Expected angle dimension");
}

function parseNumber(node: csstree.CssNode): Result<number, string> {
	if (node.type === "Number") {
		const value = Number.parseFloat(node.value);
		if (Number.isNaN(value)) {
			return err("Invalid number value");
		}
		return ok(value);
	}
	return err("Expected number");
}
