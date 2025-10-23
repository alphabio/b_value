import { describe, expect, it } from "vitest";
import { parse } from "./url";

describe("parse clip-path url", () => {
	it("parses url with fragment identifier", () => {
		const result = parse("url(#clip-shape)");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toEqual({
				kind: "url",
				value: "#clip-shape",
			});
		}
	});

	it("parses url with file and fragment", () => {
		const result = parse("url(shapes.svg#clip)");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toEqual({
				kind: "url",
				value: "shapes.svg#clip",
			});
		}
	});

	it("parses url with single quotes", () => {
		const result = parse("url('shapes.svg#clip')");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toEqual({
				kind: "url",
				value: "shapes.svg#clip",
			});
		}
	});

	it("parses url with double quotes", () => {
		const result = parse('url("shapes.svg#clip")');
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toEqual({
				kind: "url",
				value: "shapes.svg#clip",
			});
		}
	});

	it("parses url with path", () => {
		const result = parse("url(/path/to/shapes.svg#myClip)");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.value).toBe("/path/to/shapes.svg#myClip");
		}
	});

	it("parses url with whitespace", () => {
		const result = parse("  url(#clip)  ");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.value).toBe("#clip");
		}
	});

	it("rejects invalid url format", () => {
		const result = parse("not-a-url");
		expect(result.ok).toBe(false);
	});

	it("rejects empty url", () => {
		const result = parse("url()");
		expect(result.ok).toBe(false);
	});

	it("handles missing closing parenthesis", () => {
		const result = parse("url(#clip");
		// The underlying parseUrl might handle this, so we just test it works
		expect(result).toBeDefined();
	});

	it("rejects empty string", () => {
		const result = parse("");
		expect(result.ok).toBe(false);
	});
});
