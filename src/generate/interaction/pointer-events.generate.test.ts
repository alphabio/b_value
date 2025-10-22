// b_path:: src/generate/interaction/pointer-events.generate.test.ts
import { describe, expect, it } from "vitest";
import { toCss } from "./pointer-events";

describe("Generate.Interaction.PointerEvents", () => {
	describe("standard values", () => {
		it("should generate 'auto'", () => {
			const result = toCss({ kind: "pointer-events", value: "auto" });
			expect(result).toBe("auto");
		});

		it("should generate 'none'", () => {
			const result = toCss({ kind: "pointer-events", value: "none" });
			expect(result).toBe("none");
		});
	});

	describe("SVG values", () => {
		it("should generate 'visiblePainted'", () => {
			const result = toCss({ kind: "pointer-events", value: "visiblePainted" });
			expect(result).toBe("visiblePainted");
		});

		it("should generate 'visibleFill'", () => {
			const result = toCss({ kind: "pointer-events", value: "visibleFill" });
			expect(result).toBe("visibleFill");
		});

		it("should generate 'visibleStroke'", () => {
			const result = toCss({ kind: "pointer-events", value: "visibleStroke" });
			expect(result).toBe("visibleStroke");
		});

		it("should generate 'visible'", () => {
			const result = toCss({ kind: "pointer-events", value: "visible" });
			expect(result).toBe("visible");
		});

		it("should generate 'painted'", () => {
			const result = toCss({ kind: "pointer-events", value: "painted" });
			expect(result).toBe("painted");
		});

		it("should generate 'fill'", () => {
			const result = toCss({ kind: "pointer-events", value: "fill" });
			expect(result).toBe("fill");
		});

		it("should generate 'stroke'", () => {
			const result = toCss({ kind: "pointer-events", value: "stroke" });
			expect(result).toBe("stroke");
		});

		it("should generate 'all'", () => {
			const result = toCss({ kind: "pointer-events", value: "all" });
			expect(result).toBe("all");
		});

		it("should generate 'bounding-box'", () => {
			const result = toCss({ kind: "pointer-events", value: "bounding-box" });
			expect(result).toBe("bounding-box");
		});
	});
});
