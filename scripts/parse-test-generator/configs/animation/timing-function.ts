// b_path:: scripts/parse-test-generator/configs/animation/timing-function.ts
/**
 * Test cases for animation-timing-function parser
 */

export interface TestCase {
input: string;
description: string;
category: string;
expectValid?: boolean;
expectedError?: string;
}

export interface PropertyConfig {
module: string;
propertyName: string;
sourceFile: string;
importPath: string;
outputPath: string;
cases: TestCase[];
}

export const config: PropertyConfig = {
propertyName: "timing-function",
module: "animation",sourceFile: "src/parse/animation/timing-function.ts",
importPath: "../src/parse/animation/timing-function.js",
outputPath: "src/parse/animation/timing-function.test.ts",
cases: [
// Valid: Keywords
{ input: "ease", description: "ease keyword", category: "valid-keyword", expectValid: true },
{ input: "linear", description: "linear keyword", category: "valid-keyword", expectValid: true },
{ input: "ease-in", description: "ease-in keyword", category: "valid-keyword", expectValid: true },
{ input: "ease-out", description: "ease-out keyword", category: "valid-keyword", expectValid: true },
{ input: "ease-in-out", description: "ease-in-out keyword", category: "valid-keyword", expectValid: true },
{ input: "step-start", description: "step-start keyword", category: "valid-keyword", expectValid: true },
{ input: "step-end", description: "step-end keyword", category: "valid-keyword", expectValid: true },
{ input: "EASE", description: "case insensitive keyword", category: "valid-keyword", expectValid: true },

// Valid: cubic-bezier()
{ input: "cubic-bezier(0, 0, 1, 1)", description: "basic bezier", category: "valid-bezier", expectValid: true },
{ input: "cubic-bezier(0.42, 0, 0.58, 1)", description: "custom bezier", category: "valid-bezier", expectValid: true },
{ input: "cubic-bezier(0, -2, 1, 3)", description: "bezier with Y outside 0-1", category: "valid-bezier", expectValid: true },
{ input: "cubic-bezier(0.25, 0.1, 0.25, 1)", description: "ease bezier values", category: "valid-bezier", expectValid: true },
{ input: "cubic-bezier(1, 0, 0, 1)", description: "reverse bezier", category: "valid-bezier", expectValid: true },

// Valid: steps()
{ input: "steps(1)", description: "single step", category: "valid-steps", expectValid: true },
{ input: "steps(4)", description: "multiple steps", category: "valid-steps", expectValid: true },
{ input: "steps(4, jump-start)", description: "steps with jump-start", category: "valid-steps", expectValid: true },
{ input: "steps(10, jump-end)", description: "steps with jump-end", category: "valid-steps", expectValid: true },
{ input: "steps(5, jump-none)", description: "steps with jump-none", category: "valid-steps", expectValid: true },
{ input: "steps(3, jump-both)", description: "steps with jump-both", category: "valid-steps", expectValid: true },
{ input: "steps(2, start)", description: "steps with legacy start", category: "valid-steps", expectValid: true },
{ input: "steps(2, end)", description: "steps with legacy end", category: "valid-steps", expectValid: true },

// Valid: lists
{ input: "ease, linear", description: "multiple keywords", category: "valid-list", expectValid: true },
{ input: "ease-in, cubic-bezier(0, 0, 1, 1), steps(2)", description: "mixed functions", category: "valid-list", expectValid: true },
{ input: "ease , linear", description: "list with whitespace", category: "valid-list", expectValid: true },

// Invalid: cubic-bezier constraints
{ input: "cubic-bezier(-1, 0, 1, 1)", description: "bezier X1 out of range", category: "invalid-bezier", expectValid: false, expectedError: "animation-timing-function: cubic-bezier validation failed: x1 Too small: expected number to be >=0" },
{ input: "cubic-bezier(0, 0, 2, 1)", description: "bezier X2 out of range", category: "invalid-bezier", expectValid: false, expectedError: "animation-timing-function: cubic-bezier validation failed: x2 Too big: expected number to be <=1" },
{ input: "cubic-bezier(0.5, 0, 1.5, 1)", description: "bezier X2 above 1", category: "invalid-bezier", expectValid: false, expectedError: "animation-timing-function: cubic-bezier validation failed: x2 Too big: expected number to be <=1" },
{ input: "cubic-bezier(0, 0)", description: "bezier missing arguments", category: "invalid-bezier", expectValid: false, expectedError: "animation-timing-function: cubic-bezier requires exactly 4 numbers, got 2" },
{ input: "cubic-bezier(0, 0, 1, 1, 0)", description: "bezier too many arguments", category: "invalid-bezier", expectValid: false, expectedError: "animation-timing-function: cubic-bezier requires exactly 4 numbers, got 5" },

// Invalid: steps constraints
{ input: "steps(0)", description: "zero steps", category: "invalid-steps", expectValid: false, expectedError: "animation-timing-function: steps() requires a positive integer, got 0" },
{ input: "steps(-1)", description: "negative steps", category: "invalid-steps", expectValid: false, expectedError: "animation-timing-function: steps() requires a positive integer, got -1" },
{ input: "steps(1.5)", description: "fractional steps", category: "invalid-steps", expectValid: false, expectedError: "animation-timing-function: steps() requires a positive integer, got 1.5" },
{ input: "steps()", description: "steps missing argument", category: "invalid-steps", expectValid: false, expectedError: "animation-timing-function: steps() requires a step count" },
{ input: "steps(2, invalid)", description: "steps invalid position", category: "invalid-steps", expectValid: false, expectedError: "animation-timing-function: Invalid step position keyword: invalid" },

// Invalid: keywords
{ input: "invalid", description: "invalid keyword", category: "invalid-keyword", expectValid: false, expectedError: "animation-timing-function: Invalid easing keyword: invalid" },
{ input: "none", description: "wrong keyword", category: "invalid-keyword", expectValid: false, expectedError: "animation-timing-function: Invalid easing keyword: none" },

// Invalid: empty/comma
{ input: "", description: "empty value", category: "invalid-empty", expectValid: false, expectedError: "animation-timing-function: Empty value" },
{ input: "ease,", description: "trailing comma", category: "invalid-comma", expectValid: false, expectedError: "animation-timing-function: Empty value" },
{ input: ",ease", description: "leading comma", category: "invalid-comma", expectValid: false, expectedError: "animation-timing-function: Empty value before comma" },
{ input: "ease,,linear", description: "double comma", category: "invalid-comma", expectValid: false, expectedError: "animation-timing-function: Empty value before comma" },
],
};
