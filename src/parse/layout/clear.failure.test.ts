// b_path:: src/parse/layout/clear.failure.test.ts
// Auto-generated from scripts/test-generator/configs/clear.ts
//
// ⚠️  No spec references found in source file
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/layout/clear";

describe("parse/layout/clear - invalid cases", () => {
	describe("invalid-empty", () => {
		it("should reject empty value", () => {
			const result = Parser.parse("");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe(
				'Invalid clear value: "". Expected: left, right, both, none, inline-start, or inline-end',
			);
		});
	});

	describe("invalid-keyword", () => {
		it("should reject invalid keyword", () => {
			const result = Parser.parse("center");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe(
				'Invalid clear value: "center". Expected: left, right, both, none, inline-start, or inline-end',
			);
		});

		it("should reject wrong keyword", () => {
			const result = Parser.parse("top");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe(
				'Invalid clear value: "top". Expected: left, right, both, none, inline-start, or inline-end',
			);
		});
	});

	describe("invalid-type", () => {
		it("should reject number value", () => {
			const result = Parser.parse("0");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe(
				'Invalid clear value: "0". Expected: left, right, both, none, inline-start, or inline-end',
			);
		});
	});

	describe("invalid-multiple", () => {
		it("should reject multiple values", () => {
			const result = Parser.parse("none, left");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe(
				'Invalid clear value: "none, left". Expected: left, right, both, none, inline-start, or inline-end',
			);
		});
	});
});
