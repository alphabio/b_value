// b_path:: src/parse/visual/visibility.test.ts
// Auto-generated from scripts/parse-test-generator/configs/visual/visibility.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/visibility
// - W3C: https://www.w3.org/TR/css-display-3/#visibility
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/visual/visibility";

describe("parse/visual/visibility - valid cases", () => {
	describe("valid-basic", () => {
		it("should parse visible keyword", () => {
			const result = Parser.parse("visible");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "visibility",
				value: "visible",
			});
		});

		it("should parse hidden keyword", () => {
			const result = Parser.parse("hidden");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "visibility",
				value: "hidden",
			});
		});

		it("should parse collapse keyword", () => {
			const result = Parser.parse("collapse");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "visibility",
				value: "collapse",
			});
		});
	});

	describe("valid-case", () => {
		it("should parse uppercase visible", () => {
			const result = Parser.parse("VISIBLE");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "visibility",
				value: "visible",
			});
		});

		it("should parse mixed case hidden", () => {
			const result = Parser.parse("Hidden");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "visibility",
				value: "hidden",
			});
		});

		it("should parse uppercase collapse", () => {
			const result = Parser.parse("COLLAPSE");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "visibility",
				value: "collapse",
			});
		});
	});
});
