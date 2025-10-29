// b_path:: scripts/generate-test-generator/configs/typography/text-transform.ts
import type { TextTransform } from "@/core/types/index.js";

export interface GenerateTestCase {
	input: TextTransform;
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
	propertyName: "text-transform",
	module: "typography",
  typeName: "TextTransform",
	sourceFile: "src/generate/typography/text-transform.ts",
	importPath: "../src/generate/typography/text-transform.js",
	parseImportPath: "../src/parse/typography/text-transform.js",
	outputPath: "src/generate/typography/text-transform.test.ts",
	cases: [
		{
			input: { kind: "text-transform", value: "none" },
			expected: "none",
			description: "none keyword",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "text-transform", value: "capitalize" },
			expected: "capitalize",
			description: "capitalize keyword",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "text-transform", value: "uppercase" },
			expected: "uppercase",
			description: "uppercase keyword",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "text-transform", value: "lowercase" },
			expected: "lowercase",
			description: "lowercase keyword",
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
