/**
 * Test cases for animation-play-state generator
 * 
 * Tests IR → CSS conversion and roundtrip validation (IR → CSS → IR)
 */

import type { AnimationPlayState } from "../../../src/core/types/index.js";

export interface GenerateTestCase {
	input: AnimationPlayState | any;
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
	propertyName: "play-state",
	sourceFile: "src/generate/animation/play-state.ts",
	importPath: "../src/generate/animation/play-state.js",
	parseImportPath: "../src/parse/animation/play-state.js",
	outputPath: "src/generate/animation/play-state.test.ts",
	cases: [
		// Valid cases - single keywords
		{
			input: {
				kind: "animation-play-state",
				states: ["running"]
			},
			expected: "running",
			description: "running play state",
			category: "valid-single",
			roundtrip: true,
			expectValid: true
		},
		{
			input: {
				kind: "animation-play-state",
				states: ["paused"]
			},
			expected: "paused",
			description: "paused play state",
			category: "valid-single",
			roundtrip: true,
			expectValid: true
		},
		
		// Valid cases - multiple values
		{
			input: {
				kind: "animation-play-state",
				states: ["running", "paused"]
			},
			expected: "running, paused",
			description: "two play states",
			category: "valid-multiple",
			roundtrip: true,
			expectValid: true
		},
		{
			input: {
				kind: "animation-play-state",
				states: ["paused", "running", "running"]
			},
			expected: "paused, running, running",
			description: "repeated play states",
			category: "valid-multiple",
			roundtrip: true,
			expectValid: true
		},
		{
			input: {
				kind: "animation-play-state",
				states: ["running", "running", "running", "paused"]
			},
			expected: "running, running, running, paused",
			description: "multiple animations with different states",
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
				states: ["running"]
			},
			expected: "",
			description: "wrong kind literal",
			category: "invalid-kind",
			expectValid: false,
			expectedError: 'kind: Invalid literal value, expected "animation-play-state"'
		},
		
		// Invalid cases - invalid keyword
		{
			input: {
				kind: "animation-play-state",
				states: ["invalid" as any]
			},
			expected: "",
			description: "invalid play state keyword",
			category: "invalid-keyword",
			expectValid: false,
			expectedError: "states[0]: Invalid enum value"
		},
		{
			input: {
				kind: "animation-play-state",
				states: ["stopped" as any]
			},
			expected: "",
			description: "non-existent play state",
			category: "invalid-keyword",
			expectValid: false,
			expectedError: "states[0]: Invalid enum value"
		},
		{
			input: {
				kind: "animation-play-state",
				states: ["normal" as any]
			},
			expected: "",
			description: "direction keyword instead of play-state",
			category: "invalid-keyword",
			expectValid: false,
			expectedError: "states[0]: Invalid enum value"
		},
		
		// Invalid cases - empty array
		{
			input: {
				kind: "animation-play-state",
				states: []
			},
			expected: "",
			description: "empty states array",
			category: "invalid-empty",
			expectValid: false,
			expectedError: "Array must contain at least 1 element(s)"
		},
		
		// Invalid cases - wrong type
		{
			input: {
				kind: "animation-play-state",
				states: "running" as any
			},
			expected: "",
			description: "string instead of array",
			category: "invalid-type",
			expectValid: false,
			expectedError: "states: Invalid input: expected array"
		},
		{
			input: {
				kind: "animation-play-state",
				states: [1 as any]
			},
			expected: "",
			description: "number instead of string",
			category: "invalid-type",
			expectValid: false,
			expectedError: "states[0]: Invalid enum value"
		},
	]
};
