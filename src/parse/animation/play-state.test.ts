// b_path:: src/parse/animation/play-state.test.ts
// Auto-generated from scripts/parse-test-generator/configs/animation/play-state.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-play-state
// - W3C: https://www.w3.org/TR/css-animations-1/#animation-play-state
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/animation/play-state";

describe("parse/animation/play-state - valid cases", () => {
	describe("valid-keyword", () => {
		it("should parse running keyword", () => {
			const result = Parser.parse("running");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-play-state",
				states: ["running"],
			});
		});

		it("should parse paused keyword", () => {
			const result = Parser.parse("paused");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-play-state",
				states: ["paused"],
			});
		});

		it("should parse case insensitive", () => {
			const result = Parser.parse("RUNNING");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-play-state",
				states: ["running"],
			});
		});

		it("should parse mixed case", () => {
			const result = Parser.parse("Paused");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-play-state",
				states: ["paused"],
			});
		});
	});

	describe("valid-list", () => {
		it("should parse multiple keywords", () => {
			const result = Parser.parse("running, paused");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-play-state",
				states: ["running", "paused"],
			});
		});

		it("should parse three keywords", () => {
			const result = Parser.parse("paused, running, paused");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-play-state",
				states: ["paused", "running", "paused"],
			});
		});
	});
});
