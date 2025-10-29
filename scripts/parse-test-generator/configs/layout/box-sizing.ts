// b_path:: scripts/parse-test-generator/configs/layout/box-sizing.ts
/**
 * Test cases for box-sizing parser
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
	propertyName: "box-sizing",
	module: "layout",
	sourceFile: "src/parse/layout/box-sizing.ts",
	importPath: "../src/parse/layout/box-sizing.js",
	outputPath: "src/parse/layout/box-sizing.test.ts",
	cases: [
		// Valid cases - standard keywords
		{ input: "content-box", description: "content-box keyword", category: "valid-basic", expectValid: true },
		{ input: "border-box", description: "border-box keyword", category: "valid-basic", expectValid: true },

		// Valid cases - case insensitivity
		{ input: "CONTENT-BOX", description: "uppercase content-box", category: "valid-case", expectValid: true },
		{ input: "Border-Box", description: "mixed case border-box", category: "valid-case", expectValid: true },

		// Invalid cases
		{ input: "", description: "empty value", category: "invalid-empty", expectValid: false, expectedError: "Expected box-sizing value" },
		{ input: "padding-box", description: "invalid keyword", category: "invalid-keyword", expectValid: false, expectedError: "Invalid box-sizing keyword" },
		{ input: "margin-box", description: "wrong keyword", category: "invalid-keyword", expectValid: false, expectedError: "Invalid box-sizing keyword" },
		{ input: "auto", description: "non-standard keyword", category: "invalid-keyword", expectValid: false, expectedError: "Invalid box-sizing keyword" },
		{ input: "0", description: "number value", category: "invalid-type", expectValid: false, expectedError: "Expected keyword" },
		{ input: "1px", description: "dimension value", category: "invalid-type", expectValid: false, expectedError: "Expected keyword" },
		{ input: "content-box, border-box", description: "multiple values", category: "invalid-multiple", expectValid: false, expectedError: "Expected single value" },
	],
};
