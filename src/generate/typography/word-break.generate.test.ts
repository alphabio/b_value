// b_path:: src/generate/typography/word-break.generate.test.ts
import { describe, expect, it } from "vitest";
import { toCss } from "./word-break";

describe("Generate.Typography.WordBreak", () => {
	it("should generate 'normal'", () => {
		const result = toCss({ kind: "word-break", value: "normal" });
		expect(result).toEqual({ ok: true, issues: [], value: "normal" });
	});

	it("should generate 'break-all'", () => {
		const result = toCss({ kind: "word-break", value: "break-all" });
		expect(result).toEqual({ ok: true, issues: [], value: "break-all" });
	});

	it("should generate 'keep-all'", () => {
		const result = toCss({ kind: "word-break", value: "keep-all" });
		expect(result).toEqual({ ok: true, issues: [], value: "keep-all" });
	});

	it("should generate 'break-word'", () => {
		const result = toCss({ kind: "word-break", value: "break-word" });
		expect(result).toEqual({ ok: true, issues: [], value: "break-word" });
	});
});
