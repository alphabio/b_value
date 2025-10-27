/**
 * Test cases for animation-direction generator
 * 
 * Tests IR → CSS conversion and roundtrip validation (IR → CSS → IR)
 */

import type { AnimationDirection } from "@/core/types/index.js";

export interface GenerateTestCase {
	input: AnimationDirection | any;
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
	propertyName: "direction",
	module: "animation",
	sourceFile: "src/generate/animation/direction.ts",
	importPath: "../src/generate/animation/direction.js",
	parseImportPath: "../src/parse/animation/direction.js",
	outputPath: "src/generate/animation/direction.test.ts",
	cases: [
		// Valid cases - single keywords
		{
			input: {
				kind: "animation-direction",
				directions: ["normal"]
			},
			expected: "normal",
			description: "normal direction",
			category: "valid-single",
			roundtrip: true,
			expectValid: true
		},
		{
			input: {
				kind: "animation-direction",
				directions: ["reverse"]
			},
			expected: "reverse",
			description: "reverse direction",
			category: "valid-single",
			roundtrip: true,
			expectValid: true
		},
		{
			input: {
				kind: "animation-direction",
				directions: ["alternate"]
			},
			expected: "alternate",
			description: "alternate direction",
			category: "valid-single",
			roundtrip: true,
			expectValid: true
		},
		{
			input: {
				kind: "animation-direction",
				directions: ["alternate-reverse"]
			},
			expected: "alternate-reverse",
			description: "alternate-reverse direction",
			category: "valid-single",
			roundtrip: true,
			expectValid: true
		},
		
		// Valid cases - multiple values
		{
			input: {
				kind: "animation-direction",
				directions: ["normal", "reverse"]
			},
			expected: "normal, reverse",
			description: "two directions",
			category: "valid-multiple",
			roundtrip: true,
			expectValid: true
		},
		{
			input: {
				kind: "animation-direction",
				directions: ["normal", "reverse", "alternate", "alternate-reverse"]
			},
			expected: "normal, reverse, alternate, alternate-reverse",
			description: "all four direction keywords",
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
				kind: "animation-duration" as any,
				directions: ["normal"]
			},
			expected: "",
			description: "wrong kind literal",
			category: "invalid-kind",
			expectValid: false,
			expectedError: 'kind: Invalid literal value, expected "animation-direction"'
		},
		
		// Invalid cases - invalid keyword
		{
			input: {
				kind: "animation-direction",
				directions: ["invalid" as any]
			},
			expected: "",
			description: "invalid direction keyword",
			category: "invalid-keyword",
			expectValid: false,
			expectedError: "directions[0]: Invalid enum value"
		},
		{
			input: {
				kind: "animation-direction",
				directions: ["forwards" as any]
			},
			expected: "",
			description: "fill-mode keyword instead of direction",
			category: "invalid-keyword",
			expectValid: false,
			expectedError: "directions[0]: Invalid enum value"
		},
		
		// Invalid cases - empty array
		{
			input: {
				kind: "animation-direction",
				directions: []
			},
			expected: "",
			description: "empty directions array",
			category: "invalid-empty",
			expectValid: false,
			expectedError: "Array must contain at least 1 element(s)"
		},
		
		// Invalid cases - wrong type
		{
			input: {
				kind: "animation-direction",
				directions: "normal" as any
			},
			expected: "",
			description: "string instead of array",
			category: "invalid-type",
			expectValid: false,
			expectedError: "directions: Invalid input: expected array"
		},
		{
			input: {
				kind: "animation-direction",
				directions: [123 as any]
			},
			expected: "",
			description: "number instead of string",
			category: "invalid-type",
			expectValid: false,
			expectedError: "directions[0]: Invalid enum value"
		},
	]
};
