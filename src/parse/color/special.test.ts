// b_path:: src/parse/color/special.test.ts
import { describe, expect, it } from "vitest";
import { parse } from "./special";

describe("parse special color", () => {
	it("parses 'transparent'", () => {
		const result = parse("transparent");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toEqual({
				kind: "special",
				keyword: "transparent",
			});
		}
	});

	it("parses 'currentcolor'", () => {
		const result = parse("currentcolor");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toEqual({
				kind: "special",
				keyword: "currentcolor",
			});
		}
	});

	it("parses 'transparent' case-insensitively", () => {
		const result = parse("TRANSPARENT");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.keyword).toBe("transparent");
		}
	});

	it("parses 'currentcolor' case-insensitively", () => {
		const result = parse("CurrentColor");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.keyword).toBe("currentcolor");
		}
	});

	it("parses with whitespace", () => {
		const result = parse("  transparent  ");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.keyword).toBe("transparent");
		}
	});

	it("rejects invalid keyword", () => {
		const result = parse("notspecial");
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("Invalid special color keyword");
		}
	});

	it("rejects empty string", () => {
		const result = parse("");
		expect(result.ok).toBe(false);
	});

	it("rejects named colors", () => {
		const result = parse("red");
		expect(result.ok).toBe(false);
	});
});
