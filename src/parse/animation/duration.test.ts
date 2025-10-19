// b_path:: src/parse/animation/duration.test.ts
import { describe, expect, it } from "vitest";
import * as Parser from "./duration";

describe("Animation Duration Parser", () => {
	it("should parse single time value in seconds", () => {
		const result = Parser.parse("1s");

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("animation-duration");
			expect(result.value.durations).toHaveLength(1);
			expect(result.value.durations[0]).toEqual({ type: "time", value: 1, unit: "s" });
		}
	});

	it("should parse single time value in milliseconds", () => {
		const result = Parser.parse("500ms");

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.durations).toHaveLength(1);
			expect(result.value.durations[0]).toEqual({ type: "time", value: 500, unit: "ms" });
		}
	});

	it("should parse auto keyword", () => {
		const result = Parser.parse("auto");

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.durations).toHaveLength(1);
			expect(result.value.durations[0]).toEqual({ type: "auto" });
		}
	});

	it("should parse zero duration", () => {
		const result = Parser.parse("0s");

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.durations[0]).toEqual({ type: "time", value: 0, unit: "s" });
		}
	});

	it("should parse decimal values", () => {
		const result = Parser.parse("0.5s");

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.durations[0]).toEqual({ type: "time", value: 0.5, unit: "s" });
		}
	});

	it("should parse multiple durations", () => {
		const result = Parser.parse("1s, auto, 500ms");

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.durations).toHaveLength(3);
			expect(result.value.durations[0]).toEqual({ type: "time", value: 1, unit: "s" });
			expect(result.value.durations[1]).toEqual({ type: "auto" });
			expect(result.value.durations[2]).toEqual({ type: "time", value: 500, unit: "ms" });
		}
	});

	it("should parse durations with whitespace", () => {
		const result = Parser.parse("1s , auto , 2s");

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.durations).toHaveLength(3);
		}
	});

	it("should parse large values", () => {
		const result = Parser.parse("3600s");

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.durations[0]).toEqual({ type: "time", value: 3600, unit: "s" });
		}
	});

	it("should reject negative duration", () => {
		const result = Parser.parse("-1s");

		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("non-negative");
		}
	});

	it("should reject invalid unit", () => {
		const result = Parser.parse("1px");

		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("Invalid time unit");
		}
	});

	it("should reject empty value", () => {
		const result = Parser.parse("");

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

	it("should handle case insensitive auto", () => {
		const result = Parser.parse("AUTO");

		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.durations[0]).toEqual({ type: "auto" });
		}
	});
});
