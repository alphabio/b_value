/**
 * Test cases for transition-property parser
 * 
 * Tests CSS → IR conversion
 */

import type { TransitionProperty } from "@/core/types/index.js";

export interface ParseTestCase {
input: string;
expected: TransitionProperty;
description: string;
category: string;
}

export interface PropertyConfig {
module: string;
propertyName: string;
sourceFile: string;
importPath: string;
outputPath: string;
cases: ParseTestCase[];
}

export const config: PropertyConfig = {
propertyName: "property",
module: "transition",
sourceFile: "src/parse/transition/property.ts",
importPath: "../src/parse/transition/property.js",
outputPath: "src/parse/transition/property.test.ts",
cases: [
// Valid - keywords
{
input: "none",
expected: {
kind: "transition-property",
properties: [{ type: "none" }]
},
description: "none keyword",
category: "valid-keyword"
},
{
input: "all",
expected: {
kind: "transition-property",
properties: [{ type: "all" }]
},
description: "all keyword",
category: "valid-keyword"
},
{
input: "NONE",
expected: {
kind: "transition-property",
properties: [{ type: "none" }]
},
description: "none keyword (uppercase)",
category: "valid-keyword"
},
{
input: "ALL",
expected: {
kind: "transition-property",
properties: [{ type: "all" }]
},
description: "all keyword (uppercase)",
category: "valid-keyword"
},

// Valid - single property
{
input: "opacity",
expected: {
kind: "transition-property",
properties: [{ type: "identifier", value: "opacity" }]
},
description: "single property",
category: "valid-basic"
},
{
input: "transform",
expected: {
kind: "transition-property",
properties: [{ type: "identifier", value: "transform" }]
},
description: "single property (transform)",
category: "valid-basic"
},
{
input: "background-color",
expected: {
kind: "transition-property",
properties: [{ type: "identifier", value: "background-color" }]
},
description: "hyphenated property name",
category: "valid-basic"
},
{
input: "OPACITY",
expected: {
kind: "transition-property",
properties: [{ type: "identifier", value: "OPACITY" }]
},
description: "property name (uppercase)",
category: "valid-basic"
},

// Valid - multiple properties
{
input: "opacity, transform",
expected: {
kind: "transition-property",
properties: [
{ type: "identifier", value: "opacity" },
{ type: "identifier", value: "transform" }
]
},
description: "multiple properties",
category: "valid-list"
},
{
input: "opacity, transform, background-color",
expected: {
kind: "transition-property",
properties: [
{ type: "identifier", value: "opacity" },
{ type: "identifier", value: "transform" },
{ type: "identifier", value: "background-color" }
]
},
description: "three properties",
category: "valid-list"
},
{
input: "width,height,opacity",
expected: {
kind: "transition-property",
properties: [
{ type: "identifier", value: "width" },
{ type: "identifier", value: "height" },
{ type: "identifier", value: "opacity" }
]
},
description: "multiple properties (no spaces)",
category: "valid-list"
},
{
input: "opacity,  transform,   background-color",
expected: {
kind: "transition-property",
properties: [
{ type: "identifier", value: "opacity" },
{ type: "identifier", value: "transform" },
{ type: "identifier", value: "background-color" }
]
},
description: "multiple properties (extra spaces)",
category: "valid-list"
},

// Valid - custom properties
{
input: "--custom-property",
expected: {
kind: "transition-property",
properties: [{ type: "identifier", value: "--custom-property" }]
},
description: "custom property",
category: "valid-custom"
},
{
input: "--my-color, --my-size",
expected: {
kind: "transition-property",
properties: [
{ type: "identifier", value: "--my-color" },
{ type: "identifier", value: "--my-size" }
]
},
description: "multiple custom properties",
category: "valid-custom"
},
]
};
