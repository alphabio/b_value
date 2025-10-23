import { describe, expect, it } from "vitest";
import { parse } from "./style";

describe("parse text-decoration-style", () => {
	it("parses 'solid'", () => {
		const result = parse("solid");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("solid");
		}
	});

	it("parses 'double'", () => {
		const result = parse("double");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("double");
		}
	});

	it("parses 'dotted'", () => {
		const result = parse("dotted");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("dotted");
		}
	});

	it("parses 'dashed'", () => {
		const result = parse("dashed");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("dashed");
		}
	});

	it("parses 'wavy'", () => {
		const result = parse("wavy");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("wavy");
		}
	});

	it("parses with whitespace", () => {
		const result = parse("  wavy  ");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("wavy");
		}
	});

	it("rejects invalid keyword", () => {
		const result = parse("invalid");
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("Invalid text-decoration-style value");
		}
	});

	it("rejects empty string", () => {
		const result = parse("");
		expect(result.ok).toBe(false);
	});

	it("is case sensitive", () => {
		const result = parse("Solid");
		expect(result.ok).toBe(false);
	});
});
