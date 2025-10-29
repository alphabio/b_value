// b_path:: src/parse/flexbox/flex-direction.test.ts
// Auto-generated from scripts/parse-test-generator/configs/flexbox/flex-direction.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/flexbox/flex-direction";

describe("parse/flexbox/flex-direction - valid cases", () => {
	describe("valid-basic", () => {
		it("should parse row keyword", () => {
			const result = Parser.parse("row");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "flex-direction",
				value: "row",
			});
		});

		it("should parse row-reverse keyword", () => {
			const result = Parser.parse("row-reverse");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "flex-direction",
				value: "row-reverse",
			});
		});

		it("should parse column keyword", () => {
			const result = Parser.parse("column");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "flex-direction",
				value: "column",
			});
		});

		it("should parse column-reverse keyword", () => {
			const result = Parser.parse("column-reverse");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "flex-direction",
				value: "column-reverse",
			});
		});
	});

	describe("valid-case", () => {
		it("should parse uppercase row", () => {
			const result = Parser.parse("ROW");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "flex-direction",
				value: "row",
			});
		});
	});
});
