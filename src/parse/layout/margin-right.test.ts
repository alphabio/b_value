// b_path:: src/parse/layout/margin-right.test.ts
import { describe, expect, it } from "vitest";
import { parse } from "./margin-right";

describe("parse margin-right", () => {
	it("parses px values", () => {
		const result = parse("10px");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("margin-right");
			expect(result.value.value).toEqual({ value: 10, unit: "px" });
		}
	});

	it("parses percentage values", () => {
		const result = parse("50%");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("margin-right");
			expect(result.value.value).toEqual({ value: 50, unit: "%" });
		}
	});

	it("parses auto keyword", () => {
		const result = parse("auto");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.value).toBe("auto");
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

	it("parses negative values", () => {
		const result = parse("-10px");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.value).toEqual({ value: -10, unit: "px" });
		}
	});

	it("rejects invalid units", () => {
		const result = parse("10invalid");
		expect(result.ok).toBe(false);
	});

	it("rejects multiple values", () => {
		const result = parse("10px 20px");
		expect(result.ok).toBe(false);
	});

	it("rejects empty string", () => {
		const result = parse("");
		expect(result.ok).toBe(false);
	});

	it("rejects non-zero number without unit", () => {
		const result = parse("10");
		expect(result.ok).toBe(false);
	});
});
