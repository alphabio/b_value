// b_path:: src/parse/clip-path/url.test.ts

import { describe, expect, it } from "vitest";
import * as Generate from "@/generate/clip-path/url";
import { parse } from "./url";

describe("parse clip-path url()", () => {
	it("parses url with fragment ID", () => {
		const result = parse("url(#clip-shape)");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toEqual({
				kind: "url",
				value: "#clip-shape",
			});
		}
	});

	it("parses url with single quotes", () => {
		const result = parse("url('#clip-shape')");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.value).toBe("#clip-shape");
		}
	});

	it("parses url with double quotes", () => {
		const result = parse('url("#clip-shape")');
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.value).toBe("#clip-shape");
		}
	});

	it("parses url with file path", () => {
		const result = parse("url(shapes.svg#clip-id)");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.value).toBe("shapes.svg#clip-id");
		}
	});

	it("parses url with quoted file path", () => {
		const result = parse("url('shapes.svg#clip-id')");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.value).toBe("shapes.svg#clip-id");
		}
	});

	it("parses url with relative path", () => {
		const result = parse("url('../assets/shapes.svg#clip')");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.value).toBe("../assets/shapes.svg#clip");
		}
	});

	it("handles whitespace", () => {
		const result = parse("  url(#clip)  ");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.value).toBe("#clip");
		}
	});

	it("rejects invalid syntax", () => {
		const result = parse("notaurl");
		expect(result.ok).toBe(false);
	});

	it("rejects empty url", () => {
		const result = parse("url()");
		expect(result.ok).toBe(false);
	});
});

describe("round-trip url", () => {
	const cases = [
		"url(#clip-shape)",
		"url('#clip-shape')",
		"url(shapes.svg#clip-id)",
		"url('../assets/shapes.svg#clip')",
	];

	for (const css of cases) {
		it(`round-trips: ${css}`, () => {
			const parsed = parse(css);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Generate.toCss(parsed.value);
				const reparsed = parse(generated);
				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});
	}
});
