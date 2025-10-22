// b_path:: src/generate/typography/text-transform.generate.test.ts
import { describe, expect, it } from "vitest";
import { toCss } from "./text-transform";

describe("Generate.Typography.TextTransform", () => {
	it("should generate 'none'", () => {
		const result = toCss({ kind: "text-transform", value: "none" });
		expect(result).toBe("none");
	});

	it("should generate 'capitalize'", () => {
		const result = toCss({ kind: "text-transform", value: "capitalize" });
		expect(result).toBe("capitalize");
	});

	it("should generate 'uppercase'", () => {
		const result = toCss({ kind: "text-transform", value: "uppercase" });
		expect(result).toBe("uppercase");
	});

	it("should generate 'lowercase'", () => {
		const result = toCss({ kind: "text-transform", value: "lowercase" });
		expect(result).toBe("lowercase");
	});

	it("should generate 'full-width'", () => {
		const result = toCss({ kind: "text-transform", value: "full-width" });
		expect(result).toBe("full-width");
	});

	it("should generate 'full-size-kana'", () => {
		const result = toCss({ kind: "text-transform", value: "full-size-kana" });
		expect(result).toBe("full-size-kana");
	});
});
