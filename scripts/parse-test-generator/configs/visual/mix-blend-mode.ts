// b_path:: scripts/parse-test-generator/configs/visual/mix-blend-mode.ts
/**
 * Test cases for mix-blend-mode parser
 */

export interface TestCase {
	input: string;
	description: string;
	category: string;
	expectValid?: boolean;
	expectedError?: string;
}

export interface PropertyConfig {
	module: string;
	propertyName: string;
	sourceFile: string;
	importPath: string;
	outputPath: string;
	cases: TestCase[];
}

export const config: PropertyConfig = {
	propertyName: "mix-blend-mode",
	module: "visual",
	sourceFile: "src/parse/visual/mix-blend-mode.ts",
	importPath: "../src/parse/visual/mix-blend-mode.js",
	outputPath: "src/parse/visual/mix-blend-mode.test.ts",
	cases: [
		// Valid cases - standard blend modes
		{ input: "normal", description: "normal blend mode", category: "valid-basic", expectValid: true },
		{ input: "multiply", description: "multiply blend mode", category: "valid-basic", expectValid: true },
		{ input: "screen", description: "screen blend mode", category: "valid-basic", expectValid: true },
		{ input: "overlay", description: "overlay blend mode", category: "valid-basic", expectValid: true },
		{ input: "darken", description: "darken blend mode", category: "valid-basic", expectValid: true },
		{ input: "lighten", description: "lighten blend mode", category: "valid-basic", expectValid: true },
		{ input: "color-dodge", description: "color-dodge blend mode", category: "valid-advanced", expectValid: true },
		{ input: "color-burn", description: "color-burn blend mode", category: "valid-advanced", expectValid: true },
		{ input: "hard-light", description: "hard-light blend mode", category: "valid-advanced", expectValid: true },
		{ input: "soft-light", description: "soft-light blend mode", category: "valid-advanced", expectValid: true },
		{ input: "difference", description: "difference blend mode", category: "valid-advanced", expectValid: true },
		{ input: "exclusion", description: "exclusion blend mode", category: "valid-advanced", expectValid: true },
		{ input: "hue", description: "hue blend mode", category: "valid-color", expectValid: true },
		{ input: "saturation", description: "saturation blend mode", category: "valid-color", expectValid: true },
		{ input: "color", description: "color blend mode", category: "valid-color", expectValid: true },
		{ input: "luminosity", description: "luminosity blend mode", category: "valid-color", expectValid: true },
		
		// Valid cases - case insensitivity
		{ input: "MULTIPLY", description: "uppercase multiply", category: "valid-case", expectValid: true },
		{ input: "Screen", description: "mixed case screen", category: "valid-case", expectValid: true },
		
		// Invalid cases
		{ input: "", description: "empty value", category: "invalid-empty", expectValid: false, expectedError: "Expected single value" },
		{ input: "invalid", description: "invalid keyword", category: "invalid-keyword", expectValid: false, expectedError: "Invalid mix-blend-mode" },
		{ input: "blend", description: "non-standard keyword", category: "invalid-keyword", expectValid: false, expectedError: "Invalid mix-blend-mode" },
		{ input: "0", description: "number value", category: "invalid-type", expectValid: false, expectedError: "Expected keyword identifier" },
		{ input: "1px", description: "dimension value", category: "invalid-type", expectValid: false, expectedError: "Expected keyword identifier" },
		{ input: "multiply, screen", description: "multiple values", category: "invalid-multiple", expectValid: false, expectedError: "Expected single value" },
	],
};
