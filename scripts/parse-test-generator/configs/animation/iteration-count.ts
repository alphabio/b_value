// b_path:: scripts/parse-test-generator/configs/animation/iteration-count.ts
/**
 * Test cases for animation-iteration-count parser
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
propertyName: "iteration-count",
module: "animation",sourceFile: "src/parse/animation/iteration-count.ts",
importPath: "../src/parse/animation/iteration-count.js",
outputPath: "src/parse/animation/iteration-count.test.ts",
cases: [
// Valid: Numbers
{ input: "1", description: "integer", category: "valid-number", expectValid: true },
{ input: "0", description: "zero", category: "valid-number", expectValid: true },
{ input: "3", description: "multiple iterations", category: "valid-number", expectValid: true },
{ input: "10", description: "larger count", category: "valid-number", expectValid: true },

// Valid: Decimals
{ input: "0.5", description: "half iteration", category: "valid-decimal", expectValid: true },
{ input: "2.5", description: "decimal iterations", category: "valid-decimal", expectValid: true },
{ input: "0.1", description: "small decimal", category: "valid-decimal", expectValid: true },

// Valid: Infinite keyword
{ input: "infinite", description: "infinite keyword", category: "valid-keyword", expectValid: true },
{ input: "INFINITE", description: "case insensitive", category: "valid-keyword", expectValid: true },
{ input: "Infinite", description: "mixed case", category: "valid-keyword", expectValid: true },

// Valid: Lists
{ input: "1, 2, 3", description: "multiple numbers", category: "valid-list", expectValid: true },
{ input: "infinite, 2", description: "infinite with number", category: "valid-list", expectValid: true },
{ input: "1, infinite, 0.5", description: "mixed values", category: "valid-list", expectValid: true },
{ input: "1 , 2", description: "list with whitespace", category: "valid-list", expectValid: true },

// Invalid: Negative
{ input: "-1", description: "negative count", category: "invalid-negative", expectValid: false, expectedError: "animation-iteration-count: animation-iteration-count must be non-negative, got: -1" },
{ input: "-0.5", description: "negative decimal", category: "invalid-negative", expectValid: false, expectedError: "animation-iteration-count: animation-iteration-count must be non-negative, got: -0.5" },

// Invalid: Units
{ input: "1s", description: "time unit", category: "invalid-unit", expectValid: false, expectedError: "animation-iteration-count: Expected number or 'infinite', got: Dimension" },
{ input: "2px", description: "length unit", category: "invalid-unit", expectValid: false, expectedError: "animation-iteration-count: Expected number or 'infinite', got: Dimension" },

// Invalid: Keywords
{ input: "auto", description: "auto keyword", category: "invalid-keyword", expectValid: false, expectedError: "animation-iteration-count: Expected number or 'infinite', got: Identifier" },
{ input: "none", description: "none keyword", category: "invalid-keyword", expectValid: false, expectedError: "animation-iteration-count: Expected number or 'infinite', got: Identifier" },
{ input: "invalid", description: "invalid keyword", category: "invalid-keyword", expectValid: false, expectedError: "animation-iteration-count: Expected number or 'infinite', got: Identifier" },

// Invalid: Empty/comma
{ input: "", description: "empty value", category: "invalid-empty", expectValid: false, expectedError: "animation-iteration-count: Empty value" },
{ input: "1,", description: "trailing comma", category: "invalid-comma", expectValid: false, expectedError: "animation-iteration-count: Empty value" },
{ input: ",1", description: "leading comma", category: "invalid-comma", expectValid: false, expectedError: "animation-iteration-count: Empty value before comma" },
{ input: "1,,2", description: "double comma", category: "invalid-comma", expectValid: false, expectedError: "animation-iteration-count: Empty value before comma" },
],
};
