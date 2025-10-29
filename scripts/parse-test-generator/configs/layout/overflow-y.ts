// b_path:: scripts/parse-test-generator/configs/layout/overflow-y.ts
/**
 * Test cases for overflow-y parser
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
	propertyName: "overflow-y",
	module: "layout",
	sourceFile: "src/parse/layout/overflow-y.ts",
	importPath: "../src/parse/layout/overflow-y.js",
	outputPath: "src/parse/layout/overflow-y.test.ts",
	cases: [
		// Valid cases
		{ input: "visible", description: "visible keyword", category: "valid-basic", expectValid: true },
		{ input: "hidden", description: "hidden keyword", category: "valid-basic", expectValid: true },
		{ input: "scroll", description: "scroll keyword", category: "valid-basic", expectValid: true },
		{ input: "auto", description: "auto keyword", category: "valid-basic", expectValid: true },
		{ input: "clip", description: "clip keyword", category: "valid-basic", expectValid: true },

		// Valid cases - case insensitivity
		{ input: "HIDDEN", description: "uppercase hidden", category: "valid-case", expectValid: true },
		{ input: "Scroll", description: "mixed case scroll", category: "valid-case", expectValid: true },

		// Invalid cases
		{ input: "", description: "empty value", category: "invalid-empty", expectValid: false },
		{ input: "none", description: "invalid keyword", category: "invalid-keyword", expectValid: false },
		{ input: "show", description: "wrong keyword", category: "invalid-keyword", expectValid: false },
		{ input: "0", description: "number value", category: "invalid-type", expectValid: false },
	],
};
