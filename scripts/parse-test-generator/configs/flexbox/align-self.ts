// b_path:: scripts/parse-test-generator/configs/flexbox/align-self.ts
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
	propertyName: "align-self",
	module: "flexbox",
	sourceFile: "src/parse/flexbox/align-self.ts",
	importPath: "../src/parse/flexbox/align-self.js",
	outputPath: "src/parse/flexbox/align-self.test.ts",
	cases: [
		{ input: "auto", description: "auto keyword", category: "valid-basic", expectValid: true },
		{ input: "flex-start", description: "flex-start keyword", category: "valid-basic", expectValid: true },
		{ input: "flex-end", description: "flex-end keyword", category: "valid-basic", expectValid: true },
		{ input: "center", description: "center keyword", category: "valid-basic", expectValid: true },
		{ input: "baseline", description: "baseline keyword", category: "valid-basic", expectValid: true },
		{ input: "stretch", description: "stretch keyword", category: "valid-basic", expectValid: true },
		{ input: "CENTER", description: "uppercase center", category: "valid-case", expectValid: true },
		{ input: "", description: "empty value", category: "invalid-empty", expectValid: false },
		{ input: "0", description: "numeric value", category: "invalid-type", expectValid: false },
		{ input: "10px", description: "dimension value", category: "invalid-type", expectValid: false },
		{ input: "center stretch", description: "multiple values", category: "invalid-multiple", expectValid: false },
	],
};
