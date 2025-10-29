// b_path:: scripts/generate-test-generator/configs/layout/position.ts
/**
 * Test cases for position generator
 */

import type { Position } from "@/core/types/index.js";

export interface GenerateTestCase {
	input: Position;
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
	propertyName: "position",
  typeName: "PositionProperty",
	module: "layout",
	sourceFile: "src/generate/layout/position.ts",
	importPath: "../src/generate/layout/position.js",
	parseImportPath: "../src/parse/layout/position.js",
	outputPath: "src/generate/layout/position.test.ts",
	cases: [
		{
			input: { kind: "position", value: "static" },
			expected: "static",
			description: "static keyword",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "position", value: "relative" },
			expected: "relative",
			description: "relative keyword",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "position", value: "absolute" },
			expected: "absolute",
			description: "absolute keyword",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "position", value: "fixed" },
			expected: "fixed",
			description: "fixed keyword",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "position", value: "sticky" },
			expected: "sticky",
			description: "sticky keyword",
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
