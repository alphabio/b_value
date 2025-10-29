// b_path:: scripts/generate-test-generator/configs/visual/mix-blend-mode.ts
/**
 * Test cases for mix-blend-mode generator
 *
 * Tests IR → CSS conversion and roundtrip validation (IR → CSS → IR)
 */

import type { MixBlendMode } from "@/core/types/index.js";

export interface GenerateTestCase {
	input: MixBlendMode;
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
	sourceFile: string;
	importPath: string;
	parseImportPath: string;
	outputPath: string;
	cases: GenerateTestCase[];
}

export const config: PropertyConfig = {
	propertyName: "mix-blend-mode",
	typeName: "MixBlendMode",
	module: "visual",
	sourceFile: "src/generate/visual/mix-blend-mode.ts",
	importPath: "../src/generate/visual/mix-blend-mode.js",
	parseImportPath: "../src/parse/visual/mix-blend-mode.js",
	outputPath: "src/generate/visual/mix-blend-mode.test.ts",
	cases: [
		// Valid cases - standard blend modes
		{
			input: { kind: "mix-blend-mode", mode: "normal" },
			expected: "normal",
			description: "normal blend mode",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "mix-blend-mode", mode: "multiply" },
			expected: "multiply",
			description: "multiply blend mode",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "mix-blend-mode", mode: "screen" },
			expected: "screen",
			description: "screen blend mode",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "mix-blend-mode", mode: "overlay" },
			expected: "overlay",
			description: "overlay blend mode",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "mix-blend-mode", mode: "color-dodge" },
			expected: "color-dodge",
			description: "color-dodge blend mode",
			category: "valid-advanced",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "mix-blend-mode", mode: "hue" },
			expected: "hue",
			description: "hue blend mode",
			category: "valid-color",
			roundtrip: true,
			expectValid: true
		},

		// Invalid cases - null/undefined
		{
			input: null as any,
			expected: "",
			description: "null input",
			category: "invalid-null",
			expectValid: false,
			expectedError: "Invalid input: expected object, received null"
		},
		{
			input: undefined as any,
			expected: "",
			description: "undefined input",
			category: "invalid-null",
			expectValid: false,
			expectedError: "Invalid input: expected object, received undefined"
		},

		// Invalid cases - wrong keyword
		{
			input: { kind: "mix-blend-mode", mode: "invalid" } as any,
			expected: "",
			description: "invalid keyword",
			category: "invalid-keyword",
			expectValid: false,
			expectedError: "Invalid input"
		},

		// Invalid cases - wrong type
		{
			input: { kind: "mix-blend-mode", mode: 123 } as any,
			expected: "",
			description: "number value",
			category: "invalid-type",
			expectValid: false,
			expectedError: "Invalid input"
		},

		// Invalid cases - wrong kind
		{
			input: { kind: "background-blend-mode", mode: "multiply" } as any,
			expected: "",
			description: "wrong kind field",
			category: "invalid-kind",
			expectValid: false,
			expectedError: "Invalid input"
		},
	],
};
