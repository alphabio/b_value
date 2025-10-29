// b_path:: scripts/generate-test-generator/configs/layout/overflow-y.ts
/**
 * Test cases for overflow-y generator
 */

import type { OverflowY } from "@/core/types/index.js";

export interface GenerateTestCase {
	input: OverflowY;
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
	propertyName: "overflow-y",
  typeName: "OverflowY",
	module: "layout",
	sourceFile: "src/generate/layout/overflow-y.ts",
	importPath: "../src/generate/layout/overflow-y.js",
	parseImportPath: "../src/parse/layout/overflow-y.js",
	outputPath: "src/generate/layout/overflow-y.test.ts",
	cases: [
		{
			input: { kind: "overflow-y", value: "visible" },
			expected: "visible",
			description: "visible keyword",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "overflow-y", value: "hidden" },
			expected: "hidden",
			description: "hidden keyword",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "overflow-y", value: "scroll" },
			expected: "scroll",
			description: "scroll keyword",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "overflow-y", value: "auto" },
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
