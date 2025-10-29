// b_path:: scripts/generate-test-generator/configs/layout/cursor.ts
/**
 * Test cases for cursor generator
 */

import type { Cursor } from "@/core/types/index.js";

export interface GenerateTestCase {
	input: Cursor;
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
	propertyName: "cursor",
  typeName: "Cursor",
	module: "layout",
	sourceFile: "src/generate/layout/cursor.ts",
	importPath: "../src/generate/layout/cursor.js",
	parseImportPath: "../src/parse/layout/cursor.js",
	outputPath: "src/generate/layout/cursor.test.ts",
	cases: [
		// Valid cases - common
		{
			input: { kind: "cursor", value: "auto" },
			expected: "auto",
			description: "auto keyword",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "cursor", value: "pointer" },
			expected: "pointer",
			description: "pointer keyword",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "cursor", value: "text" },
			expected: "text",
			description: "text keyword",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "cursor", value: "move" },
			expected: "move",
			description: "move keyword",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "cursor", value: "not-allowed" },
			expected: "not-allowed",
			description: "not-allowed keyword",
			category: "valid-action",
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
			input: { kind: "cursor", value: "hand" } as any,
			expected: "",
			description: "invalid keyword",
			category: "invalid-keyword",
			expectValid: false,
			expectedError: "Invalid input"
		},
	],
};
