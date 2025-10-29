// b_path:: scripts/generate-test-generator/configs/flexbox/align-content.ts
import type { AlignContent } from "@/core/types/index.js";

export interface GenerateTestCase {
	input: AlignContent;
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
	propertyName: "align-content",
  typeName: "AlignContent",
	module: "flexbox",
	sourceFile: "src/generate/flexbox/align-content.ts",
	importPath: "../src/generate/flexbox/align-content.js",
	parseImportPath: "../src/parse/flexbox/align-content.js",
	outputPath: "src/generate/flexbox/align-content.test.ts",
	cases: [
		{
			input: { kind: "align-content", value: "flex-start" },
			expected: "flex-start",
			description: "flex-start keyword",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "align-content", value: "center" },
			expected: "center",
			description: "center keyword",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "align-content", value: "space-between" },
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
