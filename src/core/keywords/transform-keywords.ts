// b_path:: src/core/keywords/transform-keywords.ts

/**
 * CSS transform function names.
 *
 * All valid CSS transform function identifiers used in the transform property.
 * These are the canonical lowercase names as they appear in CSS.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function}
 *
 * @public
 */
export const TRANSFORM_FUNCTION_NAMES = [
	"translate",
	"translatex",
	"translatey",
	"translatez",
	"translate3d",
	"rotate",
	"rotatex",
	"rotatey",
	"rotatez",
	"rotate3d",
	"scale",
	"scalex",
	"scaley",
	"scalez",
	"scale3d",
	"skew",
	"skewx",
	"skewy",
	"matrix",
	"matrix3d",
	"perspective",
] as const;

/**
 * Type representing valid CSS transform function names.
 * @public
 */
export type TransformFunctionName = (typeof TRANSFORM_FUNCTION_NAMES)[number];

/**
 * Check if a string is a valid transform function name.
 *
 * @param name - String to check (case-insensitive)
 * @returns True if the name is a valid transform function
 *
 * @public
 */
export function isTransformFunctionName(name: string): name is TransformFunctionName {
	return TRANSFORM_FUNCTION_NAMES.includes(name.toLowerCase() as TransformFunctionName);
}
