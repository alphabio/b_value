// b_path:: scripts/parse-test-generator/configs/typography/font-style.ts
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
	propertyName: "font-style",
	module: "typography",
	sourceFile: "src/parse/typography/font-style.ts",
	importPath: "../src/parse/typography/font-style.js",
	outputPath: "src/parse/typography/font-style.test.ts",
	cases: [
		{ input: "normal", description: "normal keyword", category: "valid-basic", expectValid: true },
		{ input: "italic", description: "italic keyword", category: "valid-basic", expectValid: true },
		{ input: "oblique", description: "oblique keyword", category: "valid-basic", expectValid: true },
		{ input: "ITALIC", description: "uppercase italic", category: "valid-case", expectValid: true },
		{ input: "", description: "empty value", category: "invalid-empty", expectValid: false },
		{ input: "bold", description: "invalid keyword", category: "invalid-keyword", expectValid: false },
	],
};
