import { describe, expect, it } from "vitest";
import { parse } from "./line";

describe("parse text-decoration-line", () => {
	it("parses 'none'", () => {
		const result = parse("none");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("none");
		}
	});

	it("parses 'underline'", () => {
		const result = parse("underline");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("underline");
		}
	});

	it("parses 'overline'", () => {
		const result = parse("overline");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("overline");
		}
	});

	it("parses 'line-through'", () => {
		const result = parse("line-through");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("line-through");
		}
	});

	it("parses with whitespace", () => {
		const result = parse("  underline  ");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("underline");
		}
	});

	it("rejects invalid keyword", () => {
		const result = parse("invalid");
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("Invalid text-decoration-line value");
		}
	});

	it("rejects empty string", () => {
		const result = parse("");
		expect(result.ok).toBe(false);
	});

	it("is case sensitive", () => {
		const result = parse("Underline");
		expect(result.ok).toBe(false);
	});
});
