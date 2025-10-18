// b_path:: src/parse/color/special.test.ts
import { describe, expect, it } from "vitest";
import * as SpecialGenerator from "@/generate/color/special";
import * as SpecialParser from "./special";

describe("Special Color Parser", () => {
	describe("valid special color keywords", () => {
		it("should parse transparent", () => {
			const result = SpecialParser.parse("transparent");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "special",
					keyword: "transparent",
				});
			}
		});

		it("should parse currentcolor", () => {
			const result = SpecialParser.parse("currentcolor");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "special",
					keyword: "currentcolor",
				});
			}
		});
	});

	describe("case insensitivity", () => {
		it("should parse TRANSPARENT in uppercase", () => {
			const result = SpecialParser.parse("TRANSPARENT");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.keyword).toBe("transparent");
			}
		});

		it("should parse CurrentColor in mixed case", () => {
			const result = SpecialParser.parse("CurrentColor");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.keyword).toBe("currentcolor");
			}
		});

		it("should parse CURRENTCOLOR in uppercase", () => {
			const result = SpecialParser.parse("CURRENTCOLOR");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.keyword).toBe("currentcolor");
			}
		});

		it("should parse Transparent in mixed case", () => {
			const result = SpecialParser.parse("Transparent");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.keyword).toBe("transparent");
			}
		});
	});

	describe("whitespace handling", () => {
		it("should handle leading whitespace", () => {
			const result = SpecialParser.parse("  transparent");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.keyword).toBe("transparent");
			}
		});

		it("should handle trailing whitespace", () => {
			const result = SpecialParser.parse("currentcolor  ");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.keyword).toBe("currentcolor");
			}
		});

		it("should handle leading and trailing whitespace", () => {
			const result = SpecialParser.parse("  transparent  ");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.keyword).toBe("transparent");
			}
		});
	});

	describe("error handling", () => {
		it("should reject invalid keyword", () => {
			const result = SpecialParser.parse("invalid");
			expect(result.ok).toBe(false);
		});

		it("should reject named color", () => {
			const result = SpecialParser.parse("red");
			expect(result.ok).toBe(false);
		});

		it("should reject system color", () => {
			const result = SpecialParser.parse("ButtonText");
			expect(result.ok).toBe(false);
		});

		it("should reject empty string", () => {
			const result = SpecialParser.parse("");
			expect(result.ok).toBe(false);
		});

		it("should reject whitespace only", () => {
			const result = SpecialParser.parse("   ");
			expect(result.ok).toBe(false);
		});

		it("should reject partial match", () => {
			const result = SpecialParser.parse("trans");
			expect(result.ok).toBe(false);
		});

		it("should reject similar keyword", () => {
			const result = SpecialParser.parse("current");
			expect(result.ok).toBe(false);
		});
	});

	describe("round-trip (parse -> generate -> parse)", () => {
		it("should round-trip transparent", () => {
			const input = "transparent";
			const parsed = SpecialParser.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = SpecialGenerator.toCss(parsed.value);
				expect(generated).toBe("transparent");
				const reparsed = SpecialParser.parse(generated);
				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});

		it("should round-trip currentcolor", () => {
			const input = "currentcolor";
			const parsed = SpecialParser.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = SpecialGenerator.toCss(parsed.value);
				expect(generated).toBe("currentcolor");
				const reparsed = SpecialParser.parse(generated);
				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});

		it("should normalize case in round-trip", () => {
			const input = "TRANSPARENT";
			const parsed = SpecialParser.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = SpecialGenerator.toCss(parsed.value);
				expect(generated).toBe("transparent");
				const reparsed = SpecialParser.parse(generated);
				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});

		it("should normalize CurrentColor case in round-trip", () => {
			const input = "CurrentColor";
			const parsed = SpecialParser.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = SpecialGenerator.toCss(parsed.value);
				expect(generated).toBe("currentcolor");
				const reparsed = SpecialParser.parse(generated);
				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});
	});

	describe("semantic meaning", () => {
		it("should parse transparent (fully transparent color)", () => {
			const result = SpecialParser.parse("transparent");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("special");
				expect(result.value.keyword).toBe("transparent");
			}
		});

		it("should parse currentcolor (current color property value)", () => {
			const result = SpecialParser.parse("currentcolor");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("special");
				expect(result.value.keyword).toBe("currentcolor");
			}
		});
	});
});
