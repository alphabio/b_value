// b_path:: src/core/types/url.test.ts

import { describe, expect, it } from "vitest";
import { type Url, urlSchema } from "./url";

describe("urlSchema", () => {
	it("validates fragment identifier", () => {
		const result = urlSchema.safeParse({ kind: "url", value: "#clip-shape" });
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.kind).toBe("url");
			expect(result.data.value).toBe("#clip-shape");
		}
	});

	it("validates file path", () => {
		const result = urlSchema.safeParse({ kind: "url", value: "shapes.svg#clip" });
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.value).toBe("shapes.svg#clip");
		}
	});

	it("validates absolute URL", () => {
		const result = urlSchema.safeParse({ kind: "url", value: "https://example.com/image.png" });
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.value).toBe("https://example.com/image.png");
		}
	});

	it("validates data URL", () => {
		const result = urlSchema.safeParse({ kind: "url", value: "data:image/svg+xml,..." });
		expect(result.success).toBe(true);
	});

	it("rejects missing kind", () => {
		const result = urlSchema.safeParse({ value: "#test" });
		expect(result.success).toBe(false);
	});

	it("rejects wrong kind", () => {
		const result = urlSchema.safeParse({ kind: "invalid", value: "#test" });
		expect(result.success).toBe(false);
	});

	it("rejects missing value", () => {
		const result = urlSchema.safeParse({ kind: "url" });
		expect(result.success).toBe(false);
	});

	it("rejects non-string value", () => {
		const result = urlSchema.safeParse({ kind: "url", value: 123 });
		expect(result.success).toBe(false);
	});
});

describe("Url type", () => {
	it("accepts valid URL", () => {
		const url: Url = { kind: "url", value: "#clip" };
		expect(url.kind).toBe("url");
		expect(url.value).toBe("#clip");
	});
});
