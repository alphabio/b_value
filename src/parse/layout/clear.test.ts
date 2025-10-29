// b_path:: src/parse/layout/clear.test.ts
// Auto-generated from scripts/parse-test-generator/configs/layout/clear.ts
//
// ⚠️  No spec references found in source file
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/layout/clear";

describe("parse/layout/clear - valid cases", () => {
	describe("valid-basic", () => {
		it("should parse none keyword", () => {
			const result = Parser.parse("none");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "clear",
				value: "none",
			});
		});

		it("should parse left keyword", () => {
			const result = Parser.parse("left");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "clear",
				value: "left",
			});
		});

		it("should parse right keyword", () => {
			const result = Parser.parse("right");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "clear",
				value: "right",
			});
		});

		it("should parse both keyword", () => {
			const result = Parser.parse("both");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "clear",
				value: "both",
			});
		});
	});

	describe("valid-logical", () => {
		it("should parse inline-start keyword", () => {
			const result = Parser.parse("inline-start");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "clear",
				value: "inline-start",
			});
		});

		it("should parse inline-end keyword", () => {
			const result = Parser.parse("inline-end");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "clear",
				value: "inline-end",
			});
		});
	});

	describe("valid-case", () => {
		it("should parse uppercase none", () => {
			const result = Parser.parse("NONE");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "clear",
				value: "none",
			});
		});

		it("should parse mixed case left", () => {
			const result = Parser.parse("Left");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "clear",
				value: "left",
			});
		});
	});
});
