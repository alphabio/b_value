// b_path:: src/parse/flexbox/flex-wrap.test.ts
// Auto-generated from scripts/parse-test-generator/configs/flexbox/flex-wrap.ts
//
// ⚠️  No spec references found in source file
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/flexbox/flex-wrap";

describe("parse/flexbox/flex-wrap - valid cases", () => {
	describe("valid-basic", () => {
		it("should parse nowrap keyword", () => {
			const result = Parser.parse("nowrap");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "flex-wrap",
				value: "nowrap",
			});
		});

		it("should parse wrap keyword", () => {
			const result = Parser.parse("wrap");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "flex-wrap",
				value: "wrap",
			});
		});

		it("should parse wrap-reverse keyword", () => {
			const result = Parser.parse("wrap-reverse");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "flex-wrap",
				value: "wrap-reverse",
			});
		});
	});

	describe("valid-case", () => {
		it("should parse uppercase wrap", () => {
			const result = Parser.parse("WRAP");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "flex-wrap",
				value: "wrap",
			});
		});
	});
});
