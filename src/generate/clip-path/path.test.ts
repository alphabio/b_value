// b_path:: src/generate/clip-path/path.test.ts
import { describe, expect, it } from "vitest";
import { parse } from "@/parse/clip-path/path";

describe("generate path()", () => {
	describe("basic path data", () => {
		it("should generate simple path", () => {
			const css = toCss({
				kind: "clip-path-path",
				pathData: "M 10,10 L 90,10 L 50,90 Z",
			});

			expect(css).toEqual({ ok: true, issues: [], value: "path('M 10,10 L 90,10 L 50,90 Z')" });
		});

		it("should generate path with lowercase commands", () => {
			const css = toCss({
				kind: "clip-path-path",
				pathData: "m 10,10 l 80,0 l -40,80 z",
			});

			expect(css).toEqual({ ok: true, issues: [], value: "path('m 10,10 l 80,0 l -40,80 z')" });
		});

		it("should generate compact path syntax", () => {
			const css = toCss({
				kind: "clip-path-path",
				pathData: "M10 10L90 10L50 90z",
			});

			expect(css).toEqual({ ok: true, issues: [], value: "path('M10 10L90 10L50 90z')" });
		});

		it("should generate path with various commands", () => {
			const css = toCss({
				kind: "clip-path-path",
				pathData: "M 0,0 H 100 V 100 L 0,100 Z",
			});

			expect(css).toEqual({ ok: true, issues: [], value: "path('M 0,0 H 100 V 100 L 0,100 Z')" });
		});
	});

	describe("fill-rule", () => {
		it("should generate with nonzero fill-rule", () => {
			const css = toCss({
				kind: "clip-path-path",
				fillRule: "nonzero",
				pathData: "M 10,10 L 90,10 Z",
			});

			expect(css).toEqual({ ok: true, issues: [], value: "path(nonzero, 'M 10,10 L 90,10 Z')" });
		});

		it("should generate with evenodd fill-rule", () => {
			const css = toCss({
				kind: "clip-path-path",
				fillRule: "evenodd",
				pathData: "M 10,10 L 90,10 Z",
			});

			expect(css).toEqual({ ok: true, issues: [], value: "path(evenodd, 'M 10,10 L 90,10 Z')" });
		});
	});

	describe("round-trip", () => {
		it("should round-trip basic path", () => {
			const input = "path('M 10,10 L 90,10 L 50,90 Z')";
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

		it("should round-trip with fill-rule", () => {
			const input = "path(evenodd, 'M 10,10 L 90,10 Z')";
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

		it("should round-trip compact syntax", () => {
			const input = "path('M10 10L90 10L50 90z')";
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

		it("should round-trip with curves", () => {
			const input = "path('M 10,10 C 20,20 40,20 50,10')";
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
