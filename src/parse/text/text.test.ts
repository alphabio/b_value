// b_path:: src/parse/text/text.test.ts
import { describe, expect, it } from "vitest";
import { parse } from "./text";

describe("parse text-decoration dispatcher", () => {
	describe("dispatches to Line parser", () => {
		it("parses underline", () => {
			const result = parse("underline");
			expect(result.ok).toBe(true);
		});

		it("parses overline", () => {
			const result = parse("overline");
			expect(result.ok).toBe(true);
		});
	});

	describe("dispatches to Style parser", () => {
		it("parses wavy", () => {
			const result = parse("wavy");
			expect(result.ok).toBe(true);
		});

		it("parses dotted", () => {
			const result = parse("dotted");
			expect(result.ok).toBe(true);
		});
	});

	describe("dispatches to Thickness parser", () => {
		it("parses length value", () => {
			const result = parse("2px");
			expect(result.ok).toBe(true);
		});
	});

	describe("dispatches to Color parser", () => {
		it("parses named color", () => {
			const result = parse("red");
			expect(result.ok).toBe(true);
		});
	});

	describe("error handling", () => {
		it("rejects invalid value", () => {
			const result = parse("invalid-text-decoration-xyz");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.issues.length).toBeGreaterThan(0);
			}
		});

		it("rejects empty string", () => {
			const result = parse("");
			expect(result.ok).toBe(false);
		});
	});
});
