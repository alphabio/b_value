// b_path:: src/parse/background/attachment.test.ts

import { describe, expect, it } from "vitest";
import * as Attachment from "./attachment";

describe("parse/background/attachment", () => {
	describe("valid values", () => {
		it("parses scroll", () => {
			const result = Attachment.parse("scroll");
			expect(result).toEqual({ ok: true, value: "scroll", error: undefined });
		});

		it("parses fixed", () => {
			const result = Attachment.parse("fixed");
			expect(result).toEqual({ ok: true, value: "fixed", error: undefined });
		});

		it("parses local", () => {
			const result = Attachment.parse("local");
			expect(result).toEqual({ ok: true, value: "local", error: undefined });
		});
	});

	describe("normalization", () => {
		it("handles whitespace", () => {
			const result = Attachment.parse("  fixed  ");
			expect(result).toEqual({ ok: true, value: "fixed", error: undefined });
		});
	});

	describe("invalid values", () => {
		it("rejects invalid keyword", () => {
			const result = Attachment.parse("invalid");
			expect(result.ok).toBe(false);
		});

		it("rejects empty string", () => {
			const result = Attachment.parse("");
			expect(result.ok).toBe(false);
		});
	});
});
