// b_path:: src/parse/background/clip.test.ts

import { describe, expect, it } from "vitest";
import * as Clip from "./clip";

describe("parse/background/clip", () => {
	describe("valid values", () => {
		it("parses border-box", () => {
			const result = Clip.parse("border-box");
			expect(result).toEqual({ ok: true, value: "border-box", error: undefined });
		});

		it("parses padding-box", () => {
			const result = Clip.parse("padding-box");
			expect(result).toEqual({ ok: true, value: "padding-box", error: undefined });
		});

		it("parses content-box", () => {
			const result = Clip.parse("content-box");
			expect(result).toEqual({ ok: true, value: "content-box", error: undefined });
		});

		it("parses text", () => {
			const result = Clip.parse("text");
			expect(result).toEqual({ ok: true, value: "text", error: undefined });
		});
	});

	describe("normalization", () => {
		it("handles whitespace", () => {
			const result = Clip.parse("  padding-box  ");
			expect(result).toEqual({ ok: true, value: "padding-box", error: undefined });
		});
	});

	describe("invalid values", () => {
		it("rejects invalid keyword", () => {
			const result = Clip.parse("invalid");
			expect(result.ok).toBe(false);
		});

		it("rejects empty string", () => {
			const result = Clip.parse("");
			expect(result.ok).toBe(false);
		});
	});
});
