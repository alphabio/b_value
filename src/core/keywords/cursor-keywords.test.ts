// b_path:: src/core/keywords/cursor-keywords.test.ts
import { describe, expect, it } from "vitest";
import { CURSOR_KEYWORDS, type CursorKeyword, cursorKeywordOptions, cursorKeywordsSchema } from "./cursor-keywords";

describe("cursorKeywordsSchema", () => {
	it("accepts all valid cursor keywords", () => {
		const keywords: CursorKeyword[] = [
			"auto",
			"default",
			"none",
			"context-menu",
			"help",
			"pointer",
			"progress",
			"wait",
			"cell",
			"crosshair",
			"text",
			"vertical-text",
			"alias",
			"copy",
			"move",
			"no-drop",
			"not-allowed",
			"grab",
			"grabbing",
			"e-resize",
			"n-resize",
			"ne-resize",
			"nw-resize",
			"s-resize",
			"se-resize",
			"sw-resize",
			"w-resize",
			"ew-resize",
			"ns-resize",
			"nesw-resize",
			"nwse-resize",
			"col-resize",
			"row-resize",
			"all-scroll",
			"zoom-in",
			"zoom-out",
		];
		for (const keyword of keywords) {
			expect(cursorKeywordsSchema.safeParse(keyword).success).toBe(true);
		}
	});

	it("rejects invalid keywords", () => {
		const invalid = ["invalid", "hand", "arrow", "resize", "", 123, null, undefined];
		for (const value of invalid) {
			expect(cursorKeywordsSchema.safeParse(value).success).toBe(false);
		}
	});

	it("exports correct CURSOR_KEYWORDS array", () => {
		expect(CURSOR_KEYWORDS).toHaveLength(36);
		expect(CURSOR_KEYWORDS).toContain("pointer");
		expect(CURSOR_KEYWORDS).toContain("auto");
		expect(CURSOR_KEYWORDS).toContain("default");
		expect(CURSOR_KEYWORDS).toContain("none");
		expect(CURSOR_KEYWORDS).toContain("grab");
		expect(CURSOR_KEYWORDS).toContain("grabbing");
	});

	it("exports keyword options with descriptions", () => {
		expect(cursorKeywordOptions).toHaveLength(36);
		for (const option of cursorKeywordOptions) {
			expect(option).toHaveProperty("value");
			expect(option).toHaveProperty("description");
			expect(typeof option.value).toBe("string");
			expect(typeof option.description).toBe("string");
		}
	});

	it("has description for pointer keyword", () => {
		const pointerOption = cursorKeywordOptions.find((opt) => opt.value === "pointer");
		expect(pointerOption?.description).toContain("link");
	});

	it("has description for resize keywords", () => {
		const eResizeOption = cursorKeywordOptions.find((opt) => opt.value === "e-resize");
		expect(eResizeOption?.description).toContain("east");

		const nResizeOption = cursorKeywordOptions.find((opt) => opt.value === "n-resize");
		expect(nResizeOption?.description).toContain("north");
	});

	it("includes all directional resize cursors", () => {
		const resizeKeywords = [
			"e-resize",
			"n-resize",
			"ne-resize",
			"nw-resize",
			"s-resize",
			"se-resize",
			"sw-resize",
			"w-resize",
		];
		for (const keyword of resizeKeywords) {
			expect(CURSOR_KEYWORDS).toContain(keyword);
		}
	});

	it("includes bidirectional resize cursors", () => {
		const biResizeKeywords = ["ew-resize", "ns-resize", "nesw-resize", "nwse-resize"];
		for (const keyword of biResizeKeywords) {
			expect(CURSOR_KEYWORDS).toContain(keyword);
		}
	});
});
