// b_path:: src/utils/parse/url.test.ts

import { describe, expect, it } from "vitest";
import { parseUrl } from "./url";

describe("parseUrl", () => {
	it("parses fragment identifier", () => {
		const result = parseUrl("url(#clip-shape)");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("url");
			expect(result.value.value).toBe("#clip-shape");
		}
	});

	it("parses quoted URL", () => {
		const result = parseUrl("url('shapes.svg#clip')");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.value).toBe("shapes.svg#clip");
		}
	});

	it("parses double-quoted URL", () => {
		const result = parseUrl('url("image.png")');
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.value).toBe("image.png");
		}
	});

	it("parses unquoted URL", () => {
		const result = parseUrl("url(path/to/file.svg)");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.value).toBe("path/to/file.svg");
		}
	});

	it("parses absolute URL", () => {
		const result = parseUrl("url(https://example.com/image.png)");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.value).toBe("https://example.com/image.png");
		}
	});

	it("parses data URL", () => {
		const result = parseUrl("url(data:image/svg+xml,...)");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.value).toBe("data:image/svg+xml,...");
		}
	});

	it("rejects invalid syntax", () => {
		const result = parseUrl("not-a-url");
		expect(result.ok).toBe(false);
	});

	it("rejects empty string", () => {
		const result = parseUrl("");
		expect(result.ok).toBe(false);
	});

	it("rejects missing url function", () => {
		const result = parseUrl("#clip");
		expect(result.ok).toBe(false);
	});
});
