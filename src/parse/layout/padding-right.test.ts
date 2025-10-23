import { describe, expect, it } from "vitest";
import { parse } from "./padding-right";

describe("parse padding-right", () => {
	it("parses px values", () => {
		const result = parse("10px");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("padding-right");
			expect(result.value.value).toEqual({ value: 10, unit: "px" });
		}
	});

	it("parses percentage values", () => {
		const result = parse("50%");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("padding-right");
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

	it("parses vw viewport units", () => {
		const result = parse("10vw");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.value).toEqual({ value: 10, unit: "vw" });
		}
	});

	it("parses vh viewport units", () => {
		const result = parse("5vh");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.value).toEqual({ value: 5, unit: "vh" });
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
