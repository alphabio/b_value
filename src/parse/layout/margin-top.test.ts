// b_path:: src/parse/layout/margin-top.test.ts
import { describe, expect, it } from "vitest";
import { parse } from "./margin-top";

describe("parse margin-top", () => {
	it("should parse pixel values", () => {
		const result = parse("10px");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("margin-top");
			expect(result.value.value).toEqual({ value: 10, unit: "px" });
		}
	});

	it("should parse percentage values", () => {
		const result = parse("50%");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("margin-top");
			expect(result.value.value).toEqual({ value: 50, unit: "%" });
		}
	});

	it("should parse auto keyword", () => {
		const result = parse("auto");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("margin-top");
			expect(result.value.value).toBe("auto");
		}
	});

	it("should parse unitless zero", () => {
		const result = parse("0");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("margin-top");
			expect(result.value.value).toEqual({ value: 0, unit: "px" });
		}
	});

	it("should reject invalid keywords", () => {
		const result = parse("invalid");
		expect(result.ok).toBe(false);
	});

	it("should reject multiple values", () => {
		const result = parse("10px 20px");
		expect(result.ok).toBe(false);
	});

	it("should reject unitless non-zero", () => {
		const result = parse("10");
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("require a unit");
		}
	});

	it("should reject invalid value type", () => {
		const result = parse("rgb(255, 0, 0)");
		expect(result.ok).toBe(false);
	});

	it("should handle parse exception", () => {
		const result = parse("@@@");
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("Failed to parse margin-top");
		}
	});
});
