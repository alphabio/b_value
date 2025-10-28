// b_path:: src/parse/clip-path/none.test.ts
import { describe, expect, it } from "vitest";
import { parse } from "./none";

describe("parse clip-path none", () => {
	it("parses 'none' keyword", () => {
		const result = parse("none");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toEqual({ kind: "clip-path-none" });
		}
	});

	it("parses 'none' with whitespace", () => {
		const result = parse("  none  ");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toEqual({ kind: "clip-path-none" });
		}
	});

	it("rejects invalid keyword", () => {
		const result = parse("not-none");
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("Invalid clip-path none value");
		}
	});

	it("rejects empty string", () => {
		const result = parse("");
		expect(result.ok).toBe(false);
	});

	it("rejects other CSS values", () => {
		const result = parse("circle()");
		expect(result.ok).toBe(false);
	});

	it("is case sensitive", () => {
		const result = parse("None");
		expect(result.ok).toBe(false);
	});

	it("rejects partial match", () => {
		const result = parse("none-value");
		expect(result.ok).toBe(false);
	});
});
