// b_path:: src/parse/layout/max-width.test.ts
import { describe, expect, it } from "vitest";
import { parse } from "./max-width";

describe("parse max-width", () => {
	it("should parse pixel values", () => {
		const result = parse("500px");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("max-width");
			expect(result.value.value).toEqual({ value: 500, unit: "px" });
		}
	});

	it("should parse percentage values", () => {
		const result = parse("80%");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("max-width");
			expect(result.value.value).toEqual({ value: 80, unit: "%" });
		}
	});

	it("should parse none keyword", () => {
		const result = parse("none");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("max-width");
			expect(result.value.value).toBe("none");
		}
	});

	it("should parse min-content keyword", () => {
		const result = parse("min-content");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("max-width");
			expect(result.value.value).toBe("min-content");
		}
	});

	it("should parse max-content keyword", () => {
		const result = parse("max-content");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("max-width");
			expect(result.value.value).toBe("max-content");
		}
	});

	it("should reject auto keyword", () => {
		const result = parse("auto");
		expect(result.ok).toBe(false);
	});
});
