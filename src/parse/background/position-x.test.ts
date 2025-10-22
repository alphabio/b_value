// b_path:: src/parse/background/position-x.test.ts

import { describe, expect, it } from "vitest";
import * as PositionX from "./position-x";

describe("parse/background/position-x", () => {
	describe("valid keywords", () => {
		it("parses left", () => {
			const result = PositionX.parse("left");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toBe("left");
			}
		});

		it("parses center", () => {
			const result = PositionX.parse("center");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toBe("center");
			}
		});

		it("parses right", () => {
			const result = PositionX.parse("right");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toBe("right");
			}
		});
	});

	describe("valid lengths", () => {
		it("parses pixels", () => {
			const result = PositionX.parse("10px");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ value: 10, unit: "px" });
			}
		});

		it("parses em", () => {
			const result = PositionX.parse("2em");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ value: 2, unit: "em" });
			}
		});

		it("parses zero without unit", () => {
			const result = PositionX.parse("0");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ value: 0, unit: "px" });
			}
		});
	});

	describe("valid percentages", () => {
		it("parses 50%", () => {
			const result = PositionX.parse("50%");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ value: 50, unit: "%" });
			}
		});

		it("parses 0%", () => {
			const result = PositionX.parse("0%");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ value: 0, unit: "%" });
			}
		});

		it("parses 100%", () => {
			const result = PositionX.parse("100%");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ value: 100, unit: "%" });
			}
		});
	});

	describe("normalization", () => {
		it("handles uppercase", () => {
			const result = PositionX.parse("CENTER");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toBe("center");
			}
		});

		it("handles whitespace", () => {
			const result = PositionX.parse("  left  ");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toBe("left");
			}
		});
	});

	describe("invalid values", () => {
		it("rejects multiple values", () => {
			const result = PositionX.parse("left center");
			expect(result.ok).toBe(false);
		});

		it("rejects empty string", () => {
			const result = PositionX.parse("");
			expect(result.ok).toBe(false);
		});

		it("rejects invalid unit", () => {
			const result = PositionX.parse("10invalid");
			expect(result.ok).toBe(false);
		});
	});
});
