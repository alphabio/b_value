// b_path:: src/parse/filter/url.test.ts
import { describe, expect, test } from "vitest";
import { toCss } from "@/generate/filter/url";
import { parse } from "./url";

describe("parse() - URL filter parser", () => {
	describe("Valid inputs", () => {
		test("parses fragment identifier", () => {
			const result = parse("url(#filter-id)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "url",
				url: "#filter-id",
			});
		});

		test("parses fragment with quoted string", () => {
			const result = parse('url("#filter-id")');
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "url",
				url: "#filter-id",
			});
		});

		test("parses fragment with single quotes", () => {
			const result = parse("url('#filter-id')");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "url",
				url: "#filter-id",
			});
		});

		test("parses file path", () => {
			const result = parse("url(filters.svg)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "url",
				url: "filters.svg",
			});
		});

		test("parses file path with directory", () => {
			const result = parse("url(path/to/filters.svg)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "url",
				url: "path/to/filters.svg",
			});
		});

		test("parses quoted file path", () => {
			const result = parse('url("path/to/filters.svg")');
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "url",
				url: "path/to/filters.svg",
			});
		});

		test("parses absolute URL", () => {
			const result = parse("url(https://example.com/filter.svg)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "url",
				url: "https://example.com/filter.svg",
			});
		});

		test("parses fragment with special characters", () => {
			const result = parse("url(#my-filter-123)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toEqual({
				kind: "url",
				url: "#my-filter-123",
			});
		});
	});

	describe("Round-trip: parse → generate → parse", () => {
		test("fragment identifier", () => {
			const input = "url(#filter)";
			const parsed = parse(input);
			expect(parsed.ok).toBe(true);
			if (!parsed.ok) return;

			const css = toCss(parsed.value);
			const reparsed = parse(css);
			expect(reparsed.ok).toBe(true);
			if (!reparsed.ok) return;

			expect(reparsed.value).toEqual(parsed.value);
		});

		test("file path", () => {
			const input = "url(filters.svg)";
			const parsed = parse(input);
			expect(parsed.ok).toBe(true);
			if (!parsed.ok) return;

			const css = toCss(parsed.value);
			const reparsed = parse(css);
			expect(reparsed.ok).toBe(true);
			if (!reparsed.ok) return;

			expect(reparsed.value).toEqual(parsed.value);
		});

		test("path with directory", () => {
			const input = "url(path/to/filter.svg)";
			const parsed = parse(input);
			expect(parsed.ok).toBe(true);
			if (!parsed.ok) return;

			const css = toCss(parsed.value);
			const reparsed = parse(css);
			expect(reparsed.ok).toBe(true);
			if (!reparsed.ok) return;

			expect(reparsed.value).toEqual(parsed.value);
		});
	});

	describe("Error cases", () => {
		test("rejects empty input", () => {
			const result = parse("");
			expect(result.ok).toBe(false);
		});

		test("rejects non-url function", () => {
			const result = parse("blur(5px)");
			expect(result.ok).toBe(false);
		});

		test("rejects invalid syntax", () => {
			const result = parse("url(");
			expect(result.ok).toBe(false);
		});
	});
});

describe("toCss() - URL filter generator", () => {
	test("generates fragment identifier", () => {
		const css = toCss({ kind: "url", url: "#filter-id" });
		expect(css).toBe("url(#filter-id)");
	});

	test("generates file path", () => {
		const css = toCss({ kind: "url", url: "filters.svg" });
		expect(css).toBe("url(filters.svg)");
	});

	test("generates path with directory", () => {
		const css = toCss({ kind: "url", url: "path/to/filters.svg" });
		expect(css).toBe("url(path/to/filters.svg)");
	});

	test("generates absolute URL", () => {
		const css = toCss({ kind: "url", url: "https://example.com/filter.svg" });
		expect(css).toBe("url(https://example.com/filter.svg)");
	});
});
