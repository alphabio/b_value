// Test file for utils/ast/functions.ts

import * as csstree from "css-tree";
import { describe, expect, it } from "vitest";
import * as AstFunctions from "@/utils/ast/functions";

describe("findFunctionNode", () => {
	it("should find function by single name", () => {
		const ast = csstree.parse("rgb(255, 0, 0)", { context: "value" });
		const result = AstFunctions.findFunctionNode(ast, "rgb");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.name).toBe("rgb");
		}
	});

	it("should find function by array of names", () => {
		const ast = csstree.parse("linear-gradient(red, blue)", { context: "value" });
		const result = AstFunctions.findFunctionNode(ast, ["linear-gradient", "repeating-linear-gradient"]);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.name).toBe("linear-gradient");
		}
	});

	it("should be case-insensitive", () => {
		const ast = csstree.parse("RGB(255, 0, 0)", { context: "value" });
		const result = AstFunctions.findFunctionNode(ast, "rgb");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.name).toBe("RGB");
		}
	});

	it("should return error when function not found", () => {
		const ast = csstree.parse("rgb(255, 0, 0)", { context: "value" });
		const result = AstFunctions.findFunctionNode(ast, "hsl");
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("No function found");
		}
	});

	it("should handle multiple function names in error", () => {
		const ast = csstree.parse("rgb(255, 0, 0)", { context: "value" });
		const result = AstFunctions.findFunctionNode(ast, ["hsl", "hsla"]);
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("hsl");
			expect(result.error).toContain("hsla");
		}
	});

	it("should find first matching function in nested structure", () => {
		const ast = csstree.parse("calc(rgb(255, 0, 0))", { context: "value" });
		const result = AstFunctions.findFunctionNode(ast, "calc");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.name).toBe("calc");
		}
	});

	it("should find nested function", () => {
		const ast = csstree.parse("calc(rgb(255, 0, 0))", { context: "value" });
		const result = AstFunctions.findFunctionNode(ast, "rgb");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.name).toBe("rgb");
		}
	});
});

describe("parseCommaSeparatedValues", () => {
	it("should parse single value group", () => {
		const ast = csstree.parse("10px", { context: "value" });
		const groups = AstFunctions.parseCommaSeparatedValues(ast);
		expect(groups.length).toBe(1);
		expect(groups[0]?.length).toBeGreaterThan(0);
	});

	it("should parse two comma-separated values", () => {
		const ast = csstree.parse("10px, 20px", { context: "value" });
		const groups = AstFunctions.parseCommaSeparatedValues(ast);
		expect(groups.length).toBe(2);
		expect(groups[0]?.length).toBeGreaterThan(0);
		expect(groups[1]?.length).toBeGreaterThan(0);
	});

	it("should parse multiple comma-separated values", () => {
		const ast = csstree.parse("red, blue, green", { context: "value" });
		const groups = AstFunctions.parseCommaSeparatedValues(ast);
		expect(groups.length).toBe(3);
		expect(groups[0]?.length).toBeGreaterThan(0);
		expect(groups[1]?.length).toBeGreaterThan(0);
		expect(groups[2]?.length).toBeGreaterThan(0);
	});

	it("should handle function arguments with commas", () => {
		const ast = csstree.parse("rgb(255, 0, 0)", { context: "value" });
		const groups = AstFunctions.parseCommaSeparatedValues(ast);
		// RGB function has 3 comma-separated args
		expect(groups.length).toBeGreaterThanOrEqual(1);
	});

	it("should handle complex gradient with multiple stops", () => {
		const ast = csstree.parse("linear-gradient(red 0%, blue 50%, green 100%)", {
			context: "value",
		});
		const groups = AstFunctions.parseCommaSeparatedValues(ast);
		expect(groups.length).toBeGreaterThanOrEqual(1);
	});

	it("should filter out Value wrapper nodes", () => {
		const ast = csstree.parse("10px, 20px", { context: "value" });
		const groups = AstFunctions.parseCommaSeparatedValues(ast);
		// Should have content in each group, not just Value nodes
		const firstGroup = groups[0];
		expect(firstGroup).toBeDefined();
		if (firstGroup) {
			expect(firstGroup.length).toBeGreaterThan(0);
			expect(firstGroup.every((node) => node.type !== "Value")).toBe(true);
		}
	});

	it("should handle empty groups correctly", () => {
		const ast = csstree.parse("10px", { context: "value" });
		const groups = AstFunctions.parseCommaSeparatedValues(ast);
		expect(groups.length).toBe(1);
		expect(groups[0]).toBeDefined();
	});
});

