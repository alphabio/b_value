// b_path:: src/parse/layout/overflow-y.test.ts
import { describe, expect, it } from "vitest";
import * as Parse from "@/parse";

describe("Parse.Layout.OverflowY", () => {
	describe("valid overflow-y keywords", () => {
		it("should parse 'visible'", () => {
			const result = Parse.Layout.OverflowY.parse("visible");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "overflow-y",
					value: "visible",
				});
			}
		});

		it("should parse 'hidden'", () => {
			const result = Parse.Layout.OverflowY.parse("hidden");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "overflow-y",
					value: "hidden",
				});
			}
		});

		it("should parse 'clip'", () => {
			const result = Parse.Layout.OverflowY.parse("clip");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "overflow-y",
					value: "clip",
				});
			}
		});

		it("should parse 'scroll'", () => {
			const result = Parse.Layout.OverflowY.parse("scroll");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "overflow-y",
					value: "scroll",
				});
			}
		});

		it("should parse 'auto'", () => {
			const result = Parse.Layout.OverflowY.parse("auto");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "overflow-y",
					value: "auto",
				});
			}
		});
	});

	describe("case insensitivity", () => {
		it("should parse 'VISIBLE'", () => {
			const result = Parse.Layout.OverflowY.parse("VISIBLE");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toBe("visible");
			}
		});

		it("should parse 'Auto'", () => {
			const result = Parse.Layout.OverflowY.parse("Auto");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toBe("auto");
			}
		});
	});

	describe("invalid values", () => {
		it("should reject invalid keyword", () => {
			const result = Parse.Layout.OverflowY.parse("overflow");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Invalid overflow-y keyword");
			}
		});

		it("should reject empty string", () => {
			const result = Parse.Layout.OverflowY.parse("");
			expect(result.ok).toBe(false);
		});

		it("should reject numeric value", () => {
			const result = Parse.Layout.OverflowY.parse("50");
			expect(result.ok).toBe(false);
		});

		it("should reject multiple values", () => {
			const result = Parse.Layout.OverflowY.parse("auto scroll");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Expected single value");
			}
		});
	});
});
