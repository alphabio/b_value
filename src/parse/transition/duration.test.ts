// b_path:: src/parse/transition/duration.test.ts
import { describe, expect, it } from "vitest";
import * as Parser from "./duration";

describe("Transition Duration Parser", () => {
	it("should parse single time value in seconds", () => {
		const result = Parser.parse("1s");

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("transition-duration");
			expect(result.value.durations).toHaveLength(1);
			expect(result.value.durations[0]).toEqual({ value: 1, unit: "s" });
		}
	});

	it("should parse single time value in milliseconds", () => {
		const result = Parser.parse("500ms");

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.durations).toHaveLength(1);
			expect(result.value.durations[0]).toEqual({ value: 500, unit: "ms" });
		}
	});

	it("should parse zero duration", () => {
		const result = Parser.parse("0s");

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.durations[0]).toEqual({ value: 0, unit: "s" });
		}
	});

	it("should parse decimal values", () => {
		const result = Parser.parse("0.5s");

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.durations[0]).toEqual({ value: 0.5, unit: "s" });
		}
	});

	it("should parse multiple durations", () => {
		const result = Parser.parse("1s, 500ms, 2s");

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.durations).toHaveLength(3);
			expect(result.value.durations[0]).toEqual({ value: 1, unit: "s" });
			expect(result.value.durations[1]).toEqual({ value: 500, unit: "ms" });
			expect(result.value.durations[2]).toEqual({ value: 2, unit: "s" });
		}
	});

	it("should parse durations with whitespace", () => {
		const result = Parser.parse("1s , 500ms , 2s");

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.durations).toHaveLength(3);
		}
	});

	it("should reject negative duration", () => {
		const result = Parser.parse("-1s");

		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("non-negative");
		}
	});

	it("should reject auto keyword", () => {
		const result = Parser.parse("auto");

		expect(result.ok).toBe(false);
	});

	it("should reject invalid time unit", () => {
		const result = Parser.parse("1px");

		expect(result.ok).toBe(false);
	});

	it("should reject empty value", () => {
		const result = Parser.parse("");

		expect(result.ok).toBe(false);
	});

	it("should reject value without unit", () => {
		const result = Parser.parse("1");

		expect(result.ok).toBe(false);
	});

	it("should reject trailing comma", () => {
		const result = Parser.parse("1s,");

		expect(result.ok).toBe(false);
	});

	it("should reject leading comma", () => {
		const result = Parser.parse(",1s");

		expect(result.ok).toBe(false);
	});

	it("should reject multiple commas", () => {
		const result = Parser.parse("1s,,2s");

		expect(result.ok).toBe(false);
	});
});
