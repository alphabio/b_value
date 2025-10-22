// b_path:: src/generate/typography/overflow-wrap.generate.test.ts
import { describe, expect, it } from "vitest";

describe("Generate.Typography.OverflowWrap", () => {
	it("should generate 'normal'", () => {
		const result = toCss({ kind: "overflow-wrap", value: "normal" });
		expect(result).toEqual({ ok: true, issues: [], value: "normal" });
	});

	it("should generate 'break-word'", () => {
		const result = toCss({ kind: "overflow-wrap", value: "break-word" });
		expect(result).toEqual({ ok: true, issues: [], value: "break-word" });
	});

	it("should generate 'anywhere'", () => {
		const result = toCss({ kind: "overflow-wrap", value: "anywhere" });
		expect(result).toEqual({ ok: true, issues: [], value: "anywhere" });
	});
});
