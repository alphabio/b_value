// b_path:: scripts/generate-test-generator/configs/flexbox/align-self.ts
import type { AlignSelf } from "@/core/types/index.js";

export interface GenerateTestCase {
	input: AlignSelf;
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
	propertyName: "align-self",
  typeName: "AlignSelf",
	module: "flexbox",
	sourceFile: "src/generate/flexbox/align-self.ts",
	importPath: "../src/generate/flexbox/align-self.js",
	parseImportPath: "../src/parse/flexbox/align-self.js",
	outputPath: "src/generate/flexbox/align-self.test.ts",
	cases: [
		{
			input: { kind: "align-self", value: "auto" },
			expected: "auto",
			description: "auto keyword",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "align-self", value: "flex-start" },
			expected: "flex-start",
			description: "flex-start keyword",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "align-self", value: "center" },
			expected: "center",
			description: "center keyword",
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
