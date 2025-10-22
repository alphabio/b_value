// b_path:: src/parse/layout/clear.test.ts

import { describe, expect, it } from "vitest";
import * as Clear from "./clear";

describe("parse/layout/clear", () => {
	describe("valid values", () => {
		it("parses left", () => {
			const result = Clear.parse("left");
			expect(result).toEqual({ ok: true, value: "left", error: undefined });
		});

		it("parses right", () => {
			const result = Clear.parse("right");
			expect(result).toEqual({ ok: true, value: "right", error: undefined });
		});

		it("parses both", () => {
			const result = Clear.parse("both");
			expect(result).toEqual({ ok: true, value: "both", error: undefined });
		});

		it("parses none", () => {
			const result = Clear.parse("none");
			expect(result).toEqual({ ok: true, value: "none", error: undefined });
		});

		it("parses inline-start", () => {
			const result = Clear.parse("inline-start");
			expect(result).toEqual({ ok: true, value: "inline-start", error: undefined });
		});

		it("parses inline-end", () => {
			const result = Clear.parse("inline-end");
			expect(result).toEqual({ ok: true, value: "inline-end", error: undefined });
		});
	});

	describe("normalization", () => {
		it("handles uppercase", () => {
			const result = Clear.parse("BOTH");
			expect(result).toEqual({ ok: true, value: "both", error: undefined });
		});

		it("handles whitespace", () => {
			const result = Clear.parse("  left  ");
			expect(result).toEqual({ ok: true, value: "left", error: undefined });
		});
	});

	describe("invalid values", () => {
		it("rejects invalid keyword", () => {
			const result = Clear.parse("invalid");
			expect(result.ok).toBe(false);
		});

		it("rejects empty string", () => {
			const result = Clear.parse("");
			expect(result.ok).toBe(false);
		});
	});
});
