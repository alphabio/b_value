// b_path:: src/parse/transition/timing-function.test.ts
// Auto-generated from scripts/parse-test-generator/configs/transition/timing-function.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function
// - W3C: https://www.w3.org/TR/css-transitions-1/#transition-timing-function-property
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/transition/timing-function";

describe("parse/transition/timing-function - valid cases", () => {
	describe("valid-keyword", () => {
		it("should parse ease keyword", () => {
			const result = Parser.parse("ease");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "transition-timing-function",
				functions: ["ease"],
			});
		});

		it("should parse linear keyword", () => {
			const result = Parser.parse("linear");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "transition-timing-function",
				functions: ["linear"],
			});
		});

		it("should parse ease-in keyword", () => {
			const result = Parser.parse("ease-in");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "transition-timing-function",
				functions: ["ease-in"],
			});
		});

		it("should parse ease-out keyword", () => {
			const result = Parser.parse("ease-out");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "transition-timing-function",
				functions: ["ease-out"],
			});
		});

		it("should parse ease-in-out keyword", () => {
			const result = Parser.parse("ease-in-out");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "transition-timing-function",
				functions: ["ease-in-out"],
			});
		});

		it("should parse step-start keyword", () => {
			const result = Parser.parse("step-start");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "transition-timing-function",
				functions: ["step-start"],
			});
		});

		it("should parse step-end keyword", () => {
			const result = Parser.parse("step-end");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "transition-timing-function",
				functions: ["step-end"],
			});
		});

		it("should parse case insensitive keyword", () => {
			const result = Parser.parse("EASE");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "transition-timing-function",
				functions: ["ease"],
			});
		});
	});

	describe("valid-bezier", () => {
		it("should parse basic bezier", () => {
			const result = Parser.parse("cubic-bezier(0, 0, 1, 1)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "transition-timing-function",
				functions: [
					{
						type: "cubic-bezier",
						x1: 0,
						y1: 0,
						x2: 1,
						y2: 1,
					},
				],
			});
		});

		it("should parse custom bezier", () => {
			const result = Parser.parse("cubic-bezier(0.42, 0, 0.58, 1)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "transition-timing-function",
				functions: [
					{
						type: "cubic-bezier",
						x1: 0.42,
						y1: 0,
						x2: 0.58,
						y2: 1,
					},
				],
			});
		});

		it("should parse bezier with Y outside 0-1", () => {
			const result = Parser.parse("cubic-bezier(0, -2, 1, 3)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "transition-timing-function",
				functions: [
					{
						type: "cubic-bezier",
						x1: 0,
						y1: -2,
						x2: 1,
						y2: 3,
					},
				],
			});
		});

		it("should parse ease bezier values", () => {
			const result = Parser.parse("cubic-bezier(0.25, 0.1, 0.25, 1)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "transition-timing-function",
				functions: [
					{
						type: "cubic-bezier",
						x1: 0.25,
						y1: 0.1,
						x2: 0.25,
						y2: 1,
					},
				],
			});
		});

		it("should parse reverse bezier", () => {
			const result = Parser.parse("cubic-bezier(1, 0, 0, 1)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "transition-timing-function",
				functions: [
					{
						type: "cubic-bezier",
						x1: 1,
						y1: 0,
						x2: 0,
						y2: 1,
					},
				],
			});
		});
	});

	describe("valid-steps", () => {
		it("should parse single step", () => {
			const result = Parser.parse("steps(1)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "transition-timing-function",
				functions: [
					{
						type: "steps",
						steps: 1,
					},
				],
			});
		});

		it("should parse multiple steps", () => {
			const result = Parser.parse("steps(4)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "transition-timing-function",
				functions: [
					{
						type: "steps",
						steps: 4,
					},
				],
			});
		});

		it("should parse steps with jump-start", () => {
			const result = Parser.parse("steps(4, jump-start)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "transition-timing-function",
				functions: [
					{
						type: "steps",
						steps: 4,
						position: "jump-start",
					},
				],
			});
		});

		it("should parse steps with jump-end", () => {
			const result = Parser.parse("steps(10, jump-end)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "transition-timing-function",
				functions: [
					{
						type: "steps",
						steps: 10,
						position: "jump-end",
					},
				],
			});
		});

		it("should parse steps with jump-none", () => {
			const result = Parser.parse("steps(5, jump-none)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "transition-timing-function",
				functions: [
					{
						type: "steps",
						steps: 5,
						position: "jump-none",
					},
				],
			});
		});

		it("should parse steps with jump-both", () => {
			const result = Parser.parse("steps(3, jump-both)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "transition-timing-function",
				functions: [
					{
						type: "steps",
						steps: 3,
						position: "jump-both",
					},
				],
			});
		});

		it("should parse steps with legacy start", () => {
			const result = Parser.parse("steps(2, start)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "transition-timing-function",
				functions: [
					{
						type: "steps",
						steps: 2,
						position: "start",
					},
				],
			});
		});

		it("should parse steps with legacy end", () => {
			const result = Parser.parse("steps(2, end)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "transition-timing-function",
				functions: [
					{
						type: "steps",
						steps: 2,
						position: "end",
					},
				],
			});
		});
	});

	describe("valid-list", () => {
		it("should parse multiple keywords", () => {
			const result = Parser.parse("ease, linear");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "transition-timing-function",
				functions: ["ease", "linear"],
			});
		});

		it("should parse mixed functions", () => {
			const result = Parser.parse("ease-in, cubic-bezier(0, 0, 1, 1), steps(2)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "transition-timing-function",
				functions: [
					"ease-in",
					{
						type: "cubic-bezier",
						x1: 0,
						y1: 0,
						x2: 1,
						y2: 1,
					},
					{
						type: "steps",
						steps: 2,
					},
				],
			});
		});

		it("should parse list with whitespace", () => {
			const result = Parser.parse("ease , linear");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "transition-timing-function",
				functions: ["ease", "linear"],
			});
		});
	});
});
