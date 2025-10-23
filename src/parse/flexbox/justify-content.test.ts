// b_path:: src/parse/flexbox/justify-content.test.ts

import { describe, expect, it } from "vitest";
import * as JustifyContent from "./justify-content";

describe("parse/flexbox/justify-content", () => {
	describe("valid values", () => {
		it("parses flex-start", () => {
			const result = JustifyContent.parse("flex-start");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "justify-content", value: "flex-start" });
			}
		});

		it("parses flex-end", () => {
			const result = JustifyContent.parse("flex-end");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "justify-content", value: "flex-end" });
			}
		});

		it("parses center", () => {
			const result = JustifyContent.parse("center");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "justify-content", value: "center" });
			}
		});

		it("parses space-between", () => {
			const result = JustifyContent.parse("space-between");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "justify-content", value: "space-between" });
			}
		});

		it("parses space-around", () => {
			const result = JustifyContent.parse("space-around");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "justify-content", value: "space-around" });
			}
		});

		it("parses space-evenly", () => {
			const result = JustifyContent.parse("space-evenly");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "justify-content", value: "space-evenly" });
			}
		});
	});

	describe("normalization", () => {
		it("handles uppercase", () => {
			const result = JustifyContent.parse("CENTER");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toBe("center");
			}
		});
	});

	describe("invalid values", () => {
		it("rejects invalid keyword", () => {
			const result = JustifyContent.parse("invalid");
			expect(result.ok).toBe(false);
		});

		it("rejects empty string", () => {
			const result = JustifyContent.parse("");
			expect(result.ok).toBe(false);
		});
	});
});
