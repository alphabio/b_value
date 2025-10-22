// b_path:: src/generate/interaction/pointer-events.generate.test.ts
import { describe, expect, it } from "vitest";

describe("Generate.Interaction.PointerEvents", () => {
	describe("standard values", () => {
		it("should generate 'auto'", () => {
			const result = toCss({ kind: "pointer-events", value: "auto" });
			expect(result).toEqual({ ok: true, issues: [], value: "auto" });
		});

		it("should generate 'none'", () => {
			const result = toCss({ kind: "pointer-events", value: "none" });
			expect(result).toEqual({ ok: true, issues: [], value: "none" });
		});
	});

	describe("SVG values", () => {
		it("should generate 'visiblePainted'", () => {
			const result = toCss({ kind: "pointer-events", value: "visiblePainted" });
			expect(result).toEqual({ ok: true, issues: [], value: "visiblePainted" });
		});

		it("should generate 'visibleFill'", () => {
			const result = toCss({ kind: "pointer-events", value: "visibleFill" });
			expect(result).toEqual({ ok: true, issues: [], value: "visibleFill" });
		});

		it("should generate 'visibleStroke'", () => {
			const result = toCss({ kind: "pointer-events", value: "visibleStroke" });
			expect(result).toEqual({ ok: true, issues: [], value: "visibleStroke" });
		});

		it("should generate 'visible'", () => {
			const result = toCss({ kind: "pointer-events", value: "visible" });
			expect(result).toEqual({ ok: true, issues: [], value: "visible" });
		});

		it("should generate 'painted'", () => {
			const result = toCss({ kind: "pointer-events", value: "painted" });
			expect(result).toEqual({ ok: true, issues: [], value: "painted" });
		});

		it("should generate 'fill'", () => {
			const result = toCss({ kind: "pointer-events", value: "fill" });
			expect(result).toEqual({ ok: true, issues: [], value: "fill" });
		});

		it("should generate 'stroke'", () => {
			const result = toCss({ kind: "pointer-events", value: "stroke" });
			expect(result).toEqual({ ok: true, issues: [], value: "stroke" });
		});

		it("should generate 'all'", () => {
			const result = toCss({ kind: "pointer-events", value: "all" });
			expect(result).toEqual({ ok: true, issues: [], value: "all" });
		});

		it("should generate 'bounding-box'", () => {
			const result = toCss({ kind: "pointer-events", value: "bounding-box" });
			expect(result).toEqual({ ok: true, issues: [], value: "bounding-box" });
		});
	});
});
