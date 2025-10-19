// b_path:: src/parse/animation/direction.test.ts
import { describe, expect, it } from "vitest";
import * as Parser from "./direction";

describe("Animation Direction Parser", () => {
	it("should parse normal keyword", () => {
		const result = Parser.parse("normal");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("animation-direction");
			expect(result.value.directions).toEqual(["normal"]);
		}
	});

	it("should parse reverse keyword", () => {
		const result = Parser.parse("reverse");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.directions).toEqual(["reverse"]);
		}
	});

	it("should parse alternate keyword", () => {
		const result = Parser.parse("alternate");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.directions).toEqual(["alternate"]);
		}
	});

	it("should parse alternate-reverse keyword", () => {
		const result = Parser.parse("alternate-reverse");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.directions).toEqual(["alternate-reverse"]);
		}
	});

	it("should parse multiple directions", () => {
		const result = Parser.parse("normal, reverse, alternate");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.directions).toEqual(["normal", "reverse", "alternate"]);
		}
	});

	it("should handle whitespace", () => {
		const result = Parser.parse("normal , reverse");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.directions).toHaveLength(2);
		}
	});

	it("should handle case insensitive", () => {
		const result = Parser.parse("NORMAL");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.directions).toEqual(["normal"]);
		}
	});

	it("should reject invalid keyword", () => {
		const result = Parser.parse("invalid");
		expect(result.ok).toBe(false);
	});

	it("should reject empty value", () => {
		const result = Parser.parse("");
		expect(result.ok).toBe(false);
	});
});
