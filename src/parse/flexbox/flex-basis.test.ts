// b_path:: src/parse/flexbox/flex-basis.test.ts
import { describe, expect, it } from "vitest";
import { parse } from "./flex-basis";

describe("parse flex-basis", () => {
	it("should parse pixel values", () => {
		const result = parse("200px");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("flex-basis");
			expect(result.value.value).toEqual({ value: 200, unit: "px" });
		}
	});

	it("should parse percentage values", () => {
		const result = parse("50%");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.value).toEqual({ value: 50, unit: "%" });
		}
	});

	it("should parse auto keyword", () => {
		const result = parse("auto");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.value).toBe("auto");
		}
	});

	it("should parse content keyword", () => {
		const result = parse("content");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.value).toBe("content");
		}
	});

	it("should parse max-content keyword", () => {
		const result = parse("max-content");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.value).toBe("max-content");
		}
	});

	it("should parse unitless zero", () => {
		const result = parse("0");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.value).toEqual({ value: 0, unit: "px" });
		}
	});
});
