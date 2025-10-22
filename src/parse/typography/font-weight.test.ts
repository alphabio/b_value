import { describe, expect, it } from "vitest";
import * as FontWeight from "./font-weight";

describe("Parse.Typography.FontWeight", () => {
	describe("keyword values", () => {
		it("should parse 'normal'", () => {
			const result = FontWeight.parse("normal");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "font-weight",
					value: "normal",
				});
			}
		});

		it("should parse 'bold'", () => {
			const result = FontWeight.parse("bold");
			expect(result.ok).toBe(true);
			if (result.ok) expect(result.value.value).toBe("bold");
		});

		it("should parse 'bolder'", () => {
			const result = FontWeight.parse("bolder");
			expect(result.ok).toBe(true);
			if (result.ok) expect(result.value.value).toBe("bolder");
		});

		it("should parse 'lighter'", () => {
			const result = FontWeight.parse("lighter");
			expect(result.ok).toBe(true);
			if (result.ok) expect(result.value.value).toBe("lighter");
		});
	});

	describe("numeric values", () => {
		it("should parse standard weights", () => {
			const weights = [100, 200, 300, 400, 500, 600, 700, 800, 900];
			for (const weight of weights) {
				const result = FontWeight.parse(String(weight));
				expect(result.ok).toBe(true);
				if (result.ok) expect(result.value.value).toBe(weight);
			}
		});

		it("should parse variable font weights", () => {
			const result = FontWeight.parse("350");
			expect(result.ok).toBe(true);
			if (result.ok) expect(result.value.value).toBe(350);
		});

		it("should parse weight 1", () => {
			const result = FontWeight.parse("1");
			expect(result.ok).toBe(true);
			if (result.ok) expect(result.value.value).toBe(1);
		});

		it("should parse weight 1000", () => {
			const result = FontWeight.parse("1000");
			expect(result.ok).toBe(true);
			if (result.ok) expect(result.value.value).toBe(1000);
		});
	});

	describe("error cases", () => {
		it("should reject invalid keyword", () => {
			const result = FontWeight.parse("invalid");
			expect(result.ok).toBe(false);
		});

		it("should reject weight out of range (< 1)", () => {
			const result = FontWeight.parse("0");
			expect(result.ok).toBe(false);
		});

		it("should reject weight out of range (> 1000)", () => {
			const result = FontWeight.parse("1001");
			expect(result.ok).toBe(false);
		});

		it("should reject multiple values", () => {
			const result = FontWeight.parse("400 500");
			expect(result.ok).toBe(false);
		});
	});
});
