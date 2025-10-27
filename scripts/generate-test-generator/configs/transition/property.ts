/**
 * Test cases for transition-property generator
 * 
 * Tests IR → CSS conversion and roundtrip validation (IR → CSS → IR)
 */

import type { TransitionProperty } from "@/core/types/index.js";

export interface GenerateTestCase {
input: TransitionProperty | any;
expected: string;
description: string;
category: string;
roundtrip?: boolean;
expectValid?: boolean;
expectedError?: string;
}

export interface PropertyConfig {
module: string;
propertyName: string;
sourceFile: string;
importPath: string;
parseImportPath: string;
outputPath: string;
cases: GenerateTestCase[];
}

export const config: PropertyConfig = {
propertyName: "property",
module: "transition",
sourceFile: "src/generate/transition/property.ts",
importPath: "../src/generate/transition/property.js",
parseImportPath: "../src/parse/transition/property.js",
outputPath: "src/generate/transition/property.test.ts",
cases: [
// Valid - keywords
{
input: {
kind: "transition-property",
properties: [{ type: "none" }]
},
expected: "none",
description: "none keyword",
category: "valid-keyword",
roundtrip: true,
expectValid: true
},
{
input: {
kind: "transition-property",
properties: [{ type: "all" }]
},
expected: "all",
description: "all keyword",
category: "valid-keyword",
roundtrip: true,
expectValid: true
},

// Valid - single property
{
input: {
kind: "transition-property",
properties: [{ type: "identifier", value: "opacity" }]
},
expected: "opacity",
description: "single property",
category: "valid-basic",
roundtrip: true,
expectValid: true
},
{
input: {
kind: "transition-property",
properties: [{ type: "identifier", value: "transform" }]
},
expected: "transform",
description: "transform property",
category: "valid-basic",
roundtrip: true,
expectValid: true
},
{
input: {
kind: "transition-property",
properties: [{ type: "identifier", value: "background-color" }]
},
expected: "background-color",
description: "hyphenated property",
category: "valid-basic",
roundtrip: true,
expectValid: true
},

// Valid - multiple properties
{
input: {
kind: "transition-property",
properties: [
{ type: "identifier", value: "opacity" },
{ type: "identifier", value: "transform" }
]
},
expected: "opacity, transform",
description: "multiple properties",
category: "valid-list",
roundtrip: true,
expectValid: true
},
{
input: {
kind: "transition-property",
properties: [
{ type: "identifier", value: "width" },
{ type: "identifier", value: "height" },
{ type: "identifier", value: "opacity" }
]
},
expected: "width, height, opacity",
description: "three properties",
category: "valid-list",
roundtrip: true,
expectValid: true
},

// Valid - custom properties
{
input: {
kind: "transition-property",
properties: [{ type: "identifier", value: "--custom-property" }]
},
expected: "--custom-property",
description: "custom property",
category: "valid-custom",
roundtrip: true,
expectValid: true
},
{
input: {
kind: "transition-property",
properties: [
{ type: "identifier", value: "--my-color" },
{ type: "identifier", value: "--my-size" }
]
},
expected: "--my-color, --my-size",
description: "multiple custom properties",
category: "valid-custom",
roundtrip: true,
expectValid: true
},

// Invalid - null/undefined
{
input: null as any,
expected: "",
description: "null input",
category: "invalid-null",
expectValid: false,
expectedError: "Invalid input: expected object, received null"
},
{
input: undefined as any,
expected: "",
description: "undefined input",
category: "invalid-null",
expectValid: false,
expectedError: "Invalid input: expected object, received undefined"
},

// Invalid - empty array
{
input: {
kind: "transition-property",
properties: []
},
expected: "",
description: "empty properties array",
category: "invalid-empty",
expectValid: false,
expectedError: "Array must contain at least 1 element(s)"
},

// Invalid - wrong type
{
input: {
kind: "transition-property",
properties: [{ type: "invalid" as any }]
},
expected: "",
description: "invalid property type",
category: "invalid-type",
expectValid: false,
expectedError: "Invalid transition property"
},

// Invalid - missing value for identifier
{
input: {
kind: "transition-property",
properties: [{ type: "identifier" as any }]
},
expected: "",
description: "identifier without value",
category: "invalid-missing",
expectValid: false,
expectedError: "Invalid input"
},
]
};
