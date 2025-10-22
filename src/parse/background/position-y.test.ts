// b_path:: src/parse/background/position-y.test.ts

import { describe, expect, it } from "vitest";
import * as PositionY from "./position-y";

describe("parse/background/position-y", () => {
	describe("valid keywords", () => {
		it("parses top", () => {
			const result = PositionY.parse("top");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toBe("top");
			}
		});

		it("parses center", () => {
			const result = PositionY.parse("center");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toBe("center");
			}
		});

		it("parses bottom", () => {
			const result = PositionY.parse("bottom");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toBe("bottom");
			}
		});
	});

	describe("valid lengths", () => {
		it("parses pixels", () => {
			const result = PositionY.parse("20px");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ value: 20, unit: "px" });
			}
		});

		it("parses em", () => {
			const result = PositionY.parse("3em");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ value: 3, unit: "em" });
			}
		});

		it("parses zero without unit", () => {
			const result = PositionY.parse("0");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ value: 0, unit: "px" });
			}
		});
	});

	describe("valid percentages", () => {
		it("parses 50%", () => {
			const result = PositionY.parse("50%");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ value: 50, unit: "%" });
			}
		});

		it("parses 0%", () => {
			const result = PositionY.parse("0%");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ value: 0, unit: "%" });
			}
		});

		it("parses 100%", () => {
			const result = PositionY.parse("100%");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ value: 100, unit: "%" });
			}
		});
	});

	describe("normalization", () => {
		it("handles uppercase", () => {
			const result = PositionY.parse("TOP");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toBe("top");
			}
		});

		it("handles whitespace", () => {
			const result = PositionY.parse("  bottom  ");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toBe("bottom");
			}
		});
	});

	describe("invalid values", () => {
		it("rejects multiple values", () => {
			const result = PositionY.parse("top bottom");
			expect(result.ok).toBe(false);
		});

		it("rejects empty string", () => {
			const result = PositionY.parse("");
			expect(result.ok).toBe(false);
		});

		it("rejects invalid unit", () => {
			const result = PositionY.parse("20invalid");
			expect(result.ok).toBe(false);
		});
	});
});
