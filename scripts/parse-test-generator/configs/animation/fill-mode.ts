export interface TestCase {
input: string;
description: string;
category: string;
expectValid?: boolean;
expectedError?: string;
}

export interface PropertyConfig {
module: string;propertyName: string;
sourceFile: string;
importPath: string;
outputPath: string;
cases: TestCase[];
}

export const config: PropertyConfig = {
propertyName: "fill-mode",
module: "animation",sourceFile: "src/parse/animation/fill-mode.ts",
importPath: "../src/parse/animation/fill-mode.js",
outputPath: "src/parse/animation/fill-mode.test.ts",
cases: [
// Valid: Keywords
{ input: "none", description: "none keyword", category: "valid-keyword", expectValid: true },
{ input: "forwards", description: "forwards keyword", category: "valid-keyword", expectValid: true },
{ input: "backwards", description: "backwards keyword", category: "valid-keyword", expectValid: true },
{ input: "both", description: "both keyword", category: "valid-keyword", expectValid: true },
{ input: "NONE", description: "case insensitive", category: "valid-keyword", expectValid: true },

// Valid: Lists
{ input: "none, forwards", description: "multiple keywords", category: "valid-list", expectValid: true },
{ input: "forwards, backwards, both", description: "three keywords", category: "valid-list", expectValid: true },

// Invalid
{ input: "invalid", description: "invalid keyword", category: "invalid-keyword", expectValid: false, expectedError: "animation-fill-mode: Invalid animation-fill-mode keyword: invalid. Expected one of: none, forwards, backwards, both" },
{ input: "normal", description: "wrong keyword", category: "invalid-keyword", expectValid: false, expectedError: "animation-fill-mode: Invalid animation-fill-mode keyword: normal. Expected one of: none, forwards, backwards, both" },
{ input: "1", description: "number", category: "invalid-type", expectValid: false, expectedError: "animation-fill-mode: Expected fill mode keyword, got: Number" },
{ input: "", description: "empty value", category: "invalid-empty", expectValid: false, expectedError: "animation-fill-mode: Empty value" },
{ input: "none,", description: "trailing comma", category: "invalid-comma", expectValid: false, expectedError: "animation-fill-mode: Empty value" },
],
};
