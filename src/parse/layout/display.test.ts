// b_path:: src/parse/layout/display.test.ts

import { describe, expect, it } from "vitest";
import * as Display from "./display";

describe("parse/layout/display", () => {
	describe("valid values", () => {
		it("parses block", () => {
			const result = Display.parse("block");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "display", value: "block" });
			}
		});

		it("parses inline", () => {
			const result = Display.parse("inline");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "display", value: "inline" });
			}
		});

		it("parses flex", () => {
			const result = Display.parse("flex");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "display", value: "flex" });
			}
		});

		it("parses grid", () => {
			const result = Display.parse("grid");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "display", value: "grid" });
			}
		});

		it("parses none", () => {
			const result = Display.parse("none");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "display", value: "none" });
			}
		});

		it("parses inline-block", () => {
			const result = Display.parse("inline-block");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "display", value: "inline-block" });
			}
		});
	});

	describe("normalization", () => {
		it("handles uppercase", () => {
			const result = Display.parse("FLEX");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toBe("flex");
			}
		});

		it("handles whitespace", () => {
			const result = Display.parse("  grid  ");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toBe("grid");
			}
		});
	});

	describe("invalid values", () => {
		it("rejects invalid keyword", () => {
			const result = Display.parse("invalid");
			expect(result.ok).toBe(false);
		});

		it("rejects empty string", () => {
			const result = Display.parse("");
			expect(result.ok).toBe(false);
		});
	});
});
