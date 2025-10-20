// b_path:: src/parse/clip-path/path.test.ts
import { describe, expect, it } from "vitest";
import { parse } from "./path";

describe("parse path()", () => {
	describe("basic path data", () => {
		it("should parse simple path", () => {
			const result = parse("path('M 10,10 L 90,10 L 50,90 Z')");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("clip-path-path");
				expect(result.value.pathData).toBe("M 10,10 L 90,10 L 50,90 Z");
				expect(result.value.fillRule).toBeUndefined();
			}
		});

		it("should parse path with lowercase commands", () => {
			const result = parse("path('m 10,10 l 80,0 l -40,80 z')");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.pathData).toBe("m 10,10 l 80,0 l -40,80 z");
			}
		});

		it("should parse compact path syntax", () => {
			const result = parse("path('M10 10L90 10L50 90z')");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.pathData).toBe("M10 10L90 10L50 90z");
			}
		});

		it("should parse path with various commands", () => {
			const result = parse("path('M 0,0 H 100 V 100 L 0,100 Z')");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.pathData).toBe("M 0,0 H 100 V 100 L 0,100 Z");
			}
		});

		it("should parse path with curves", () => {
			const result = parse("path('M 10,10 C 20,20 40,20 50,10')");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.pathData).toBe("M 10,10 C 20,20 40,20 50,10");
			}
		});

		it("should parse path with quadratic curves", () => {
			const result = parse("path('M 10,10 Q 25,5 40,10')");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.pathData).toBe("M 10,10 Q 25,5 40,10");
			}
		});

		it("should parse path with arcs", () => {
			const result = parse("path('M 10,10 A 20,20 0 0,0 30,10')");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.pathData).toBe("M 10,10 A 20,20 0 0,0 30,10");
			}
		});
	});

	describe("fill-rule", () => {
		it("should parse with nonzero fill-rule", () => {
			const result = parse("path(nonzero, 'M 10,10 L 90,10 Z')");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.fillRule).toBe("nonzero");
				expect(result.value.pathData).toBe("M 10,10 L 90,10 Z");
			}
		});

		it("should parse with evenodd fill-rule", () => {
			const result = parse("path(evenodd, 'M 10,10 L 90,10 Z')");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.fillRule).toBe("evenodd");
				expect(result.value.pathData).toBe("M 10,10 L 90,10 Z");
			}
		});

		it("should parse fill-rule case-insensitively", () => {
			const result = parse("path(EVENODD, 'M 10,10 L 90,10 Z')");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.fillRule).toBe("evenodd");
			}
		});
	});

	describe("edge cases", () => {
		it("should parse path with extra whitespace", () => {
			const result = parse("path('  M 10,10   L 90,10   Z  ')");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.pathData).toBe("  M 10,10   L 90,10   Z  ");
			}
		});

		it("should parse path with negative coordinates", () => {
			const result = parse("path('M -10,-10 L 90,10 Z')");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.pathData).toBe("M -10,-10 L 90,10 Z");
			}
		});

		it("should parse path with decimal coordinates", () => {
			const result = parse("path('M 10.5,10.5 L 90.5,10.5 Z')");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.pathData).toBe("M 10.5,10.5 L 90.5,10.5 Z");
			}
		});
	});

	describe("errors", () => {
		it("should error on empty function", () => {
			const result = parse("path()");
			expect(result.ok).toBe(false);
		});

		it("should error on non-string path data", () => {
			const result = parse("path(10px)");
			expect(result.ok).toBe(false);
		});

		it("should error on empty path data", () => {
			const result = parse("path('')");
			expect(result.ok).toBe(false);
		});

		it("should error on invalid fill-rule", () => {
			const result = parse("path(invalid, 'M 10,10 Z')");
			expect(result.ok).toBe(false);
		});

		it("should error on path without commands", () => {
			const result = parse("path('10,10 90,10')");
			expect(result.ok).toBe(false);
		});

		it("should error on path not starting with M/m", () => {
			const result = parse("path('L 10,10 Z')");
			expect(result.ok).toBe(false);
		});

		it("should error on non-path function", () => {
			const result = parse("circle(50px)");
			expect(result.ok).toBe(false);
		});
	});
});
