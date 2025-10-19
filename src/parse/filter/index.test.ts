// b_path:: src/parse/filter/index.test.ts
import { describe, expect, test } from "vitest";
import { Filter } from "./index";

describe("Filter.parse() - Master filter parser", () => {
	describe("Auto-detection and parsing", () => {
		test("parses blur filter", () => {
			const result = Filter.parse("blur(5px)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.kind).toBe("blur");
		});

		test("parses brightness filter", () => {
			const result = Filter.parse("brightness(1.5)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.kind).toBe("brightness");
		});

		test("parses contrast filter", () => {
			const result = Filter.parse("contrast(2)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.kind).toBe("contrast");
		});

		test("parses drop-shadow filter", () => {
			const result = Filter.parse("drop-shadow(2px 2px 4px black)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.kind).toBe("drop-shadow");
		});

		test("parses grayscale filter", () => {
			const result = Filter.parse("grayscale(0.5)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.kind).toBe("grayscale");
		});

		test("parses hue-rotate filter", () => {
			const result = Filter.parse("hue-rotate(90deg)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.kind).toBe("hue-rotate");
		});

		test("parses invert filter", () => {
			const result = Filter.parse("invert(1)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.kind).toBe("invert");
		});

		test("parses opacity filter", () => {
			const result = Filter.parse("opacity(0.5)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.kind).toBe("opacity");
		});

		test("parses saturate filter", () => {
			const result = Filter.parse("saturate(2)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.kind).toBe("saturate");
		});

		test("parses sepia filter", () => {
			const result = Filter.parse("sepia(0.8)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.kind).toBe("sepia");
		});

		test("parses url filter", () => {
			const result = Filter.parse("url(#filter-id)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.kind).toBe("url");
		});
	});

	describe("Case insensitive function names", () => {
		test("parses BLUR filter", () => {
			const result = Filter.parse("BLUR(5px)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.kind).toBe("blur");
		});

		test("parses Brightness filter", () => {
			const result = Filter.parse("Brightness(1.5)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.kind).toBe("brightness");
		});
	});

	describe("Error cases", () => {
		test("rejects unknown filter function", () => {
			const result = Filter.parse("unknown(5px)");
			expect(result.ok).toBe(false);
			if (result.ok) return;
			expect(result.error).toContain("Unknown filter function");
		});

		test("rejects empty input", () => {
			const result = Filter.parse("");
			expect(result.ok).toBe(false);
		});

		test("rejects invalid syntax", () => {
			const result = Filter.parse("blur(");
			expect(result.ok).toBe(false);
		});
	});

	describe("Namespace exports", () => {
		test("exposes individual parsers", () => {
			expect(Filter.blur).toBeDefined();
			expect(Filter.brightness).toBeDefined();
			expect(Filter.contrast).toBeDefined();
			expect(Filter.dropShadow).toBeDefined();
			expect(Filter.grayscale).toBeDefined();
			expect(Filter.hueRotate).toBeDefined();
			expect(Filter.invert).toBeDefined();
			expect(Filter.opacity).toBeDefined();
			expect(Filter.saturate).toBeDefined();
			expect(Filter.sepia).toBeDefined();
			expect(Filter.url).toBeDefined();
		});

		test("individual parsers work", () => {
			const result = Filter.blur.parse("blur(5px)");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value.kind).toBe("blur");
		});
	});
});
