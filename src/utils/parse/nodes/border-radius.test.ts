// b_path:: src/utils/parse/nodes/border-radius.test.ts
import type * as csstree from "css-tree";
import { describe, expect, it } from "vitest";
import { parseCornerValues, parseRoundBorderRadius, parseTRBLLengthPercentage } from "./border-radius";

describe("parseTRBLLengthPercentage", () => {
	const createDimension = (value: string, unit: string): csstree.Dimension => ({
		type: "Dimension",
		loc: undefined,
		value,
		unit,
	});

	const createPercentage = (value: string): csstree.Percentage => ({
		type: "Percentage",
		loc: undefined,
		value,
	});

	const createNumber = (value: string): csstree.NumberNode => ({
		type: "Number",
		loc: undefined,
		value,
	});

	describe("1 value - all sides", () => {
		it("expands single value to all sides", () => {
			const nodes = [createDimension("10", "px")];
			const result = parseTRBLLengthPercentage(nodes);
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.top).toEqual({ value: 10, unit: "px" });
				expect(result.value.right).toEqual({ value: 10, unit: "px" });
				expect(result.value.bottom).toEqual({ value: 10, unit: "px" });
				expect(result.value.left).toEqual({ value: 10, unit: "px" });
			}
		});

		it("handles percentage", () => {
			const nodes = [createPercentage("50")];
			const result = parseTRBLLengthPercentage(nodes);
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.top).toEqual({ value: 50, unit: "%" });
			}
		});
	});

	describe("2 values - vertical | horizontal", () => {
		it("expands to top/bottom and left/right", () => {
			const nodes = [createDimension("10", "px"), createDimension("20", "px")];
			const result = parseTRBLLengthPercentage(nodes);
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.top).toEqual({ value: 10, unit: "px" });
				expect(result.value.right).toEqual({ value: 20, unit: "px" });
				expect(result.value.bottom).toEqual({ value: 10, unit: "px" });
				expect(result.value.left).toEqual({ value: 20, unit: "px" });
			}
		});
	});

	describe("3 values - top | horizontal | bottom", () => {
		it("expands correctly", () => {
			const nodes = [createDimension("10", "px"), createDimension("20", "px"), createDimension("30", "px")];
			const result = parseTRBLLengthPercentage(nodes);
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.top).toEqual({ value: 10, unit: "px" });
				expect(result.value.right).toEqual({ value: 20, unit: "px" });
				expect(result.value.bottom).toEqual({ value: 30, unit: "px" });
				expect(result.value.left).toEqual({ value: 20, unit: "px" });
			}
		});
	});

	describe("4 values - clockwise TRBL", () => {
		it("assigns all four values", () => {
			const nodes = [
				createDimension("10", "px"),
				createDimension("20", "px"),
				createDimension("30", "px"),
				createDimension("40", "px"),
			];
			const result = parseTRBLLengthPercentage(nodes);
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.top).toEqual({ value: 10, unit: "px" });
				expect(result.value.right).toEqual({ value: 20, unit: "px" });
				expect(result.value.bottom).toEqual({ value: 30, unit: "px" });
				expect(result.value.left).toEqual({ value: 40, unit: "px" });
			}
		});
	});

	describe("unitless zero", () => {
		it("accepts unitless zero", () => {
			const nodes = [createNumber("0")];
			const result = parseTRBLLengthPercentage(nodes);
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.top).toEqual({ value: 0, unit: "px" });
			}
		});

		it("rejects unitless non-zero", () => {
			const nodes = [createNumber("10")];
			const result = parseTRBLLengthPercentage(nodes);
			expect(result.ok).toBe(false);
		});
	});

	describe("validation", () => {
		it("rejects empty array", () => {
			const result = parseTRBLLengthPercentage([]);
			expect(result.ok).toBe(false);
		});

		it("rejects more than 4 values", () => {
			const nodes = [
				createDimension("10", "px"),
				createDimension("20", "px"),
				createDimension("30", "px"),
				createDimension("40", "px"),
				createDimension("50", "px"),
			];
			const result = parseTRBLLengthPercentage(nodes);
			expect(result.ok).toBe(false);
		});
	});
});

