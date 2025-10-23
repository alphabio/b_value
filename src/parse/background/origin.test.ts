// b_path:: src/parse/background/origin.test.ts

import { describe, expect, it } from "vitest";
import * as Origin from "./origin";

describe("parse/background/origin", () => {
	describe("valid values", () => {
		it("parses border-box", () => {
			const result = Origin.parse("border-box");
			expect(result).toEqual({ ok: true, value: "border-box", error: undefined });
		});

		it("parses padding-box", () => {
			const result = Origin.parse("padding-box");
			expect(result).toEqual({ ok: true, value: "padding-box", error: undefined });
		});

		it("parses content-box", () => {
			const result = Origin.parse("content-box");
			expect(result).toEqual({ ok: true, value: "content-box", error: undefined });
		});
	});

	describe("normalization", () => {
		it("handles whitespace", () => {
			const result = Origin.parse("  content-box  ");
			expect(result).toEqual({ ok: true, value: "content-box", error: undefined });
		});
	});

	describe("invalid values", () => {
		it("rejects invalid keyword", () => {
			const result = Origin.parse("invalid");
			expect(result.ok).toBe(false);
		});

		it("rejects empty string", () => {
			const result = Origin.parse("");
			expect(result.ok).toBe(false);
		});

		it("rejects text keyword", () => {
			const result = Origin.parse("text");
			expect(result.ok).toBe(false);
		});
	});
});
