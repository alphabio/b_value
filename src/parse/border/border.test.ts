// b_path:: src/parse/border/border.test.ts
import { describe, expect, it } from "vitest";
import { parse } from "./border";

describe("parse border dispatcher", () => {
	describe("dispatches to Width parser", () => {
		it("parses thin keyword", () => {
			const result = parse("thin");
			expect(result.ok).toBe(true);
		});

		it("parses length value", () => {
			const result = parse("2px");
			expect(result.ok).toBe(true);
		});
	});

	describe("dispatches to Style parser", () => {
		it("parses solid", () => {
			const result = parse("solid");
			expect(result.ok).toBe(true);
		});

		it("parses dashed", () => {
			const result = parse("dashed");
			expect(result.ok).toBe(true);
		});
	});

	describe("dispatches to Color parser", () => {
		it("parses named color", () => {
			const result = parse("red");
			expect(result.ok).toBe(true);
		});
	});

	describe("dispatches to Radius parser", () => {
		it("parses radius length", () => {
			const result = parse("5px");
			expect(result.ok).toBe(true);
		});
	});

	describe("error handling", () => {
		it("rejects invalid value", () => {
			const result = parse("invalid-border-value-xyz");
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
