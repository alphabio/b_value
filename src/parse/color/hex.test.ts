// b_path:: src/parse/color/hex.test.ts
import { describe, expect, it } from "vitest";
import * as Gen from "@/generate/color/hex";
import * as Hex from "./hex";

describe("hex color parser", () => {
	describe("3-digit hex (#RGB)", () => {
		it("parses #abc", () => {
			const result = Hex.parse("#abc");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("hex");
				expect(result.value.value).toBe("#AABBCC");
			}
		});

		it("parses #000", () => {
			const result = Hex.parse("#000");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toBe("#000000");
			}
		});

		it("parses #fff", () => {
			const result = Hex.parse("#fff");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toBe("#FFFFFF");
			}
		});

		it("parses #123", () => {
			const result = Hex.parse("#123");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toBe("#112233");
			}
		});
	});

	describe("4-digit hex (#RGBA)", () => {
		it("parses #abcd", () => {
			const result = Hex.parse("#abcd");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("hex");
				expect(result.value.value).toBe("#AABBCCDD");
			}
		});

		it("parses #0008", () => {
			const result = Hex.parse("#0008");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toBe("#00000088");
			}
		});

		it("parses #fff0", () => {
			const result = Hex.parse("#fff0");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toBe("#FFFFFF00");
			}
		});
	});

	describe("6-digit hex (#RRGGBB)", () => {
		it("parses #ff5733", () => {
			const result = Hex.parse("#ff5733");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("hex");
				expect(result.value.value).toBe("#FF5733");
			}
		});

		it("parses #000000", () => {
			const result = Hex.parse("#000000");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toBe("#000000");
			}
		});

		it("parses #FFFFFF", () => {
			const result = Hex.parse("#FFFFFF");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toBe("#FFFFFF");
			}
		});

		it("preserves case by uppercasing", () => {
			const result = Hex.parse("#aAbBcC");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toBe("#AABBCC");
			}
		});
	});

	describe("8-digit hex (#RRGGBBAA)", () => {
		it("parses #ff573380", () => {
			const result = Hex.parse("#ff573380");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("hex");
				expect(result.value.value).toBe("#FF573380");
			}
		});

		it("parses #00000000", () => {
			const result = Hex.parse("#00000000");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toBe("#00000000");
			}
		});

		it("parses #FFFFFFFF", () => {
			const result = Hex.parse("#FFFFFFFF");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toBe("#FFFFFFFF");
			}
		});

		it("parses #ff5733ff (opaque)", () => {
			const result = Hex.parse("#ff5733ff");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toBe("#FF5733FF");
			}
		});
	});

	describe("error handling", () => {
		it("rejects missing #", () => {
			const result = Hex.parse("ff5733");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toBe("Hex color must start with #");
			}
		});

		it("rejects invalid length (1 char)", () => {
			const result = Hex.parse("#f");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toBe("Hex color must be #RGB, #RRGGBB, #RGBA, or #RRGGBBAA");
			}
		});

		it("rejects invalid length (2 chars)", () => {
			const result = Hex.parse("#ff");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toBe("Hex color must be #RGB, #RRGGBB, #RGBA, or #RRGGBBAA");
			}
		});

		it("rejects invalid length (5 chars)", () => {
			const result = Hex.parse("#ff573");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toBe("Hex color must be #RGB, #RRGGBB, #RGBA, or #RRGGBBAA");
			}
		});

		it("rejects invalid length (7 chars)", () => {
			const result = Hex.parse("#ff57338");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toBe("Hex color must be #RGB, #RRGGBB, #RGBA, or #RRGGBBAA");
			}
		});

		it("rejects invalid characters in 3-digit", () => {
			const result = Hex.parse("#ggf");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toBe("Invalid hex color format");
			}
		});

		it("rejects invalid characters in 4-digit", () => {
			const result = Hex.parse("#ggff");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toBe("Invalid hex color format");
			}
		});

		it("rejects invalid characters in 6-digit", () => {
			const result = Hex.parse("#gg5733");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toBe("Invalid hex color format");
			}
		});

		it("rejects invalid characters in 8-digit", () => {
			const result = Hex.parse("#gg573380");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toBe("Invalid hex color format");
			}
		});

		it("rejects special characters", () => {
			const result = Hex.parse("#ff@733");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toBe("Invalid hex color format");
			}
		});
	});

	describe("round-trip accuracy", () => {
		it("maintains 3-digit normalized to 6-digit", () => {
			const result = Hex.parse("#abc");
			expect(result.ok).toBe(true);
			if (result.ok) {
				const css = Gen.toCss(result.value);
				expect(css).toBe("#AABBCC");
			}
		});

		it("maintains 4-digit normalized to 8-digit", () => {
			const result = Hex.parse("#abcd");
			expect(result.ok).toBe(true);
			if (result.ok) {
				const css = Gen.toCss(result.value);
				expect(css).toBe("#AABBCCDD");
			}
		});

		it("maintains 6-digit uppercase", () => {
			const original = "#FF5733";
			const result = Hex.parse(original);
			expect(result.ok).toBe(true);
			if (result.ok) {
				const css = Gen.toCss(result.value);
				expect(css).toBe(original);
			}
		});

		it("maintains 8-digit uppercase", () => {
			const original = "#FF573380";
			const result = Hex.parse(original);
			expect(result.ok).toBe(true);
			if (result.ok) {
				const css = Gen.toCss(result.value);
				expect(css).toBe(original);
			}
		});

		it("normalizes lowercase to uppercase", () => {
			const result = Hex.parse("#ff5733");
			expect(result.ok).toBe(true);
			if (result.ok) {
				const css = Gen.toCss(result.value);
				expect(css).toBe("#FF5733");
			}
		});
	});
});
