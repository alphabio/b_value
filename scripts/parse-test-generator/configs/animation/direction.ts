/**
 * Test cases for animation-direction parser
 */

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
propertyName: "direction",
module: "animation",sourceFile: "src/parse/animation/direction.ts",
importPath: "../src/parse/animation/direction.js",
outputPath: "src/parse/animation/direction.test.ts",
cases: [
// Valid: Keywords
{ input: "normal", description: "normal keyword", category: "valid-keyword", expectValid: true },
{ input: "reverse", description: "reverse keyword", category: "valid-keyword", expectValid: true },
{ input: "alternate", description: "alternate keyword", category: "valid-keyword", expectValid: true },
{ input: "alternate-reverse", description: "alternate-reverse keyword", category: "valid-keyword", expectValid: true },
{ input: "NORMAL", description: "case insensitive", category: "valid-keyword", expectValid: true },
{ input: "Alternate", description: "mixed case", category: "valid-keyword", expectValid: true },

// Valid: Lists
{ input: "normal, reverse", description: "multiple keywords", category: "valid-list", expectValid: true },
{ input: "alternate, normal, reverse", description: "three keywords", category: "valid-list", expectValid: true },
{ input: "normal , reverse", description: "list with whitespace", category: "valid-list", expectValid: true },

// Invalid: Wrong keywords
{ input: "invalid", description: "invalid keyword", category: "invalid-keyword", expectValid: false, expectedError: "animation-direction: Invalid animation-direction keyword: invalid. Expected one of: normal, reverse, alternate, alternate-reverse" },
{ input: "forwards", description: "wrong keyword", category: "invalid-keyword", expectValid: false, expectedError: "animation-direction: Invalid animation-direction keyword: forwards. Expected one of: normal, reverse, alternate, alternate-reverse" },
{ input: "backwards", description: "another wrong keyword", category: "invalid-keyword", expectValid: false, expectedError: "animation-direction: Invalid animation-direction keyword: backwards. Expected one of: normal, reverse, alternate, alternate-reverse" },

// Invalid: Numbers/units
{ input: "1", description: "number", category: "invalid-type", expectValid: false, expectedError: "animation-direction: Expected direction keyword, got: Number" },
{ input: "1s", description: "time value", category: "invalid-type", expectValid: false, expectedError: "animation-direction: Expected direction keyword, got: Dimension" },

// Invalid: Empty/comma
{ input: "", description: "empty value", category: "invalid-empty", expectValid: false, expectedError: "animation-direction: Empty value" },
{ input: "normal,", description: "trailing comma", category: "invalid-comma", expectValid: false, expectedError: "animation-direction: Empty value" },
{ input: ",normal", description: "leading comma", category: "invalid-comma", expectValid: false, expectedError: "animation-direction: Empty value before comma" },
{ input: "normal,,reverse", description: "double comma", category: "invalid-comma", expectValid: false, expectedError: "animation-direction: Empty value before comma" },
],
};
