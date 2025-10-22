// b_path:: src/parse/background/image.test.ts

import { describe, expect, it } from "vitest";
import { parse } from "./image";

describe("background-image", () => {
	describe("single values", () => {
		it("parses single linear gradient", () => {
			const result = parse("linear-gradient(red, blue)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toHaveLength(1);
				expect(result.value[0]?.kind).toBe("linear");
			}
		});

		it("parses single radial gradient", () => {
			const result = parse("radial-gradient(circle, red, blue)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toHaveLength(1);
				expect(result.value[0]?.kind).toBe("radial");
			}
		});

		it("parses single conic gradient", () => {
			const result = parse("conic-gradient(red, blue)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toHaveLength(1);
				expect(result.value[0]?.kind).toBe("conic");
			}
		});

		it("parses url()", () => {
			const result = parse("url(image.png)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toHaveLength(1);
				const layer0 = result.value[0];
				expect(layer0).toEqual({ kind: "url", url: "image.png" });
			}
		});

		it("parses url() with quotes", () => {
			const result = parse('url("image.png")');
			expect(result.ok).toBe(true);
			if (result.ok) {
				const layer0 = result.value[0];
				expect(layer0).toEqual({ kind: "url", url: "image.png" });
			}
		});

		it("parses none", () => {
			const result = parse("none");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toHaveLength(1);
				const layer0 = result.value[0];
				expect(layer0).toEqual({ kind: "none" });
			}
		});
	});

	describe("multiple values", () => {
		it("parses two gradients", () => {
			const result = parse("linear-gradient(red, blue), radial-gradient(green, yellow)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toHaveLength(2);
				expect(result.value[0]?.kind).toBe("linear");
				expect(result.value[1]?.kind).toBe("radial");
			}
		});

		it("parses three gradients", () => {
			const result = parse(`
        linear-gradient(red, blue),
        radial-gradient(green, yellow),
        conic-gradient(red, blue)
      `);
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toHaveLength(3);
			}
		});

		it("parses mixed layers (url + gradient)", () => {
			const result = parse("url(bg.png), linear-gradient(red, blue)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toHaveLength(2);
				expect(result.value[0]?.kind).toBe("url");
				expect(result.value[1]?.kind).toBe("linear");
			}
		});

		it("parses mixed layers (gradient + none)", () => {
			const result = parse("linear-gradient(red, blue), none");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toHaveLength(2);
				expect(result.value[0]?.kind).toBe("linear");
				expect(result.value[1]?.kind).toBe("none");
			}
		});
	});

	describe("complex gradients (multiple layers)", () => {
		it("parses 7-layer gradient stack", () => {
			// Note: User's original example has bare numbers (e.g., "0") which current gradient parser doesn't support yet
			// This is a simplified version that demonstrates the comma-separated list capability
			const css = `
        radial-gradient(circle, white, transparent),
        radial-gradient(circle, rgba(255,255,255,0.15) 30%, transparent),
        radial-gradient(circle, rgba(255,255,255,0.2) 17%, transparent),
        radial-gradient(circle, rgba(255,255,255,0.2) 11%, transparent),
        radial-gradient(circle, rgba(255,255,255,0.2) 11%, transparent),
        radial-gradient(circle, rgba(255,255,255,0.1) 11%, transparent),
        linear-gradient(45deg, #343702 0%, #184500 20%, #187546 30%)
      `;
			const result = parse(css);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toHaveLength(7);
				expect(result.value[0]?.kind).toBe("radial");
				expect(result.value[6]?.kind).toBe("linear");
			}
		});

		it("parses 5 different gradient types", () => {
			const css = `
        linear-gradient(red, blue),
        radial-gradient(circle, green, yellow),
        conic-gradient(red, blue),
        url(texture.png),
        linear-gradient(to right, purple, pink)
      `;
			const result = parse(css);
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toHaveLength(5);
				expect(result.value[0]?.kind).toBe("linear");
				expect(result.value[1]?.kind).toBe("radial");
				expect(result.value[2]?.kind).toBe("conic");
				expect(result.value[3]?.kind).toBe("url");
				expect(result.value[4]?.kind).toBe("linear");
			}
		});
	});

	describe("error handling", () => {
		it("returns error for invalid gradient", () => {
			const result = parse("invalid-gradient(red, blue)");
			expect(result.ok).toBe(false);
		});

		it("handles partial failures in list", () => {
			const result = parse("linear-gradient(red, blue), invalid");
			// First gradient parses, second fails
			expect(result.ok).toBe(false);
			expect(result.issues.length).toBeGreaterThan(0);
		});
	});
});
