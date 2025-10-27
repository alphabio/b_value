// b_path:: src/parse/animation/iteration-count.test.ts
// Auto-generated from scripts/test-generator/configs/iteration-count.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/animation-iteration-count
// - W3C: https://www.w3.org/TR/css-animations-1/#animation-iteration-count
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/animation/iteration-count";

describe("parse/animation/iteration-count - valid cases", () => {
	describe("valid-number", () => {
		it("should parse integer", () => {
			const result = Parser.parse("1");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-iteration-count",
				counts: [
					{
						type: "number",
						value: 1,
					},
				],
			});
		});

		it("should parse zero", () => {
			const result = Parser.parse("0");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-iteration-count",
				counts: [
					{
						type: "number",
						value: 0,
					},
				],
			});
		});

		it("should parse multiple iterations", () => {
			const result = Parser.parse("3");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-iteration-count",
				counts: [
					{
						type: "number",
						value: 3,
					},
				],
			});
		});

		it("should parse larger count", () => {
			const result = Parser.parse("10");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-iteration-count",
				counts: [
					{
						type: "number",
						value: 10,
					},
				],
			});
		});
	});

	describe("valid-decimal", () => {
		it("should parse half iteration", () => {
			const result = Parser.parse("0.5");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-iteration-count",
				counts: [
					{
						type: "number",
						value: 0.5,
					},
				],
			});
		});

		it("should parse decimal iterations", () => {
			const result = Parser.parse("2.5");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-iteration-count",
				counts: [
					{
						type: "number",
						value: 2.5,
					},
				],
			});
		});

		it("should parse small decimal", () => {
			const result = Parser.parse("0.1");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-iteration-count",
				counts: [
					{
						type: "number",
						value: 0.1,
					},
				],
			});
		});
	});

	describe("valid-keyword", () => {
		it("should parse infinite keyword", () => {
			const result = Parser.parse("infinite");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-iteration-count",
				counts: [
					{
						type: "infinite",
					},
				],
			});
		});

		it("should parse case insensitive", () => {
			const result = Parser.parse("INFINITE");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-iteration-count",
				counts: [
					{
						type: "infinite",
					},
				],
			});
		});

		it("should parse mixed case", () => {
			const result = Parser.parse("Infinite");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-iteration-count",
				counts: [
					{
						type: "infinite",
					},
				],
			});
		});
	});

	describe("valid-list", () => {
		it("should parse multiple numbers", () => {
			const result = Parser.parse("1, 2, 3");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-iteration-count",
				counts: [
					{
						type: "number",
						value: 1,
					},
					{
						type: "number",
						value: 2,
					},
					{
						type: "number",
						value: 3,
					},
				],
			});
		});

		it("should parse infinite with number", () => {
			const result = Parser.parse("infinite, 2");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-iteration-count",
				counts: [
					{
						type: "infinite",
					},
					{
						type: "number",
						value: 2,
					},
				],
			});
		});

		it("should parse mixed values", () => {
			const result = Parser.parse("1, infinite, 0.5");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-iteration-count",
				counts: [
					{
						type: "number",
						value: 1,
					},
					{
						type: "infinite",
					},
					{
						type: "number",
						value: 0.5,
					},
				],
			});
		});

		it("should parse list with whitespace", () => {
			const result = Parser.parse("1 , 2");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "animation-iteration-count",
				counts: [
					{
						type: "number",
						value: 1,
					},
					{
						type: "number",
						value: 2,
					},
				],
			});
		});
	});
});
