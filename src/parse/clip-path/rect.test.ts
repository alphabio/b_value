// b_path:: src/parse/clip-path/rect.test.ts
import { describe, expect, it } from "vitest";
import { parse } from "./rect";

describe("parse rect()", () => {
	describe("basic TRBL", () => {
		it("should parse single value (all sides)", () => {
			const result = parse("rect(10px)");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("clip-path-rect");
				expect(result.value.top).toEqual({ value: 10, unit: "px" });
				expect(result.value.right).toEqual({ value: 10, unit: "px" });
				expect(result.value.bottom).toEqual({ value: 10, unit: "px" });
				expect(result.value.left).toEqual({ value: 10, unit: "px" });
				expect(result.value.borderRadius).toBeUndefined();
			}
		});

		it("should parse two values (vertical | horizontal)", () => {
			const result = parse("rect(10px 20px)");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.top).toEqual({ value: 10, unit: "px" });
				expect(result.value.right).toEqual({ value: 20, unit: "px" });
				expect(result.value.bottom).toEqual({ value: 10, unit: "px" });
				expect(result.value.left).toEqual({ value: 20, unit: "px" });
			}
		});

		it("should parse three values", () => {
			const result = parse("rect(10px 20px 30px)");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.top).toEqual({ value: 10, unit: "px" });
				expect(result.value.right).toEqual({ value: 20, unit: "px" });
				expect(result.value.bottom).toEqual({ value: 30, unit: "px" });
				expect(result.value.left).toEqual({ value: 20, unit: "px" });
			}
		});

		it("should parse four values (TRBL)", () => {
			const result = parse("rect(10px 20px 30px 40px)");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.top).toEqual({ value: 10, unit: "px" });
				expect(result.value.right).toEqual({ value: 20, unit: "px" });
				expect(result.value.bottom).toEqual({ value: 30, unit: "px" });
				expect(result.value.left).toEqual({ value: 40, unit: "px" });
			}
		});
	});

	describe("auto keyword", () => {
		it("should parse auto for all sides", () => {
			const result = parse("rect(auto)");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.top).toBe("auto");
				expect(result.value.right).toBe("auto");
				expect(result.value.bottom).toBe("auto");
				expect(result.value.left).toBe("auto");
			}
		});

		it("should parse mixed auto and length values", () => {
			const result = parse("rect(10px auto 20px auto)");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.top).toEqual({ value: 10, unit: "px" });
				expect(result.value.right).toBe("auto");
				expect(result.value.bottom).toEqual({ value: 20, unit: "px" });
				expect(result.value.left).toBe("auto");
			}
		});

		it("should parse auto with percentage", () => {
			const result = parse("rect(auto 50% auto 25%)");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.top).toBe("auto");
				expect(result.value.right).toEqual({ value: 50, unit: "%" });
				expect(result.value.bottom).toBe("auto");
				expect(result.value.left).toEqual({ value: 25, unit: "%" });
			}
		});
	});

	describe("border-radius", () => {
		it("should parse with single border-radius", () => {
			const result = parse("rect(10px round 5px)");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.borderRadius).toBeDefined();
				expect(result.value.borderRadius?.topLeft).toEqual({ value: 5, unit: "px" });
				expect(result.value.borderRadius?.topRight).toEqual({ value: 5, unit: "px" });
				expect(result.value.borderRadius?.bottomRight).toEqual({ value: 5, unit: "px" });
				expect(result.value.borderRadius?.bottomLeft).toEqual({ value: 5, unit: "px" });
			}
		});

		it("should parse with multiple border-radius values", () => {
			const result = parse("rect(10px 20px round 5px 10px)");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.borderRadius).toBeDefined();
				expect(result.value.borderRadius?.topLeft).toEqual({ value: 5, unit: "px" });
				expect(result.value.borderRadius?.topRight).toEqual({ value: 10, unit: "px" });
			}
		});

		it("should parse with auto and border-radius", () => {
			const result = parse("rect(auto 10px round 8px)");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.top).toBe("auto");
				expect(result.value.right).toEqual({ value: 10, unit: "px" });
				expect(result.value.borderRadius).toBeDefined();
			}
		});
	});

	describe("edge cases", () => {
		it("should parse zero values", () => {
			const result = parse("rect(0 0 0 0)");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.top).toEqual({ value: 0, unit: "px" });
			}
		});

		it("should parse percentages", () => {
			const result = parse("rect(10% 20% 30% 40%)");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.top).toEqual({ value: 10, unit: "%" });
				expect(result.value.right).toEqual({ value: 20, unit: "%" });
			}
		});

		it("should parse mixed units", () => {
			const result = parse("rect(10px 5em 20% 0)");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.top).toEqual({ value: 10, unit: "px" });
				expect(result.value.right).toEqual({ value: 5, unit: "em" });
				expect(result.value.bottom).toEqual({ value: 20, unit: "%" });
				expect(result.value.left).toEqual({ value: 0, unit: "px" });
			}
		});
	});

	describe("errors", () => {
		it("should error on empty function", () => {
			const result = parse("rect()");
			expect(result.ok).toBe(false);
		});

		it("should error on too many values", () => {
			const result = parse("rect(1px 2px 3px 4px 5px)");
			expect(result.ok).toBe(false);
		});

		it("should error on invalid value", () => {
			const result = parse("rect(invalid)");
			expect(result.ok).toBe(false);
		});

		it("should error on round without radius", () => {
			const result = parse("rect(10px round)");
			expect(result.ok).toBe(false);
		});

		it("should error on non-rect function", () => {
			const result = parse("circle(50px)");
			expect(result.ok).toBe(false);
		});
	});
});
