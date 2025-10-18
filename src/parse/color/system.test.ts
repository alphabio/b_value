// b_path:: src/parse/color/system.test.ts
import { describe, expect, it } from "vitest";
import * as SystemGenerator from "@/generate/color/system";
import * as SystemParser from "./system";

describe("System Color Parser", () => {
	describe("valid system color keywords", () => {
		it("should parse AccentColor", () => {
			const result = SystemParser.parse("AccentColor");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "system",
					keyword: "AccentColor",
				});
			}
		});

		it("should parse AccentColorText", () => {
			const result = SystemParser.parse("AccentColorText");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "system",
					keyword: "AccentColorText",
				});
			}
		});

		it("should parse ButtonText", () => {
			const result = SystemParser.parse("ButtonText");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "system",
					keyword: "ButtonText",
				});
			}
		});

		it("should parse Canvas", () => {
			const result = SystemParser.parse("Canvas");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "system",
					keyword: "Canvas",
				});
			}
		});

		it("should parse CanvasText", () => {
			const result = SystemParser.parse("CanvasText");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "system",
					keyword: "CanvasText",
				});
			}
		});

		it("should parse LinkText", () => {
			const result = SystemParser.parse("LinkText");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "system",
					keyword: "LinkText",
				});
			}
		});

		it("should parse VisitedText", () => {
			const result = SystemParser.parse("VisitedText");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "system",
					keyword: "VisitedText",
				});
			}
		});

		it("should parse Highlight", () => {
			const result = SystemParser.parse("Highlight");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "system",
					keyword: "Highlight",
				});
			}
		});

		it("should parse HighlightText", () => {
			const result = SystemParser.parse("HighlightText");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "system",
					keyword: "HighlightText",
				});
			}
		});

		it("should parse GrayText", () => {
			const result = SystemParser.parse("GrayText");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "system",
					keyword: "GrayText",
				});
			}
		});
	});

	describe("case insensitivity", () => {
		it("should parse lowercase buttontext", () => {
			const result = SystemParser.parse("buttontext");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.keyword).toBe("ButtonText");
			}
		});

		it("should parse uppercase CANVAS", () => {
			const result = SystemParser.parse("CANVAS");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.keyword).toBe("Canvas");
			}
		});

		it("should parse mixed case lInKtExT", () => {
			const result = SystemParser.parse("lInKtExT");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.keyword).toBe("LinkText");
			}
		});
	});

	describe("whitespace handling", () => {
		it("should handle leading whitespace", () => {
			const result = SystemParser.parse("  ButtonText");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.keyword).toBe("ButtonText");
			}
		});

		it("should handle trailing whitespace", () => {
			const result = SystemParser.parse("Canvas  ");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.keyword).toBe("Canvas");
			}
		});

		it("should handle leading and trailing whitespace", () => {
			const result = SystemParser.parse("  LinkText  ");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.keyword).toBe("LinkText");
			}
		});
	});

	describe("error handling", () => {
		it("should reject invalid keyword", () => {
			const result = SystemParser.parse("InvalidColor");
			expect(result.ok).toBe(false);
		});

		it("should reject named color as system color", () => {
			const result = SystemParser.parse("red");
			expect(result.ok).toBe(false);
		});

		it("should reject special color as system color", () => {
			const result = SystemParser.parse("transparent");
			expect(result.ok).toBe(false);
		});

		it("should reject empty string", () => {
			const result = SystemParser.parse("");
			expect(result.ok).toBe(false);
		});

		it("should reject whitespace only", () => {
			const result = SystemParser.parse("   ");
			expect(result.ok).toBe(false);
		});
	});

	describe("round-trip (parse -> generate -> parse)", () => {
		it("should round-trip ButtonText", () => {
			const input = "ButtonText";
			const parsed = SystemParser.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = SystemGenerator.toCss(parsed.value);
				const reparsed = SystemParser.parse(generated);
				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});

		it("should round-trip Canvas", () => {
			const input = "Canvas";
			const parsed = SystemParser.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = SystemGenerator.toCss(parsed.value);
				const reparsed = SystemParser.parse(generated);
				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});

		it("should round-trip case-insensitive input", () => {
			const input = "linktext";
			const parsed = SystemParser.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = SystemGenerator.toCss(parsed.value);
				expect(generated).toBe("LinkText");
				const reparsed = SystemParser.parse(generated);
				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});
	});

	describe("all system color keywords", () => {
		it("should parse all defined system color keywords", () => {
			const keywords = [
				"AccentColor",
				"AccentColorText",
				"ActiveText",
				"ButtonBorder",
				"ButtonFace",
				"ButtonText",
				"Canvas",
				"CanvasText",
				"Field",
				"FieldText",
				"GrayText",
				"Highlight",
				"HighlightText",
				"LinkText",
				"Mark",
				"MarkText",
				"SelectedItem",
				"SelectedItemText",
				"VisitedText",
			];

			for (const keyword of keywords) {
				const result = SystemParser.parse(keyword);
				expect(result.ok).toBe(true);
				if (result.ok) {
					expect(result.value.keyword).toBe(keyword);
				}
			}
		});
	});
});
