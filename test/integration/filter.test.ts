// b_path:: test/integration/filter.test.ts
import { describe, expect, test } from "vitest";
import { Filter as GenerateFilter } from "@/generate/filter";
import { Filter as ParseFilter } from "@/parse/filter";

describe("Filter Integration Tests", () => {
	describe("Round-trip: Parse → Generate → Parse", () => {
		test("blur filter", () => {
			const input = "blur(5px)";
			const parsed = ParseFilter.parse(input);
			expect(parsed.ok).toBe(true);
			if (!parsed.ok) return;

			const css = GenerateFilter.toCss(parsed.value);
			const reparsed = ParseFilter.parse(css);
			expect(reparsed.ok).toBe(true);
			if (!reparsed.ok) return;

			expect(reparsed.value).toEqual(parsed.value);
		});

		test("brightness filter", () => {
			const input = "brightness(1.5)";
			const parsed = ParseFilter.parse(input);
			expect(parsed.ok).toBe(true);
			if (!parsed.ok) return;

			const css = GenerateFilter.toCss(parsed.value);
			const reparsed = ParseFilter.parse(css);
			expect(reparsed.ok).toBe(true);
			if (!reparsed.ok) return;

			expect(reparsed.value).toEqual(parsed.value);
		});

		test("contrast filter", () => {
			const input = "contrast(2)";
			const parsed = ParseFilter.parse(input);
			expect(parsed.ok).toBe(true);
			if (!parsed.ok) return;

			const css = GenerateFilter.toCss(parsed.value);
			const reparsed = ParseFilter.parse(css);
			expect(reparsed.ok).toBe(true);
			if (!reparsed.ok) return;

			expect(reparsed.value).toEqual(parsed.value);
		});

		test("drop-shadow filter", () => {
			const input = "drop-shadow(2px 2px 4px black)";
			const parsed = ParseFilter.parse(input);
			expect(parsed.ok).toBe(true);
			if (!parsed.ok) return;

			const css = GenerateFilter.toCss(parsed.value);
			const reparsed = ParseFilter.parse(css);
			expect(reparsed.ok).toBe(true);
			if (!reparsed.ok) return;

			expect(reparsed.value).toEqual(parsed.value);
		});

		test("grayscale filter", () => {
			const input = "grayscale(0.5)";
			const parsed = ParseFilter.parse(input);
			expect(parsed.ok).toBe(true);
			if (!parsed.ok) return;

			const css = GenerateFilter.toCss(parsed.value);
			const reparsed = ParseFilter.parse(css);
			expect(reparsed.ok).toBe(true);
			if (!reparsed.ok) return;

			expect(reparsed.value).toEqual(parsed.value);
		});

		test("hue-rotate filter", () => {
			const input = "hue-rotate(90deg)";
			const parsed = ParseFilter.parse(input);
			expect(parsed.ok).toBe(true);
			if (!parsed.ok) return;

			const css = GenerateFilter.toCss(parsed.value);
			const reparsed = ParseFilter.parse(css);
			expect(reparsed.ok).toBe(true);
			if (!reparsed.ok) return;

			expect(reparsed.value).toEqual(parsed.value);
		});

		test("invert filter", () => {
			const input = "invert(1)";
			const parsed = ParseFilter.parse(input);
			expect(parsed.ok).toBe(true);
			if (!parsed.ok) return;

			const css = GenerateFilter.toCss(parsed.value);
			const reparsed = ParseFilter.parse(css);
			expect(reparsed.ok).toBe(true);
			if (!reparsed.ok) return;

			expect(reparsed.value).toEqual(parsed.value);
		});

		test("opacity filter", () => {
			const input = "opacity(0.5)";
			const parsed = ParseFilter.parse(input);
			expect(parsed.ok).toBe(true);
			if (!parsed.ok) return;

			const css = GenerateFilter.toCss(parsed.value);
			const reparsed = ParseFilter.parse(css);
			expect(reparsed.ok).toBe(true);
			if (!reparsed.ok) return;

			expect(reparsed.value).toEqual(parsed.value);
		});

		test("saturate filter", () => {
			const input = "saturate(2)";
			const parsed = ParseFilter.parse(input);
			expect(parsed.ok).toBe(true);
			if (!parsed.ok) return;

			const css = GenerateFilter.toCss(parsed.value);
			const reparsed = ParseFilter.parse(css);
			expect(reparsed.ok).toBe(true);
			if (!reparsed.ok) return;

			expect(reparsed.value).toEqual(parsed.value);
		});

		test("sepia filter", () => {
			const input = "sepia(0.8)";
			const parsed = ParseFilter.parse(input);
			expect(parsed.ok).toBe(true);
			if (!parsed.ok) return;

			const css = GenerateFilter.toCss(parsed.value);
			const reparsed = ParseFilter.parse(css);
			expect(reparsed.ok).toBe(true);
			if (!reparsed.ok) return;

			expect(reparsed.value).toEqual(parsed.value);
		});

		test("url filter", () => {
			const input = "url(#filter-id)";
			const parsed = ParseFilter.parse(input);
			expect(parsed.ok).toBe(true);
			if (!parsed.ok) return;

			const css = GenerateFilter.toCss(parsed.value);
			const reparsed = ParseFilter.parse(css);
			expect(reparsed.ok).toBe(true);
			if (!reparsed.ok) return;

			expect(reparsed.value).toEqual(parsed.value);
		});
	});

	describe("Round-trip edge cases", () => {
		test("blur with zero value", () => {
			const input = "blur(0px)";
			const parsed = ParseFilter.parse(input);
			expect(parsed.ok).toBe(true);
			if (!parsed.ok) return;

			const css = GenerateFilter.toCss(parsed.value);
			const reparsed = ParseFilter.parse(css);
			expect(reparsed.ok).toBe(true);
			if (!reparsed.ok) return;

			expect(reparsed.value).toEqual(parsed.value);
		});

		test("brightness with zero value", () => {
			const input = "brightness(0)";
			const parsed = ParseFilter.parse(input);
			expect(parsed.ok).toBe(true);
			if (!parsed.ok) return;

			const css = GenerateFilter.toCss(parsed.value);
			const reparsed = ParseFilter.parse(css);
			expect(reparsed.ok).toBe(true);
			if (!reparsed.ok) return;

			expect(reparsed.value).toEqual(parsed.value);
		});

		test("drop-shadow without color", () => {
			const input = "drop-shadow(2px 2px)";
			const parsed = ParseFilter.parse(input);
			expect(parsed.ok).toBe(true);
			if (!parsed.ok) return;

			const css = GenerateFilter.toCss(parsed.value);
			const reparsed = ParseFilter.parse(css);
			expect(reparsed.ok).toBe(true);
			if (!reparsed.ok) return;

			expect(reparsed.value).toEqual(parsed.value);
		});

		test("hue-rotate with different angle units", () => {
			const input = "hue-rotate(1.5708rad)";
			const parsed = ParseFilter.parse(input);
			expect(parsed.ok).toBe(true);
			if (!parsed.ok) return;

			const css = GenerateFilter.toCss(parsed.value);
			const reparsed = ParseFilter.parse(css);
			expect(reparsed.ok).toBe(true);
			if (!reparsed.ok) return;

			expect(reparsed.value).toEqual(parsed.value);
		});
	});

	describe("Multiple filters in sequence", () => {
		test("parse and generate multiple filters", () => {
			const filters = [
				"blur(5px)",
				"brightness(1.5)",
				"drop-shadow(2px 2px 4px black)",
				"grayscale(0.5)",
				"url(#filter-id)",
			];

			const parsed = filters.map((f) => ParseFilter.parse(f));
			expect(parsed.every((r) => r.ok)).toBe(true);

			const generated = parsed.map((r) => (r.ok ? GenerateFilter.toCss(r.value) : ""));
			expect(generated).toEqual(filters);

			const reparsed = generated.map((css) => ParseFilter.parse(css));
			expect(reparsed.every((r) => r.ok)).toBe(true);

			// Verify deep equality
			for (let i = 0; i < parsed.length; i++) {
				if (parsed[i]?.ok && reparsed[i]?.ok) {
					expect(reparsed[i]).toEqual(parsed[i]);
				}
			}
		});
	});

	describe("Master API usage patterns", () => {
		test("can parse and generate using unified API", () => {
			const testCases = ["blur(10px)", "brightness(2)", "contrast(1.5)", "grayscale(1)", "invert(0.5)"];

			for (const input of testCases) {
				const parsed = ParseFilter.parse(input);
				expect(parsed.ok).toBe(true);
				if (!parsed.ok) continue;

				const css = GenerateFilter.toCss(parsed.value);
				expect(css).toBe(input);
			}
		});

		test("type discrimination works correctly", () => {
			const blurResult = ParseFilter.parse("blur(5px)");
			expect(blurResult.ok).toBe(true);
			if (!blurResult.ok) return;
			expect(blurResult.value.kind).toBe("blur");

			const brightnessResult = ParseFilter.parse("brightness(1.5)");
			expect(brightnessResult.ok).toBe(true);
			if (!brightnessResult.ok) return;
			expect(brightnessResult.value.kind).toBe("brightness");

			// Different kinds produce different types
			expect(blurResult.value.kind).not.toBe(brightnessResult.value.kind);
		});
	});
});
