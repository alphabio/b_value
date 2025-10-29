// b_path:: src/parse/layout/position.test.ts
import { describe, expect, it } from "vitest";
import * as Parse from "@/parse";

describe("Parse.Layout.Position", () => {
	describe("valid position keywords", () => {
		it("should parse 'static'", () => {
			const result = Parse.Layout.Position.parse("static");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "position",
					value: "static",
				});
			}
		});

		it("should parse 'relative'", () => {
			const result = Parse.Layout.Position.parse("relative");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "position",
					value: "relative",
				});
			}
		});

		it("should parse 'absolute'", () => {
			const result = Parse.Layout.Position.parse("absolute");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "position",
					value: "absolute",
				});
			}
		});

		it("should parse 'fixed'", () => {
			const result = Parse.Layout.Position.parse("fixed");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "position",
					value: "fixed",
				});
			}
		});

		it("should parse 'sticky'", () => {
			const result = Parse.Layout.Position.parse("sticky");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "position",
					value: "sticky",
				});
			}
		});
	});

	describe("case insensitivity", () => {
		it("should parse 'ABSOLUTE'", () => {
			const result = Parse.Layout.Position.parse("ABSOLUTE");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toBe("absolute");
			}
		});

		it("should parse 'Sticky'", () => {
			const result = Parse.Layout.Position.parse("Sticky");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toBe("sticky");
			}
		});
	});

	describe("invalid values", () => {
		it("should reject invalid keyword", () => {
			const result = Parse.Layout.Position.parse("positioned");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Invalid position keyword");
			}
		});

		it("should reject empty string", () => {
			const result = Parse.Layout.Position.parse("");
			expect(result.ok).toBe(false);
		});

		it("should reject numeric value", () => {
			const result = Parse.Layout.Position.parse("10px");
			expect(result.ok).toBe(false);
		});

		it("should reject multiple values", () => {
			const result = Parse.Layout.Position.parse("absolute fixed");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Expected single value");
			}
		});
	});
});
