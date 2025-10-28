// b_path:: scripts/parse-test-generator/configs/animation/duration.ts
/**
 * Test cases for animation-duration parser
 */

export interface TestCase {
	input: string;
	description: string;
	category: string;
	expectValid?: boolean; // Expected behavior (for issue detection)
	expectedError?: string; // Expected error message (for invalid cases)
}

export interface PropertyConfig {
	module: string;
	propertyName: string;
	sourceFile: string; // Path to source file (for spec ref validation)
	importPath: string; // Path for dynamic import
	outputPath: string; // Where to generate test file
	cases: TestCase[];
}

export const config: PropertyConfig = {
	propertyName: "duration",
	module: "animation",
	sourceFile: "src/parse/animation/duration.ts",
	importPath: "../src/parse/animation/duration.js",
	outputPath: "src/parse/animation/duration.test.ts",
	cases: [
		// Valid cases
		{ input: "1s", description: "single time value in seconds", category: "valid-basic", expectValid: true },
		{ input: "500ms", description: "single time value in milliseconds", category: "valid-basic", expectValid: true },
		{ input: "auto", description: "auto keyword", category: "valid-keyword", expectValid: true },
		{ input: "AUTO", description: "case insensitive auto", category: "valid-keyword", expectValid: true },
		{ input: "0s", description: "zero duration", category: "valid-edge", expectValid: true },
		{ input: "0ms", description: "zero duration in ms", category: "valid-edge", expectValid: true },
		{ input: "0.5s", description: "decimal values", category: "valid-decimal", expectValid: true },
		{ input: "2.5s", description: "decimal seconds", category: "valid-decimal", expectValid: true },
		{ input: "100.5ms", description: "decimal milliseconds", category: "valid-decimal", expectValid: true },
		{ input: "3600s", description: "large values", category: "valid-large", expectValid: true },
		{ input: "1s, auto, 500ms", description: "multiple durations", category: "valid-list", expectValid: true },
		{ input: "1s , auto , 2s", description: "durations with whitespace", category: "valid-list", expectValid: true },
		{ input: "1s, 2s, 3s, 4s", description: "multiple time values", category: "valid-list", expectValid: true },
		
		// Invalid cases
		{ input: "-1s", description: "negative duration", category: "invalid-negative", expectValid: false, expectedError: "animation-duration: animation-duration must be non-negative, got: -1" },
		{ input: "-500ms", description: "negative milliseconds", category: "invalid-negative", expectValid: false, expectedError: "animation-duration: animation-duration must be non-negative, got: -500" },
		{ input: "1px", description: "invalid unit", category: "invalid-unit", expectValid: false, expectedError: "animation-duration: Invalid time unit: px. Expected 's' or 'ms'" },
		{ input: "1em", description: "wrong unit type", category: "invalid-unit", expectValid: false, expectedError: "animation-duration: Invalid time unit: em. Expected 's' or 'ms'" },
		{ input: "1", description: "missing unit", category: "invalid-unit", expectValid: false, expectedError: "animation-duration: Expected time dimension or 'auto', got: Number" },
		{ input: "", description: "empty value", category: "invalid-empty", expectValid: false, expectedError: "animation-duration: Empty value" },
		{ input: "1s,", description: "trailing comma", category: "invalid-comma", expectValid: false, expectedError: "animation-duration: Empty value" },
		{ input: ",1s", description: "leading comma", category: "invalid-comma", expectValid: false, expectedError: "animation-duration: Empty value before comma" },
		{ input: "1s,,2s", description: "double comma", category: "invalid-comma", expectValid: false, expectedError: "animation-duration: Empty value before comma" },
		{ input: "invalid", description: "invalid keyword", category: "invalid-keyword", expectValid: false, expectedError: "animation-duration: Expected time dimension or 'auto', got: Identifier" },
		{ input: "none", description: "wrong keyword", category: "invalid-keyword", expectValid: false, expectedError: "animation-duration: Expected time dimension or 'auto', got: Identifier" },
	],
};
