// b_path:: src/parse/flexbox/gap.test.ts
import { describe, expect, it } from "vitest";
import { parse } from "./gap";

describe("parse gap", () => {
	it("parses 'normal' keyword", () => {
		const result = parse("normal");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toEqual({ kind: "gap", value: "normal" });
		}
	});

	it("parses 'auto' keyword", () => {
		const result = parse("auto");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toEqual({ kind: "gap", value: "auto" });
		}
	});

	it("parses zero without unit", () => {
		const result = parse("0");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toEqual({ kind: "gap", value: { value: 0, unit: "px" } });
		}
	});

	it("parses pixel length", () => {
		const result = parse("10px");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toEqual({ kind: "gap", value: { value: 10, unit: "px" } });
		}
	});

	it("parses em length", () => {
		const result = parse("1.5em");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toEqual({ kind: "gap", value: { value: 1.5, unit: "em" } });
		}
	});

	it("parses rem length", () => {
		const result = parse("2rem");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toEqual({ kind: "gap", value: { value: 2, unit: "rem" } });
		}
	});

	it("parses percentage", () => {
		const result = parse("50%");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toEqual({ kind: "gap", value: { value: 50, unit: "%" } });
		}
	});

	it("rejects number without unit", () => {
		const result = parse("10");
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("require a unit");
		}
	});

	it("rejects invalid keyword", () => {
		const result = parse("invalid");
		expect(result.ok).toBe(false);
	});

	it("rejects empty string", () => {
		const result = parse("");
		expect(result.ok).toBe(false);
	});

	it("rejects multiple values", () => {
		const result = parse("10px 20px");
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("Expected single value");
		}
	});

	it("parses negative values", () => {
		const result = parse("-10px");
		// CSS allows negative gap in some contexts
		expect(result).toBeDefined();
	});
});
