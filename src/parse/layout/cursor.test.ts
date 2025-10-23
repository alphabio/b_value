// b_path:: src/parse/layout/cursor.test.ts

import { describe, expect, it } from "vitest";
import * as Cursor from "./cursor";

describe("parse/layout/cursor", () => {
	describe("valid values", () => {
		it("parses pointer", () => {
			const result = Cursor.parse("pointer");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "cursor", value: "pointer" });
			}
		});

		it("parses default", () => {
			const result = Cursor.parse("default");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "cursor", value: "default" });
			}
		});

		it("parses text", () => {
			const result = Cursor.parse("text");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "cursor", value: "text" });
			}
		});

		it("parses move", () => {
			const result = Cursor.parse("move");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "cursor", value: "move" });
			}
		});

		it("parses wait", () => {
			const result = Cursor.parse("wait");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "cursor", value: "wait" });
			}
		});

		it("parses crosshair", () => {
			const result = Cursor.parse("crosshair");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "cursor", value: "crosshair" });
			}
		});
	});

	describe("normalization", () => {
		it("handles uppercase", () => {
			const result = Cursor.parse("POINTER");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toBe("pointer");
			}
		});

		it("handles whitespace", () => {
			const result = Cursor.parse("  text  ");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toBe("text");
			}
		});
	});

	describe("invalid values", () => {
		it("rejects invalid keyword", () => {
			const result = Cursor.parse("invalid");
			expect(result.ok).toBe(false);
		});

		it("rejects empty string", () => {
			const result = Cursor.parse("");
			expect(result.ok).toBe(false);
		});

		it("rejects multiple values", () => {
			const result = Cursor.parse("pointer default");
			expect(result.ok).toBe(false);
		});

		it("handles parse exception", () => {
			const result = Cursor.parse("@@@");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Failed to parse cursor");
			}
		});
	});
});
