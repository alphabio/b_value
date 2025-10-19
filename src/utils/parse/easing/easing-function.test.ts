// b_path:: src/utils/parse/easing/easing-function.test.ts
import * as csstree from "css-tree";
import { describe, expect, test } from "vitest";
import { parseEasingFunction } from "./easing-function";

describe("parseEasingFunction", () => {
	describe("keywords", () => {
		test("parses ease", () => {
			const ast = csstree.parse("ease", { context: "value" });
			if (ast.type !== "Value") throw new Error("Expected Value node");
			const node = ast.children.first;
			if (!node) throw new Error("Expected node");
			const result = parseEasingFunction(node);
			expect(result).toEqual({ ok: true, value: "ease" });
		});

		test("parses ease-in", () => {
			const ast = csstree.parse("ease-in", { context: "value" });
			if (ast.type !== "Value") throw new Error("Expected Value node");
			const node = ast.children.first;
			if (!node) throw new Error("Expected node");
			const result = parseEasingFunction(node);
			expect(result).toEqual({ ok: true, value: "ease-in" });
		});

		test("parses linear", () => {
			const ast = csstree.parse("linear", { context: "value" });
			if (ast.type !== "Value") throw new Error("Expected Value node");
			const node = ast.children.first;
			if (!node) throw new Error("Expected node");
			const result = parseEasingFunction(node);
			expect(result).toEqual({ ok: true, value: "linear" });
		});

		test("rejects invalid keyword", () => {
			const ast = csstree.parse("invalid", { context: "value" });
			if (ast.type !== "Value") throw new Error("Expected Value node");
			const node = ast.children.first;
			if (!node) throw new Error("Expected node");
			const result = parseEasingFunction(node);
			expect(result.ok).toBe(false);
		});
	});

	describe("cubic-bezier", () => {
		test("parses cubic-bezier with 4 numbers", () => {
			const ast = csstree.parse("cubic-bezier(0.1, 0.7, 1.0, 0.1)", { context: "value" });
			if (ast.type !== "Value") throw new Error("Expected Value node");
			const node = ast.children.first;
			if (!node) throw new Error("Expected node");
			const result = parseEasingFunction(node);
			expect(result).toEqual({
				ok: true,
				value: {
					type: "cubic-bezier",
					x1: 0.1,
					y1: 0.7,
					x2: 1.0,
					y2: 0.1,
				},
			});
		});

		test("rejects cubic-bezier with wrong number of args", () => {
			const ast = csstree.parse("cubic-bezier(0.1, 0.7)", { context: "value" });
			if (ast.type !== "Value") throw new Error("Expected Value node");
			const node = ast.children.first;
			if (!node) throw new Error("Expected node");
			const result = parseEasingFunction(node);
			expect(result.ok).toBe(false);
		});
	});

	describe("steps", () => {
		test("parses steps with count only", () => {
			const ast = csstree.parse("steps(4)", { context: "value" });
			if (ast.type !== "Value") throw new Error("Expected Value node");
			const node = ast.children.first;
			if (!node) throw new Error("Expected node");
			const result = parseEasingFunction(node);
			expect(result).toEqual({
				ok: true,
				value: {
					type: "steps",
					steps: 4,
					position: undefined,
				},
			});
		});

		test("parses steps with count and position", () => {
			const ast = csstree.parse("steps(4, jump-start)", { context: "value" });
			if (ast.type !== "Value") throw new Error("Expected Value node");
			const node = ast.children.first;
			if (!node) throw new Error("Expected node");
			const result = parseEasingFunction(node);
			expect(result).toEqual({
				ok: true,
				value: {
					type: "steps",
					steps: 4,
					position: "jump-start",
				},
			});
		});

		test("rejects steps with non-integer", () => {
			const ast = csstree.parse("steps(4.5)", { context: "value" });
			if (ast.type !== "Value") throw new Error("Expected Value node");
			const node = ast.children.first;
			if (!node) throw new Error("Expected node");
			const result = parseEasingFunction(node);
			expect(result.ok).toBe(false);
		});

		test("rejects steps with zero", () => {
			const ast = csstree.parse("steps(0)", { context: "value" });
			if (ast.type !== "Value") throw new Error("Expected Value node");
			const node = ast.children.first;
			if (!node) throw new Error("Expected node");
			const result = parseEasingFunction(node);
			expect(result.ok).toBe(false);
		});
	});

	describe("linear function", () => {
		test("parses linear with single stop", () => {
			const ast = csstree.parse("linear(0)", { context: "value" });
			if (ast.type !== "Value") throw new Error("Expected Value node");
			const node = ast.children.first;
			if (!node) throw new Error("Expected node");
			const result = parseEasingFunction(node);
			expect(result).toEqual({
				ok: true,
				value: {
					type: "linear",
					stops: [{ output: 0 }],
				},
			});
		});

		test("parses linear with stop and input", () => {
			const ast = csstree.parse("linear(0 0%, 1 100%)", { context: "value" });
			if (ast.type !== "Value") throw new Error("Expected Value node");
			const node = ast.children.first;
			if (!node) throw new Error("Expected node");
			const result = parseEasingFunction(node);
			expect(result).toEqual({
				ok: true,
				value: {
					type: "linear",
					stops: [
						{ output: 0, input: 0 },
						{ output: 1, input: 1 },
					],
				},
			});
		});

		test("parses linear with multiple stops", () => {
			const ast = csstree.parse("linear(0, 0.5, 1)", { context: "value" });
			if (ast.type !== "Value") throw new Error("Expected Value node");
			const node = ast.children.first;
			if (!node) throw new Error("Expected node");
			const result = parseEasingFunction(node);
			expect(result).toEqual({
				ok: true,
				value: {
					type: "linear",
					stops: [{ output: 0 }, { output: 0.5 }, { output: 1 }],
				},
			});
		});

		test("rejects linear with no stops", () => {
			const ast = csstree.parse("linear()", { context: "value" });
			if (ast.type !== "Value") throw new Error("Expected Value node");
			const node = ast.children.first;
			if (!node) throw new Error("Expected node");
			const result = parseEasingFunction(node);
			expect(result.ok).toBe(false);
		});
	});

	describe("unknown function", () => {
		test("rejects unknown function", () => {
			const ast = csstree.parse("unknown(1, 2, 3)", { context: "value" });
			if (ast.type !== "Value") throw new Error("Expected Value node");
			const node = ast.children.first;
			if (!node) throw new Error("Expected node");
			const result = parseEasingFunction(node);
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Unknown easing function");
			}
		});
	});

	describe("invalid node type", () => {
		test("rejects number node", () => {
			const ast = csstree.parse("42", { context: "value" });
			if (ast.type !== "Value") throw new Error("Expected Value node");
			const node = ast.children.first;
			if (!node) throw new Error("Expected node");
			const result = parseEasingFunction(node);
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Expected easing function or keyword");
			}
		});
	});
});
