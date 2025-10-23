// b_path:: src/parse/flexbox/flex-wrap.test.ts

import { describe, expect, it } from "vitest";
import * as FlexWrap from "./flex-wrap";

describe("parse/flexbox/flex-wrap", () => {
	describe("valid values", () => {
		it("parses nowrap", () => {
			const result = FlexWrap.parse("nowrap");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "flex-wrap", value: "nowrap" });
			}
		});

		it("parses wrap", () => {
			const result = FlexWrap.parse("wrap");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "flex-wrap", value: "wrap" });
			}
		});

		it("parses wrap-reverse", () => {
			const result = FlexWrap.parse("wrap-reverse");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "flex-wrap", value: "wrap-reverse" });
			}
		});
	});

	describe("normalization", () => {
		it("handles uppercase", () => {
			const result = FlexWrap.parse("WRAP");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toBe("wrap");
			}
		});
	});

	describe("invalid values", () => {
		it("rejects invalid keyword", () => {
			const result = FlexWrap.parse("invalid");
			expect(result.ok).toBe(false);
		});

		it("rejects empty string", () => {
			const result = FlexWrap.parse("");
			expect(result.ok).toBe(false);
		});
	});
});
