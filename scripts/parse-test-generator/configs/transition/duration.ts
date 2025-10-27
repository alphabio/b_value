/**
 * Test cases for transition-duration parser
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
	module: "transition",
	sourceFile: "src/parse/transition/duration.ts",
	importPath: "../src/parse/transition/duration.js",
	outputPath: "src/parse/transition/duration.test.ts",
	cases: [
		// Valid cases
		{ input: "1s", description: "single time value in seconds", category: "valid-basic", expectValid: true },
		{ input: "500ms", description: "single time value in milliseconds", category: "valid-basic", expectValid: true },
		{ input: "0s", description: "zero duration", category: "valid-edge", expectValid: true },
		{ input: "0ms", description: "zero duration in ms", category: "valid-edge", expectValid: true },
		{ input: "0.5s", description: "decimal values", category: "valid-decimal", expectValid: true },
		{ input: "2.5s", description: "decimal seconds", category: "valid-decimal", expectValid: true },
		{ input: "100.5ms", description: "decimal milliseconds", category: "valid-decimal", expectValid: true },
		{ input: "3600s", description: "large values", category: "valid-large", expectValid: true },
		{ input: "1s, 2s, 3s, 4s", description: "multiple time values", category: "valid-list", expectValid: true },
		
		// Invalid cases
		{ input: "-1s", description: "negative duration", category: "invalid-negative", expectValid: false, expectedError: "transition-duration: transition-duration must be non-negative, got: -1" },
		{ input: "-500ms", description: "negative milliseconds", category: "invalid-negative", expectValid: false, expectedError: "transition-duration: transition-duration must be non-negative, got: -500" },
		{ input: "1px", description: "invalid unit", category: "invalid-unit", expectValid: false, expectedError: "transition-duration: Invalid time unit: px. Expected 's' or 'ms'" },
		{ input: "1em", description: "wrong unit type", category: "invalid-unit", expectValid: false, expectedError: "transition-duration: Invalid time unit: em. Expected 's' or 'ms'" },
		{ input: "1", description: "missing unit", category: "invalid-unit", expectValid: false, expectedError: "transition-duration: Expected time dimension or 'auto', got: Number" },
		{ input: "", description: "empty value", category: "invalid-empty", expectValid: false, expectedError: "transition-duration: Empty value" },
		{ input: "1s,", description: "trailing comma", category: "invalid-comma", expectValid: false, expectedError: "transition-duration: Empty value" },
		{ input: ",1s", description: "leading comma", category: "invalid-comma", expectValid: false, expectedError: "transition-duration: Empty value before comma" },
		{ input: "1s,,2s", description: "double comma", category: "invalid-comma", expectValid: false, expectedError: "transition-duration: Empty value before comma" },
		{ input: "invalid", description: "invalid keyword", category: "invalid-keyword", expectValid: false, expectedError: "transition-duration: Expected time dimension or 'auto', got: Identifier" },
		{ input: "none", description: "wrong keyword", category: "invalid-keyword", expectValid: false, expectedError: "transition-duration: Expected time dimension or 'auto', got: Identifier" },
	],
};
