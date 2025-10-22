// b_path:: src/generate/background/position-y.generate.test.ts

import { describe, expect, it } from "vitest";
import * as Parse from "@/parse/background/position-y";

describe("Generate.Background.PositionY", () => {
	describe("keywords", () => {
		it("generates 'top'", () => {
			expect(toCss("top")).toBe("top");
		});

		it("generates 'center'", () => {
			expect(toCss("center")).toBe("center");
		});

		it("generates 'bottom'", () => {
			expect(toCss("bottom")).toBe("bottom");
		});
	});

	describe("length values", () => {
		it("generates px", () => {
			expect(toCss({ value: 20, unit: "px" })).toBe("20px");
		});

		it("generates em", () => {
			expect(toCss({ value: 3, unit: "em" })).toBe("3em");
		});

		it("generates zero", () => {
			expect(toCss({ value: 0, unit: "px" })).toBe("0px");
		});
	});

	describe("percentage values", () => {
		it("generates 50%", () => {
			expect(toCss({ value: 50, unit: "%" })).toBe("50%");
		});

		it("generates 0%", () => {
			expect(toCss({ value: 0, unit: "%" })).toBe("0%");
		});

		it("generates 100%", () => {
			expect(toCss({ value: 100, unit: "%" })).toBe("100%");
		});
	});

	describe("round-trip", () => {
		it("top", () => {
			const parsed = Parse.parse("top");
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

		it("50%", () => {
			const parsed = Parse.parse("50%");
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

		it("20px", () => {
			const parsed = Parse.parse("20px");
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
