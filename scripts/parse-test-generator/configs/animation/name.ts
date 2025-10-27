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
propertyName: "name",
module: "animation",sourceFile: "src/parse/animation/name.ts",
importPath: "../src/parse/animation/name.js",
outputPath: "src/parse/animation/name.test.ts",
cases: [
// Valid: Identifiers
{ input: "slideIn", description: "simple identifier", category: "valid-identifier", expectValid: true },
{ input: "fadeOut", description: "camelCase identifier", category: "valid-identifier", expectValid: true },
{ input: "my-animation", description: "hyphenated identifier", category: "valid-identifier", expectValid: true },
{ input: "_animation", description: "underscore identifier", category: "valid-identifier", expectValid: true },
{ input: "animation123", description: "identifier with numbers", category: "valid-identifier", expectValid: true },

// Valid: None keyword
{ input: "none", description: "none keyword", category: "valid-keyword", expectValid: true },
{ input: "NONE", description: "case insensitive none", category: "valid-keyword", expectValid: true },

// Valid: Lists
{ input: "slideIn, fadeOut", description: "multiple names", category: "valid-list", expectValid: true },
{ input: "none, slideIn", description: "none with identifier", category: "valid-list", expectValid: true },
{ input: "a, b, c", description: "short names", category: "valid-list", expectValid: true },

// Invalid: Numbers/strings
{ input: "1", description: "number", category: "invalid-type", expectValid: false, expectedError: "animation-name: Expected identifier or 'none', got: Number" },
{ input: "1s", description: "time value", category: "invalid-type", expectValid: false, expectedError: "animation-name: Expected identifier or 'none', got: Dimension" },
{ input: "10px", description: "length value", category: "invalid-type", expectValid: false, expectedError: "animation-name: Expected identifier or 'none', got: Dimension" },

// Invalid: Empty/comma
{ input: "", description: "empty value", category: "invalid-empty", expectValid: false, expectedError: "animation-name: Empty value" },
{ input: "slideIn,", description: "trailing comma", category: "invalid-comma", expectValid: false, expectedError: "animation-name: Empty value" },
{ input: ",slideIn", description: "leading comma", category: "invalid-comma", expectValid: false, expectedError: "animation-name: Empty value before comma" },
{ input: "a,,b", description: "double comma", category: "invalid-comma", expectValid: false, expectedError: "animation-name: Empty value before comma" },
],
};
