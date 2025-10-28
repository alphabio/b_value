// b_path:: scripts/generate-test-generator/configs/visual/background-blend-mode.ts
/**
 * Test cases for background-blend-mode generator
 *
 * Tests IR → CSS conversion and roundtrip validation (IR → CSS → IR)
 */

import type { BackgroundBlendMode } from "@/core/types/index.js";

export interface GenerateTestCase {
	input: BackgroundBlendMode;
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
	propertyName: "background-blend-mode",
	module: "visual",
	sourceFile: "src/generate/visual/background-blend-mode.ts",
	importPath: "../src/generate/visual/background-blend-mode.js",
	parseImportPath: "../src/parse/visual/background-blend-mode.js",
	outputPath: "src/generate/visual/background-blend-mode.test.ts",
	cases: [
		// Valid cases - standard blend modes
		{
			input: { kind: "background-blend-mode", mode: "normal" },
			expected: "normal",
			description: "normal blend mode",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "background-blend-mode", mode: "multiply" },
			expected: "multiply",
			description: "multiply blend mode",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "background-blend-mode", mode: "screen" },
			expected: "screen",
			description: "screen blend mode",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "background-blend-mode", mode: "overlay" },
			expected: "overlay",
			description: "overlay blend mode",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "background-blend-mode", mode: "color-dodge" },
			expected: "color-dodge",
			description: "color-dodge blend mode",
			category: "valid-advanced",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "background-blend-mode", mode: "hue" },
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
			input: { kind: "background-blend-mode", mode: "invalid" } as any,
			expected: "",
			description: "invalid keyword",
			category: "invalid-keyword",
			expectValid: false,
			expectedError: "Invalid input"
		},

		// Invalid cases - wrong type
		{
			input: { kind: "background-blend-mode", mode: 123 } as any,
			expected: "",
			description: "number value",
			category: "invalid-type",
			expectValid: false,
			expectedError: "Invalid input"
		},

		// Invalid cases - wrong kind
		{
			input: { kind: "mix-blend-mode", mode: "multiply" } as any,
			expected: "",
			description: "wrong kind field",
			category: "invalid-kind",
			expectValid: false,
			expectedError: "Invalid input"
		},
	],
};
