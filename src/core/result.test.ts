// b_path:: src/core/result.test.ts

import { describe, expect, it } from "vitest";
import { andThen, err, fromZod, map, ok, unwrap, unwrapOr } from "./result";

describe("Result utilities", () => {
	describe("ok()", () => {
		it("should create successful result", () => {
			const result = ok(42);
			expect(result.ok).toBe(true);
			expect(result.value).toBe(42);
			expect(result.error).toBeUndefined();
		});

		it("should work with complex types", () => {
			const result = ok({ name: "test", count: 5 });
			expect(result.ok).toBe(true);
			expect(result.value).toEqual({ name: "test", count: 5 });
		});
	});

	describe("err()", () => {
		it("should create error result with string", () => {
			const result = err("Something failed");
			expect(result.ok).toBe(false);
			expect(result.error).toBe("Something failed");
			expect(result.value).toBeUndefined();
		});

		it("should create error result with Error object", () => {
			const error = new Error("Test error");
			const result = err(error);
			expect(result.ok).toBe(false);
			expect(result.error).toBe(error);
		});
	});

	describe("fromZod()", () => {
		it("should convert successful Zod parse to ok result", () => {
			const zodResult = { success: true as const, data: 42 };
			const result = fromZod(zodResult);
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toBe(42);
			}
		});

		it("should convert failed Zod parse to err result", () => {
			const zodError = new Error("Validation failed");
			const zodResult = { success: false as const, error: zodError };
			const result = fromZod(zodResult);
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toBe(zodError);
			}
		});
	});

	describe("unwrap()", () => {
		it("should return value for ok result", () => {
			const result = ok(42);
			expect(unwrap(result)).toBe(42);
		});

		it("should throw Error for err result with Error", () => {
			const error = new Error("Test error");
			const result = err(error);
			expect(() => unwrap(result)).toThrow(error);
		});

		it("should throw Error for err result with string", () => {
			const result = err("Failed");
			expect(() => unwrap(result)).toThrow("Failed");
		});

		it("should throw Error for err result with other types", () => {
			const result = err(123);
			expect(() => unwrap(result)).toThrow("123");
		});
	});

	describe("unwrapOr()", () => {
		it("should return value for ok result", () => {
			const result = ok(42);
			expect(unwrapOr(result, 0)).toBe(42);
		});

		it("should return default value for err result", () => {
			const result = err("Failed");
			expect(unwrapOr(result, 0)).toBe(0);
		});

		it("should work with complex default values", () => {
			const result = err("Failed");
			const defaultValue = { name: "default", count: 0 };
			expect(unwrapOr(result, defaultValue)).toEqual(defaultValue);
		});
	});

	describe("map()", () => {
		it("should transform ok result value", () => {
			const result = ok(2);
			const doubled = map(result, (x) => x * 2);
			expect(doubled.ok).toBe(true);
			if (doubled.ok) {
				expect(doubled.value).toBe(4);
			}
		});

		it("should preserve err result", () => {
			const result = err("Failed");
			const mapped = map(result, (x: number) => x * 2);
			expect(mapped.ok).toBe(false);
			if (!mapped.ok) {
				expect(mapped.error).toBe("Failed");
			}
		});

		it("should allow type transformation", () => {
			const result = ok(42);
			const stringResult = map(result, (x) => `Value: ${x}`);
			expect(stringResult.ok).toBe(true);
			if (stringResult.ok) {
				expect(stringResult.value).toBe("Value: 42");
			}
		});
	});

	describe("andThen()", () => {
		it("should chain successful results", () => {
			const result = ok(2);
			const doubled = andThen(result, (x) => ok(x * 2));
			expect(doubled.ok).toBe(true);
			if (doubled.ok) {
				expect(doubled.value).toBe(4);
			}
		});

		it("should short-circuit on error", () => {
			const result = err("Initial error");
			const chained = andThen(result, (x: number) => ok(x * 2));
			expect(chained.ok).toBe(false);
			if (!chained.ok) {
				expect(chained.error).toBe("Initial error");
			}
		});

		it("should propagate errors from chained function", () => {
			const result = ok(0);
			const chained = andThen(result, (x) => (x > 0 ? ok(x * 2) : err("Must be positive")));
			expect(chained.ok).toBe(false);
			if (!chained.ok) {
				expect(chained.error).toBe("Must be positive");
			}
		});

		it("should allow type transformation", () => {
			const result = ok(42);
			const stringResult = andThen(result, (x) => ok(`Value: ${x}`));
			expect(stringResult.ok).toBe(true);
			if (stringResult.ok) {
				expect(stringResult.value).toBe("Value: 42");
			}
		});
	});
});
