// b_path:: src/parse/layout/z-index.test.ts
import { describe, expect, it } from "vitest";
import * as Parse from "@/parse";

describe("Parse.Layout.ZIndex", () => {
	describe("valid integer values", () => {
		it("should parse positive integer", () => {
			const result = Parse.Layout.ZIndex.parse("10");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "z-index",
					value: 10,
				});
			}
		});

		it("should parse negative integer", () => {
			const result = Parse.Layout.ZIndex.parse("-5");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "z-index",
					value: -5,
				});
			}
		});

		it("should parse zero", () => {
			const result = Parse.Layout.ZIndex.parse("0");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "z-index",
					value: 0,
				});
			}
		});

		it("should parse large positive integer", () => {
			const result = Parse.Layout.ZIndex.parse("999");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "z-index",
					value: 999,
				});
			}
		});

		it("should parse large negative integer", () => {
			const result = Parse.Layout.ZIndex.parse("-999");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "z-index",
					value: -999,
				});
			}
		});
	});

	describe("auto keyword", () => {
		it("should parse 'auto'", () => {
			const result = Parse.Layout.ZIndex.parse("auto");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "z-index",
					value: "auto",
				});
			}
		});

		it("should parse 'AUTO' (case insensitive)", () => {
			const result = Parse.Layout.ZIndex.parse("AUTO");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toBe("auto");
			}
		});
	});

	describe("invalid values", () => {
		it("should reject decimal/float values", () => {
			const result = Parse.Layout.ZIndex.parse("1.5");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("must be an integer");
			}
		});

		it("should reject percentage", () => {
			const result = Parse.Layout.ZIndex.parse("50%");
			expect(result.ok).toBe(false);
		});

		it("should reject length units", () => {
			const result = Parse.Layout.ZIndex.parse("10px");
			expect(result.ok).toBe(false);
		});

		it("should reject invalid keyword", () => {
			const result = Parse.Layout.ZIndex.parse("inherit");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Invalid z-index keyword");
			}
		});

		it("should reject empty string", () => {
			const result = Parse.Layout.ZIndex.parse("");
			expect(result.ok).toBe(false);
		});

		it("should reject multiple values", () => {
			const result = Parse.Layout.ZIndex.parse("10 20");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Expected single value");
			}
		});

		it("should handle parse exception", () => {
			const result = Parse.Layout.ZIndex.parse("@@@");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Failed to parse z-index");
			}
		});
	});
});
