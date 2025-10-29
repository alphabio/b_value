// b_path:: scripts/generate-test-generator/configs/flexbox/align-items.ts
import type { AlignItems } from "@/core/types/index.js";

export interface GenerateTestCase {
	input: AlignItems;
	expected: string;
	description: string;
	category: string;
	roundtrip?: boolean;
	expectValid?: boolean;
	expectedError?: string;
}

export interface PropertyConfig {
	module: string;
  typeName?: string;
	propertyName: string;
	sourceFile: string;
	importPath: string;
	parseImportPath: string;
	outputPath: string;
	cases: GenerateTestCase[];
}

export const config: PropertyConfig = {
	propertyName: "align-items",
  typeName: "AlignItems",
	module: "flexbox",
	sourceFile: "src/generate/flexbox/align-items.ts",
	importPath: "../src/generate/flexbox/align-items.js",
	parseImportPath: "../src/parse/flexbox/align-items.js",
	outputPath: "src/generate/flexbox/align-items.test.ts",
	cases: [
		{
			input: { kind: "align-items", value: "flex-start" },
			expected: "flex-start",
			description: "flex-start keyword",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "align-items", value: "center" },
			expected: "center",
			description: "center keyword",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "align-items", value: "stretch" },
			expected: "stretch",
			description: "stretch keyword",
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
