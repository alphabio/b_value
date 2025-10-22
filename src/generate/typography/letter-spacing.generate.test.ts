// b_path:: src/generate/typography/letter-spacing.generate.test.ts
import { describe, expect, it } from "vitest";
import { toCss } from "./letter-spacing";

describe("Generate.Typography.LetterSpacing", () => {
	it("should generate 'normal'", () => {
		const result = toCss({ kind: "letter-spacing", value: "normal" });
		expect(result).toEqual({ ok: true, issues: [], value: "normal" });
	});

	it("should generate '0px'", () => {
		const result = toCss({ kind: "letter-spacing", value: { value: 0, unit: "px" } });
		expect(result).toEqual({ ok: true, issues: [], value: "0px" });
	});

	it("should generate '0.1em'", () => {
		const result = toCss({ kind: "letter-spacing", value: { value: 0.1, unit: "em" } });
		expect(result).toEqual({ ok: true, issues: [], value: "0.1em" });
	});

	it("should generate '2px'", () => {
		const result = toCss({ kind: "letter-spacing", value: { value: 2, unit: "px" } });
		expect(result).toEqual({ ok: true, issues: [], value: "2px" });
	});

	it("should generate negative value '-1px'", () => {
		const result = toCss({ kind: "letter-spacing", value: { value: -1, unit: "px" } });
		expect(result).toEqual({ ok: true, issues: [], value: "-1px" });
	});

	it("should generate '0.05rem'", () => {
		const result = toCss({ kind: "letter-spacing", value: { value: 0.05, unit: "rem" } });
		expect(result).toEqual({ ok: true, issues: [], value: "0.05rem" });
	});
});
