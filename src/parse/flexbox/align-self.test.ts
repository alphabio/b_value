// b_path:: src/parse/flexbox/align-self.test.ts
// Auto-generated from scripts/parse-test-generator/configs/flexbox/align-self.ts
//
// ⚠️  No spec references found in source file
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/flexbox/align-self";

describe("parse/flexbox/align-self - valid cases", () => {
	describe("valid-basic", () => {
		it("should parse auto keyword", () => {
			const result = Parser.parse("auto");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "align-self",
				value: "auto",
			});
		});

		it("should parse flex-start keyword", () => {
			const result = Parser.parse("flex-start");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "align-self",
				value: "flex-start",
			});
		});

		it("should parse flex-end keyword", () => {
			const result = Parser.parse("flex-end");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "align-self",
				value: "flex-end",
			});
		});

		it("should parse center keyword", () => {
			const result = Parser.parse("center");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "align-self",
				value: "center",
			});
		});

		it("should parse baseline keyword", () => {
			const result = Parser.parse("baseline");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "align-self",
				value: "baseline",
			});
		});

		it("should parse stretch keyword", () => {
			const result = Parser.parse("stretch");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "align-self",
				value: "stretch",
			});
		});
	});

	describe("valid-case", () => {
		it("should parse uppercase center", () => {
			const result = Parser.parse("CENTER");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "align-self",
				value: "center",
			});
		});
	});
});
