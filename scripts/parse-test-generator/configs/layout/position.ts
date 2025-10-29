// b_path:: scripts/parse-test-generator/configs/position/position.ts
/**
 * Test cases for position parser
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
	propertyName: "position",
	module: "layout",
	sourceFile: "src/parse/layout/position.ts",
	importPath: "../src/parse/layout/position.js",
	outputPath: "src/parse/layout/position.test.ts",
	cases: [
		// Valid cases
		{ input: "static", description: "static keyword", category: "valid-basic", expectValid: true },
		{ input: "relative", description: "relative keyword", category: "valid-basic", expectValid: true },
		{ input: "absolute", description: "absolute keyword", category: "valid-basic", expectValid: true },
		{ input: "fixed", description: "fixed keyword", category: "valid-basic", expectValid: true },
		{ input: "sticky", description: "sticky keyword", category: "valid-basic", expectValid: true },

		// Valid cases - case insensitivity
		{ input: "RELATIVE", description: "uppercase relative", category: "valid-case", expectValid: true },
		{ input: "Absolute", description: "mixed case absolute", category: "valid-case", expectValid: true },

		// Invalid cases
		{ input: "", description: "empty value", category: "invalid-empty", expectValid: false },
		{ input: "none", description: "invalid keyword", category: "invalid-keyword", expectValid: false },
		{ input: "auto", description: "wrong keyword", category: "invalid-keyword", expectValid: false },
		{ input: "0", description: "number value", category: "invalid-type", expectValid: false },
	],
};
