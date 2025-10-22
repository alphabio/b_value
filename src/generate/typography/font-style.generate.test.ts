// b_path:: src/generate/typography/font-style.generate.test.ts
import { describe, expect, it } from "vitest";

describe("Generate.Typography.FontStyle", () => {
	it("should generate 'normal'", () => {
		const result = toCss({ kind: "font-style", value: "normal" });
		expect(result).toEqual({ ok: true, issues: [], value: "normal" });
	});

	it("should generate 'italic'", () => {
		const result = toCss({ kind: "font-style", value: "italic" });
		expect(result).toEqual({ ok: true, issues: [], value: "italic" });
	});

	it("should generate 'oblique'", () => {
		const result = toCss({ kind: "font-style", value: "oblique" });
		expect(result).toEqual({ ok: true, issues: [], value: "oblique" });
	});
});
