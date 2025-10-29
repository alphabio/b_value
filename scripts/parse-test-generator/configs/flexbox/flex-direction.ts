// b_path:: scripts/parse-test-generator/configs/flexbox/flex-direction.ts
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
propertyName: "flex-direction",
module: "flexbox",
sourceFile: "src/parse/flexbox/flex-direction.ts",
importPath: "../src/parse/flexbox/flex-direction.js",
outputPath: "src/parse/flexbox/flex-direction.test.ts",
cases: [
{ input: "row", description: "row keyword", category: "valid-basic", expectValid: true },
{ input: "row-reverse", description: "row-reverse keyword", category: "valid-basic", expectValid: true },
{ input: "column", description: "column keyword", category: "valid-basic", expectValid: true },
{ input: "column-reverse", description: "column-reverse keyword", category: "valid-basic", expectValid: true },
{ input: "ROW", description: "uppercase row", category: "valid-case", expectValid: true },
{ input: "", description: "empty value", category: "invalid-empty", expectValid: false },
{ input: "horizontal", description: "invalid keyword", category: "invalid-keyword", expectValid: false },
{ input: "0", description: "numeric value", category: "invalid-type", expectValid: false },
{ input: "10px", description: "dimension value", category: "invalid-type", expectValid: false },
{ input: "row column", description: "multiple values", category: "invalid-multiple", expectValid: false },
],
};
