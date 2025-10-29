// b_path:: scripts/generate-test-generator/configs/flexbox/flex-direction.ts
import type { FlexDirection } from "@/core/types/index.js";

export interface GenerateTestCase {
input: FlexDirection;
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
typeName?: string;
sourceFile: string;
importPath: string;
parseImportPath: string;
outputPath: string;
cases: GenerateTestCase[];
}

export const config: PropertyConfig = {
propertyName: "flex-direction",
typeName: "FlexDirection",
module: "flexbox",
sourceFile: "src/generate/flexbox/flex-direction.ts",
importPath: "../src/generate/flexbox/flex-direction.js",
parseImportPath: "../src/parse/flexbox/flex-direction.js",
outputPath: "src/generate/flexbox/flex-direction.test.ts",
cases: [
{
input: { kind: "flex-direction", value: "row" },
expected: "row",
description: "row keyword",
category: "valid-basic",
roundtrip: true,
expectValid: true
},
{
input: { kind: "flex-direction", value: "row-reverse" },
expected: "row-reverse",
description: "row-reverse keyword",
category: "valid-basic",
roundtrip: true,
expectValid: true
},
{
input: { kind: "flex-direction", value: "column" },
expected: "column",
description: "column keyword",
category: "valid-basic",
roundtrip: true,
expectValid: true
},
{
input: { kind: "flex-direction", value: "column-reverse" },
expected: "column-reverse",
description: "column-reverse keyword",
category: "valid-basic",
roundtrip: true,
expectValid: true
},
{
input: null as any,
expected: "",
description: "null input",
category: "invalid-null",
expectValid: false,
expectedError: "Invalid input"
},
],
};
