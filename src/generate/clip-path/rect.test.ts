// b_path:: src/generate/clip-path/rect.test.ts
import { describe, expect, it } from "vitest";
import { parse } from "@/parse/clip-path/rect";
import { toCss } from "./rect";

describe("generate rect()", () => {
	describe("basic TRBL", () => {
		it("should generate four values", () => {
			const css = toCss({
				kind: "clip-path-rect",
				top: { value: 10, unit: "px" },
				right: { value: 20, unit: "px" },
				bottom: { value: 30, unit: "px" },
				left: { value: 40, unit: "px" },
			});

			expect(css).toEqual({ ok: true, issues: [], value: "rect(10px 20px 30px 40px)" });
		});

		it("should generate with percentages", () => {
			const css = toCss({
				kind: "clip-path-rect",
				top: { value: 10, unit: "%" },
				right: { value: 20, unit: "%" },
				bottom: { value: 30, unit: "%" },
				left: { value: 40, unit: "%" },
			});

			expect(css).toEqual({ ok: true, issues: [], value: "rect(10% 20% 30% 40%)" });
		});

		it("should generate with zero values", () => {
			const css = toCss({
				kind: "clip-path-rect",
				top: { value: 0, unit: "px" },
				right: { value: 0, unit: "px" },
				bottom: { value: 0, unit: "px" },
				left: { value: 0, unit: "px" },
			});

			expect(css).toEqual({ ok: true, issues: [], value: "rect(0px 0px 0px 0px)" });
		});
	});

	describe("auto keyword", () => {
		it("should generate auto for all sides", () => {
			const css = toCss({
				kind: "clip-path-rect",
				top: "auto",
				right: "auto",
				bottom: "auto",
				left: "auto",
			});

			expect(css).toEqual({ ok: true, issues: [], value: "rect(auto auto auto auto)" });
		});

		it("should generate mixed auto and lengths", () => {
			const css = toCss({
				kind: "clip-path-rect",
				top: { value: 10, unit: "px" },
				right: "auto",
				bottom: { value: 20, unit: "px" },
				left: "auto",
			});

			expect(css).toEqual({ ok: true, issues: [], value: "rect(10px auto 20px auto)" });
		});
	});

	describe("border-radius", () => {
		it("should generate with single border-radius", () => {
			const css = toCss({
				kind: "clip-path-rect",
				top: { value: 10, unit: "px" },
				right: { value: 10, unit: "px" },
				bottom: { value: 10, unit: "px" },
				left: { value: 10, unit: "px" },
				borderRadius: {
					topLeft: { value: 5, unit: "px" },
					topRight: { value: 5, unit: "px" },
					bottomRight: { value: 5, unit: "px" },
					bottomLeft: { value: 5, unit: "px" },
				},
			});

			expect(css).toEqual({ ok: true, issues: [], value: "rect(10px 10px 10px 10px round 5px)" });
		});

		it("should generate with different border-radius values", () => {
			const css = toCss({
				kind: "clip-path-rect",
				top: { value: 10, unit: "px" },
				right: { value: 10, unit: "px" },
				bottom: { value: 10, unit: "px" },
				left: { value: 10, unit: "px" },
				borderRadius: {
					topLeft: { value: 5, unit: "px" },
					topRight: { value: 10, unit: "px" },
					bottomRight: { value: 5, unit: "px" },
					bottomLeft: { value: 10, unit: "px" },
				},
			});

			expect(css).toEqual({ ok: true, issues: [], value: "rect(10px 10px 10px 10px round 5px 10px)" });
		});
	});

	describe("round-trip", () => {
		it("should round-trip basic rect", () => {
			const input = "rect(10px 20px 30px 40px)";
			const parsed = parse(input);

			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = toCss(parsed.value);
				const reparsed = parse(generated);

				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});

		it("should round-trip with auto", () => {
			const input = "rect(10px auto 20px auto)";
			const parsed = parse(input);

			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = toCss(parsed.value);
				const reparsed = parse(generated);

				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});

		it("should round-trip with border-radius", () => {
			const input = "rect(10px 20px 30px 40px round 5px)";
			const parsed = parse(input);

			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = toCss(parsed.value);
				const reparsed = parse(generated);

				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});
	});
});
