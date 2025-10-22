// b_path:: src/parse/layout/min-width.test.ts
import { describe, expect, it } from "vitest";
import { parse } from "./min-width";

describe("parse min-width", () => {
	it("should parse pixel values", () => {
		const result = parse("200px");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("min-width");
			expect(result.value.value).toEqual({ value: 200, unit: "px" });
		}
	});

	it("should parse percentage values", () => {
		const result = parse("50%");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("min-width");
			expect(result.value.value).toEqual({ value: 50, unit: "%" });
		}
	});

	it("should parse auto keyword", () => {
		const result = parse("auto");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("min-width");
			expect(result.value.value).toBe("auto");
		}
	});

	it("should parse min-content keyword", () => {
		const result = parse("min-content");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("min-width");
			expect(result.value.value).toBe("min-content");
		}
	});

	it("should parse max-content keyword", () => {
		const result = parse("max-content");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("min-width");
			expect(result.value.value).toBe("max-content");
		}
	});

	it("should parse fit-content keyword", () => {
		const result = parse("fit-content");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("min-width");
			expect(result.value.value).toBe("fit-content");
		}
	});

	it("should parse unitless zero", () => {
		const result = parse("0");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("min-width");
			expect(result.value.value).toEqual({ value: 0, unit: "px" });
		}
	});

	it("should reject invalid keywords", () => {
		const result = parse("invalid");
		expect(result.ok).toBe(false);
	});
});
