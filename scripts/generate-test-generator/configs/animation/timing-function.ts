// b_path:: scripts/generate-test-generator/configs/animation/timing-function.ts
/**
 * Test cases for animation-timing-function generator
 *
 * Tests IR → CSS conversion and roundtrip validation (IR → CSS → IR)
 */

import type { AnimationTimingFunction } from "@/core/types/index.js";

export interface GenerateTestCase {
	input: AnimationTimingFunction | any;
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
	propertyName: "timing-function",
	module: "animation",
	sourceFile: "src/generate/animation/timing-function.ts",
	importPath: "../src/generate/animation/timing-function.js",
	parseImportPath: "../src/parse/animation/timing-function.js",
	outputPath: "src/generate/animation/timing-function.test.ts",
	cases: [
		// Valid cases - keyword values
		{
			input: {
				kind: "animation-timing-function",
				functions: ["ease"]
			},
			expected: "ease",
			description: "ease keyword",
			category: "valid-keyword",
			roundtrip: true,
			expectValid: true
		},
		{
			input: {
				kind: "animation-timing-function",
				functions: ["linear"]
			},
			expected: "linear",
			description: "linear keyword",
			category: "valid-keyword",
			roundtrip: true,
			expectValid: true
		},
		{
			input: {
				kind: "animation-timing-function",
				functions: ["ease-in"]
			},
			expected: "ease-in",
			description: "ease-in keyword",
			category: "valid-keyword",
			roundtrip: true,
			expectValid: true
		},
		{
			input: {
				kind: "animation-timing-function",
				functions: ["ease-out"]
			},
			expected: "ease-out",
			description: "ease-out keyword",
			category: "valid-keyword",
			roundtrip: true,
			expectValid: true
		},
		{
			input: {
				kind: "animation-timing-function",
				functions: ["ease-in-out"]
			},
			expected: "ease-in-out",
			description: "ease-in-out keyword",
			category: "valid-keyword",
			roundtrip: true,
			expectValid: true
		},
		{
			input: {
				kind: "animation-timing-function",
				functions: ["step-start"]
			},
			expected: "step-start",
			description: "step-start keyword",
			category: "valid-keyword",
			roundtrip: true,
			expectValid: true
		},
		{
			input: {
				kind: "animation-timing-function",
				functions: ["step-end"]
			},
			expected: "step-end",
			description: "step-end keyword",
			category: "valid-keyword",
			roundtrip: true,
			expectValid: true
		},

		// Valid cases - cubic-bezier
		{
			input: {
				kind: "animation-timing-function",
				functions: [{ type: "cubic-bezier", x1: 0.42, y1: 0, x2: 1, y2: 1 }]
			},
			expected: "cubic-bezier(0.42, 0, 1, 1)",
			description: "cubic-bezier function",
			category: "valid-cubic-bezier",
			roundtrip: true,
			expectValid: true
		},
		{
			input: {
				kind: "animation-timing-function",
				functions: [{ type: "cubic-bezier", x1: 0, y1: 0, x2: 1, y2: 1 }]
			},
			expected: "cubic-bezier(0, 0, 1, 1)",
			description: "cubic-bezier with zero values",
			category: "valid-cubic-bezier",
			roundtrip: true,
			expectValid: true
		},

		// Valid cases - steps
		{
			input: {
				kind: "animation-timing-function",
				functions: [{ type: "steps", steps: 4 }]
			},
			expected: "steps(4)",
			description: "steps without position",
			category: "valid-steps",
			roundtrip: true,
			expectValid: true
		},
		{
			input: {
				kind: "animation-timing-function",
				functions: [{ type: "steps", steps: 10, position: "start" }]
			},
			expected: "steps(10, start)",
			description: "steps with start position",
			category: "valid-steps",
			roundtrip: true,
			expectValid: true
		},
		{
			input: {
				kind: "animation-timing-function",
				functions: [{ type: "steps", steps: 5, position: "end" }]
			},
			expected: "steps(5, end)",
			description: "steps with end position",
			category: "valid-steps",
			roundtrip: true,
			expectValid: true
		},

		// Valid cases - linear function
		{
			input: {
				kind: "animation-timing-function",
				functions: [{ type: "linear", stops: [{ output: 0 }, { output: 1 }] }]
			},
			expected: "linear(0, 1)",
			description: "linear function simple",
			category: "valid-linear",
			roundtrip: true,
			expectValid: true
		},
		{
			input: {
				kind: "animation-timing-function",
				functions: [{ type: "linear", stops: [{ output: 0, input: 0 }, { output: 0.5, input: 0.5 }, { output: 1, input: 1 }] }]
			},
			expected: "linear(0 0%, 0.5 50%, 1 100%)",
			description: "linear function with input positions",
			category: "valid-linear",
			roundtrip: true,
			expectValid: true
		},

		// Valid cases - multiple functions
		{
			input: {
				kind: "animation-timing-function",
				functions: ["ease", "linear", "ease-out"]
			},
			expected: "ease, linear, ease-out",
			description: "multiple keyword functions",
			category: "valid-list",
			roundtrip: true,
			expectValid: true
		},
		{
			input: {
				kind: "animation-timing-function",
				functions: [
					"ease",
					{ type: "cubic-bezier", x1: 0.1, y1: 0.7, x2: 1, y2: 0.1 },
					{ type: "steps", steps: 4 }
				]
			},
			expected: "ease, cubic-bezier(0.1, 0.7, 1, 0.1), steps(4)",
			description: "mixed function types",
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

		// Invalid cases - invalid function type
		{
			input: {
				kind: "animation-timing-function",
				functions: ["invalid-keyword" as any]
			},
			expected: "",
			description: "invalid keyword",
			category: "invalid-keyword",
			expectValid: false,
			expectedError: "Invalid easing function"
		},
		{
			input: {
				kind: "animation-timing-function",
				functions: [{ type: "unknown" } as any]
			},
			expected: "",
			description: "invalid function type",
			category: "invalid-type",
			expectValid: false,
			expectedError: "Invalid easing function"
		},

		// Invalid cases - invalid cubic-bezier
		{
			input: {
				kind: "animation-timing-function",
				functions: [{ type: "cubic-bezier", x1: 0, y1: 0 } as any]
			},
			expected: "",
			description: "cubic-bezier missing x2/y2",
			category: "invalid-cubic-bezier",
			expectValid: false,
			expectedError: "Required"
		},
		{
			input: {
				kind: "animation-timing-function",
				functions: [{ type: "cubic-bezier", x1: "0", y1: 0, x2: 1, y2: 1 } as any]
			},
			expected: "",
			description: "cubic-bezier with string value",
			category: "invalid-cubic-bezier",
			expectValid: false,
			expectedError: "Invalid input: expected number"
		},

		// Invalid cases - invalid steps
		{
			input: {
				kind: "animation-timing-function",
				functions: [{ type: "steps" } as any]
			},
			expected: "",
			description: "steps missing steps count",
			category: "invalid-steps",
			expectValid: false,
			expectedError: "Required"
		},
		{
			input: {
				kind: "animation-timing-function",
				functions: [{ type: "steps", steps: 0 } as any]
			},
			expected: "",
			description: "steps with zero count",
			category: "invalid-steps",
			expectValid: false,
			expectedError: "Number must be greater than 0"
		},
		{
			input: {
				kind: "animation-timing-function",
				functions: [{ type: "steps", steps: -1 } as any]
			},
			expected: "",
			description: "steps with negative count",
			category: "invalid-steps",
			expectValid: false,
			expectedError: "Number must be greater than 0"
		},

		// Invalid cases - empty array
		{
			input: {
				kind: "animation-timing-function",
				functions: []
			},
			expected: "",
			description: "empty functions array",
			category: "invalid-empty",
			expectValid: false,
			expectedError: "Array must contain at least 1 element(s)"
		},
	]
};