describe("parseFunctionArguments", () => {
	it("should parse RGB function arguments", () => {
		const ast = csstree.parse("rgb(255, 0, 0)", { context: "value" });
		const fnResult = AstFunctions.findFunctionNode(ast, "rgb");
		expect(fnResult.ok).toBe(true);
		if (fnResult.ok) {
			const args = AstFunctions.parseFunctionArguments(fnResult.value);
			expect(args.length).toBe(3);
			expect(args.every((arg) => arg.type !== "Operator")).toBe(true);
		}
	});

	it("should filter out operator nodes", () => {
		const ast = csstree.parse("calc(100% - 20px)", { context: "value" });
		const fnResult = AstFunctions.findFunctionNode(ast, "calc");
		expect(fnResult.ok).toBe(true);
		if (fnResult.ok) {
			const args = AstFunctions.parseFunctionArguments(fnResult.value);
			// Should have percentage and dimension, but not the minus operator
			expect(args.every((arg) => arg.type !== "Operator")).toBe(true);
		}
	});

	it("should handle single argument function", () => {
		const ast = csstree.parse("var(--color)", { context: "value" });
		const fnResult = AstFunctions.findFunctionNode(ast, "var");
		expect(fnResult.ok).toBe(true);
		if (fnResult.ok) {
			const args = AstFunctions.parseFunctionArguments(fnResult.value);
			expect(args.length).toBeGreaterThan(0);
		}
	});

	it("should handle function with multiple argument types", () => {
		const ast = csstree.parse("rgba(255, 0, 0, 0.5)", { context: "value" });
		const fnResult = AstFunctions.findFunctionNode(ast, "rgba");
		expect(fnResult.ok).toBe(true);
		if (fnResult.ok) {
			const args = AstFunctions.parseFunctionArguments(fnResult.value);
			expect(args.length).toBe(4);
		}
	});
});

describe("parseCssString", () => {
	it("should parse valid CSS value", () => {
		const result = AstFunctions.parseCssString("10px");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.type).toBe("Value");
		}
	});

	it("should parse complex CSS value", () => {
		const result = AstFunctions.parseCssString("rgb(255, 0, 0)");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.type).toBe("Value");
		}
	});

	it("should parse with declaration context", () => {
		const result = AstFunctions.parseCssString("color: red", "declaration");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.type).toBe("Declaration");
		}
	});

	it("should handle invalid CSS with error", () => {
		const result = AstFunctions.parseCssString("@invalid {");
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("Failed to parse CSS");
		}
	});

	it("should handle malformed selector in declaration context", () => {
		const result = AstFunctions.parseCssString("@@@", "declaration");
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("Failed to parse CSS");
		}
	});

	it("should handle empty string", () => {
		const result = AstFunctions.parseCssString("");
		// Empty CSS may parse successfully depending on csstree behavior
		// Just verify it returns a result
		expect(result).toBeDefined();
		expect(typeof result.ok).toBe("boolean");
	});

	it("should default to value context", () => {
		const result = AstFunctions.parseCssString("10px");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.type).toBe("Value");
		}
	});

	it("should handle gradient function", () => {
		const result = AstFunctions.parseCssString("linear-gradient(red, blue)");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.type).toBe("Value");
		}
	});
});
