// b_path:: src/parse/layout/float.test.ts
// Auto-generated from scripts/parse-test-generator/configs/layout/float.ts
//
// ⚠️  No spec references found in source file
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/layout/float";

describe("parse/layout/float - valid cases", () => {
	describe("valid-basic", () => {
		it("should parse none keyword", () => {
			const result = Parser.parse("none");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "float",
				value: "none",
			});
		});

		it("should parse left keyword", () => {
			const result = Parser.parse("left");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "float",
				value: "left",
			});
		});

		it("should parse right keyword", () => {
			const result = Parser.parse("right");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "float",
				value: "right",
			});
		});
	});

	describe("valid-logical", () => {
		it("should parse inline-start keyword", () => {
			const result = Parser.parse("inline-start");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "float",
				value: "inline-start",
			});
		});

		it("should parse inline-end keyword", () => {
			const result = Parser.parse("inline-end");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "float",
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
				kind: "float",
				value: "none",
			});
		});

		it("should parse mixed case left", () => {
			const result = Parser.parse("Left");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "float",
				value: "left",
			});
		});
	});
});
