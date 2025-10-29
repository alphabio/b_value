// b_path:: scripts/parse-test-generator/configs/layout/display.ts
/**
 * Test cases for display parser
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
	propertyName: "display",
	module: "layout",
	sourceFile: "src/parse/layout/display.ts",
	importPath: "../src/parse/layout/display.js",
	outputPath: "src/parse/layout/display.test.ts",
	cases: [
		// Valid cases - common values
		{ input: "block", description: "block keyword", category: "valid-outside", expectValid: true },
		{ input: "inline", description: "inline keyword", category: "valid-outside", expectValid: true },
		{ input: "none", description: "none keyword", category: "valid-box", expectValid: true },
		{ input: "flex", description: "flex keyword", category: "valid-inside", expectValid: true },
		{ input: "grid", description: "grid keyword", category: "valid-inside", expectValid: true },
		{ input: "inline-block", description: "inline-block keyword", category: "valid-legacy", expectValid: true },
		{ input: "inline-flex", description: "inline-flex keyword", category: "valid-legacy", expectValid: true },
		{ input: "inline-grid", description: "inline-grid keyword", category: "valid-legacy", expectValid: true },

		// Valid cases - table values
		{ input: "table", description: "table keyword", category: "valid-inside", expectValid: true },
		{ input: "table-row", description: "table-row keyword", category: "valid-internal", expectValid: true },
		{ input: "table-cell", description: "table-cell keyword", category: "valid-internal", expectValid: true },

		// Valid cases - other
		{ input: "contents", description: "contents keyword", category: "valid-box", expectValid: true },
		{ input: "flow-root", description: "flow-root keyword", category: "valid-inside", expectValid: true },
		{ input: "list-item", description: "list-item keyword", category: "valid-list", expectValid: true },

		// Valid cases - case insensitivity
		{ input: "FLEX", description: "uppercase flex", category: "valid-case", expectValid: true },
		{ input: "Block", description: "mixed case block", category: "valid-case", expectValid: true },

		// Invalid cases
		{ input: "", description: "empty value", category: "invalid-empty", expectValid: false, expectedError: "Expected keyword identifier" },
		{ input: "visible", description: "visibility value", category: "invalid-keyword", expectValid: false, expectedError: "Invalid display keyword" },
		{ input: "auto", description: "wrong keyword", category: "invalid-keyword", expectValid: false, expectedError: "Invalid display keyword" },
		{ input: "show", description: "non-standard keyword", category: "invalid-keyword", expectValid: false, expectedError: "Invalid display keyword" },
		{ input: "0", description: "number value", category: "invalid-type", expectValid: false, expectedError: "Expected keyword identifier" },
		{ input: "block, inline", description: "multiple values", category: "invalid-multiple", expectValid: false, expectedError: "Expected single value" },
	],
};
