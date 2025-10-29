// b_path:: scripts/generate-test-generator/configs/layout/display.ts
/**
 * Test cases for display generator
 */

import type { Display } from "@/core/types/index.js";

export interface GenerateTestCase {
	input: Display;
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
	propertyName: "display",
  typeName: "Display",
	module: "layout",
	sourceFile: "src/generate/layout/display.ts",
	importPath: "../src/generate/layout/display.js",
	parseImportPath: "../src/parse/layout/display.js",
	outputPath: "src/generate/layout/display.test.ts",
	cases: [
		// Valid cases - common
		{
			input: { kind: "display", value: "block" },
			expected: "block",
			description: "block keyword",
			category: "valid-outside",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "display", value: "inline" },
			expected: "inline",
			description: "inline keyword",
			category: "valid-outside",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "display", value: "none" },
			expected: "none",
			description: "none keyword",
			category: "valid-box",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "display", value: "flex" },
			expected: "flex",
			description: "flex keyword",
			category: "valid-inside",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "display", value: "grid" },
			expected: "grid",
			description: "grid keyword",
			category: "valid-inside",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "display", value: "inline-block" },
			expected: "inline-block",
			description: "inline-block keyword",
			category: "valid-legacy",
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
			input: { kind: "display", value: "visible" } as any,
			expected: "",
			description: "invalid keyword",
			category: "invalid-keyword",
			expectValid: false,
			expectedError: "Invalid input"
		},
		{
			input: { kind: "visibility", value: "block" } as any,
			expected: "",
			description: "wrong kind",
			category: "invalid-kind",
			expectValid: false,
			expectedError: "Invalid input"
		},
	],
};
