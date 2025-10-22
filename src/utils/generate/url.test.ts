import { describe, expect, it } from "vitest";
import { urlToCss } from "./url";

describe("urlToCss", () => {
	it("should generate url() with ID reference", () => {
		expect(urlToCss({ kind: "url", value: "#clip-shape" })).toBe("url(#clip-shape)");
		expect(urlToCss({ kind: "url", value: "#gradient-1" })).toBe("url(#gradient-1)");
	});

	it("should generate url() with external path", () => {
		expect(urlToCss({ kind: "url", value: "image.png" })).toBe("url(image.png)");
		expect(urlToCss({ kind: "url", value: "/images/bg.jpg" })).toBe("url(/images/bg.jpg)");
	});

	it("should generate url() with absolute URL", () => {
		expect(urlToCss({ kind: "url", value: "https://example.com/image.png" })).toBe(
			"url(https://example.com/image.png)",
		);
	});

	it("should generate url() with data URI", () => {
		expect(urlToCss({ kind: "url", value: "data:image/svg+xml,..." })).toBe("url(data:image/svg+xml,...)");
	});

	it("should handle empty value", () => {
		expect(urlToCss({ kind: "url", value: "" })).toBe("url()");
	});

	it("should handle special characters", () => {
		expect(urlToCss({ kind: "url", value: "image name with spaces.png" })).toBe("url(image name with spaces.png)");
	});
});
