// b_path:: scripts/parse-test-generator/configs/flexbox/align-items.ts
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
	propertyName: "align-items",
	module: "flexbox",
	sourceFile: "src/parse/flexbox/align-items.ts",
	importPath: "../src/parse/flexbox/align-items.js",
	outputPath: "src/parse/flexbox/align-items.test.ts",
	cases: [
		{ input: "flex-start", description: "flex-start keyword", category: "valid-basic", expectValid: true },
		{ input: "flex-end", description: "flex-end keyword", category: "valid-basic", expectValid: true },
		{ input: "center", description: "center keyword", category: "valid-basic", expectValid: true },
		{ input: "baseline", description: "baseline keyword", category: "valid-basic", expectValid: true },
		{ input: "stretch", description: "stretch keyword", category: "valid-basic", expectValid: true },
		{ input: "start", description: "start keyword", category: "valid-logical", expectValid: true },
		{ input: "end", description: "end keyword", category: "valid-logical", expectValid: true },
		{ input: "CENTER", description: "uppercase center", category: "valid-case", expectValid: true },
		{ input: "", description: "empty value", category: "invalid-empty", expectValid: false },
		{ input: "middle", description: "invalid keyword", category: "invalid-keyword", expectValid: false },
	],
};
