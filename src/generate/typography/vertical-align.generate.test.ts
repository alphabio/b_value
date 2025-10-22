// b_path:: src/generate/typography/vertical-align.generate.test.ts
import { describe, expect, it } from "vitest";
import { toCss } from "./vertical-align";

describe("Generate.Typography.VerticalAlign", () => {
	describe("keywords", () => {
		it("should generate 'baseline'", () => {
			const result = toCss({ kind: "vertical-align", value: "baseline" });
			expect(result).toBe("baseline");
		});

		it("should generate 'sub'", () => {
			const result = toCss({ kind: "vertical-align", value: "sub" });
			expect(result).toBe("sub");
		});

		it("should generate 'super'", () => {
			const result = toCss({ kind: "vertical-align", value: "super" });
			expect(result).toBe("super");
		});

		it("should generate 'text-top'", () => {
			const result = toCss({ kind: "vertical-align", value: "text-top" });
			expect(result).toBe("text-top");
		});

		it("should generate 'text-bottom'", () => {
			const result = toCss({ kind: "vertical-align", value: "text-bottom" });
			expect(result).toBe("text-bottom");
		});

		it("should generate 'middle'", () => {
			const result = toCss({ kind: "vertical-align", value: "middle" });
			expect(result).toBe("middle");
		});

		it("should generate 'top'", () => {
			const result = toCss({ kind: "vertical-align", value: "top" });
			expect(result).toBe("top");
		});

		it("should generate 'bottom'", () => {
			const result = toCss({ kind: "vertical-align", value: "bottom" });
			expect(result).toBe("bottom");
		});
	});

	describe("length values", () => {
		it("should generate '5px'", () => {
			const result = toCss({ kind: "vertical-align", value: { value: 5, unit: "px" } });
			expect(result).toBe("5px");
		});

		it("should generate '0.5em'", () => {
			const result = toCss({ kind: "vertical-align", value: { value: 0.5, unit: "em" } });
			expect(result).toBe("0.5em");
		});

		it("should generate negative value '-2px'", () => {
			const result = toCss({ kind: "vertical-align", value: { value: -2, unit: "px" } });
			expect(result).toBe("-2px");
		});
	});

	describe("percentage values", () => {
		it("should generate '50%'", () => {
			const result = toCss({ kind: "vertical-align", value: { value: 50, unit: "%" } });
			expect(result).toBe("50%");
		});

		it("should generate negative percentage '-25%'", () => {
			const result = toCss({ kind: "vertical-align", value: { value: -25, unit: "%" } });
			expect(result).toBe("-25%");
		});
	});
});
