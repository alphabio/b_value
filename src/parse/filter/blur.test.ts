import { describe, expect, it } from "vitest";
import { parse } from "./blur";

describe("parse blur filter", () => {
	it("parses blur with px value", () => {
		const result = parse("blur(5px)");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("blur");
			expect(result.value.radius).toEqual({ value: 5, unit: "px" });
		}
	});

	it("parses blur with rem value", () => {
		const result = parse("blur(1rem)");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.radius).toEqual({ value: 1, unit: "rem" });
		}
	});

	it("parses blur with em value", () => {
		const result = parse("blur(0.5em)");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.radius).toEqual({ value: 0.5, unit: "em" });
		}
	});

	it("parses blur with zero", () => {
		const result = parse("blur(0px)");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.radius).toEqual({ value: 0, unit: "px" });
		}
	});

	it("rejects negative radius", () => {
		const result = parse("blur(-5px)");
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("non-negative");
		}
	});

	it("rejects no arguments", () => {
		const result = parse("blur()");
		expect(result.ok).toBe(false);
	});

	it("rejects multiple arguments", () => {
		const result = parse("blur(5px, 10px)");
		expect(result.ok).toBe(false);
	});

	it("rejects invalid unit", () => {
		const result = parse("blur(5%)");
		expect(result.ok).toBe(false);
	});

	it("rejects non-function input", () => {
		const result = parse("5px");
		expect(result.ok).toBe(false);
	});
});
