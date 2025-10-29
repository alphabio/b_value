// b_path:: scripts/generate-test-generator/configs/typography/text-align.ts
import type { TextAlign } from "@/core/types/index.js";

export interface GenerateTestCase {
	input: TextAlign;
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
	propertyName: "text-align",
  typeName: "TextAlign",
	module: "typography",
	sourceFile: "src/generate/typography/text-align.ts",
	importPath: "../src/generate/typography/text-align.js",
	parseImportPath: "../src/parse/typography/text-align.js",
	outputPath: "src/generate/typography/text-align.test.ts",
	cases: [
		{
			input: { kind: "text-align", value: "left" },
			expected: "left",
			description: "left keyword",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "text-align", value: "right" },
			expected: "right",
			description: "right keyword",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "text-align", value: "center" },
			expected: "center",
			description: "center keyword",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "text-align", value: "justify" },
			expected: "justify",
			description: "justify keyword",
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
