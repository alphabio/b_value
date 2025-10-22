// b_path:: src/generate/layout/right.generate.test.ts
import { describe, expect, it } from "vitest";
import * as Parse from "@/parse/layout/right";

describe("Generate.Layout.Right", () => {
	describe("auto keyword", () => {
		it("generates 'auto'", () => {
			const ir = { kind: "right" as const, value: "auto" as const };
			expect(toCss(ir)).toBe("auto");
		});
	});

	describe("length values", () => {
		it("generates px", () => {
			const ir = { kind: "right" as const, value: { value: 10, unit: "px" as const } };
			expect(toCss(ir)).toBe("10px");
		});

		it("generates em", () => {
			const ir = { kind: "right" as const, value: { value: 2, unit: "em" as const } };
			expect(toCss(ir)).toBe("2em");
		});
	});

	describe("percentage values", () => {
		it("generates percentage", () => {
			const ir = { kind: "right" as const, value: { value: 50, unit: "%" as const } };
			expect(toCss(ir)).toBe("50%");
		});
	});

	describe("round-trip", () => {
		it("auto", () => {
			const parsed = Parse.parse("auto");
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const css = toCss(parsed.value);
				expect(css.ok).toBe(true);
				if (!css.ok) return;
				const reparsed = Parse.parse(css.value);
				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});

		it("10px", () => {
			const parsed = Parse.parse("10px");
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const css = toCss(parsed.value);
				expect(css.ok).toBe(true);
				if (!css.ok) return;
				const reparsed = Parse.parse(css.value);
				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});
	});
});
