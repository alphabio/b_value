// b_path:: src/parse/layout/box-sizing.test.ts

import { describe, expect, it } from "vitest";
import * as BoxSizing from "./box-sizing";

describe("parse/layout/box-sizing", () => {
	describe("valid values", () => {
		it("parses content-box", () => {
			const result = BoxSizing.parse("content-box");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "box-sizing", value: "content-box" });
			}
		});

		it("parses border-box", () => {
			const result = BoxSizing.parse("border-box");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "box-sizing", value: "border-box" });
			}
		});
	});

	describe("normalization", () => {
		it("handles uppercase", () => {
			const result = BoxSizing.parse("BORDER-BOX");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toBe("border-box");
			}
		});

		it("handles whitespace", () => {
			const result = BoxSizing.parse("  content-box  ");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toBe("content-box");
			}
		});
	});

	describe("invalid values", () => {
		it("rejects invalid keyword", () => {
			const result = BoxSizing.parse("padding-box");
			expect(result.ok).toBe(false);
		});

		it("rejects empty string", () => {
			const result = BoxSizing.parse("");
			expect(result.ok).toBe(false);
		});
	});
});
