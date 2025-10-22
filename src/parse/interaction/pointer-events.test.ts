// b_path:: src/parse/interaction/pointer-events.test.ts
import { describe, expect, it } from "vitest";
import * as PointerEvents from "./pointer-events";

describe("Parse.Interaction.PointerEvents", () => {
	describe("standard values", () => {
		it("should parse 'auto'", () => {
			const result = PointerEvents.parse("auto");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "pointer-events",
					value: "auto",
				});
			}
		});

		it("should parse 'none'", () => {
			const result = PointerEvents.parse("none");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "pointer-events",
					value: "none",
				});
			}
		});
	});

	describe("SVG values", () => {
		it("should parse 'visiblePainted'", () => {
			const result = PointerEvents.parse("visiblePainted");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "pointer-events",
					value: "visiblePainted",
				});
			}
		});

		it("should parse 'visibleFill'", () => {
			const result = PointerEvents.parse("visibleFill");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "pointer-events",
					value: "visibleFill",
				});
			}
		});

		it("should parse 'visibleStroke'", () => {
			const result = PointerEvents.parse("visibleStroke");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "pointer-events",
					value: "visibleStroke",
				});
			}
		});

		it("should parse 'visible'", () => {
			const result = PointerEvents.parse("visible");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "pointer-events",
					value: "visible",
				});
			}
		});

		it("should parse 'painted'", () => {
			const result = PointerEvents.parse("painted");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "pointer-events",
					value: "painted",
				});
			}
		});

		it("should parse 'fill'", () => {
			const result = PointerEvents.parse("fill");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "pointer-events",
					value: "fill",
				});
			}
		});

		it("should parse 'stroke'", () => {
			const result = PointerEvents.parse("stroke");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "pointer-events",
					value: "stroke",
				});
			}
		});

		it("should parse 'all'", () => {
			const result = PointerEvents.parse("all");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "pointer-events",
					value: "all",
				});
			}
		});

		it("should parse 'bounding-box'", () => {
			const result = PointerEvents.parse("bounding-box");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({
					kind: "pointer-events",
					value: "bounding-box",
				});
			}
		});
	});

	describe("invalid values", () => {
		it("should reject invalid keyword", () => {
			const result = PointerEvents.parse("invalid");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Invalid pointer-events keyword");
			}
		});

		it("should reject numeric value", () => {
			const result = PointerEvents.parse("1");
			expect(result.ok).toBe(false);
		});

		it("should reject empty string", () => {
			const result = PointerEvents.parse("");
			expect(result.ok).toBe(false);
		});

		it("should reject multiple values", () => {
			const result = PointerEvents.parse("none auto");
			expect(result.ok).toBe(false);
		});
	});
});
