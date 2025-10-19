// b_path:: src/parse/clip-path/geometry-box.test.ts

import { describe, expect, test } from "vitest";
import * as Generate from "@/generate/clip-path/geometry-box";
import * as GeometryBox from "./geometry-box";

describe("Parse.ClipPath.GeometryBox", () => {
	describe("Visual box keywords", () => {
		test("content-box", () => {
			const result = GeometryBox.parse("content-box");
			expect(result.ok).toBe(true);
			if (!result.ok) return;

			expect(result.value).toEqual({
				kind: "clip-path-geometry-box",
				value: "content-box",
			});
		});

		test("padding-box", () => {
			const result = GeometryBox.parse("padding-box");
			expect(result.ok).toBe(true);
			if (!result.ok) return;

			expect(result.value).toEqual({
				kind: "clip-path-geometry-box",
				value: "padding-box",
			});
		});

		test("border-box", () => {
			const result = GeometryBox.parse("border-box");
			expect(result.ok).toBe(true);
			if (!result.ok) return;

			expect(result.value).toEqual({
				kind: "clip-path-geometry-box",
				value: "border-box",
			});
		});
	});

	describe("Shape box keywords", () => {
		test("margin-box", () => {
			const result = GeometryBox.parse("margin-box");
			expect(result.ok).toBe(true);
			if (!result.ok) return;

			expect(result.value).toEqual({
				kind: "clip-path-geometry-box",
				value: "margin-box",
			});
		});
	});

	describe("SVG box keywords", () => {
		test("fill-box", () => {
			const result = GeometryBox.parse("fill-box");
			expect(result.ok).toBe(true);
			if (!result.ok) return;

			expect(result.value).toEqual({
				kind: "clip-path-geometry-box",
				value: "fill-box",
			});
		});

		test("stroke-box", () => {
			const result = GeometryBox.parse("stroke-box");
			expect(result.ok).toBe(true);
			if (!result.ok) return;

			expect(result.value).toEqual({
				kind: "clip-path-geometry-box",
				value: "stroke-box",
			});
		});

		test("view-box", () => {
			const result = GeometryBox.parse("view-box");
			expect(result.ok).toBe(true);
			if (!result.ok) return;

			expect(result.value).toEqual({
				kind: "clip-path-geometry-box",
				value: "view-box",
			});
		});
	});

	describe("Whitespace handling", () => {
		test("leading whitespace", () => {
			const result = GeometryBox.parse("  content-box");
			expect(result.ok).toBe(true);
			if (!result.ok) return;

			expect(result.value.value).toBe("content-box");
		});

		test("trailing whitespace", () => {
			const result = GeometryBox.parse("padding-box  ");
			expect(result.ok).toBe(true);
			if (!result.ok) return;

			expect(result.value.value).toBe("padding-box");
		});

		test("both leading and trailing whitespace", () => {
			const result = GeometryBox.parse("  border-box  ");
			expect(result.ok).toBe(true);
			if (!result.ok) return;

			expect(result.value.value).toBe("border-box");
		});
	});

	describe("Invalid inputs", () => {
		test("invalid keyword", () => {
			const result = GeometryBox.parse("invalid-box");
			expect(result.ok).toBe(false);
			if (result.ok) return;

			expect(result.error).toContain("Invalid geometry-box value");
		});

		test("empty string", () => {
			const result = GeometryBox.parse("");
			expect(result.ok).toBe(false);
		});

		test("random text", () => {
			const result = GeometryBox.parse("not-a-box");
			expect(result.ok).toBe(false);
		});

		test("case sensitive - uppercase", () => {
			const result = GeometryBox.parse("CONTENT-BOX");
			expect(result.ok).toBe(false);
		});

		test("case sensitive - mixed case", () => {
			const result = GeometryBox.parse("Content-Box");
			expect(result.ok).toBe(false);
		});
	});

	describe("Round-trip validation", () => {
		test("content-box round-trip", () => {
			const parsed = GeometryBox.parse("content-box");
			expect(parsed.ok).toBe(true);
			if (!parsed.ok) return;

			const css = Generate.toCss(parsed.value);
			expect(css).toBe("content-box");

			const reparsed = GeometryBox.parse(css);
			expect(reparsed.ok).toBe(true);
			if (!reparsed.ok) return;

			expect(reparsed.value).toEqual(parsed.value);
		});

		test("padding-box round-trip", () => {
			const parsed = GeometryBox.parse("padding-box");
			expect(parsed.ok).toBe(true);
			if (!parsed.ok) return;

			const css = Generate.toCss(parsed.value);
			expect(css).toBe("padding-box");

			const reparsed = GeometryBox.parse(css);
			expect(reparsed.ok).toBe(true);
			if (!reparsed.ok) return;

			expect(reparsed.value).toEqual(parsed.value);
		});

		test("border-box round-trip", () => {
			const parsed = GeometryBox.parse("border-box");
			expect(parsed.ok).toBe(true);
			if (!parsed.ok) return;

			const css = Generate.toCss(parsed.value);
			expect(css).toBe("border-box");

			const reparsed = GeometryBox.parse(css);
			expect(reparsed.ok).toBe(true);
			if (!reparsed.ok) return;

			expect(reparsed.value).toEqual(parsed.value);
		});

		test("margin-box round-trip", () => {
			const parsed = GeometryBox.parse("margin-box");
			expect(parsed.ok).toBe(true);
			if (!parsed.ok) return;

			const css = Generate.toCss(parsed.value);
			expect(css).toBe("margin-box");

			const reparsed = GeometryBox.parse(css);
			expect(reparsed.ok).toBe(true);
			if (!reparsed.ok) return;

			expect(reparsed.value).toEqual(parsed.value);
		});

		test("fill-box round-trip", () => {
			const parsed = GeometryBox.parse("fill-box");
			expect(parsed.ok).toBe(true);
			if (!parsed.ok) return;

			const css = Generate.toCss(parsed.value);
			expect(css).toBe("fill-box");

			const reparsed = GeometryBox.parse(css);
			expect(reparsed.ok).toBe(true);
			if (!reparsed.ok) return;

			expect(reparsed.value).toEqual(parsed.value);
		});

		test("stroke-box round-trip", () => {
			const parsed = GeometryBox.parse("stroke-box");
			expect(parsed.ok).toBe(true);
			if (!parsed.ok) return;

			const css = Generate.toCss(parsed.value);
			expect(css).toBe("stroke-box");

			const reparsed = GeometryBox.parse(css);
			expect(reparsed.ok).toBe(true);
			if (!reparsed.ok) return;

			expect(reparsed.value).toEqual(parsed.value);
		});

		test("view-box round-trip", () => {
			const parsed = GeometryBox.parse("view-box");
			expect(parsed.ok).toBe(true);
			if (!parsed.ok) return;

			const css = Generate.toCss(parsed.value);
			expect(css).toBe("view-box");

			const reparsed = GeometryBox.parse(css);
			expect(reparsed.ok).toBe(true);
			if (!reparsed.ok) return;

			expect(reparsed.value).toEqual(parsed.value);
		});
	});
});
