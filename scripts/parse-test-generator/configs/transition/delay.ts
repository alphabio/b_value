// b_path:: scripts/parse-test-generator/configs/transition/delay.ts
/**
 * Test cases for transition-delay parser
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
propertyName: "delay",
module: "transition",sourceFile: "src/parse/transition/delay.ts",
importPath: "../src/parse/transition/delay.js",
outputPath: "src/parse/transition/delay.test.ts",
cases: [
// Valid: Basic time values
{ input: "0s", description: "zero delay", category: "valid-basic", expectValid: true },
{ input: "1s", description: "seconds", category: "valid-basic", expectValid: true },
{ input: "500ms", description: "milliseconds", category: "valid-basic", expectValid: true },
{ input: "0ms", description: "zero milliseconds", category: "valid-basic", expectValid: true },

// Valid: Decimal values
{ input: "0.5s", description: "decimal seconds", category: "valid-decimal", expectValid: true },
{ input: "2.5s", description: "larger decimal", category: "valid-decimal", expectValid: true },
{ input: "100.5ms", description: "decimal milliseconds", category: "valid-decimal", expectValid: true },

// Valid: Negative values (delays can be negative)
{ input: "-1s", description: "negative seconds", category: "valid-negative", expectValid: true },
{ input: "-500ms", description: "negative milliseconds", category: "valid-negative", expectValid: true },
{ input: "-0.5s", description: "negative decimal", category: "valid-negative", expectValid: true },

// Valid: Large values
{ input: "3600s", description: "large value", category: "valid-large", expectValid: true },
{ input: "999999ms", description: "very large milliseconds", category: "valid-large", expectValid: true },

// Valid: Lists
{ input: "1s, 500ms", description: "multiple delays", category: "valid-list", expectValid: true },
{ input: "0s, 1s, 2s, 3s", description: "multiple time values", category: "valid-list", expectValid: true },
{ input: "1s , 2s", description: "delays with whitespace", category: "valid-list", expectValid: true },
{ input: "-1s, 0s, 1s", description: "mixed negative and positive", category: "valid-list", expectValid: true },

// Invalid: Wrong units
{ input: "1px", description: "length unit", category: "invalid-unit", expectValid: false, expectedError: "transition-delay: Invalid time unit: px. Expected 's' or 'ms'" },
{ input: "1em", description: "font unit", category: "invalid-unit", expectValid: false, expectedError: "transition-delay: Invalid time unit: em. Expected 's' or 'ms'" },
{ input: "1deg", description: "angle unit", category: "invalid-unit", expectValid: false, expectedError: "transition-delay: Invalid time unit: deg. Expected 's' or 'ms'" },
{ input: "1", description: "missing unit", category: "invalid-unit", expectValid: false, expectedError: "transition-delay: Expected time dimension, got: Number" },

// Invalid: Keywords
{ input: "auto", description: "auto keyword", category: "invalid-keyword", expectValid: false, expectedError: "transition-delay: Expected time dimension, got: Identifier" },
{ input: "none", description: "none keyword", category: "invalid-keyword", expectValid: false, expectedError: "transition-delay: Expected time dimension, got: Identifier" },
{ input: "invalid", description: "invalid keyword", category: "invalid-keyword", expectValid: false, expectedError: "transition-delay: Expected time dimension, got: Identifier" },

// Invalid: Empty/comma
{ input: "", description: "empty value", category: "invalid-empty", expectValid: false, expectedError: "transition-delay: Empty value" },
{ input: "1s,", description: "trailing comma", category: "invalid-comma", expectValid: false, expectedError: "transition-delay: Empty value" },
{ input: ",1s", description: "leading comma", category: "invalid-comma", expectValid: false, expectedError: "transition-delay: Empty value before comma" },
{ input: "1s,,2s", description: "double comma", category: "invalid-comma", expectValid: false, expectedError: "transition-delay: Empty value before comma" },
],
};
