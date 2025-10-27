/**
 * Test cases for animation-delay generator
 * 
 * Tests IR → CSS conversion and roundtrip validation (IR → CSS → IR)
 */

import type { AnimationDelay } from "@/core/types/index.js";

export interface GenerateTestCase {
	input: AnimationDelay | any;
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
	propertyName: "delay",
	module: "animation",
	sourceFile: "src/generate/animation/delay.ts",
	importPath: "../src/generate/animation/delay.js",
	parseImportPath: "../src/parse/animation/delay.js",
	outputPath: "src/generate/animation/delay.test.ts",
	cases: [
		// Valid cases - basic time values
		{
			input: {
				kind: "animation-delay",
				delays: [{ value: 1, unit: "s" }]
			},
			expected: "1s",
			description: "single delay in seconds",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: {
				kind: "animation-delay",
				delays: [{ value: 500, unit: "ms" }]
			},
			expected: "500ms",
			description: "single delay in milliseconds",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		
		// Valid cases - edge values
		{
			input: {
				kind: "animation-delay",
				delays: [{ value: 0, unit: "s" }]
			},
			expected: "0s",
			description: "zero delay",
			category: "valid-edge",
			roundtrip: true,
			expectValid: true
		},
		
		// Valid cases - negative delays
		// Negative delays are valid in CSS and make animation start partway through
		{
			input: {
				kind: "animation-delay",
				delays: [{ value: -1, unit: "s" }]
			},
			expected: "-1s",
			description: "negative delay",
			category: "valid-negative",
			roundtrip: true,
			expectValid: true
		},
		{
			input: {
				kind: "animation-delay",
				delays: [{ value: -500, unit: "ms" }]
			},
			expected: "-500ms",
			description: "negative delay in milliseconds",
			category: "valid-negative",
			roundtrip: true,
			expectValid: true
		},
		
		// Valid cases - decimal values
		{
			input: {
				kind: "animation-delay",
				delays: [{ value: 0.5, unit: "s" }]
			},
			expected: "0.5s",
			description: "decimal seconds",
			category: "valid-decimal",
			roundtrip: true,
			expectValid: true
		},
		{
			input: {
				kind: "animation-delay",
				delays: [{ value: 1.5, unit: "s" }]
			},
			expected: "1.5s",
			description: "decimal seconds with integer part",
			category: "valid-decimal",
			roundtrip: true,
			expectValid: true
		},
		{
			input: {
				kind: "animation-delay",
				delays: [{ value: 0.25, unit: "ms" }]
			},
			expected: "0.25ms",
			description: "decimal milliseconds",
			category: "valid-decimal",
			roundtrip: true,
			expectValid: true
		},
		
		// Valid cases - large values
		{
			input: {
				kind: "animation-delay",
				delays: [{ value: 10000, unit: "s" }]
			},
			expected: "10000s",
			description: "very large delay",
			category: "valid-large",
			roundtrip: true,
			expectValid: true
		},
		
		// Valid cases - multiple delays
		{
			input: {
				kind: "animation-delay",
				delays: [
					{ value: 1, unit: "s" },
					{ value: 500, unit: "ms" }
				]
			},
			expected: "1s, 500ms",
			description: "multiple delays",
			category: "valid-list",
			roundtrip: true,
			expectValid: true
		},
		{
			input: {
				kind: "animation-delay",
				delays: [
					{ value: 0, unit: "s" },
					{ value: 1, unit: "s" },
					{ value: 2, unit: "s" },
					{ value: 3, unit: "s" }
				]
			},
			expected: "0s, 1s, 2s, 3s",
			description: "multiple time values",
			category: "valid-list",
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

		// Invalid cases - invalid units
		{
			input: {
				kind: "animation-delay",
				delays: [{ value: 1, unit: "px" as any }]
			},
			expected: "",
			description: "invalid unit px",
			category: "invalid-unit",
			expectValid: false,
			expectedError: 'delays[0].unit: Invalid unit. Expected "s" or "ms".'
		},
		{
			input: {
				kind: "animation-delay",
				delays: [{ value: 1, unit: "em" as any }]
			},
			expected: "",
			description: "invalid unit em",
			category: "invalid-unit",
			expectValid: false,
			expectedError: 'delays[0].unit: Invalid unit. Expected "s" or "ms".'
		},

		// Invalid cases - invalid value types
		{
			input: {
				kind: "animation-delay",
				delays: [{ value: "oops" as any, unit: "s" }]
			},
			expected: "",
			description: "string value",
			category: "invalid-value-type",
			expectValid: false,
			expectedError: "delays[0].value: Invalid input: expected number, received string"
		},
		{
			input: {
				kind: "animation-delay",
				delays: [{ value: null as any, unit: "s" }]
			},
			expected: "",
			description: "null value",
			category: "invalid-value-type",
			expectValid: false,
			expectedError: "delays[0].value: Invalid input: expected number, received null"
		},

		// Invalid cases - missing fields
		{
			input: {
				kind: "animation-delay",
				delays: [{ unit: "s" } as any]
			},
			expected: "",
			description: "missing value field",
			category: "invalid-missing",
			expectValid: false,
			expectedError: "Required"
		},
		{
			input: {
				kind: "animation-delay",
				delays: [{ value: 1 } as any]
			},
			expected: "",
			description: "missing unit field",
			category: "invalid-missing",
			expectValid: false,
			expectedError: "Required"
		},

		// Invalid cases - empty array
		{
			input: {
				kind: "animation-delay",
				delays: []
			},
			expected: "",
			description: "empty delays array",
			category: "invalid-empty",
			expectValid: false,
			expectedError: "Array must contain at least 1 element(s)"
		},
	]
};
