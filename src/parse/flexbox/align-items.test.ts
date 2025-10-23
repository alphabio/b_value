// b_path:: src/parse/flexbox/align-items.test.ts

import { describe, expect, it } from "vitest";
import * as AlignItems from "./align-items";

describe("parse/flexbox/align-items", () => {
	describe("valid values", () => {
		it("parses flex-start", () => {
			const result = AlignItems.parse("flex-start");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "align-items", value: "flex-start" });
			}
		});

		it("parses flex-end", () => {
			const result = AlignItems.parse("flex-end");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "align-items", value: "flex-end" });
			}
		});

		it("parses center", () => {
			const result = AlignItems.parse("center");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "align-items", value: "center" });
			}
		});

		it("parses baseline", () => {
			const result = AlignItems.parse("baseline");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "align-items", value: "baseline" });
			}
		});

		it("parses stretch", () => {
			const result = AlignItems.parse("stretch");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "align-items", value: "stretch" });
			}
		});
	});

	describe("normalization", () => {
		it("handles uppercase", () => {
			const result = AlignItems.parse("CENTER");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toBe("center");
			}
		});
	});

	describe("invalid values", () => {
		it("rejects invalid keyword", () => {
			const result = AlignItems.parse("invalid");
			expect(result.ok).toBe(false);
		});

		it("rejects empty string", () => {
			const result = AlignItems.parse("");
			expect(result.ok).toBe(false);
		});
	});
});
