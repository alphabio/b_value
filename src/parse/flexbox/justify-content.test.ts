// b_path:: src/parse/flexbox/justify-content.test.ts
// Auto-generated from scripts/parse-test-generator/configs/flexbox/justify-content.ts
//
// ⚠️  No spec references found in source file
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/flexbox/justify-content";

describe("parse/flexbox/justify-content - valid cases", () => {
	describe("valid-basic", () => {
		it("should parse flex-start keyword", () => {
			const result = Parser.parse("flex-start");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "justify-content",
				value: "flex-start",
			});
		});

		it("should parse flex-end keyword", () => {
			const result = Parser.parse("flex-end");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "justify-content",
				value: "flex-end",
			});
		});

		it("should parse center keyword", () => {
			const result = Parser.parse("center");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "justify-content",
				value: "center",
			});
		});

		it("should parse space-between keyword", () => {
			const result = Parser.parse("space-between");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "justify-content",
				value: "space-between",
			});
		});

		it("should parse space-around keyword", () => {
			const result = Parser.parse("space-around");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "justify-content",
				value: "space-around",
			});
		});

		it("should parse space-evenly keyword", () => {
			const result = Parser.parse("space-evenly");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "justify-content",
				value: "space-evenly",
			});
		});
	});

	describe("valid-logical", () => {
		it("should parse start keyword", () => {
			const result = Parser.parse("start");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "justify-content",
				value: "start",
			});
		});

		it("should parse end keyword", () => {
			const result = Parser.parse("end");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "justify-content",
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
				kind: "justify-content",
				value: "center",
			});
		});
	});
});
