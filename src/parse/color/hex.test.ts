// b_path:: src/parse/color/hex.test.ts
import { describe, expect, it } from "vitest";
import { parse } from "./hex";

describe("parse hex color", () => {
	it("parses 3-digit hex color", () => {
		const result = parse("#abc");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("hex");
			expect(result.value.value).toBe("#AABBCC");
		}
	});

	it("parses 6-digit hex color", () => {
		const result = parse("#ff5733");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.value).toBe("#FF5733");
		}
	});

	it("parses 4-digit hex color with alpha", () => {
		const result = parse("#abcd");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.value).toBe("#AABBCCDD");
		}
	});

	it("parses 8-digit hex color with alpha", () => {
		const result = parse("#ff573380");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.value).toBe("#FF573380");
		}
	});

	it("normalizes to uppercase", () => {
		const result = parse("#ffffff");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.value).toBe("#FFFFFF");
		}
	});

	it("rejects missing # prefix", () => {
		const result = parse("abc");
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("must start with #");
		}
	});

	it("rejects invalid characters", () => {
		const result = parse("#xyz");
		expect(result.ok).toBe(false);
	});

	it("rejects invalid length", () => {
		const result = parse("#ab");
		expect(result.ok).toBe(false);
	});

	it("rejects empty value", () => {
		const result = parse("#");
		expect(result.ok).toBe(false);
	});
});
