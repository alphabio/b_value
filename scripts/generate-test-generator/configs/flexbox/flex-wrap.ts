// b_path:: scripts/generate-test-generator/configs/flexbox/flex-wrap.ts
import type { FlexWrap } from "@/core/types/index.js";

export interface GenerateTestCase {
	input: FlexWrap;
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
	propertyName: "flex-wrap",
  typeName: "FlexWrap",
	module: "flexbox",
	sourceFile: "src/generate/flexbox/flex-wrap.ts",
	importPath: "../src/generate/flexbox/flex-wrap.js",
	parseImportPath: "../src/parse/flexbox/flex-wrap.js",
	outputPath: "src/generate/flexbox/flex-wrap.test.ts",
	cases: [
		{
			input: { kind: "flex-wrap", value: "nowrap" },
			expected: "nowrap",
			description: "nowrap keyword",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "flex-wrap", value: "wrap" },
			expected: "wrap",
			description: "wrap keyword",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "flex-wrap", value: "wrap-reverse" },
			expected: "wrap-reverse",
			description: "wrap-reverse keyword",
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
