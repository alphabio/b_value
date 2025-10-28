// b_path:: scripts/parse-test-generator/configs/animation/play-state.ts
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
propertyName: "play-state",
module: "animation",sourceFile: "src/parse/animation/play-state.ts",
importPath: "../src/parse/animation/play-state.js",
outputPath: "src/parse/animation/play-state.test.ts",
cases: [
// Valid: Keywords
{ input: "running", description: "running keyword", category: "valid-keyword", expectValid: true },
{ input: "paused", description: "paused keyword", category: "valid-keyword", expectValid: true },
{ input: "RUNNING", description: "case insensitive", category: "valid-keyword", expectValid: true },
{ input: "Paused", description: "mixed case", category: "valid-keyword", expectValid: true },

// Valid: Lists
{ input: "running, paused", description: "multiple keywords", category: "valid-list", expectValid: true },
{ input: "paused, running, paused", description: "three keywords", category: "valid-list", expectValid: true },

// Invalid
{ input: "invalid", description: "invalid keyword", category: "invalid-keyword", expectValid: false, expectedError: "animation-play-state: Invalid animation-play-state keyword: invalid. Expected one of: running, paused" },
{ input: "stopped", description: "wrong keyword", category: "invalid-keyword", expectValid: false, expectedError: "animation-play-state: Invalid animation-play-state keyword: stopped. Expected one of: running, paused" },
{ input: "1", description: "number", category: "invalid-type", expectValid: false, expectedError: "animation-play-state: Expected play state keyword, got: Number" },
{ input: "", description: "empty value", category: "invalid-empty", expectValid: false, expectedError: "animation-play-state: Empty value" },
{ input: "running,", description: "trailing comma", category: "invalid-comma", expectValid: false, expectedError: "animation-play-state: Empty value" },
],
};
