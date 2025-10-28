// b_path:: src/parse/clip-path/geometry-box.test.ts
import { describe, expect, it } from "vitest";
import { parse } from "./geometry-box";

describe("parse clip-path geometry-box", () => {
	it("parses content-box", () => {
		const result = parse("content-box");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toEqual({
				kind: "clip-path-geometry-box",
				value: "content-box",
			});
		}
	});

	it("parses padding-box", () => {
		const result = parse("padding-box");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.value).toBe("padding-box");
		}
	});

	it("parses border-box", () => {
		const result = parse("border-box");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.value).toBe("border-box");
		}
	});

	it("parses margin-box", () => {
		const result = parse("margin-box");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.value).toBe("margin-box");
		}
	});

	it("parses fill-box", () => {
		const result = parse("fill-box");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.value).toBe("fill-box");
		}
	});

	it("parses stroke-box", () => {
		const result = parse("stroke-box");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.value).toBe("stroke-box");
		}
	});

	it("parses view-box", () => {
		const result = parse("view-box");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.value).toBe("view-box");
		}
	});

	it("parses with whitespace", () => {
		const result = parse("  content-box  ");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.value).toBe("content-box");
		}
	});

	it("rejects invalid keyword", () => {
		const result = parse("invalid-box");
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("Invalid geometry-box value");
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
		const result = parse("Content-Box");
		expect(result.ok).toBe(false);
	});
});
