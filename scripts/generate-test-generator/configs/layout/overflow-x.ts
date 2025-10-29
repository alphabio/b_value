// b_path:: scripts/generate-test-generator/configs/layout/overflow-x.ts
/**
 * Test cases for overflow-x generator
 */

import type { OverflowX } from "@/core/types/index.js";

export interface GenerateTestCase {
	input: OverflowX;
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
	propertyName: "overflow-x",
  typeName: "OverflowX",
	module: "layout",
	sourceFile: "src/generate/layout/overflow-x.ts",
	importPath: "../src/generate/layout/overflow-x.js",
	parseImportPath: "../src/parse/layout/overflow-x.js",
	outputPath: "src/generate/layout/overflow-x.test.ts",
	cases: [
		{
			input: { kind: "overflow-x", value: "visible" },
			expected: "visible",
			description: "visible keyword",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "overflow-x", value: "hidden" },
			expected: "hidden",
			description: "hidden keyword",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "overflow-x", value: "scroll" },
			expected: "scroll",
			description: "scroll keyword",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "overflow-x", value: "auto" },
			expected: "auto",
			description: "auto keyword",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},

		{
			input: null as any,
			expected: "",
			description: "null input",
			category: "invalid-null",
			expectValid: false,
			expectedError: "Invalid input"
		},
	],
};
