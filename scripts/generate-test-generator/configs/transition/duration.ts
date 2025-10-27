/**
 * Test cases for transition-duration generator
 * 
 * Tests IR → CSS conversion and roundtrip validation (IR → CSS → IR)
 */

import type { TransitionDuration } from "@/core/types/index.js";

export interface GenerateTestCase {
	input: TransitionDuration;
	expected: string;
	description: string;
	category: string;
	roundtrip?: boolean; // If true, validates parse(generate(IR)) === IR
	expectValid?: boolean; // Expected behavior
	expectedError?: string; // Expected error message (for invalid IR)
}

export interface PropertyConfig {
	module: string;
	propertyName: string;
	sourceFile: string; // Path to source file (for spec ref validation)
	importPath: string; // Path for dynamic import
	parseImportPath: string; // Path to parse function (for roundtrip)
	outputPath: string; // Where to generate test file
	cases: GenerateTestCase[];
}

export const config: PropertyConfig = {
	propertyName: "duration",
	module: "transition",
	sourceFile: "src/generate/transition/duration.ts",
	importPath: "../src/generate/transition/duration.js",
	parseImportPath: "../src/parse/transition/duration.js",
	outputPath: "src/generate/transition/duration.test.ts",
	cases: [
		// Valid cases - basic time values
		{
			input: {
				kind: "transition-duration",
				durations: [{ value: 1, unit: "s" }]
			},
			expected: "1s",
			description: "single time value in seconds",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: {
				kind: "transition-duration",
				durations: [{ value: 500, unit: "ms" }]
			},
			expected: "500ms",
			description: "single time value in milliseconds",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		
		// Valid cases - edge values
		{
			input: {
				kind: "transition-duration",
				durations: [{ value: 0, unit: "s" }]
			},
			expected: "0s",
			description: "zero duration",
			category: "valid-edge",
			roundtrip: true,
			expectValid: true
		},
		{
			input: {
				kind: "transition-duration",
				durations: [{ value: 0, unit: "ms" }]
			},
			expected: "0ms",
			description: "zero duration in ms",
			category: "valid-edge",
			roundtrip: true,
			expectValid: true
		},
		
		// Valid cases - decimal values
		{
			input: {
				kind: "transition-duration",
				durations: [{ value: 0.5, unit: "s" }]
			},
			expected: "0.5s",
			description: "decimal values",
			category: "valid-decimal",
			roundtrip: true,
			expectValid: true
		},
		{
			input: {
				kind: "transition-duration",
				durations: [{ value: 2.5, unit: "s" }]
			},
			expected: "2.5s",
			description: "decimal seconds",
			category: "valid-decimal",
			roundtrip: true,
			expectValid: true
		},
		{
			input: {
				kind: "transition-duration",
				durations: [{ value: 100.5, unit: "ms" }]
			},
			expected: "100.5ms",
			description: "decimal milliseconds",
			category: "valid-decimal",
			roundtrip: true,
			expectValid: true
		},
		
		// Valid cases - large values
		{
			input: {
				kind: "transition-duration",
				durations: [{ value: 3600, unit: "s" }]
			},
			expected: "3600s",
			description: "large values",
			category: "valid-large",
			roundtrip: true,
			expectValid: true
		},
		
		// Valid cases - multiple values (comma-separated)
		{
			input: {
				kind: "transition-duration",
				durations: [
					{ value: 1, unit: "s" },
					{ value: 2, unit: "s" },
					{ value: 3, unit: "s" },
					{ value: 4, unit: "s" }
				]
			},
			expected: "1s, 2s, 3s, 4s",
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
				kind: "transition-duration",
				durations: [{ value: 1, unit: "px" as any }]
			},
			expected: "",
			description: "invalid unit px",
			category: "invalid-unit",
			expectValid: false,
			expectedError: "Invalid input"
		},
		{
			input: {
				kind: "transition-duration",
				durations: [{ value: 1, unit: "em" as any }]
			},
			expected: "",
			description: "invalid unit em",
			category: "invalid-unit",
			expectValid: false,
			expectedError: "Invalid input"
		},
		
		// Invalid cases - negative values
		{
			input: {
				kind: "transition-duration",
				durations: [{ value: -1, unit: "s" }]
			},
			expected: "",
			description: "negative value in seconds",
			category: "invalid-negative",
			expectValid: false,
			expectedError: "Time value must be non-negative"
		},
		{
			input: {
				kind: "transition-duration",
				durations: [{ value: -500, unit: "ms" }]
			},
			expected: "",
			description: "negative value in milliseconds",
			category: "invalid-negative",
			expectValid: false,
			expectedError: "Time value must be non-negative"
		},
		
		// Invalid cases - wrong value types
		{
			input: {
				kind: "transition-duration",
				durations: [{ value: "oops" as any, unit: "s" }]
			},
			expected: "",
			description: "string value",
			category: "invalid-value-type",
			expectValid: false,
			expectedError: "Invalid input"
		},
		{
			input: {
				kind: "transition-duration",
				durations: [{ value: null as any, unit: "s" }]
			},
			expected: "",
			description: "null value",
			category: "invalid-value-type",
			expectValid: false,
			expectedError: "Invalid input: expected number, received null"
		},
	],
};
