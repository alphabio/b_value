// b_path:: scripts/generate-test-generator/configs/layout/float.ts
/**
 * Test cases for float generator
 */

import type { Float } from "@/core/types/index.js";

export interface GenerateTestCase {
	input: Float;
	expected: string;
	description: string;
	category: string;
	roundtrip?: boolean;
	expectValid?: boolean;
	expectedError?: string;
}

export interface PropertyConfig {
	module: string;
	propertyName: string;
	typeName?: string;
	sourceFile: string;
	importPath: string;
	parseImportPath: string;
	outputPath: string;
	cases: GenerateTestCase[];
}

export const config: PropertyConfig = {
	propertyName: "float",
	typeName: "Float",
	module: "layout",
	sourceFile: "src/generate/layout/float.ts",
	importPath: "../src/generate/layout/float.js",
	parseImportPath: "../src/parse/layout/float.js",
	outputPath: "src/generate/layout/float.test.ts",
	cases: [
		// Valid cases
		{
			input: { kind: "float", value: "none" },
			expected: "none",
			description: "none keyword",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "float", value: "left" },
			expected: "left",
			description: "left keyword",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "float", value: "right" },
			expected: "right",
			description: "right keyword",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},

		// Invalid cases
		{
			input: null as any,
			expected: "",
			description: "null input",
			category: "invalid-null",
			expectValid: false,
			expectedError: "Invalid input"
		},
		{
			input: { kind: "float", value: "center" } as any,
			expected: "",
			description: "invalid keyword",
			category: "invalid-keyword",
			expectValid: false,
			expectedError: "Invalid input"
		},
	],
};
