// b_path:: scripts/generate-test-generator/configs/animation/fill-mode.ts
/**
 * Test cases for animation-fill-mode generator
 *
 * Tests IR → CSS conversion and roundtrip validation (IR → CSS → IR)
 */

import type { AnimationFillMode } from "@/core/types/index.js";

export interface GenerateTestCase {
	input: AnimationFillMode | any;
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
	propertyName: "fill-mode",
	module: "animation",
	sourceFile: "src/generate/animation/fill-mode.ts",
	importPath: "../src/generate/animation/fill-mode.js",
	parseImportPath: "../src/parse/animation/fill-mode.js",
	outputPath: "src/generate/animation/fill-mode.test.ts",
	cases: [
		// Valid cases - single keywords
		{
			input: {
				kind: "animation-fill-mode",
				modes: ["none"]
			},
			expected: "none",
			description: "none fill mode",
			category: "valid-single",
			roundtrip: true,
			expectValid: true
		},
		{
			input: {
				kind: "animation-fill-mode",
				modes: ["forwards"]
			},
			expected: "forwards",
			description: "forwards fill mode",
			category: "valid-single",
			roundtrip: true,
			expectValid: true
		},
		{
			input: {
				kind: "animation-fill-mode",
				modes: ["backwards"]
			},
			expected: "backwards",
			description: "backwards fill mode",
			category: "valid-single",
			roundtrip: true,
			expectValid: true
		},
		{
			input: {
				kind: "animation-fill-mode",
				modes: ["both"]
			},
			expected: "both",
			description: "both fill mode",
			category: "valid-single",
			roundtrip: true,
			expectValid: true
		},

		// Valid cases - multiple values
		{
			input: {
				kind: "animation-fill-mode",
				modes: ["none", "forwards"]
			},
			expected: "none, forwards",
			description: "two fill modes",
			category: "valid-multiple",
			roundtrip: true,
			expectValid: true
		},
		{
			input: {
				kind: "animation-fill-mode",
				modes: ["none", "forwards", "backwards", "both"]
			},
			expected: "none, forwards, backwards, both",
			description: "all four fill mode keywords",
			category: "valid-multiple",
			roundtrip: true,
			expectValid: true
		},
		{
			input: {
				kind: "animation-fill-mode",
				modes: ["forwards", "forwards", "backwards"]
			},
			expected: "forwards, forwards, backwards",
			description: "repeated keywords",
			category: "valid-multiple",
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

		// Invalid cases - wrong kind
		{
			input: {
				kind: "animation-direction" as any,
				modes: ["none"]
			},
			expected: "",
			description: "wrong kind literal",
			category: "invalid-kind",
			expectValid: false,
			expectedError: 'kind: Invalid literal value, expected "animation-fill-mode"'
		},

		// Invalid cases - invalid keyword
		{
			input: {
				kind: "animation-fill-mode",
				modes: ["invalid" as any]
			},
			expected: "",
			description: "invalid fill mode keyword",
			category: "invalid-keyword",
			expectValid: false,
			expectedError: "modes[0]: Invalid enum value"
		},
		{
			input: {
				kind: "animation-fill-mode",
				modes: ["normal" as any]
			},
			expected: "",
			description: "direction keyword instead of fill-mode",
			category: "invalid-keyword",
			expectValid: false,
			expectedError: "modes[0]: Invalid enum value"
		},

		// Invalid cases - empty array
		{
			input: {
				kind: "animation-fill-mode",
				modes: []
			},
			expected: "",
			description: "empty modes array",
			category: "invalid-empty",
			expectValid: false,
			expectedError: "Array must contain at least 1 element(s)"
		},

		// Invalid cases - wrong type
		{
			input: {
				kind: "animation-fill-mode",
				modes: "none" as any
			},
			expected: "",
			description: "string instead of array",
			category: "invalid-type",
			expectValid: false,
			expectedError: "modes: Invalid input: expected array"
		},
		{
			input: {
				kind: "animation-fill-mode",
				modes: [true as any]
			},
			expected: "",
			description: "boolean instead of string",
			category: "invalid-type",
			expectValid: false,
			expectedError: "modes[0]: Invalid enum value"
		},
	]
};
