// b_path:: src/parse/visual/visibility.test.ts

import { describe, expect, it } from "vitest";
import * as Visibility from "./visibility";

describe("parse/visual/visibility", () => {
	describe("valid values", () => {
		it("parses visible", () => {
			const result = Visibility.parse("visible");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "visibility", value: "visible" });
			}
		});

		it("parses hidden", () => {
			const result = Visibility.parse("hidden");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "visibility", value: "hidden" });
			}
		});

		it("parses collapse", () => {
			const result = Visibility.parse("collapse");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "visibility", value: "collapse" });
			}
		});
	});

	describe("normalization", () => {
		it("handles uppercase", () => {
			const result = Visibility.parse("VISIBLE");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toBe("visible");
			}
		});

		it("handles whitespace", () => {
			const result = Visibility.parse("  hidden  ");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toBe("hidden");
			}
		});
	});

	describe("invalid values", () => {
		it("rejects invalid keyword", () => {
			const result = Visibility.parse("invalid");
			expect(result.ok).toBe(false);
		});

		it("rejects empty string", () => {
			const result = Visibility.parse("");
			expect(result.ok).toBe(false);
		});

		it("rejects multiple values", () => {
			const result = Visibility.parse("visible hidden");
			expect(result.ok).toBe(false);
		});

		it("handles parse exception", () => {
			const result = Visibility.parse("@@@");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Failed to parse visibility");
			}
		});
	});
});
