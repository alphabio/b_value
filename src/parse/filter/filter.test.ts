// b_path:: src/parse/filter/filter.test.ts

import { describe, expect, it } from "vitest";
import { parse } from "./filter";

describe("parse() - unified filter dispatcher", () => {
	describe("auto-detection", () => {
		it("detects blur()", () => {
			const result = parse("blur(5px)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("blur");
			}
		});

		it("detects brightness()", () => {
			const result = parse("brightness(1.5)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("brightness");
			}
		});

		it("detects contrast()", () => {
			const result = parse("contrast(200%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("contrast");
			}
		});

		it("detects drop-shadow()", () => {
			const result = parse("drop-shadow(2px 2px 4px black)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("drop-shadow");
			}
		});

		it("detects grayscale()", () => {
			const result = parse("grayscale(50%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("grayscale");
			}
		});

		it("detects hue-rotate()", () => {
			const result = parse("hue-rotate(90deg)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("hue-rotate");
			}
		});

		it("detects invert()", () => {
			const result = parse("invert(100%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("invert");
			}
		});

		it("detects opacity()", () => {
			const result = parse("opacity(0.5)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("opacity");
			}
		});

		it("detects saturate()", () => {
			const result = parse("saturate(150%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("saturate");
			}
		});

		it("detects sepia()", () => {
			const result = parse("sepia(75%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("sepia");
			}
		});

		it("detects url()", () => {
			const result = parse("url(#filter-id)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("url");
			}
		});
	});

	describe("error handling", () => {
		it("rejects unknown filter function", () => {
			const result = parse("unknown(50%)");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Unknown filter function");
			}
		});

		it("rejects invalid syntax", () => {
			const result = parse("not-a-filter");
			expect(result.ok).toBe(false);
		});

		it("rejects empty value", () => {
			const result = parse("");
			expect(result.ok).toBe(false);
		});
	});

	describe("case insensitivity", () => {
		it("handles uppercase function names", () => {
			const result = parse("BLUR(5px)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("blur");
			}
		});

		it("handles mixed case function names", () => {
			const result = parse("BrIgHtNeSs(1.5)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("brightness");
			}
		});
	});
});
