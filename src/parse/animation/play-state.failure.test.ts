// b_path:: src/parse/animation/play-state.failure.test.ts
// Auto-generated from scripts/test-generator/configs/play-state.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-play-state
// - W3C: https://www.w3.org/TR/css-animations-1/#animation-play-state
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/animation/play-state";

describe("parse/animation/play-state - invalid cases", () => {
	describe("invalid-keyword", () => {
		it("should reject invalid keyword", () => {
			const result = Parser.parse("invalid");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe(
				"animation-play-state: Invalid animation-play-state keyword: invalid. Expected one of: running, paused",
			);
		});

		it("should reject wrong keyword", () => {
			const result = Parser.parse("stopped");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe(
				"animation-play-state: Invalid animation-play-state keyword: stopped. Expected one of: running, paused",
			);
		});
	});

	describe("invalid-type", () => {
		it("should reject number", () => {
			const result = Parser.parse("1");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("animation-play-state: Expected play state keyword, got: Number");
		});
	});

	describe("invalid-empty", () => {
		it("should reject empty value", () => {
			const result = Parser.parse("");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("animation-play-state: Empty value");
		});
	});

	describe("invalid-comma", () => {
		it("should reject trailing comma", () => {
			const result = Parser.parse("running,");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toBe("animation-play-state: Empty value");
		});
	});
});
