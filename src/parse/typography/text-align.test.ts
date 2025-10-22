import { describe, expect, it } from "vitest";
import * as TextAlign from "./text-align";

describe("Parse.Typography.TextAlign", () => {
	describe("basic alignment keywords", () => {
		it("should parse 'left'", () => {
			const result = TextAlign.parse("left");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "text-align",
					value: "left",
				});
			}
		});

		it("should parse 'right'", () => {
			const result = TextAlign.parse("right");
			expect(result.ok).toBe(true);
			if (result.ok) expect(result.value.value).toBe("right");
		});

		it("should parse 'center'", () => {
			const result = TextAlign.parse("center");
			expect(result.ok).toBe(true);
			if (result.ok) expect(result.value.value).toBe("center");
		});

		it("should parse 'justify'", () => {
			const result = TextAlign.parse("justify");
			expect(result.ok).toBe(true);
			if (result.ok) expect(result.value.value).toBe("justify");
		});
	});

	describe("extended alignment keywords", () => {
		it("should parse 'start'", () => {
			const result = TextAlign.parse("start");
			expect(result.ok).toBe(true);
			if (result.ok) expect(result.value.value).toBe("start");
		});

		it("should parse 'end'", () => {
			const result = TextAlign.parse("end");
			expect(result.ok).toBe(true);
			if (result.ok) expect(result.value.value).toBe("end");
		});
	});

	describe("error cases", () => {
		it("should reject invalid keyword", () => {
			const result = TextAlign.parse("invalid");
			expect(result.ok).toBe(false);
		});

		it("should reject multiple values", () => {
			const result = TextAlign.parse("left center");
			expect(result.ok).toBe(false);
		});

		it("should reject numeric values", () => {
			const result = TextAlign.parse("10px");
			expect(result.ok).toBe(false);
		});
	});
});
