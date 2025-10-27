/**
 * Test cases for animation-name generator
 * 
 * Tests IR → CSS conversion and roundtrip validation (IR → CSS → IR)
 */

import type { AnimationName } from "../../../src/core/types/index.js";

export interface GenerateTestCase {
	input: AnimationName | any;
	expected: string;
	description: string;
	category: string;
	roundtrip?: boolean;
	expectValid?: boolean;
	expectedError?: string;
}

export interface PropertyConfig {
	propertyName: string;
	sourceFile: string;
	importPath: string;
	parseImportPath: string;
	outputPath: string;
	cases: GenerateTestCase[];
}

export const config: PropertyConfig = {
	propertyName: "name",
	sourceFile: "src/generate/animation/name.ts",
	importPath: "../src/generate/animation/name.js",
	parseImportPath: "../src/parse/animation/name.js",
	outputPath: "src/generate/animation/name.test.ts",
	cases: [
		// Valid cases - none keyword
		{
			input: {
				kind: "animation-name",
				names: [{ type: "none" }]
			},
			expected: "none",
			description: "none keyword",
			category: "valid-none",
			roundtrip: true,
			expectValid: true
		},
		
		// Valid cases - identifiers
		{
			input: {
				kind: "animation-name",
				names: [{ type: "identifier", value: "slideIn" }]
			},
			expected: "slideIn",
			description: "simple identifier",
			category: "valid-identifier",
			roundtrip: true,
			expectValid: true
		},
		{
			input: {
				kind: "animation-name",
				names: [{ type: "identifier", value: "fadeOut" }]
			},
			expected: "fadeOut",
			description: "camelCase identifier",
			category: "valid-identifier",
			roundtrip: true,
			expectValid: true
		},
		{
			input: {
				kind: "animation-name",
				names: [{ type: "identifier", value: "slide-in" }]
			},
			expected: "slide-in",
			description: "hyphenated identifier",
			category: "valid-identifier",
			roundtrip: true,
			expectValid: true
		},
		{
			input: {
				kind: "animation-name",
				names: [{ type: "identifier", value: "bounce_effect" }]
			},
			expected: "bounce_effect",
			description: "underscore identifier",
			category: "valid-identifier",
			roundtrip: true,
			expectValid: true
		},
		{
			input: {
				kind: "animation-name",
				names: [{ type: "identifier", value: "animation123" }]
			},
			expected: "animation123",
			description: "identifier with numbers",
			category: "valid-identifier",
			roundtrip: true,
			expectValid: true
		},
		
		// Valid cases - multiple values
		{
			input: {
				kind: "animation-name",
				names: [
					{ type: "identifier", value: "slideIn" },
					{ type: "identifier", value: "fadeOut" }
				]
			},
			expected: "slideIn, fadeOut",
			description: "two identifiers",
			category: "valid-multiple",
			roundtrip: true,
			expectValid: true
		},
		{
			input: {
				kind: "animation-name",
				names: [
					{ type: "identifier", value: "bounce" },
					{ type: "none" },
					{ type: "identifier", value: "spin" }
				]
			},
			expected: "bounce, none, spin",
			description: "mixed identifiers and none",
			category: "valid-multiple",
			roundtrip: true,
			expectValid: true
		},
		{
			input: {
				kind: "animation-name",
				names: [
					{ type: "none" },
					{ type: "none" }
				]
			},
			expected: "none, none",
			description: "multiple none keywords",
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
				names: [{ type: "none" }]
			},
			expected: "",
			description: "wrong kind literal",
			category: "invalid-kind",
			expectValid: false,
			expectedError: 'kind: Invalid literal value, expected "animation-name"'
		},
		
		// Invalid cases - invalid type
		{
			input: {
				kind: "animation-name",
				names: [{ type: "invalid" as any }]
			},
			expected: "",
			description: "invalid type keyword",
			category: "invalid-type",
			expectValid: false,
			expectedError: "names[0]: Invalid animation name"
		},
		{
			input: {
				kind: "animation-name",
				names: [{ type: "identifier" } as any]
			},
			expected: "",
			description: "missing value for identifier",
			category: "invalid-type",
			expectValid: false,
			expectedError: "names[0]: Invalid animation name"
		},
		{
			input: {
				kind: "animation-name",
				names: [{ type: "identifier", value: 123 as any }]
			},
			expected: "",
			description: "number value instead of string",
			category: "invalid-type",
			expectValid: false,
			expectedError: "names[0]: Invalid animation name"
		},
		
		// Invalid cases - empty array
		{
			input: {
				kind: "animation-name",
				names: []
			},
			expected: "",
			description: "empty names array",
			category: "invalid-empty",
			expectValid: false,
			expectedError: "Array must contain at least 1 element(s)"
		},
		
		// Invalid cases - wrong structure
		{
			input: {
				kind: "animation-name",
				names: "slideIn" as any
			},
			expected: "",
			description: "string instead of array",
			category: "invalid-structure",
			expectValid: false,
			expectedError: "names: Invalid input: expected array"
		},
		{
			input: {
				kind: "animation-name",
				names: [{ value: "slideIn" } as any]
			},
			expected: "",
			description: "missing type field",
			category: "invalid-structure",
			expectValid: false,
			expectedError: "names[0]: Invalid animation name"
		},
	]
};