describe("parseCornerValues", () => {
	const createDimension = (value: string, unit: string): csstree.Dimension => ({
		type: "Dimension",
		loc: undefined,
		value,
		unit,
	});

	const createPercentage = (value: string): csstree.Percentage => ({
		type: "Percentage",
		loc: undefined,
		value,
	});

	const createNumber = (value: string): csstree.NumberNode => ({
		type: "Number",
		loc: undefined,
		value,
	});

	describe("1 value - all corners", () => {
		it("expands single value to all corners", () => {
			const nodes = [createDimension("10", "px")];
			const result = parseCornerValues(nodes);
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.topLeft).toEqual({ value: 10, unit: "px" });
				expect(result.value.topRight).toEqual({ value: 10, unit: "px" });
				expect(result.value.bottomRight).toEqual({ value: 10, unit: "px" });
				expect(result.value.bottomLeft).toEqual({ value: 10, unit: "px" });
			}
		});
	});

	describe("2 values - diagonal pairing", () => {
		it("expands to TL/BR and TR/BL", () => {
			const nodes = [createDimension("10", "px"), createDimension("20", "px")];
			const result = parseCornerValues(nodes);
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.topLeft).toEqual({ value: 10, unit: "px" });
				expect(result.value.topRight).toEqual({ value: 20, unit: "px" });
				expect(result.value.bottomRight).toEqual({ value: 10, unit: "px" });
				expect(result.value.bottomLeft).toEqual({ value: 20, unit: "px" });
			}
		});
	});

	describe("3 values - TL | TR/BL | BR", () => {
		it("expands correctly", () => {
			const nodes = [createDimension("10", "px"), createDimension("20", "px"), createDimension("30", "px")];
			const result = parseCornerValues(nodes);
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.topLeft).toEqual({ value: 10, unit: "px" });
				expect(result.value.topRight).toEqual({ value: 20, unit: "px" });
				expect(result.value.bottomRight).toEqual({ value: 30, unit: "px" });
				expect(result.value.bottomLeft).toEqual({ value: 20, unit: "px" });
			}
		});
	});

	describe("4 values - clockwise from TL", () => {
		it("assigns all four corners", () => {
			const nodes = [
				createDimension("10", "px"),
				createDimension("20", "px"),
				createDimension("30", "px"),
				createDimension("40", "px"),
			];
			const result = parseCornerValues(nodes);
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.topLeft).toEqual({ value: 10, unit: "px" });
				expect(result.value.topRight).toEqual({ value: 20, unit: "px" });
				expect(result.value.bottomRight).toEqual({ value: 30, unit: "px" });
				expect(result.value.bottomLeft).toEqual({ value: 40, unit: "px" });
			}
		});
	});

	describe("non-negative validation", () => {
		it("accepts zero", () => {
			const nodes = [createNumber("0")];
			const result = parseCornerValues(nodes);
			expect(result.ok).toBe(true);
		});

		it("rejects negative values", () => {
			const nodes = [createDimension("-10", "px")];
			const result = parseCornerValues(nodes);
			expect(result.ok).toBe(false);
		});

		it("accepts positive values", () => {
			const nodes = [createDimension("10", "px")];
			const result = parseCornerValues(nodes);
			expect(result.ok).toBe(true);
		});
	});

	describe("validation", () => {
		it("rejects empty array", () => {
			const result = parseCornerValues([]);
			expect(result.ok).toBe(false);
		});

		it("rejects more than 4 values", () => {
			const nodes = [
				createDimension("10", "px"),
				createDimension("20", "px"),
				createDimension("30", "px"),
				createDimension("40", "px"),
				createDimension("50", "px"),
			];
			const result = parseCornerValues(nodes);
			expect(result.ok).toBe(false);
		});
	});

	describe("mixed units", () => {
		it("handles mix of lengths and percentages", () => {
			const nodes = [createDimension("10", "px"), createPercentage("20")];
			const result = parseCornerValues(nodes);
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.topLeft).toEqual({ value: 10, unit: "px" });
				expect(result.value.topRight).toEqual({ value: 20, unit: "%" });
			}
		});
	});
});

describe("parseRoundBorderRadius", () => {
	const createDimension = (value: string, unit: string): csstree.Dimension => ({
		type: "Dimension",
		loc: undefined,
		value,
		unit,
	});

	const createIdentifier = (name: string): csstree.Identifier => ({
		type: "Identifier",
		loc: undefined,
		name,
	});

	describe("no 'round' keyword", () => {
		it("returns no border-radius", () => {
			const args = [createDimension("10", "px"), createDimension("20", "px")];
			const result = parseRoundBorderRadius(args);
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.roundIndex).toBe(-1);
				expect(result.value.borderRadius).toBeUndefined();
			}
		});
	});

	describe("with 'round' keyword", () => {
		it("parses single border-radius value", () => {
			const args = [createDimension("10", "px"), createIdentifier("round"), createDimension("5", "px")];
			const result = parseRoundBorderRadius(args);
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.roundIndex).toBe(1);
				expect(result.value.borderRadius).toBeDefined();
				expect(result.value.borderRadius?.topLeft).toEqual({ value: 5, unit: "px" });
			}
		});

		it("parses multiple border-radius values", () => {
			const args = [
				createDimension("10", "px"),
				createIdentifier("round"),
				createDimension("5", "px"),
				createDimension("10", "px"),
			];
			const result = parseRoundBorderRadius(args);
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.roundIndex).toBe(1);
				expect(result.value.borderRadius?.topLeft).toEqual({ value: 5, unit: "px" });
				expect(result.value.borderRadius?.topRight).toEqual({ value: 10, unit: "px" });
			}
		});

		it("handles case-insensitive 'round'", () => {
			const args = [createDimension("10", "px"), createIdentifier("ROUND"), createDimension("5", "px")];
			const result = parseRoundBorderRadius(args);
			expect(result.ok).toBe(true);
		});
	});

	describe("validation", () => {
		it("rejects 'round' without values", () => {
			const args = [createDimension("10", "px"), createIdentifier("round")];
			const result = parseRoundBorderRadius(args);
			expect(result.ok).toBe(false);
		});

		it("rejects invalid border-radius values", () => {
			const args = [createDimension("10", "px"), createIdentifier("round"), createDimension("-5", "px")];
			const result = parseRoundBorderRadius(args);
			expect(result.ok).toBe(false);
		});
	});

	describe("edge cases", () => {
		it("handles empty args array", () => {
			const result = parseRoundBorderRadius([]);
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.roundIndex).toBe(-1);
			}
		});

		it("finds 'round' at different positions", () => {
			const args = [
				createDimension("10", "px"),
				createDimension("20", "px"),
				createDimension("30", "px"),
				createIdentifier("round"),
				createDimension("5", "px"),
			];
			const result = parseRoundBorderRadius(args);
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.roundIndex).toBe(3);
			}
		});
	});
});
