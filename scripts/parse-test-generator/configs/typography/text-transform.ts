// b_path:: scripts/parse-test-generator/configs/typography/text-transform.ts
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
	propertyName: "text-transform",
	module: "typography",
	sourceFile: "src/parse/typography/text-transform.ts",
	importPath: "../src/parse/typography/text-transform.js",
	outputPath: "src/parse/typography/text-transform.test.ts",
	cases: [
		{ input: "none", description: "none keyword", category: "valid-basic", expectValid: true },
		{ input: "capitalize", description: "capitalize keyword", category: "valid-basic", expectValid: true },
		{ input: "uppercase", description: "uppercase keyword", category: "valid-basic", expectValid: true },
		{ input: "lowercase", description: "lowercase keyword", category: "valid-basic", expectValid: true },
		{ input: "UPPERCASE", description: "uppercase uppercase", category: "valid-case", expectValid: true },
		{ input: "", description: "empty value", category: "invalid-empty", expectValid: false },
		{ input: "title-case", description: "invalid keyword", category: "invalid-keyword", expectValid: false },
	],
};
