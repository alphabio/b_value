// b_path:: src/parse/layout/float.failure.test.ts
// Auto-generated from scripts/test-generator/configs/float.ts
//
// ⚠️  No spec references found in source file
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/layout/float";

describe("parse/layout/float - invalid cases", () => {
	describe("invalid-empty", () => {
		it("should reject empty value", () => {
			const result = Parser.parse("");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe('Invalid float value: "". Expected: left, right, none, inline-start, or inline-end');
		});
	});

	describe("invalid-keyword", () => {
		it("should reject invalid keyword", () => {
			const result = Parser.parse("center");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe(
				'Invalid float value: "center". Expected: left, right, none, inline-start, or inline-end',
			);
		});

		it("should reject wrong keyword", () => {
			const result = Parser.parse("both");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe(
				'Invalid float value: "both". Expected: left, right, none, inline-start, or inline-end',
			);
		});
	});

	describe("invalid-type", () => {
		it("should reject number value", () => {
			const result = Parser.parse("0");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe('Invalid float value: "0". Expected: left, right, none, inline-start, or inline-end');
		});
	});

	describe("invalid-multiple", () => {
		it("should reject multiple values", () => {
			const result = Parser.parse("left, right");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe(
				'Invalid float value: "left, right". Expected: left, right, none, inline-start, or inline-end',
			);
		});
	});
});
