// b_path:: src/parse/layout/cursor.test.ts
// Auto-generated from scripts/parse-test-generator/configs/layout/cursor.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/cursor
// - W3C: https://www.w3.org/TR/css-ui-4/#cursor
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/layout/cursor";

describe("parse/layout/cursor - valid cases", () => {
	describe("valid-basic", () => {
		it("should parse auto keyword", () => {
			const result = Parser.parse("auto");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "cursor",
				value: "auto",
			});
		});

		it("should parse default keyword", () => {
			const result = Parser.parse("default");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "cursor",
				value: "default",
			});
		});

		it("should parse pointer keyword", () => {
			const result = Parser.parse("pointer");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "cursor",
				value: "pointer",
			});
		});

		it("should parse text keyword", () => {
			const result = Parser.parse("text");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "cursor",
				value: "text",
			});
		});

		it("should parse move keyword", () => {
			const result = Parser.parse("move");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "cursor",
				value: "move",
			});
		});

		it("should parse wait keyword", () => {
			const result = Parser.parse("wait");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "cursor",
				value: "wait",
			});
		});

		it("should parse help keyword", () => {
			const result = Parser.parse("help");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "cursor",
				value: "help",
			});
		});

		it("should parse none keyword", () => {
			const result = Parser.parse("none");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "cursor",
				value: "none",
			});
		});
	});

	describe("valid-resize", () => {
		it("should parse n-resize keyword", () => {
			const result = Parser.parse("n-resize");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "cursor",
				value: "n-resize",
			});
		});

		it("should parse e-resize keyword", () => {
			const result = Parser.parse("e-resize");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "cursor",
				value: "e-resize",
			});
		});

		it("should parse s-resize keyword", () => {
			const result = Parser.parse("s-resize");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "cursor",
				value: "s-resize",
			});
		});

		it("should parse w-resize keyword", () => {
			const result = Parser.parse("w-resize");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "cursor",
				value: "w-resize",
			});
		});

		it("should parse ne-resize keyword", () => {
			const result = Parser.parse("ne-resize");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "cursor",
				value: "ne-resize",
			});
		});

		it("should parse nw-resize keyword", () => {
			const result = Parser.parse("nw-resize");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "cursor",
				value: "nw-resize",
			});
		});

		it("should parse se-resize keyword", () => {
			const result = Parser.parse("se-resize");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "cursor",
				value: "se-resize",
			});
		});

		it("should parse sw-resize keyword", () => {
			const result = Parser.parse("sw-resize");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "cursor",
				value: "sw-resize",
			});
		});

		it("should parse ew-resize keyword", () => {
			const result = Parser.parse("ew-resize");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "cursor",
				value: "ew-resize",
			});
		});

		it("should parse ns-resize keyword", () => {
			const result = Parser.parse("ns-resize");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "cursor",
				value: "ns-resize",
			});
		});
	});

	describe("valid-action", () => {
		it("should parse grab keyword", () => {
			const result = Parser.parse("grab");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "cursor",
				value: "grab",
			});
		});

		it("should parse grabbing keyword", () => {
			const result = Parser.parse("grabbing");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "cursor",
				value: "grabbing",
			});
		});

		it("should parse not-allowed keyword", () => {
			const result = Parser.parse("not-allowed");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "cursor",
				value: "not-allowed",
			});
		});

		it("should parse zoom-in keyword", () => {
			const result = Parser.parse("zoom-in");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "cursor",
				value: "zoom-in",
			});
		});

		it("should parse zoom-out keyword", () => {
			const result = Parser.parse("zoom-out");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "cursor",
				value: "zoom-out",
			});
		});
	});

	describe("valid-case", () => {
		it("should parse uppercase pointer", () => {
			const result = Parser.parse("POINTER");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "cursor",
				value: "pointer",
			});
		});

		it("should parse mixed case move", () => {
			const result = Parser.parse("Move");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "cursor",
				value: "move",
			});
		});
	});
});
