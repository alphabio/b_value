// b_path:: scripts/generate-test-generator/configs/visual/visibility.ts
/**
 * Test cases for visibility generator
 *
 * Tests IR → CSS conversion and roundtrip validation (IR → CSS → IR)
 */

import type { Visibility } from "@/core/types/index.js";

export interface GenerateTestCase {
	input: Visibility;
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
	propertyName: "visibility",
  typeName: "Visibility",
	module: "visual",
	sourceFile: "src/generate/visual/visibility.ts",
	importPath: "../src/generate/visual/visibility.js",
	parseImportPath: "../src/parse/visual/visibility.js",
	outputPath: "src/generate/visual/visibility.test.ts",
	cases: [
		// Valid cases - standard keywords
		{
			input: { kind: "visibility", value: "visible" },
			expected: "visible",
			description: "visible keyword",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "visibility", value: "hidden" },
			expected: "hidden",
			description: "hidden keyword",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "visibility", value: "collapse" },
			expected: "collapse",
			description: "collapse keyword",
			category: "valid-basic",
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
			input: { kind: "visibility", value: "auto" } as any,
			expected: "",
			description: "invalid keyword auto",
			category: "invalid-keyword",
			expectValid: false,
			expectedError: "Invalid input"
		},
		{
			input: { kind: "visibility", value: "none" } as any,
			expected: "",
			description: "invalid keyword none",
			category: "invalid-keyword",
			expectValid: false,
			expectedError: "Invalid input"
		},
		{
			input: { kind: "visibility", value: "block" } as any,
			expected: "",
			description: "display keyword",
			category: "invalid-keyword",
			expectValid: false,
			expectedError: "Invalid input"
		},

		// Invalid cases - wrong value type
		{
			input: { kind: "visibility", value: 0 } as any,
			expected: "",
			description: "number value",
			category: "invalid-type",
			expectValid: false,
			expectedError: "Invalid input"
		},
		{
			input: { kind: "visibility", value: null } as any,
			expected: "",
			description: "null value",
			category: "invalid-type",
			expectValid: false,
			expectedError: "Invalid input: expected string, received null"
		},

		// Invalid cases - wrong kind
		{
			input: { kind: "opacity", value: "visible" } as any,
			expected: "",
			description: "wrong kind field",
			category: "invalid-kind",
			expectValid: false,
			expectedError: "Invalid input"
		},
	],
};
