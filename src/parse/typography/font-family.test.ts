// b_path:: src/parse/typography/font-family.test.ts
import { describe, expect, it } from "vitest";
import * as FontFamily from "./font-family";

describe("Parse.Typography.FontFamily", () => {
	describe("single font family", () => {
		it("should parse single identifier", () => {
			const result = FontFamily.parse("Arial");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "font-family",
					families: ["Arial"],
				});
			}
		});

		it("should parse generic family", () => {
			const result = FontFamily.parse("sans-serif");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.families).toEqual(["sans-serif"]);
			}
		});

		it("should parse quoted family name", () => {
			const result = FontFamily.parse('"Times New Roman"');
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.families).toEqual(["Times New Roman"]);
			}
		});

		it("should parse single-quoted family name", () => {
			const result = FontFamily.parse("'Courier New'");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.families).toEqual(["Courier New"]);
			}
		});

		it("should parse multi-word unquoted family", () => {
			const result = FontFamily.parse("Helvetica Neue");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.families).toEqual(["Helvetica Neue"]);
			}
		});
	});

	describe("multiple font families", () => {
		it("should parse comma-separated list", () => {
			const result = FontFamily.parse("Arial, sans-serif");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.families).toEqual(["Arial", "sans-serif"]);
			}
		});

		it("should parse with quoted names", () => {
			const result = FontFamily.parse('"Times New Roman", Times, serif');
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.families).toEqual(["Times New Roman", "Times", "serif"]);
			}
		});

		it("should parse multiple generic families", () => {
			const result = FontFamily.parse("Georgia, Times, serif");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.families).toEqual(["Georgia", "Times", "serif"]);
			}
		});

		it("should handle spaces around commas", () => {
			const result = FontFamily.parse("Arial , Helvetica , sans-serif");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.families).toEqual(["Arial", "Helvetica", "sans-serif"]);
			}
		});
	});

	describe("all generic family keywords", () => {
		it("should parse 'serif'", () => {
			const result = FontFamily.parse("serif");
			expect(result.ok).toBe(true);
			if (result.ok) expect(result.value.families).toEqual(["serif"]);
		});

		it("should parse 'monospace'", () => {
			const result = FontFamily.parse("monospace");
			expect(result.ok).toBe(true);
			if (result.ok) expect(result.value.families).toEqual(["monospace"]);
		});

		it("should parse 'cursive'", () => {
			const result = FontFamily.parse("cursive");
			expect(result.ok).toBe(true);
			if (result.ok) expect(result.value.families).toEqual(["cursive"]);
		});

		it("should parse 'fantasy'", () => {
			const result = FontFamily.parse("fantasy");
			expect(result.ok).toBe(true);
			if (result.ok) expect(result.value.families).toEqual(["fantasy"]);
		});
	});

	describe("error cases", () => {
		it("should reject empty string", () => {
			const result = FontFamily.parse("");
			expect(result.ok).toBe(false);
		});

		it("should reject only commas", () => {
			const result = FontFamily.parse(",,,");
			expect(result.ok).toBe(false);
		});

		it("should handle parse exceptions", () => {
			const result = FontFamily.parse("@@@");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Failed to parse font-family");
			}
		});

		it("should reject invalid CSS value types", () => {
			const result = FontFamily.parse("rgb(255, 0, 0)");
			expect(result.ok).toBe(false);
		});
	});
});
