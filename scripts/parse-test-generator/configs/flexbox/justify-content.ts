// b_path:: scripts/parse-test-generator/configs/flexbox/justify-content.ts
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
	propertyName: "justify-content",
	module: "flexbox",
	sourceFile: "src/parse/flexbox/justify-content.ts",
	importPath: "../src/parse/flexbox/justify-content.js",
	outputPath: "src/parse/flexbox/justify-content.test.ts",
	cases: [
		{ input: "flex-start", description: "flex-start keyword", category: "valid-basic", expectValid: true },
		{ input: "flex-end", description: "flex-end keyword", category: "valid-basic", expectValid: true },
		{ input: "center", description: "center keyword", category: "valid-basic", expectValid: true },
		{ input: "space-between", description: "space-between keyword", category: "valid-basic", expectValid: true },
		{ input: "space-around", description: "space-around keyword", category: "valid-basic", expectValid: true },
		{ input: "space-evenly", description: "space-evenly keyword", category: "valid-basic", expectValid: true },
		{ input: "start", description: "start keyword", category: "valid-logical", expectValid: true },
		{ input: "end", description: "end keyword", category: "valid-logical", expectValid: true },
		{ input: "CENTER", description: "uppercase center", category: "valid-case", expectValid: true },
		{ input: "", description: "empty value", category: "invalid-empty", expectValid: false },
		{ input: "middle", description: "invalid keyword", category: "invalid-keyword", expectValid: false },
		{ input: "0", description: "numeric value", category: "invalid-type", expectValid: false },
		{ input: "10px", description: "dimension value", category: "invalid-type", expectValid: false },
		{ input: "center flex-start", description: "multiple values", category: "invalid-multiple", expectValid: false },
	],
};
