// b_path:: src/parse/background/size.test.ts

import { describe, expect, it } from "vitest";
import * as Size from "./size";

describe("parse/background/size", () => {
	describe("keyword values", () => {
		it("parses cover", () => {
			const result = Size.parse("cover");
			expect(result).toEqual({ ok: true, value: "cover", error: undefined });
		});

		it("parses contain", () => {
			const result = Size.parse("contain");
			expect(result).toEqual({ ok: true, value: "contain", error: undefined });
		});

		it("parses auto", () => {
			const result = Size.parse("auto");
			expect(result).toEqual({ ok: true, value: "auto", error: undefined });
		});
	});

	describe("length values", () => {
		it("parses pixel value", () => {
			const result = Size.parse("100px");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ value: 100, unit: "px" });
			}
		});

		it("parses percentage value", () => {
			const result = Size.parse("50%");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ value: 50, unit: "%" });
			}
		});

		it("parses em value", () => {
			const result = Size.parse("2em");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ value: 2, unit: "em" });
			}
		});
	});

	describe("normalization", () => {
		it("handles whitespace", () => {
			const result = Size.parse("  cover  ");
			expect(result).toEqual({ ok: true, value: "cover", error: undefined });
		});
	});

	describe("invalid values", () => {
		it("rejects invalid keyword", () => {
			const result = Size.parse("invalid");
			expect(result.ok).toBe(false);
		});

		it("rejects empty string", () => {
			const result = Size.parse("");
			expect(result.ok).toBe(false);
		});
	});
});
