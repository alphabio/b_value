// b_path:: src/parse/layout/overflow-x.test.ts
import { describe, expect, it } from "vitest";
import * as Parse from "@/parse";

describe("Parse.Layout.OverflowX", () => {
	describe("valid overflow-x keywords", () => {
		it("should parse 'visible'", () => {
			const result = Parse.Layout.OverflowX.parse("visible");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "overflow-x",
					value: "visible",
				});
			}
		});

		it("should parse 'hidden'", () => {
			const result = Parse.Layout.OverflowX.parse("hidden");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "overflow-x",
					value: "hidden",
				});
			}
		});

		it("should parse 'clip'", () => {
			const result = Parse.Layout.OverflowX.parse("clip");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "overflow-x",
					value: "clip",
				});
			}
		});

		it("should parse 'scroll'", () => {
			const result = Parse.Layout.OverflowX.parse("scroll");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "overflow-x",
					value: "scroll",
				});
			}
		});

		it("should parse 'auto'", () => {
			const result = Parse.Layout.OverflowX.parse("auto");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "overflow-x",
					value: "auto",
				});
			}
		});
	});

	describe("case insensitivity", () => {
		it("should parse 'HIDDEN'", () => {
			const result = Parse.Layout.OverflowX.parse("HIDDEN");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toBe("hidden");
			}
		});

		it("should parse 'Scroll'", () => {
			const result = Parse.Layout.OverflowX.parse("Scroll");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toBe("scroll");
			}
		});
	});

	describe("invalid values", () => {
		it("should reject invalid keyword", () => {
			const result = Parse.Layout.OverflowX.parse("invalid");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Invalid overflow-x keyword");
			}
		});

		it("should reject empty string", () => {
			const result = Parse.Layout.OverflowX.parse("");
			expect(result.ok).toBe(false);
		});

		it("should reject numeric value", () => {
			const result = Parse.Layout.OverflowX.parse("123");
			expect(result.ok).toBe(false);
		});

		it("should reject multiple values", () => {
			const result = Parse.Layout.OverflowX.parse("hidden scroll");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Expected single value");
			}
		});
	});
});
