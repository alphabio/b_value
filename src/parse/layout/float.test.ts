// b_path:: src/parse/layout/float.test.ts

import { describe, expect, it } from "vitest";
import * as Float from "./float";

describe("parse/layout/float", () => {
	describe("valid values", () => {
		it("parses left", () => {
			const result = Float.parse("left");
			expect(result).toEqual({ ok: true, value: "left", error: undefined });
		});

		it("parses right", () => {
			const result = Float.parse("right");
			expect(result).toEqual({ ok: true, value: "right", error: undefined });
		});

		it("parses none", () => {
			const result = Float.parse("none");
			expect(result).toEqual({ ok: true, value: "none", error: undefined });
		});

		it("parses inline-start", () => {
			const result = Float.parse("inline-start");
			expect(result).toEqual({ ok: true, value: "inline-start", error: undefined });
		});

		it("parses inline-end", () => {
			const result = Float.parse("inline-end");
			expect(result).toEqual({ ok: true, value: "inline-end", error: undefined });
		});
	});

	describe("normalization", () => {
		it("handles uppercase", () => {
			const result = Float.parse("LEFT");
			expect(result).toEqual({ ok: true, value: "left", error: undefined });
		});

		it("handles whitespace", () => {
			const result = Float.parse("  right  ");
			expect(result).toEqual({ ok: true, value: "right", error: undefined });
		});
	});

	describe("invalid values", () => {
		it("rejects invalid keyword", () => {
			const result = Float.parse("center");
			expect(result.ok).toBe(false);
		});

		it("rejects empty string", () => {
			const result = Float.parse("");
			expect(result.ok).toBe(false);
		});
	});
});
