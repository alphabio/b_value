/**
 * Test cases for animation-duration generator
 * 
 * Tests IR → CSS conversion and roundtrip validation (IR → CSS → IR)
 */

import type { AnimationDuration } from "../../../src/core/types/index.js";

export interface GenerateTestCase {
	input: AnimationDuration;
	expected: string;
	description: string;
	category: string;
	roundtrip?: boolean; // If true, validates parse(generate(IR)) === IR
	expectValid?: boolean; // Expected behavior
	expectedError?: string; // Expected error message (for invalid IR)
}

export interface PropertyConfig {
	propertyName: string;
	sourceFile: string; // Path to source file (for spec ref validation)
	importPath: string; // Path for dynamic import
	parseImportPath: string; // Path to parse function (for roundtrip)
	outputPath: string; // Where to generate test file
	cases: GenerateTestCase[];
}

export const config: PropertyConfig = {
	propertyName: "duration",
	sourceFile: "src/generate/animation/duration.ts",
	importPath: "../src/generate/animation/duration.js",
	parseImportPath: "../src/parse/animation/duration.js",
	outputPath: "src/generate/animation/duration.test.ts",
	cases: [
		// Valid cases - basic time values
		{
			input: {
				kind: "animation-duration",
				durations: [{ type: "time", value: 1, unit: "s" }]
			},
			expected: "1s",
			description: "single time value in seconds",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: {
				kind: "animation-duration",
				durations: [{ type: "time", value: 500, unit: "ms" }]
			},
			expected: "500ms",
			description: "single time value in milliseconds",
			category: "valid-basic",
			roundtrip: true,
			expectValid: true
		},
		{
			input: {
				kind: "animation-duration",
				durations: [{ type: "auto" }]
			},
			expected: "auto",
			description: "auto keyword",
			category: "valid-keyword",
			roundtrip: true,
			expectValid: true
		},
		
		// Valid cases - edge values
		{
			input: {
				kind: "animation-duration",
				durations: [{ type: "time", value: 0, unit: "s" }]
			},
			expected: "0s",
			description: "zero duration",
			category: "valid-edge",
			roundtrip: true,
			expectValid: true
		},
		{
			input: {
				kind: "animation-duration",
				durations: [{ type: "time", value: 0, unit: "ms" }]
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
				kind: "animation-duration",
				durations: [{ type: "time", value: 0.5, unit: "s" }]
			},
			expected: "0.5s",
			description: "decimal values",
			category: "valid-decimal",
			roundtrip: true,
			expectValid: true
		},
		{
			input: {
				kind: "animation-duration",
				durations: [{ type: "time", value: 2.5, unit: "s" }]
			},
			expected: "2.5s",
			description: "decimal seconds",
			category: "valid-decimal",
			roundtrip: true,
			expectValid: true
		},
		{
			input: {
				kind: "animation-duration",
				durations: [{ type: "time", value: 100.5, unit: "ms" }]
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
				kind: "animation-duration",
				durations: [{ type: "time", value: 3600, unit: "s" }]
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
				kind: "animation-duration",
				durations: [
					{ type: "time", value: 1, unit: "s" },
					{ type: "auto" },
					{ type: "time", value: 500, unit: "ms" }
				]
			},
			expected: "1s, auto, 500ms",
			description: "multiple durations",
			category: "valid-list",
			roundtrip: true,
			expectValid: true
		},
		{
			input: {
				kind: "animation-duration",
				durations: [
					{ type: "time", value: 1, unit: "s" },
					{ type: "time", value: 2, unit: "s" },
					{ type: "time", value: 3, unit: "s" },
					{ type: "time", value: 4, unit: "s" }
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
				kind: "animation-duration",
				durations: [{ type: "time", value: 1, unit: "px" as any }]
			},
			expected: "",
			description: "invalid unit px",
			category: "invalid-unit",
			expectValid: false,
			expectedError: "Invalid input"
		},
		{
			input: {
				kind: "animation-duration",
				durations: [{ type: "time", value: 1, unit: "em" as any }]
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
				kind: "animation-duration",
				durations: [{ type: "time", value: -1, unit: "s" }]
			},
			expected: "",
			description: "negative value in seconds",
			category: "invalid-negative",
			expectValid: false,
			expectedError: "Time value must be non-negative"
		},
		{
			input: {
				kind: "animation-duration",
				durations: [{ type: "time", value: -500, unit: "ms" }]
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
				kind: "animation-duration",
				durations: [{ type: "time", value: "oops" as any, unit: "s" }]
			},
			expected: "",
			description: "string value",
			category: "invalid-value-type",
			expectValid: false,
			expectedError: "Invalid input"
		},
		{
			input: {
				kind: "animation-duration",
				durations: [{ type: "time", value: NaN, unit: "s" }]
			},
			expected: "",
			description: "NaN value",
			category: "invalid-value-type",
			expectValid: false,
			expectedError: "Invalid input"
		},
		
		// Invalid cases - invalid duration type
		{
			input: {
				kind: "animation-duration",
				durations: [{ type: "invalid" as any }]
			},
			expected: "",
			description: "invalid duration type",
			category: "invalid-type",
			expectValid: false,
			expectedError: "Invalid input"
		},
	],
};
