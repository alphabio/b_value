// b_path:: src/utils/parse/nodes.test.ts

import * as csstree from "css-tree";
import { describe, expect, it } from "vitest";
import { parseCornerValues, parseTRBLLengthPercentage } from "./nodes";

/**
 * Helper to create CSS nodes from a string
 */
function parseNodes(css: string): csstree.CssNode[] {
	const ast = csstree.parse(css, { context: "value" });
	const nodes: csstree.CssNode[] = [];
	csstree.walk(ast, (node) => {
		if (node.type === "Dimension" || node.type === "Percentage" || node.type === "Number") {
			nodes.push(node);
		}
	});
	return nodes;
}

describe("parseTRBLLengthPercentage", () => {
	describe("valid inputs", () => {
		it("should parse single value (all sides)", () => {
			const nodes = parseNodes("10px");
			const result = parseTRBLLengthPercentage(nodes);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.top).toEqual({ value: 10, unit: "px" });
				expect(result.value.right).toEqual({ value: 10, unit: "px" });
				expect(result.value.bottom).toEqual({ value: 10, unit: "px" });
				expect(result.value.left).toEqual({ value: 10, unit: "px" });
			}
		});

		it("should parse two values (vertical | horizontal)", () => {
			const nodes = parseNodes("10px 20px");
			const result = parseTRBLLengthPercentage(nodes);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.top).toEqual({ value: 10, unit: "px" });
				expect(result.value.right).toEqual({ value: 20, unit: "px" });
				expect(result.value.bottom).toEqual({ value: 10, unit: "px" });
				expect(result.value.left).toEqual({ value: 20, unit: "px" });
			}
		});

		it("should parse three values (top | horizontal | bottom)", () => {
			const nodes = parseNodes("10px 20px 30px");
			const result = parseTRBLLengthPercentage(nodes);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.top).toEqual({ value: 10, unit: "px" });
				expect(result.value.right).toEqual({ value: 20, unit: "px" });
				expect(result.value.bottom).toEqual({ value: 30, unit: "px" });
				expect(result.value.left).toEqual({ value: 20, unit: "px" });
			}
		});

		it("should parse four values (TRBL)", () => {
			const nodes = parseNodes("10px 20px 30px 40px");
			const result = parseTRBLLengthPercentage(nodes);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.top).toEqual({ value: 10, unit: "px" });
				expect(result.value.right).toEqual({ value: 20, unit: "px" });
				expect(result.value.bottom).toEqual({ value: 30, unit: "px" });
				expect(result.value.left).toEqual({ value: 40, unit: "px" });
			}
		});

		it("should handle mixed units", () => {
			const nodes = parseNodes("10px 50% 2em 0");
			const result = parseTRBLLengthPercentage(nodes);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.top).toEqual({ value: 10, unit: "px" });
				expect(result.value.right).toEqual({ value: 50, unit: "%" });
				expect(result.value.bottom).toEqual({ value: 2, unit: "em" });
				expect(result.value.left).toEqual({ value: 0, unit: "px" });
			}
		});

		it("should handle unitless zero", () => {
			const nodes = parseNodes("0 10px");
			const result = parseTRBLLengthPercentage(nodes);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.top).toEqual({ value: 0, unit: "px" });
				expect(result.value.right).toEqual({ value: 10, unit: "px" });
			}
		});
	});

	describe("invalid inputs", () => {
		it("should reject empty array", () => {
			const result = parseTRBLLengthPercentage([]);

			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Expected 1-4");
			}
		});

		it("should reject more than 4 values", () => {
			const nodes = parseNodes("1px 2px 3px 4px 5px");
			const result = parseTRBLLengthPercentage(nodes);

			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Expected 1-4");
			}
		});

		it("should reject unitless non-zero", () => {
			const ast = csstree.parse("10 20px", { context: "value" });
			const nodes: csstree.CssNode[] = [];
			csstree.walk(ast, (node) => {
				if (node.type === "Number" || node.type === "Dimension") {
					nodes.push(node);
				}
			});

			const result = parseTRBLLengthPercentage(nodes);

			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Unitless values must be zero");
			}
		});
	});
});

describe("parseCornerValues", () => {
	describe("valid inputs", () => {
		it("should parse single value (all corners)", () => {
			const nodes = parseNodes("5px");
			const result = parseCornerValues(nodes);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.topLeft).toEqual({ value: 5, unit: "px" });
				expect(result.value.topRight).toEqual({ value: 5, unit: "px" });
				expect(result.value.bottomRight).toEqual({ value: 5, unit: "px" });
				expect(result.value.bottomLeft).toEqual({ value: 5, unit: "px" });
			}
		});

		it("should parse two values (diagonal corners)", () => {
			const nodes = parseNodes("5px 10px");
			const result = parseCornerValues(nodes);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.topLeft).toEqual({ value: 5, unit: "px" });
				expect(result.value.topRight).toEqual({ value: 10, unit: "px" });
				expect(result.value.bottomRight).toEqual({ value: 5, unit: "px" });
				expect(result.value.bottomLeft).toEqual({ value: 10, unit: "px" });
			}
		});

		it("should parse three values", () => {
			const nodes = parseNodes("5px 10px 15px");
			const result = parseCornerValues(nodes);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.topLeft).toEqual({ value: 5, unit: "px" });
				expect(result.value.topRight).toEqual({ value: 10, unit: "px" });
				expect(result.value.bottomRight).toEqual({ value: 15, unit: "px" });
				expect(result.value.bottomLeft).toEqual({ value: 10, unit: "px" });
			}
		});

		it("should parse four values (all corners)", () => {
			const nodes = parseNodes("5px 10px 15px 20px");
			const result = parseCornerValues(nodes);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.topLeft).toEqual({ value: 5, unit: "px" });
				expect(result.value.topRight).toEqual({ value: 10, unit: "px" });
				expect(result.value.bottomRight).toEqual({ value: 15, unit: "px" });
				expect(result.value.bottomLeft).toEqual({ value: 20, unit: "px" });
			}
		});

		it("should handle unitless zero", () => {
			const nodes = parseNodes("0");
			const result = parseCornerValues(nodes);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.topLeft).toEqual({ value: 0, unit: "px" });
			}
		});
	});

	describe("invalid inputs", () => {
		it("should reject negative values", () => {
			const nodes = parseNodes("-5px");
			const result = parseCornerValues(nodes);

			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("non-negative");
			}
		});

		it("should reject empty array", () => {
			const result = parseCornerValues([]);

			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Expected 1-4");
			}
		});

		it("should reject more than 4 values", () => {
			const nodes = parseNodes("1px 2px 3px 4px 5px");
			const result = parseCornerValues(nodes);

			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Expected 1-4");
			}
		});
	});
});
