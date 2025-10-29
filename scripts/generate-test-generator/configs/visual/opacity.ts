// b_path:: scripts/generate-test-generator/configs/visual/opacity.ts
import type { Opacity } from "@/core/types/index.js";

export interface GenerateTestCase {
	input: Opacity;
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
	propertyName: "opacity",
  typeName: "Opacity",
	module: "visual",
	sourceFile: "src/generate/visual/opacity.ts",
	importPath: "../src/generate/visual/opacity.js",
	parseImportPath: "../src/parse/visual/opacity.js",
	outputPath: "src/generate/visual/opacity.test.ts",
	cases: [
		// Valid cases - basic values
		{
			input: { kind: "opacity", value: 0 },
			expected: "0",
			description: "fully transparent",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "opacity", value: 1 },
			expected: "1",
			description: "fully opaque",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "opacity", value: 0.5 },
			expected: "0.5",
			description: "50% transparent",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},

		// Valid cases - decimal values
		{
			input: { kind: "opacity", value: 0.25 },
			expected: "0.25",
			description: "25% transparent",
			category: "valid-decimal",
			roundtrip: true,
			expectValid: true
		},
		{
			input: { kind: "opacity", value: 0.75 },
			expected: "0.75",
			description: "75% transparent",
			category: "valid-decimal",
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

		// Invalid cases - out of range
		{
			input: { kind: "opacity", value: -1 } as any,
			expected: "",
			description: "negative value",
			category: "invalid-range",
			expectValid: false,
			expectedError: "Number must be greater than or equal to 0"
		},
		{
			input: { kind: "opacity", value: 2 } as any,
			expected: "",
			description: "value greater than 1",
			category: "invalid-range",
			expectValid: false,
			expectedError: "Number must be less than or equal to 1"
		},

		// Invalid cases - wrong value type
		{
			input: { kind: "opacity", value: "0.5" } as any,
			expected: "",
			description: "string value",
			category: "invalid-type",
			expectValid: false,
			expectedError: "Invalid input"
		},
		{
			input: { kind: "opacity", value: null } as any,
			expected: "",
			description: "null value",
			category: "invalid-type",
			expectValid: false,
			expectedError: "Invalid input: expected number, received null"
		},

		// Invalid cases - wrong kind
		{
			input: { kind: "visibility", value: 0.5 } as any,
			expected: "",
			description: "wrong kind field",
			category: "invalid-kind",
			expectValid: false,
			expectedError: "Invalid input"
		},
	],
};
