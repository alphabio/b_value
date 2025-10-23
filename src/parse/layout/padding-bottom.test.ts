import { describe, expect, it } from "vitest";
import { parse } from "./padding-bottom";

describe("parse padding-bottom", () => {
	it("parses px values", () => {
		const result = parse("10px");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("padding-bottom");
			expect(result.value.value).toEqual({ value: 10, unit: "px" });
		}
	});

	it("parses percentage values", () => {
		const result = parse("50%");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("padding-bottom");
			expect(result.value.value).toEqual({ value: 50, unit: "%" });
		}
	});

	it("parses em values", () => {
		const result = parse("2em");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.value).toEqual({ value: 2, unit: "em" });
		}
	});

	it("parses rem values", () => {
		const result = parse("1.5rem");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.value).toEqual({ value: 1.5, unit: "rem" });
		}
	});

	it("parses zero without unit", () => {
		const result = parse("0");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.value).toEqual({ value: 0, unit: "px" });
		}
	});

	it("rejects non-zero values without unit", () => {
		const result = parse("10");
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("unit");
		}
	});

	it("rejects invalid values", () => {
		expect(parse("auto").ok).toBe(false);
		expect(parse("inherit").ok).toBe(false);
		expect(parse("red").ok).toBe(false);
	});

	it("rejects empty string", () => {
		expect(parse("").ok).toBe(false);
	});

	it("rejects multiple values", () => {
		const result = parse("10px 20px");
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("single value");
		}
	});

	it("parses decimal values", () => {
		const result = parse("0.5rem");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.value.value).toBe(0.5);
		}
	});

	it("parses different length units", () => {
		const units = ["cm", "mm", "in", "pt", "pc", "vh", "vw", "vmin", "vmax"];
		for (const unit of units) {
			const result = parse(`5${unit}`);
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value.unit).toBe(unit);
			}
		}
	});
});
