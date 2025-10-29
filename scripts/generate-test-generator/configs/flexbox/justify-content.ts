// b_path:: scripts/generate-test-generator/configs/flexbox/justify-content.ts
import type { JustifyContent } from "@/core/types/index.js";

export interface GenerateTestCase {
	input: JustifyContent;
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
	propertyName: "justify-content",
  typeName: "JustifyContent",
	module: "flexbox",
	sourceFile: "src/generate/flexbox/justify-content.ts",
	importPath: "../src/generate/flexbox/justify-content.js",
	parseImportPath: "../src/parse/flexbox/justify-content.js",
	outputPath: "src/generate/flexbox/justify-content.test.ts",
	cases: [
		{
			input: { kind: "justify-content", value: "flex-start" },
			expected: "flex-start",
			description: "flex-start keyword",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "justify-content", value: "center" },
			expected: "center",
			description: "center keyword",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "justify-content", value: "space-between" },
			expected: "space-between",
			description: "space-between keyword",
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
