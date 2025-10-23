// b_path:: src/parse/flexbox/align-self.test.ts

import { describe, expect, it } from "vitest";
import * as AlignSelf from "./align-self";

describe("parse/flexbox/align-self", () => {
	describe("valid values", () => {
		it("parses auto", () => {
			const result = AlignSelf.parse("auto");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "align-self", value: "auto" });
			}
		});

		it("parses flex-start", () => {
			const result = AlignSelf.parse("flex-start");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "align-self", value: "flex-start" });
			}
		});

		it("parses flex-end", () => {
			const result = AlignSelf.parse("flex-end");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "align-self", value: "flex-end" });
			}
		});

		it("parses center", () => {
			const result = AlignSelf.parse("center");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "align-self", value: "center" });
			}
		});

		it("parses baseline", () => {
			const result = AlignSelf.parse("baseline");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "align-self", value: "baseline" });
			}
		});

		it("parses stretch", () => {
			const result = AlignSelf.parse("stretch");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "align-self", value: "stretch" });
			}
		});
	});

	describe("normalization", () => {
		it("handles uppercase", () => {
			const result = AlignSelf.parse("CENTER");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toBe("center");
			}
		});
	});

	describe("invalid values", () => {
		it("rejects invalid keyword", () => {
			const result = AlignSelf.parse("invalid");
			expect(result.ok).toBe(false);
		});

		it("rejects empty string", () => {
			const result = AlignSelf.parse("");
			expect(result.ok).toBe(false);
		});
	});
});
