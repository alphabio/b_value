// b_path:: src/generate/clip-path/xywh.test.ts
import { describe, expect, it } from "vitest";
import { parse } from "@/parse/clip-path/xywh";
import { toCss } from "./xywh";

describe("generate xywh()", () => {
	describe("basic position and size", () => {
		it("should generate four values", () => {
			const css = toCss({
				kind: "clip-path-xywh",
				x: { value: 10, unit: "px" },
				y: { value: 20, unit: "px" },
				width: { value: 100, unit: "px" },
				height: { value: 50, unit: "px" },
			});

			expect(css).toBe("xywh(10px 20px 100px 50px)");
		});

		it("should generate with percentages", () => {
			const css = toCss({
				kind: "clip-path-xywh",
				x: { value: 0, unit: "%" },
				y: { value: 0, unit: "%" },
				width: { value: 100, unit: "%" },
				height: { value: 100, unit: "%" },
			});

			expect(css).toBe("xywh(0% 0% 100% 100%)");
		});

		it("should generate with zero values", () => {
			const css = toCss({
				kind: "clip-path-xywh",
				x: { value: 0, unit: "px" },
				y: { value: 0, unit: "px" },
				width: { value: 0, unit: "px" },
				height: { value: 0, unit: "px" },
			});

			expect(css).toBe("xywh(0px 0px 0px 0px)");
		});

		it("should generate with mixed units", () => {
			const css = toCss({
				kind: "clip-path-xywh",
				x: { value: 10, unit: "px" },
				y: { value: 5, unit: "em" },
				width: { value: 50, unit: "%" },
				height: { value: 80, unit: "px" },
			});

			expect(css).toBe("xywh(10px 5em 50% 80px)");
		});
	});

	describe("border-radius", () => {
		it("should generate with single border-radius", () => {
			const css = toCss({
				kind: "clip-path-xywh",
				x: { value: 10, unit: "px" },
				y: { value: 20, unit: "px" },
				width: { value: 100, unit: "px" },
				height: { value: 50, unit: "px" },
				borderRadius: {
					topLeft: { value: 5, unit: "px" },
					topRight: { value: 5, unit: "px" },
					bottomRight: { value: 5, unit: "px" },
					bottomLeft: { value: 5, unit: "px" },
				},
			});

			expect(css).toBe("xywh(10px 20px 100px 50px round 5px)");
		});

		it("should generate with different border-radius values", () => {
			const css = toCss({
				kind: "clip-path-xywh",
				x: { value: 0, unit: "%" },
				y: { value: 0, unit: "%" },
				width: { value: 100, unit: "%" },
				height: { value: 100, unit: "%" },
				borderRadius: {
					topLeft: { value: 5, unit: "px" },
					topRight: { value: 10, unit: "px" },
					bottomRight: { value: 5, unit: "px" },
					bottomLeft: { value: 10, unit: "px" },
				},
			});

			expect(css).toBe("xywh(0% 0% 100% 100% round 5px 10px)");
		});
	});

	describe("round-trip", () => {
		it("should round-trip basic xywh", () => {
			const input = "xywh(10px 20px 100px 50px)";
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
			const input = "xywh(0 0 100% 100% round 10px)";
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

		it("should round-trip with mixed units", () => {
			const input = "xywh(10px 5em 50% 80px round 5px 10px)";
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
