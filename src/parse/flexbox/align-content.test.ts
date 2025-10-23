// b_path:: src/parse/flexbox/align-content.test.ts

import { describe, expect, it } from "vitest";
import * as AlignContent from "./align-content";

describe("parse/flexbox/align-content", () => {
	describe("valid values", () => {
		it("parses flex-start", () => {
			const result = AlignContent.parse("flex-start");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "align-content", value: "flex-start" });
			}
		});

		it("parses flex-end", () => {
			const result = AlignContent.parse("flex-end");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "align-content", value: "flex-end" });
			}
		});

		it("parses center", () => {
			const result = AlignContent.parse("center");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "align-content", value: "center" });
			}
		});

		it("parses space-between", () => {
			const result = AlignContent.parse("space-between");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "align-content", value: "space-between" });
			}
		});

		it("parses space-around", () => {
			const result = AlignContent.parse("space-around");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "align-content", value: "space-around" });
			}
		});

		it("parses space-evenly", () => {
			const result = AlignContent.parse("space-evenly");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "align-content", value: "space-evenly" });
			}
		});

		it("parses stretch", () => {
			const result = AlignContent.parse("stretch");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "align-content", value: "stretch" });
			}
		});
	});

	describe("normalization", () => {
		it("handles uppercase", () => {
			const result = AlignContent.parse("CENTER");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toBe("center");
			}
		});
	});

	describe("invalid values", () => {
		it("rejects invalid keyword", () => {
			const result = AlignContent.parse("invalid");
			expect(result.ok).toBe(false);
		});

		it("rejects empty string", () => {
			const result = AlignContent.parse("");
			expect(result.ok).toBe(false);
		});
	});
});
