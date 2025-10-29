// b_path:: scripts/generate-test-generator/configs/layout/box-sizing.ts
/**
 * Test cases for box-sizing generator
 */

import type { BoxSizing } from "@/core/types/index.js";

export interface GenerateTestCase {
	input: BoxSizing;
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
	propertyName: "box-sizing",
  typeName: "BoxSizing",
	module: "layout",
	sourceFile: "src/generate/layout/box-sizing.ts",
	importPath: "../src/generate/layout/box-sizing.js",
	parseImportPath: "../src/parse/layout/box-sizing.js",
	outputPath: "src/generate/layout/box-sizing.test.ts",
	cases: [
		// Valid cases
		{
			input: { kind: "box-sizing", value: "content-box" },
			expected: "content-box",
			description: "content-box keyword",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "box-sizing", value: "border-box" },
			expected: "border-box",
			description: "border-box keyword",
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
			input: { kind: "box-sizing", value: "padding-box" } as any,
			expected: "",
			description: "invalid keyword",
			category: "invalid-keyword",
			expectValid: false,
			expectedError: "Invalid input"
		},
		{
			input: { kind: "display", value: "content-box" } as any,
			expected: "",
			description: "wrong kind",
			category: "invalid-kind",
			expectValid: false,
			expectedError: "Invalid input"
		},
	],
};
