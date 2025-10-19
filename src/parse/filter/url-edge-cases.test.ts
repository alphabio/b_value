// b_path:: src/parse/filter/url-edge-cases.test.ts
import { describe, expect, test } from "vitest";
import { toCss } from "@/generate/filter/url";
import { parse } from "./url";

describe("URL filter edge cases", () => {
	describe("Data URIs", () => {
		test("parses SVG data URI", () => {
			const input = "url(\"data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E\")";
			const result = parse(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.url).toBe("data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%3E%3C/svg%3E");
		});

		test("parses base64 data URI", () => {
			const input = 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA")';
			const result = parse(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.url).toBe("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA");
		});
	});

	describe("URLs with special characters", () => {
		test("parses absolute URL without quotes", () => {
			const input = "url(https://example.com/image.png)";
			const result = parse(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.url).toBe("https://example.com/image.png");
		});

		test("parses URL with spaces (quoted)", () => {
			const input = 'url("https://example.com/image with spaces.png")';
			const result = parse(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.url).toBe("https://example.com/image with spaces.png");
		});

		test("parses URL with encoded quote", () => {
			const input = "url('https://example.com/image-with-quote%22inside.png')";
			const result = parse(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.url).toBe("https://example.com/image-with-quote%22inside.png");
		});
	});

	describe("Escaped characters", () => {
		test("parses URL with escaped space", () => {
			const input = 'url("https://example.com/escape\\\\20space.png")';
			const result = parse(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			// css-tree handles escape sequences
			expect(result.value.url).toContain("example.com");
		});

		test("parses URL with unicode escape", () => {
			const input = 'url("https://example.com/unicode\\\\000026.png")';
			const result = parse(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.url).toContain("example.com");
		});

		test("parses URL with emoji", () => {
			const input = 'url("https://example.com/emoji-🌈.svg")';
			const result = parse(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.url).toBe("https://example.com/emoji-🌈.svg");
		});
	});

	describe("Relative paths", () => {
		test("parses relative path with parent navigation", () => {
			const input = "url(../assets/icons/../icons/logo.svg)";
			const result = parse(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.url).toBe("../assets/icons/../icons/logo.svg");
		});

		test("parses relative path with current directory", () => {
			const input = "url(./images/./../images/bg.jpg)";
			const result = parse(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.url).toBe("./images/./../images/bg.jpg");
		});
	});

	describe("Fragment identifiers", () => {
		test("parses SVG fragment identifier", () => {
			const input = 'url("sprite.svg#icon-home")';
			const result = parse(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.url).toBe("sprite.svg#icon-home");
		});

		test("parses standalone fragment identifier", () => {
			const input = 'url("#gradient1")';
			const result = parse(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.url).toBe("#gradient1");
		});
	});

	describe("Empty and invalid edge cases", () => {
		test("rejects empty url() function", () => {
			const input = "url()";
			const result = parse(input);
			expect(result.ok).toBe(false);
		});

		test("rejects empty string URL", () => {
			const input = 'url("")';
			const result = parse(input);
			expect(result.ok).toBe(false);
		});

		test("accepts whitespace-only URL (css-tree behavior)", () => {
			// Note: css-tree treats whitespace as valid URL content
			const input = "url('   ')";
			const result = parse(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.url).toBe("   ");
		});

		test("accepts partial URL (protocol only)", () => {
			const input = 'url("https://")';
			const result = parse(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.url).toBe("https://");
		});
	});

	describe("Mixed quotes and escapes", () => {
		test("parses URL with escaped quote inside", () => {
			const input = 'url("https://example.com/quote\\"inside.png")';
			const result = parse(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.url).toContain("example.com");
		});

		test("parses URL with single quote inside double quotes", () => {
			const input = 'url("https://example.com/quote\'inside.png")';
			const result = parse(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.url).toBe("https://example.com/quote'inside.png");
		});
	});

	describe("Unusual schemes", () => {
		test("parses FTP URL", () => {
			const input = 'url("ftp://example.com/resource.svg")';
			const result = parse(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.url).toBe("ftp://example.com/resource.svg");
		});

		test("parses chrome extension URL", () => {
			const input = 'url("chrome-extension://abc123/icon.png")';
			const result = parse(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.url).toBe("chrome-extension://abc123/icon.png");
		});

		test("parses blob URL", () => {
			const input = 'url("blob:https://example.com/550e8400-e29b-41d4-a716-446655440000")';
			const result = parse(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.url).toBe("blob:https://example.com/550e8400-e29b-41d4-a716-446655440000");
		});
	});

	describe("Round-trip verification", () => {
		test("data URI round-trips correctly", () => {
			const input = 'url("data:image/svg+xml,%3Csvg%3E%3C/svg%3E")';
			const parsed = parse(input);
			expect(parsed.ok).toBe(true);
			if (!parsed.ok) return;

			const css = toCss(parsed.value);
			const reparsed = parse(css);
			expect(reparsed.ok).toBe(true);
			if (!reparsed.ok) return;

			expect(reparsed.value.url).toBe(parsed.value.url);
		});

		test("absolute URL round-trips correctly", () => {
			const input = "url(https://example.com/image.png)";
			const parsed = parse(input);
			expect(parsed.ok).toBe(true);
			if (!parsed.ok) return;

			const css = toCss(parsed.value);
			const reparsed = parse(css);
			expect(reparsed.ok).toBe(true);
			if (!reparsed.ok) return;

			expect(reparsed.value).toEqual(parsed.value);
		});

		test("relative path round-trips correctly", () => {
			const input = "url(../assets/logo.svg)";
			const parsed = parse(input);
			expect(parsed.ok).toBe(true);
			if (!parsed.ok) return;

			const css = toCss(parsed.value);
			const reparsed = parse(css);
			expect(reparsed.ok).toBe(true);
			if (!reparsed.ok) return;

			expect(reparsed.value).toEqual(parsed.value);
		});

		test("fragment identifier round-trips correctly", () => {
			const input = 'url("#gradient1")';
			const parsed = parse(input);
			expect(parsed.ok).toBe(true);
			if (!parsed.ok) return;

			const css = toCss(parsed.value);
			const reparsed = parse(css);
			expect(reparsed.ok).toBe(true);
			if (!reparsed.ok) return;

			expect(reparsed.value).toEqual(parsed.value);
		});

		test("blob URL round-trips correctly", () => {
			const input = 'url("blob:https://example.com/550e8400-e29b-41d4-a716-446655440000")';
			const parsed = parse(input);
			expect(parsed.ok).toBe(true);
			if (!parsed.ok) return;

			const css = toCss(parsed.value);
			const reparsed = parse(css);
			expect(reparsed.ok).toBe(true);
			if (!reparsed.ok) return;

			expect(reparsed.value.url).toBe(parsed.value.url);
		});
	});
});
