// b_path:: scripts/parse-test-generator/configs/layout/clear.ts
/**
 * Test cases for clear parser
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
	propertyName: "clear",
	module: "layout",
	sourceFile: "src/parse/layout/clear.ts",
	importPath: "../src/parse/layout/clear.js",
	outputPath: "src/parse/layout/clear.test.ts",
	cases: [
		// Valid cases - standard keywords
		{ input: "none", description: "none keyword", category: "valid-basic", expectValid: true },
		{ input: "left", description: "left keyword", category: "valid-basic", expectValid: true },
		{ input: "right", description: "right keyword", category: "valid-basic", expectValid: true },
		{ input: "both", description: "both keyword", category: "valid-basic", expectValid: true },
		{ input: "inline-start", description: "inline-start keyword", category: "valid-logical", expectValid: true },
		{ input: "inline-end", description: "inline-end keyword", category: "valid-logical", expectValid: true },

		// Valid cases - case insensitivity
		{ input: "NONE", description: "uppercase none", category: "valid-case", expectValid: true },
		{ input: "Left", description: "mixed case left", category: "valid-case", expectValid: true },

		// Invalid cases
		{ input: "", description: "empty value", category: "invalid-empty", expectValid: false },
		{ input: "center", description: "invalid keyword", category: "invalid-keyword", expectValid: false },
		{ input: "top", description: "wrong keyword", category: "invalid-keyword", expectValid: false },
		{ input: "0", description: "number value", category: "invalid-type", expectValid: false },
		{ input: "none, left", description: "multiple values", category: "invalid-multiple", expectValid: false },
	],
};
