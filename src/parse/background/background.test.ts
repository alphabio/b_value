import { describe, expect, it } from "vitest";
import { parse } from "./background";

describe("parse background dispatcher", () => {
	describe("dispatches to Size parser", () => {
		it("parses cover", () => {
			const result = parse("cover");
			expect(result.ok).toBe(true);
		});

		it("parses contain", () => {
			const result = parse("contain");
			expect(result.ok).toBe(true);
		});
	});

	describe("dispatches to Repeat parser", () => {
		it("parses repeat-x", () => {
			const result = parse("repeat-x");
			expect(result.ok).toBe(true);
		});

		it("parses no-repeat", () => {
			const result = parse("no-repeat");
			expect(result.ok).toBe(true);
		});
	});

	describe("dispatches to Attachment parser", () => {
		it("parses fixed", () => {
			const result = parse("fixed");
			expect(result.ok).toBe(true);
		});

		it("parses scroll", () => {
			const result = parse("scroll");
			expect(result.ok).toBe(true);
		});
	});

	describe("dispatches to Clip parser", () => {
		it("parses border-box", () => {
			const result = parse("border-box");
			expect(result.ok).toBe(true);
		});
	});

	describe("dispatches to Origin parser", () => {
		it("parses padding-box", () => {
			const result = parse("padding-box");
			expect(result.ok).toBe(true);
		});
	});

	describe("error handling", () => {
		it("rejects invalid value", () => {
			const result = parse("invalid-background-xyz");
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
