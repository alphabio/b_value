// b_path:: src/utils/math.test.ts
import { describe, expect, it } from "vitest";
import { add, divide, multiply, subtract } from "./math";

describe("Math Utilities", () => {
	describe("add", () => {
		it("should add two positive numbers correctly", () => {
			expect(add(2, 3)).toBe(5);
			expect(add(10, 15)).toBe(25);
			expect(add(0.1, 0.2)).toBeCloseTo(0.3);
		});

		it("should add negative numbers correctly", () => {
			expect(add(-2, -3)).toBe(-5);
			expect(add(-10, 5)).toBe(-5);
			expect(add(10, -5)).toBe(5);
		});

		it("should handle zero correctly", () => {
			expect(add(0, 0)).toBe(0);
			expect(add(0, 5)).toBe(5);
			expect(add(5, 0)).toBe(5);
		});

		it("should handle decimal numbers correctly", () => {
			expect(add(1.5, 2.5)).toBe(4);
			expect(add(0.1, 0.2)).toBeCloseTo(0.3);
			expect(add(-1.5, 1.5)).toBe(0);
		});

		it("should handle large numbers correctly", () => {
			expect(add(1000000, 2000000)).toBe(3000000);
			expect(add(Number.MAX_SAFE_INTEGER, 0)).toBe(Number.MAX_SAFE_INTEGER);
		});
	});

	describe("subtract", () => {
		it("should subtract two positive numbers correctly", () => {
			expect(subtract(5, 3)).toBe(2);
			expect(subtract(10, 5)).toBe(5);
			expect(subtract(100, 50)).toBe(50);
		});

		it("should subtract negative numbers correctly", () => {
			expect(subtract(-5, -3)).toBe(-2);
			expect(subtract(-10, 5)).toBe(-15);
			expect(subtract(10, -5)).toBe(15);
		});

		it("should handle zero correctly", () => {
			expect(subtract(0, 0)).toBe(0);
			expect(subtract(0, 5)).toBe(-5);
			expect(subtract(5, 0)).toBe(5);
		});

		it("should handle decimal numbers correctly", () => {
			expect(subtract(2.5, 1.5)).toBe(1);
			expect(subtract(0.3, 0.1)).toBeCloseTo(0.2);
			expect(subtract(-1.5, 1.5)).toBe(-3);
		});

		it("should handle large numbers correctly", () => {
			expect(subtract(2000000, 1000000)).toBe(1000000);
			expect(subtract(Number.MAX_SAFE_INTEGER, 1)).toBe(Number.MAX_SAFE_INTEGER - 1);
		});
	});

	describe("multiply", () => {
		it("should multiply two positive numbers correctly", () => {
			expect(multiply(2, 3)).toBe(6);
			expect(multiply(10, 5)).toBe(50);
			expect(multiply(7, 8)).toBe(56);
		});

		it("should multiply negative numbers correctly", () => {
			expect(multiply(-2, -3)).toBe(6);
			expect(multiply(-10, 5)).toBe(-50);
			expect(multiply(10, -5)).toBe(-50);
		});

		it("should handle zero correctly", () => {
			expect(multiply(0, 0)).toBe(0);
			expect(multiply(0, 5)).toBe(0);
			expect(multiply(5, 0)).toBe(0);
		});

		it("should handle decimal numbers correctly", () => {
			expect(multiply(1.5, 2)).toBe(3);
			expect(multiply(0.1, 0.2)).toBeCloseTo(0.02);
			expect(multiply(-1.5, 2)).toBe(-3);
		});

		it("should handle large numbers correctly", () => {
			expect(multiply(1000, 1000)).toBe(1000000);
			expect(multiply(Number.MAX_SAFE_INTEGER, 1)).toBe(Number.MAX_SAFE_INTEGER);
		});

		it("should handle fractional results correctly", () => {
			expect(multiply(0.5, 0.5)).toBe(0.25);
			expect(multiply(1 / 3, 3)).toBeCloseTo(1);
		});
	});

	describe("divide", () => {
		it("should divide two positive numbers correctly", () => {
			expect(divide(6, 3)).toBe(2);
			expect(divide(10, 5)).toBe(2);
			expect(divide(100, 4)).toBe(25);
		});

		it("should divide negative numbers correctly", () => {
			expect(divide(-6, -3)).toBe(2);
			expect(divide(-10, 5)).toBe(-2);
			expect(divide(10, -5)).toBe(-2);
		});

		it("should handle decimal results correctly", () => {
			expect(divide(5, 2)).toBe(2.5);
			expect(divide(1, 3)).toBeCloseTo(0.3333333333333333);
			expect(divide(0.1, 0.2)).toBeCloseTo(0.5);
		});

		it("should handle division by 1 correctly", () => {
			expect(divide(5, 1)).toBe(5);
			expect(divide(-5, 1)).toBe(-5);
			expect(divide(0, 1)).toBe(0);
		});

		it("should handle large numbers correctly", () => {
			expect(divide(1000000, 1000)).toBe(1000);
			expect(divide(Number.MAX_SAFE_INTEGER, 1)).toBe(Number.MAX_SAFE_INTEGER);
		});

		it("should throw error when dividing by zero", () => {
			expect(() => divide(5, 0)).toThrow("Division by zero is not allowed");
			expect(() => divide(-5, 0)).toThrow("Division by zero is not allowed");
			expect(() => divide(0, 0)).toThrow("Division by zero is not allowed");
		});

		it("should handle very small numbers correctly", () => {
			expect(divide(1, 1000000)).toBe(0.000001);
			expect(divide(0.000001, 1)).toBe(0.000001);
		});
	});
});
