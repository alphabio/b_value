// b_path:: src/generate/background/position-x.generate.test.ts

import { describe, expect, it } from "vitest";
import * as Parse from "@/parse/background/position-x";
import { toCss } from "./position-x";

describe("Generate.Background.PositionX", () => {
	describe("keywords", () => {
		it("generates 'left'", () => {
			expect(toCss("left")).toBe("left");
		});

		it("generates 'center'", () => {
			expect(toCss("center")).toBe("center");
		});

		it("generates 'right'", () => {
			expect(toCss("right")).toBe("right");
		});
	});

	describe("length values", () => {
		it("generates px", () => {
			expect(toCss({ value: 10, unit: "px" })).toBe("10px");
		});

		it("generates em", () => {
			expect(toCss({ value: 2, unit: "em" })).toBe("2em");
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
		it("left", () => {
			const parsed = Parse.parse("left");
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const css = toCss(parsed.value);
				const reparsed = Parse.parse(css);
				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});

		it("25%", () => {
			const parsed = Parse.parse("25%");
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const css = toCss(parsed.value);
				const reparsed = Parse.parse(css);
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
				const reparsed = Parse.parse(css);
				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});
	});
});
