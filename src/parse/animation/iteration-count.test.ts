// b_path:: src/parse/animation/iteration-count.test.ts
import { describe, expect, it } from "vitest";
import * as Parser from "./iteration-count";

describe("Animation Iteration Count Parser", () => {
	it("should parse single number", () => {
		const result = Parser.parse("3");

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("animation-iteration-count");
			expect(result.value.counts).toHaveLength(1);
			expect(result.value.counts[0]).toEqual({ type: "number", value: 3 });
		}
	});

	it("should parse infinite keyword", () => {
		const result = Parser.parse("infinite");

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.counts).toHaveLength(1);
			expect(result.value.counts[0]).toEqual({ type: "infinite" });
		}
	});

	it("should parse zero count", () => {
		const result = Parser.parse("0");

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.counts[0]).toEqual({ type: "number", value: 0 });
		}
	});

	it("should parse decimal values", () => {
		const result = Parser.parse("2.5");

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.counts[0]).toEqual({ type: "number", value: 2.5 });
		}
	});

	it("should parse multiple counts", () => {
		const result = Parser.parse("1, infinite, 2.5");

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.counts).toHaveLength(3);
			expect(result.value.counts[0]).toEqual({ type: "number", value: 1 });
			expect(result.value.counts[1]).toEqual({ type: "infinite" });
			expect(result.value.counts[2]).toEqual({ type: "number", value: 2.5 });
		}
	});

	it("should parse counts with whitespace", () => {
		const result = Parser.parse("1 , 2 , 3");

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.counts).toHaveLength(3);
		}
	});

	it("should reject negative count", () => {
		const result = Parser.parse("-1");

		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("non-negative");
		}
	});

	it("should reject empty value", () => {
		const result = Parser.parse("");

		expect(result.ok).toBe(false);
	});

	it("should reject trailing comma", () => {
		const result = Parser.parse("1,");

		expect(result.ok).toBe(false);
	});

	it("should handle case insensitive infinite", () => {
		const result = Parser.parse("INFINITE");

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.counts[0]).toEqual({ type: "infinite" });
		}
	});

	it("should parse very large count", () => {
		const result = Parser.parse("1000");

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.counts[0]).toEqual({ type: "number", value: 1000 });
		}
	});
});
