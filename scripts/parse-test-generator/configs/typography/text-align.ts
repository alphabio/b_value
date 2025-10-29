// b_path:: scripts/parse-test-generator/configs/typography/text-align.ts
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
	propertyName: "text-align",
	module: "typography",
	sourceFile: "src/parse/typography/text-align.ts",
	importPath: "../src/parse/typography/text-align.js",
	outputPath: "src/parse/typography/text-align.test.ts",
	cases: [
		{ input: "left", description: "left keyword", category: "valid-basic", expectValid: true },
		{ input: "right", description: "right keyword", category: "valid-basic", expectValid: true },
		{ input: "center", description: "center keyword", category: "valid-basic", expectValid: true },
		{ input: "justify", description: "justify keyword", category: "valid-basic", expectValid: true },
		{ input: "start", description: "start keyword", category: "valid-logical", expectValid: true },
		{ input: "end", description: "end keyword", category: "valid-logical", expectValid: true },
		{ input: "CENTER", description: "uppercase center", category: "valid-case", expectValid: true },
		{ input: "", description: "empty value", category: "invalid-empty", expectValid: false },
		{ input: "middle", description: "invalid keyword", category: "invalid-keyword", expectValid: false },
		{ input: "0", description: "numeric value", category: "invalid-type", expectValid: false },
		{ input: "10px", description: "dimension value", category: "invalid-type", expectValid: false },
		{ input: "left center", description: "multiple values", category: "invalid-multiple", expectValid: false },
	],
};
