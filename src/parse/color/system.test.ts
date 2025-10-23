import { describe, expect, it } from "vitest";
import { parse } from "./system";

describe("parse system color", () => {
	it("parses 'ButtonText'", () => {
		const result = parse("ButtonText");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toEqual({
				kind: "system",
				keyword: "ButtonText",
			});
		}
	});

	it("parses 'Canvas'", () => {
		const result = parse("Canvas");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.keyword).toBe("Canvas");
		}
	});

	it("parses 'CanvasText'", () => {
		const result = parse("CanvasText");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.keyword).toBe("CanvasText");
		}
	});

	it("parses 'AccentColor'", () => {
		const result = parse("AccentColor");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.keyword).toBe("AccentColor");
		}
	});

	it("parses 'Highlight'", () => {
		const result = parse("Highlight");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.keyword).toBe("Highlight");
		}
	});

	it("parses case-insensitively lowercase", () => {
		const result = parse("canvas");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.keyword).toBe("Canvas");
		}
	});

	it("parses case-insensitively uppercase", () => {
		const result = parse("BUTTONTEXT");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.keyword).toBe("ButtonText");
		}
	});

	it("parses with whitespace", () => {
		const result = parse("  ButtonText  ");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.keyword).toBe("ButtonText");
		}
	});

	it("rejects invalid keyword", () => {
		const result = parse("InvalidColor");
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("Invalid system color keyword");
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

	it("parses multiple system colors", () => {
		const systemColors = ["AccentColor", "ButtonBorder", "ButtonFace", "Field", "FieldText", "LinkText", "Mark"];

		for (const color of systemColors) {
			const result = parse(color);
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.keyword).toBe(color);
			}
		}
	});
});
