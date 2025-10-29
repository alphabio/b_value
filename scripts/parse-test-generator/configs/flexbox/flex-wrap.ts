// b_path:: scripts/parse-test-generator/configs/flexbox/flex-wrap.ts
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
	propertyName: "flex-wrap",
	module: "flexbox",
	sourceFile: "src/parse/flexbox/flex-wrap.ts",
	importPath: "../src/parse/flexbox/flex-wrap.js",
	outputPath: "src/parse/flexbox/flex-wrap.test.ts",
	cases: [
		{ input: "nowrap", description: "nowrap keyword", category: "valid-basic", expectValid: true },
		{ input: "wrap", description: "wrap keyword", category: "valid-basic", expectValid: true },
		{ input: "wrap-reverse", description: "wrap-reverse keyword", category: "valid-basic", expectValid: true },
		{ input: "WRAP", description: "uppercase wrap", category: "valid-case", expectValid: true },
		{ input: "", description: "empty value", category: "invalid-empty", expectValid: false },
		{ input: "none", description: "invalid keyword", category: "invalid-keyword", expectValid: false },
	],
};
