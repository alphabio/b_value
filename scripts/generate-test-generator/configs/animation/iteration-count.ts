/**
 * Test cases for animation-iteration-count generator
 * 
 * Tests IR → CSS conversion and roundtrip validation (IR → CSS → IR)
 */

import type { AnimationIterationCount } from "@/core/types/index.js";

export interface GenerateTestCase {
	input: AnimationIterationCount | any;
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
	propertyName: "iteration-count",
	module: "animation",
	sourceFile: "src/generate/animation/iteration-count.ts",
	importPath: "../src/generate/animation/iteration-count.js",
	parseImportPath: "../src/parse/animation/iteration-count.js",
	outputPath: "src/generate/animation/iteration-count.test.ts",
	cases: [
		// Valid cases - infinite keyword
		{
			input: {
				kind: "animation-iteration-count",
				counts: [{ type: "infinite" }]
			},
			expected: "infinite",
			description: "infinite keyword",
			category: "valid-keyword",
			roundtrip: true,
			expectValid: true
		},
		
		// Valid cases - number values
		{
			input: {
				kind: "animation-iteration-count",
				counts: [{ type: "number", value: 1 }]
			},
			expected: "1",
			description: "single iteration",
			category: "valid-number",
			roundtrip: true,
			expectValid: true
		},
		{
			input: {
				kind: "animation-iteration-count",
				counts: [{ type: "number", value: 3 }]
			},
			expected: "3",
			description: "multiple iterations",
			category: "valid-number",
			roundtrip: true,
			expectValid: true
		},
		{
			input: {
				kind: "animation-iteration-count",
				counts: [{ type: "number", value: 0 }]
			},
			expected: "0",
			description: "zero iterations",
			category: "valid-number",
			roundtrip: true,
			expectValid: true
		},
		
		// Valid cases - decimal values
		{
			input: {
				kind: "animation-iteration-count",
				counts: [{ type: "number", value: 2.5 }]
			},
			expected: "2.5",
			description: "decimal iterations",
			category: "valid-decimal",
			roundtrip: true,
			expectValid: true
		},
		{
			input: {
				kind: "animation-iteration-count",
				counts: [{ type: "number", value: 0.5 }]
			},
			expected: "0.5",
			description: "half iteration",
			category: "valid-decimal",
			roundtrip: true,
			expectValid: true
		},
		
		// Valid cases - large values
		{
			input: {
				kind: "animation-iteration-count",
				counts: [{ type: "number", value: 1000 }]
			},
			expected: "1000",
			description: "very large count",
			category: "valid-large",
			roundtrip: true,
			expectValid: true
		},
		
		// Valid cases - multiple values
		{
			input: {
				kind: "animation-iteration-count",
				counts: [
					{ type: "number", value: 1 },
					{ type: "infinite" }
				]
			},
			expected: "1, infinite",
			description: "mixed number and infinite",
			category: "valid-list",
			roundtrip: true,
			expectValid: true
		},
		{
			input: {
				kind: "animation-iteration-count",
				counts: [
					{ type: "number", value: 2 },
					{ type: "number", value: 3 },
					{ type: "infinite" }
				]
			},
			expected: "2, 3, infinite",
			description: "multiple mixed values",
			category: "valid-list",
			roundtrip: true,
			expectValid: true
		},
		{
			input: {
				kind: "animation-iteration-count",
				counts: [
					{ type: "infinite" },
					{ type: "infinite" }
				]
			},
			expected: "infinite, infinite",
			description: "multiple infinite keywords",
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

		// Invalid cases - negative numbers
		{
			input: {
				kind: "animation-iteration-count",
				counts: [{ type: "number", value: -1 }]
			},
			expected: "",
			description: "negative iteration count",
			category: "invalid-negative",
			expectValid: false,
			expectedError: 'counts[0].value: Number must be greater than or equal to 0'
		},
		{
			input: {
				kind: "animation-iteration-count",
				counts: [{ type: "number", value: -5.5 }]
			},
			expected: "",
			description: "negative decimal iteration count",
			category: "invalid-negative",
			expectValid: false,
			expectedError: 'counts[0].value: Number must be greater than or equal to 0'
		},

		// Invalid cases - invalid type
		{
			input: {
				kind: "animation-iteration-count",
				counts: [{ type: "invalid" as any }]
			},
			expected: "",
			description: "invalid type keyword",
			category: "invalid-type",
			expectValid: false,
			expectedError: 'counts[0]: Invalid iteration count'
		},
		{
			input: {
				kind: "animation-iteration-count",
				counts: [{ type: "number", value: "three" as any }]
			},
			expected: "",
			description: "string value instead of number",
			category: "invalid-type",
			expectValid: false,
			expectedError: "counts[0].value: Invalid input: expected number, received string"
		},

		// Invalid cases - missing fields
		{
			input: {
				kind: "animation-iteration-count",
				counts: [{ type: "number" } as any]
			},
			expected: "",
			description: "missing value field",
			category: "invalid-missing",
			expectValid: false,
			expectedError: "Required"
		},
		{
			input: {
				kind: "animation-iteration-count",
				counts: [{ value: 5 } as any]
			},
			expected: "",
			description: "missing type field",
			category: "invalid-missing",
			expectValid: false,
			expectedError: "counts[0]: Invalid iteration count"
		},

		// Invalid cases - empty array
		{
			input: {
				kind: "animation-iteration-count",
				counts: []
			},
			expected: "",
			description: "empty counts array",
			category: "invalid-empty",
			expectValid: false,
			expectedError: "Array must contain at least 1 element(s)"
		},

		// Invalid cases - wrong kind
		{
			input: {
				kind: "animation-duration" as any,
				counts: [{ type: "infinite" }]
			},
			expected: "",
			description: "wrong kind literal",
			category: "invalid-kind",
			expectValid: false,
			expectedError: 'kind: Invalid literal value, expected "animation-iteration-count"'
		},
	]
};
