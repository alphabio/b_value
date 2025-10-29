// b_path:: scripts/generate-test-generator/configs/typography/font-style.ts
import type { FontStyle } from "@/core/types/index.js";

export interface GenerateTestCase {
	input: FontStyle;
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
	propertyName: "font-style",
  typeName: "FontStyle",
	module: "typography",
	sourceFile: "src/generate/typography/font-style.ts",
	importPath: "../src/generate/typography/font-style.js",
	parseImportPath: "../src/parse/typography/font-style.js",
	outputPath: "src/generate/typography/font-style.test.ts",
	cases: [
		{
			input: { kind: "font-style", value: "normal" },
			expected: "normal",
			description: "normal keyword",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "font-style", value: "italic" },
			expected: "italic",
			description: "italic keyword",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "font-style", value: "oblique" },
			expected: "oblique",
			description: "oblique keyword",
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
