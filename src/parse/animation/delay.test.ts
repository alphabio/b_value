// b_path:: src/parse/animation/delay.test.ts
import { describe, expect, it } from "vitest";
import * as Parser from "./delay";

describe("Animation Delay Parser", () => {
	it("should parse single time value in seconds", () => {
		const result = Parser.parse("1s");

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("animation-delay");
			expect(result.value.delays).toHaveLength(1);
			expect(result.value.delays[0]).toEqual({ value: 1, unit: "s" });
		}
	});

	it("should parse single time value in milliseconds", () => {
		const result = Parser.parse("500ms");

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.delays).toHaveLength(1);
			expect(result.value.delays[0]).toEqual({ value: 500, unit: "ms" });
		}
	});

	it("should parse negative delay", () => {
		const result = Parser.parse("-2s");

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.delays[0]).toEqual({ value: -2, unit: "s" });
		}
	});

	it("should parse zero delay", () => {
		const result = Parser.parse("0s");

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.delays[0]).toEqual({ value: 0, unit: "s" });
		}
	});

	it("should parse decimal values", () => {
		const result = Parser.parse("0.5s");

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.delays[0]).toEqual({ value: 0.5, unit: "s" });
		}
	});

	it("should parse multiple delays", () => {
		const result = Parser.parse("1s, 500ms, 2s");

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.delays).toHaveLength(3);
			expect(result.value.delays[0]).toEqual({ value: 1, unit: "s" });
			expect(result.value.delays[1]).toEqual({ value: 500, unit: "ms" });
			expect(result.value.delays[2]).toEqual({ value: 2, unit: "s" });
		}
	});

	it("should parse delays with whitespace", () => {
		const result = Parser.parse("1s , 500ms , 2s");

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.delays).toHaveLength(3);
		}
	});

	it("should parse mixed positive and negative delays", () => {
		const result = Parser.parse("1s, -500ms, 2s");

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.delays).toHaveLength(3);
			expect(result.value.delays[1]).toEqual({ value: -500, unit: "ms" });
		}
	});

	it("should return error for invalid unit", () => {
		const result = Parser.parse("1px");

		expect(result.ok).toBe(false);
	});

	it("should return error for missing unit", () => {
		const result = Parser.parse("1");

		expect(result.ok).toBe(false);
	});

	it("should return error for empty value", () => {
		const result = Parser.parse("");

		expect(result.ok).toBe(false);
	});

	it("should return error for invalid value", () => {
		const result = Parser.parse("invalid");

		expect(result.ok).toBe(false);
	});

	it("should return error for trailing comma", () => {
		const result = Parser.parse("1s,");

		expect(result.ok).toBe(false);
	});

	it("should return error for leading comma", () => {
		const result = Parser.parse(",1s");

		expect(result.ok).toBe(false);
	});

	it("should return error for double comma", () => {
		const result = Parser.parse("1s,,2s");

		expect(result.ok).toBe(false);
	});
});
