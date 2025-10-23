import { describe, expect, it } from "vitest";
import { parse } from "./url";

describe("parse filter url", () => {
	it("parses url with fragment identifier", () => {
		const result = parse("url(#filter-id)");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toEqual({
				kind: "url",
				url: "#filter-id",
			});
		}
	});

	it("parses url with file path", () => {
		const result = parse("url(filters.svg#blur)");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.url).toBe("filters.svg#blur");
		}
	});

	it("parses url with single quotes", () => {
		const result = parse("url('path/to/filter.svg')");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.url).toBe("path/to/filter.svg");
		}
	});

	it("parses url with double quotes", () => {
		const result = parse('url("path/to/filter.svg")');
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.url).toBe("path/to/filter.svg");
		}
	});

	it("parses simple fragment", () => {
		const result = parse("url(#glow)");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.url).toBe("#glow");
		}
	});

	it("rejects missing url()", () => {
		const result = parse("not-a-url");
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("Expected url() function");
		}
	});

	it("rejects empty url", () => {
		const result = parse("url()");
		expect(result.ok).toBe(false);
	});

	it("rejects empty string", () => {
		const result = parse("");
		expect(result.ok).toBe(false);
	});
});
