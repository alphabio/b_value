// b_path:: src/parse/layout/overflow.test.ts

import { describe, expect, it } from "vitest";
import * as Overflow from "./overflow";

describe("parse/layout/overflow", () => {
	describe("valid values", () => {
		it("parses visible", () => {
			const result = Overflow.parse("visible");
			expect(result).toEqual({ ok: true, value: "visible", error: undefined });
		});

		it("parses hidden", () => {
			const result = Overflow.parse("hidden");
			expect(result).toEqual({ ok: true, value: "hidden", error: undefined });
		});

		it("parses clip", () => {
			const result = Overflow.parse("clip");
			expect(result).toEqual({ ok: true, value: "clip", error: undefined });
		});

		it("parses scroll", () => {
			const result = Overflow.parse("scroll");
			expect(result).toEqual({ ok: true, value: "scroll", error: undefined });
		});

		it("parses auto", () => {
			const result = Overflow.parse("auto");
			expect(result).toEqual({ ok: true, value: "auto", error: undefined });
		});
	});

	describe("normalization", () => {
		it("handles uppercase", () => {
			const result = Overflow.parse("HIDDEN");
			expect(result).toEqual({ ok: true, value: "hidden", error: undefined });
		});

		it("handles mixed case", () => {
			const result = Overflow.parse("Auto");
			expect(result).toEqual({ ok: true, value: "auto", error: undefined });
		});

		it("handles whitespace", () => {
			const result = Overflow.parse("  scroll  ");
			expect(result).toEqual({ ok: true, value: "scroll", error: undefined });
		});
	});

	describe("invalid values", () => {
		it("rejects invalid keyword", () => {
			const result = Overflow.parse("invalid");
			expect(result.ok).toBe(false);
		});

		it("rejects empty string", () => {
			const result = Overflow.parse("");
			expect(result.ok).toBe(false);
		});

		it("rejects numeric value", () => {
			const result = Overflow.parse("10px");
			expect(result.ok).toBe(false);
		});
	});
});
