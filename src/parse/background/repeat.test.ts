// b_path:: src/parse/background/repeat.test.ts

import { describe, expect, it } from "vitest";
import * as Repeat from "./repeat";

describe("parse/background/repeat", () => {
	describe("valid values", () => {
		it("parses repeat", () => {
			const result = Repeat.parse("repeat");
			expect(result).toEqual({ ok: true, value: "repeat", error: undefined });
		});

		it("parses repeat-x", () => {
			const result = Repeat.parse("repeat-x");
			expect(result).toEqual({ ok: true, value: "repeat-x", error: undefined });
		});

		it("parses repeat-y", () => {
			const result = Repeat.parse("repeat-y");
			expect(result).toEqual({ ok: true, value: "repeat-y", error: undefined });
		});

		it("parses no-repeat", () => {
			const result = Repeat.parse("no-repeat");
			expect(result).toEqual({ ok: true, value: "no-repeat", error: undefined });
		});

		it("parses space", () => {
			const result = Repeat.parse("space");
			expect(result).toEqual({ ok: true, value: "space", error: undefined });
		});

		it("parses round", () => {
			const result = Repeat.parse("round");
			expect(result).toEqual({ ok: true, value: "round", error: undefined });
		});
	});

	describe("normalization", () => {
		it("handles whitespace", () => {
			const result = Repeat.parse("  repeat-x  ");
			expect(result).toEqual({ ok: true, value: "repeat-x", error: undefined });
		});
	});

	describe("invalid values", () => {
		it("rejects invalid keyword", () => {
			const result = Repeat.parse("invalid");
			expect(result.ok).toBe(false);
		});

		it("rejects empty string", () => {
			const result = Repeat.parse("");
			expect(result.ok).toBe(false);
		});
	});
});
