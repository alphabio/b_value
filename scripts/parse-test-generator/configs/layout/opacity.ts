// b_path:: scripts/parse-test-generator/configs/layout/opacity.ts
/**
 * Test cases for opacity parser
 */

export interface TestCase {
	input: string;
	description: string;
	category: string;
	expectValid?: boolean; // Expected behavior (for issue detection)
	expectedError?: string; // Expected error message (for invalid cases)
}

export interface PropertyConfig {
	module: string;
	propertyName: string;
	sourceFile: string; // Path to source file (for spec ref validation)
	importPath: string; // Path for dynamic import
	outputPath: string; // Where to generate test file
	cases: TestCase[];
}

export const config: PropertyConfig = {
	propertyName: "opacity",
	module: "layout",
	sourceFile: "src/parse/layout/opacity.ts",
	importPath: "../src/parse/layout/opacity.js",
	outputPath: "src/parse/layout/opacity.parse.test.ts",
	cases: [
		// Valid cases - number values
		{ input: "0", description: "fully transparent", category: "valid-basic", expectValid: true },
		{ input: "1", description: "fully opaque", category: "valid-basic", expectValid: true },
		{ input: "0.5", description: "50% transparent", category: "valid-basic", expectValid: true },
		{ input: "0.25", description: "25% transparent", category: "valid-decimal", expectValid: true },
		{ input: "0.75", description: "75% transparent", category: "valid-decimal", expectValid: true },
		{ input: ".5", description: "decimal without leading zero", category: "valid-decimal", expectValid: true },
		
		// Valid cases - percentage values
		{ input: "0%", description: "0% opacity", category: "valid-percentage", expectValid: true },
		{ input: "100%", description: "100% opacity", category: "valid-percentage", expectValid: true },
		{ input: "50%", description: "50% opacity", category: "valid-percentage", expectValid: true },
		{ input: "25.5%", description: "decimal percentage", category: "valid-percentage", expectValid: true },
		
		// Valid cases - edge values (clamping)
		{ input: "-1", description: "negative clamped to 0", category: "valid-clamp", expectValid: true },
		{ input: "2", description: "greater than 1 clamped to 1", category: "valid-clamp", expectValid: true },
		{ input: "150%", description: "percentage over 100 clamped", category: "valid-clamp", expectValid: true },
		{ input: "-50%", description: "negative percentage clamped", category: "valid-clamp", expectValid: true },
		
		// Invalid cases
		{ input: "", description: "empty value", category: "invalid-empty", expectValid: false, expectedError: "Expected opacity value" },
		{ input: "1px", description: "invalid unit", category: "invalid-unit", expectValid: false, expectedError: "Expected number or percentage" },
		{ input: "1em", description: "wrong unit type", category: "invalid-unit", expectValid: false, expectedError: "Expected number or percentage" },
		{ input: "auto", description: "invalid keyword", category: "invalid-keyword", expectValid: false, expectedError: "Expected number or percentage" },
		{ input: "none", description: "wrong keyword", category: "invalid-keyword", expectValid: false, expectedError: "Expected number or percentage" },
		{ input: "0.5, 1", description: "multiple values", category: "invalid-multiple", expectValid: false, expectedError: "Expected single value" },
	],
};
