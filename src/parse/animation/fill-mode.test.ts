// b_path:: src/parse/animation/fill-mode.test.ts
import { describe, expect, it } from "vitest";
import * as Parser from "./fill-mode";

describe("Animation Fill Mode Parser", () => {
	it("should parse none keyword", () => {
		const result = Parser.parse("none");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("animation-fill-mode");
			expect(result.value.modes).toEqual(["none"]);
		}
	});

	it("should parse forwards keyword", () => {
		const result = Parser.parse("forwards");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.modes).toEqual(["forwards"]);
		}
	});

	it("should parse backwards keyword", () => {
		const result = Parser.parse("backwards");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.modes).toEqual(["backwards"]);
		}
	});

	it("should parse both keyword", () => {
		const result = Parser.parse("both");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.modes).toEqual(["both"]);
		}
	});

	it("should parse multiple modes", () => {
		const result = Parser.parse("none, forwards, both");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.modes).toEqual(["none", "forwards", "both"]);
		}
	});

	it("should handle whitespace", () => {
		const result = Parser.parse("none , forwards");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.modes).toHaveLength(2);
		}
	});

	it("should handle case insensitive", () => {
		const result = Parser.parse("BOTH");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.modes).toEqual(["both"]);
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
