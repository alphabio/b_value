// b_path:: scripts/parse-test-generator/configs/layout/cursor.ts
/**
 * Test cases for cursor parser
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
	propertyName: "cursor",
	module: "layout",
	sourceFile: "src/parse/layout/cursor.ts",
	importPath: "../src/parse/layout/cursor.js",
	outputPath: "src/parse/layout/cursor.test.ts",
	cases: [
		// Valid cases - common cursors
		{ input: "auto", description: "auto keyword", category: "valid-basic", expectValid: true },
		{ input: "default", description: "default keyword", category: "valid-basic", expectValid: true },
		{ input: "pointer", description: "pointer keyword", category: "valid-basic", expectValid: true },
		{ input: "text", description: "text keyword", category: "valid-basic", expectValid: true },
		{ input: "move", description: "move keyword", category: "valid-basic", expectValid: true },
		{ input: "wait", description: "wait keyword", category: "valid-basic", expectValid: true },
		{ input: "help", description: "help keyword", category: "valid-basic", expectValid: true },
		{ input: "none", description: "none keyword", category: "valid-basic", expectValid: true },

		// Valid cases - resize cursors
		{ input: "n-resize", description: "n-resize keyword", category: "valid-resize", expectValid: true },
		{ input: "e-resize", description: "e-resize keyword", category: "valid-resize", expectValid: true },
		{ input: "s-resize", description: "s-resize keyword", category: "valid-resize", expectValid: true },
		{ input: "w-resize", description: "w-resize keyword", category: "valid-resize", expectValid: true },
		{ input: "ne-resize", description: "ne-resize keyword", category: "valid-resize", expectValid: true },
		{ input: "nw-resize", description: "nw-resize keyword", category: "valid-resize", expectValid: true },
		{ input: "se-resize", description: "se-resize keyword", category: "valid-resize", expectValid: true },
		{ input: "sw-resize", description: "sw-resize keyword", category: "valid-resize", expectValid: true },
		{ input: "ew-resize", description: "ew-resize keyword", category: "valid-resize", expectValid: true },
		{ input: "ns-resize", description: "ns-resize keyword", category: "valid-resize", expectValid: true },

		// Valid cases - other
		{ input: "grab", description: "grab keyword", category: "valid-action", expectValid: true },
		{ input: "grabbing", description: "grabbing keyword", category: "valid-action", expectValid: true },
		{ input: "not-allowed", description: "not-allowed keyword", category: "valid-action", expectValid: true },
		{ input: "zoom-in", description: "zoom-in keyword", category: "valid-action", expectValid: true },
		{ input: "zoom-out", description: "zoom-out keyword", category: "valid-action", expectValid: true },

		// Valid cases - case insensitivity
		{ input: "POINTER", description: "uppercase pointer", category: "valid-case", expectValid: true },
		{ input: "Move", description: "mixed case move", category: "valid-case", expectValid: true },

		// Invalid cases
		{ input: "", description: "empty value", category: "invalid-empty", expectValid: false },
		{ input: "invalid", description: "invalid keyword", category: "invalid-keyword", expectValid: false },
		{ input: "hand", description: "non-standard keyword", category: "invalid-keyword", expectValid: false },
		{ input: "0", description: "number value", category: "invalid-type", expectValid: false },
	],
};
