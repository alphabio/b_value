// b_path:: src/parse/layout/padding-top.test.ts
import { describe, expect, it } from "vitest";
import { parse } from "./padding-top";

describe("parse padding-top", () => {
	it("should parse pixel values", () => {
		const result = parse("15px");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("padding-top");
			expect(result.value.value).toEqual({ value: 15, unit: "px" });
		}
	});

	it("should parse percentage values", () => {
		const result = parse("10%");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("padding-top");
			expect(result.value.value).toEqual({ value: 10, unit: "%" });
		}
	});

	it("should parse unitless zero", () => {
		const result = parse("0");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("padding-top");
			expect(result.value.value).toEqual({ value: 0, unit: "px" });
		}
	});

	it("should reject auto keyword", () => {
		const result = parse("auto");
		expect(result.ok).toBe(false);
	});

	it("should reject invalid keywords", () => {
		const result = parse("invalid");
		expect(result.ok).toBe(false);
	});
});
