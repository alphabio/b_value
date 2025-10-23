import { describe, expect, it } from "vitest";
import { parse } from "./transition";

describe("parse transition dispatcher", () => {
	describe("dispatches to Duration parser", () => {
		it("parses seconds", () => {
			const result = parse("1s");
			expect(result.ok).toBe(true);
		});

		it("parses milliseconds", () => {
			const result = parse("500ms");
			expect(result.ok).toBe(true);
		});
	});

	describe("dispatches to Delay parser", () => {
		it("parses delay value", () => {
			const result = parse("200ms");
			expect(result.ok).toBe(true);
		});
	});

	describe("dispatches to TimingFunction parser", () => {
		it("parses ease", () => {
			const result = parse("ease");
			expect(result.ok).toBe(true);
		});

		it("parses linear", () => {
			const result = parse("linear");
			expect(result.ok).toBe(true);
		});

		it("parses ease-in", () => {
			const result = parse("ease-in");
			expect(result.ok).toBe(true);
		});
	});

	describe("dispatches to Property parser", () => {
		it("parses property name", () => {
			const result = parse("opacity");
			expect(result.ok).toBe(true);
		});

		it("parses all keyword", () => {
			const result = parse("all");
			expect(result.ok).toBe(true);
		});
	});

	describe("error handling", () => {
		it("parses property names as valid", () => {
			// Property parser accepts CSS property names
			const result = parse("transform");
			expect(result.ok).toBe(true);
		});

		it("rejects empty string", () => {
			const result = parse("");
			expect(result.ok).toBe(false);
		});
	});
});
