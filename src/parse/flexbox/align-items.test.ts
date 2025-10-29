// b_path:: src/parse/flexbox/align-items.test.ts
// Auto-generated from scripts/parse-test-generator/configs/flexbox/align-items.ts
//
// ⚠️  No spec references found in source file
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/flexbox/align-items";

describe("parse/flexbox/align-items - valid cases", () => {
	describe("valid-basic", () => {
		it("should parse flex-start keyword", () => {
			const result = Parser.parse("flex-start");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "align-items",
				value: "flex-start",
			});
		});

		it("should parse flex-end keyword", () => {
			const result = Parser.parse("flex-end");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "align-items",
				value: "flex-end",
			});
		});

		it("should parse center keyword", () => {
			const result = Parser.parse("center");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "align-items",
				value: "center",
			});
		});

		it("should parse baseline keyword", () => {
			const result = Parser.parse("baseline");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "align-items",
				value: "baseline",
			});
		});

		it("should parse stretch keyword", () => {
			const result = Parser.parse("stretch");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "align-items",
				value: "stretch",
			});
		});
	});

	describe("valid-logical", () => {
		it("should parse start keyword", () => {
			const result = Parser.parse("start");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "align-items",
				value: "start",
			});
		});

		it("should parse end keyword", () => {
			const result = Parser.parse("end");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "align-items",
				value: "end",
			});
		});
	});

	describe("valid-case", () => {
		it("should parse uppercase center", () => {
			const result = Parser.parse("CENTER");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "align-items",
				value: "center",
			});
		});
	});
});
