// b_path:: scripts/generate-test-generator/configs/layout/clear.ts
/**
 * Test cases for clear generator
 */

import type { Clear } from "@/core/types/index.js";

export interface GenerateTestCase {
	input: Clear;
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
	propertyName: "clear",
	typeName: "Clear",
	module: "layout",
	sourceFile: "src/generate/layout/clear.ts",
	importPath: "../src/generate/layout/clear.js",
	parseImportPath: "../src/parse/layout/clear.js",
	outputPath: "src/generate/layout/clear.test.ts",
	cases: [
		// Valid cases
		{
			input: { kind: "clear", value: "none" },
			expected: "none",
			description: "none keyword",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "clear", value: "left" },
			expected: "left",
			description: "left keyword",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "clear", value: "right" },
			expected: "right",
			description: "right keyword",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "clear", value: "both" },
			expected: "both",
			description: "both keyword",
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
			input: { kind: "clear", value: "center" } as any,
			expected: "",
			description: "invalid keyword",
			category: "invalid-keyword",
			expectValid: false,
			expectedError: "Invalid input"
		},
	],
};
