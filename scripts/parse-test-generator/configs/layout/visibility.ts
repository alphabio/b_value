// b_path:: scripts/parse-test-generator/configs/layout/visibility.ts
/**
 * Test cases for visibility parser
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
	propertyName: "visibility",
	module: "layout",
	sourceFile: "src/parse/layout/visibility.ts",
	importPath: "../src/parse/layout/visibility.js",
	outputPath: "src/parse/layout/visibility.parse.test.ts",
	cases: [
		// Valid cases - standard keywords
		{ input: "visible", description: "visible keyword", category: "valid-basic", expectValid: true },
		{ input: "hidden", description: "hidden keyword", category: "valid-basic", expectValid: true },
		{ input: "collapse", description: "collapse keyword", category: "valid-basic", expectValid: true },
		
		// Valid cases - case insensitivity
		{ input: "VISIBLE", description: "uppercase visible", category: "valid-case", expectValid: true },
		{ input: "Hidden", description: "mixed case hidden", category: "valid-case", expectValid: true },
		{ input: "COLLAPSE", description: "uppercase collapse", category: "valid-case", expectValid: true },
		
		// Invalid cases
		{ input: "", description: "empty value", category: "invalid-empty", expectValid: false, expectedError: "Expected keyword identifier" },
		{ input: "auto", description: "invalid keyword", category: "invalid-keyword", expectValid: false, expectedError: "Invalid visibility keyword" },
		{ input: "none", description: "wrong keyword", category: "invalid-keyword", expectValid: false, expectedError: "Invalid visibility keyword" },
		{ input: "show", description: "non-standard keyword", category: "invalid-keyword", expectValid: false, expectedError: "Invalid visibility keyword" },
		{ input: "block", description: "display value", category: "invalid-keyword", expectValid: false, expectedError: "Invalid visibility keyword" },
		{ input: "0", description: "number value", category: "invalid-type", expectValid: false, expectedError: "Expected keyword identifier" },
		{ input: "1px", description: "dimension value", category: "invalid-type", expectValid: false, expectedError: "Expected keyword identifier" },
		{ input: "visible, hidden", description: "multiple values", category: "invalid-multiple", expectValid: false, expectedError: "Expected single value" },
	],
};
