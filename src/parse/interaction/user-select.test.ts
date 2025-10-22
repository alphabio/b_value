// b_path:: src/parse/interaction/user-select.test.ts
import { describe, expect, it } from "vitest";
import * as UserSelect from "./user-select";

describe("Parse.Interaction.UserSelect", () => {
	describe("valid keywords", () => {
		it("should parse 'auto'", () => {
			const result = UserSelect.parse("auto");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "user-select",
					value: "auto",
				});
			}
		});

		it("should parse 'text'", () => {
			const result = UserSelect.parse("text");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "user-select",
					value: "text",
				});
			}
		});

		it("should parse 'none'", () => {
			const result = UserSelect.parse("none");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "user-select",
					value: "none",
				});
			}
		});

		it("should parse 'contain'", () => {
			const result = UserSelect.parse("contain");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "user-select",
					value: "contain",
				});
			}
		});

		it("should parse 'all'", () => {
			const result = UserSelect.parse("all");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "user-select",
					value: "all",
				});
			}
		});
	});

	describe("case insensitivity", () => {
		it("should parse 'AUTO' (uppercase)", () => {
			const result = UserSelect.parse("AUTO");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toBe("auto");
			}
		});

		it("should parse 'None' (mixed case)", () => {
			const result = UserSelect.parse("None");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toBe("none");
			}
		});
	});

	describe("invalid values", () => {
		it("should reject invalid keyword", () => {
			const result = UserSelect.parse("invalid");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Invalid user-select keyword");
			}
		});

		it("should reject numeric value", () => {
			const result = UserSelect.parse("1");
			expect(result.ok).toBe(false);
		});

		it("should reject empty string", () => {
			const result = UserSelect.parse("");
			expect(result.ok).toBe(false);
		});

		it("should reject multiple values", () => {
			const result = UserSelect.parse("none auto");
			expect(result.ok).toBe(false);
		});
	});
});
