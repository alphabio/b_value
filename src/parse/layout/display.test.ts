// b_path:: src/parse/layout/display.test.ts
// Auto-generated from scripts/parse-test-generator/configs/layout/display.ts
//
// Spec references:
// - MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/display
// - W3C: https://www.w3.org/TR/css-display-3/
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/layout/display";

describe("parse/layout/display - valid cases", () => {
	describe("valid-outside", () => {
		it("should parse block keyword", () => {
			const result = Parser.parse("block");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "display",
				value: "block",
			});
		});

		it("should parse inline keyword", () => {
			const result = Parser.parse("inline");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "display",
				value: "inline",
			});
		});
	});

	describe("valid-box", () => {
		it("should parse none keyword", () => {
			const result = Parser.parse("none");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "display",
				value: "none",
			});
		});

		it("should parse contents keyword", () => {
			const result = Parser.parse("contents");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "display",
				value: "contents",
			});
		});
	});

	describe("valid-inside", () => {
		it("should parse flex keyword", () => {
			const result = Parser.parse("flex");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "display",
				value: "flex",
			});
		});

		it("should parse grid keyword", () => {
			const result = Parser.parse("grid");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "display",
				value: "grid",
			});
		});

		it("should parse table keyword", () => {
			const result = Parser.parse("table");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "display",
				value: "table",
			});
		});

		it("should parse flow-root keyword", () => {
			const result = Parser.parse("flow-root");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "display",
				value: "flow-root",
			});
		});
	});

	describe("valid-legacy", () => {
		it("should parse inline-block keyword", () => {
			const result = Parser.parse("inline-block");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "display",
				value: "inline-block",
			});
		});

		it("should parse inline-flex keyword", () => {
			const result = Parser.parse("inline-flex");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "display",
				value: "inline-flex",
			});
		});

		it("should parse inline-grid keyword", () => {
			const result = Parser.parse("inline-grid");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "display",
				value: "inline-grid",
			});
		});
	});

	describe("valid-internal", () => {
		it("should parse table-row keyword", () => {
			const result = Parser.parse("table-row");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "display",
				value: "table-row",
			});
		});

		it("should parse table-cell keyword", () => {
			const result = Parser.parse("table-cell");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "display",
				value: "table-cell",
			});
		});
	});

	describe("valid-list", () => {
		it("should parse list-item keyword", () => {
			const result = Parser.parse("list-item");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "display",
				value: "list-item",
			});
		});
	});

	describe("valid-case", () => {
		it("should parse uppercase flex", () => {
			const result = Parser.parse("FLEX");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "display",
				value: "flex",
			});
		});

		it("should parse mixed case block", () => {
			const result = Parser.parse("Block");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "display",
				value: "block",
			});
		});
	});
});
