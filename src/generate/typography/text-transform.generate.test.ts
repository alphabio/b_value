// b_path:: src/generate/typography/text-transform.generate.test.ts
import { describe, expect, it } from "vitest";
import { toCss } from "./text-transform";

describe("Generate.Typography.TextTransform", () => {
	it("should generate 'none'", () => {
		const result = toCss({ kind: "text-transform", value: "none" });
		expect(result).toEqual({ ok: true, issues: [], value: "none" });
	});

	it("should generate 'capitalize'", () => {
		const result = toCss({ kind: "text-transform", value: "capitalize" });
		expect(result).toEqual({ ok: true, issues: [], value: "capitalize" });
	});

	it("should generate 'uppercase'", () => {
		const result = toCss({ kind: "text-transform", value: "uppercase" });
		expect(result).toEqual({ ok: true, issues: [], value: "uppercase" });
	});

	it("should generate 'lowercase'", () => {
		const result = toCss({ kind: "text-transform", value: "lowercase" });
		expect(result).toEqual({ ok: true, issues: [], value: "lowercase" });
	});

	it("should generate 'full-width'", () => {
		const result = toCss({ kind: "text-transform", value: "full-width" });
		expect(result).toEqual({ ok: true, issues: [], value: "full-width" });
	});

	it("should generate 'full-size-kana'", () => {
		const result = toCss({ kind: "text-transform", value: "full-size-kana" });
		expect(result).toEqual({ ok: true, issues: [], value: "full-size-kana" });
	});
});
