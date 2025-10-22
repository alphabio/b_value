// b_path:: src/generate/clip-path/inset.test.ts
import { describe, expect, it } from "vitest";
import type * as Type from "@/core/types";
import * as Parse from "@/parse/clip-path";

describe("generate inset()", () => {
	describe("TRBL optimization", () => {
		it("should optimize all equal values to 1 value", () => {
			const value: Type.ClipPathInset = {
				kind: "clip-path-inset",
				top: { value: 10, unit: "px" },
				right: { value: 10, unit: "px" },
				bottom: { value: 10, unit: "px" },
				left: { value: 10, unit: "px" },
			};

			expect(toCss(value)).toBe("inset(10px)");
		});

		it("should optimize vertical/horizontal pairs to 2 values", () => {
			const value: Type.ClipPathInset = {
				kind: "clip-path-inset",
				top: { value: 10, unit: "px" },
				right: { value: 20, unit: "px" },
				bottom: { value: 10, unit: "px" },
				left: { value: 20, unit: "px" },
			};

			expect(toCss(value)).toBe("inset(10px 20px)");
		});

		it("should optimize horizontal same to 3 values", () => {
			const value: Type.ClipPathInset = {
				kind: "clip-path-inset",
				top: { value: 10, unit: "px" },
				right: { value: 20, unit: "px" },
				bottom: { value: 30, unit: "px" },
				left: { value: 20, unit: "px" },
			};

			expect(toCss(value)).toBe("inset(10px 20px 30px)");
		});

		it("should generate all different as 4 values", () => {
			const value: Type.ClipPathInset = {
				kind: "clip-path-inset",
				top: { value: 10, unit: "px" },
				right: { value: 20, unit: "px" },
				bottom: { value: 30, unit: "px" },
				left: { value: 40, unit: "px" },
			};

			expect(toCss(value)).toBe("inset(10px 20px 30px 40px)");
		});

		it("should preserve mixed units", () => {
			const value: Type.ClipPathInset = {
				kind: "clip-path-inset",
				top: { value: 10, unit: "%" },
				right: { value: 20, unit: "px" },
				bottom: { value: 5, unit: "em" },
				left: { value: 0, unit: "px" },
			};

			expect(toCss(value)).toBe("inset(10% 20px 5em 0px)");
		});

		it("should handle zero values", () => {
			const value: Type.ClipPathInset = {
				kind: "clip-path-inset",
				top: { value: 0, unit: "px" },
				right: { value: 0, unit: "px" },
				bottom: { value: 0, unit: "px" },
				left: { value: 0, unit: "px" },
			};

			expect(toCss(value)).toBe("inset(0px)");
		});

		it("should handle negative values", () => {
			const value: Type.ClipPathInset = {
				kind: "clip-path-inset",
				top: { value: -10, unit: "px" },
				right: { value: -10, unit: "px" },
				bottom: { value: -10, unit: "px" },
				left: { value: -10, unit: "px" },
			};

			expect(toCss(value)).toBe("inset(-10px)");
		});
	});

	describe("border-radius optimization", () => {
		it("should optimize all equal radii to 1 value", () => {
			const value: Type.ClipPathInset = {
				kind: "clip-path-inset",
				top: { value: 10, unit: "px" },
				right: { value: 10, unit: "px" },
				bottom: { value: 10, unit: "px" },
				left: { value: 10, unit: "px" },
				borderRadius: {
					topLeft: { value: 5, unit: "px" },
					topRight: { value: 5, unit: "px" },
					bottomRight: { value: 5, unit: "px" },
					bottomLeft: { value: 5, unit: "px" },
				},
			};

			expect(toCss(value)).toBe("inset(10px round 5px)");
		});

		it("should optimize diagonal pairs to 2 values", () => {
			const value: Type.ClipPathInset = {
				kind: "clip-path-inset",
				top: { value: 10, unit: "px" },
				right: { value: 10, unit: "px" },
				bottom: { value: 10, unit: "px" },
				left: { value: 10, unit: "px" },
				borderRadius: {
					topLeft: { value: 5, unit: "px" },
					topRight: { value: 10, unit: "px" },
					bottomRight: { value: 5, unit: "px" },
					bottomLeft: { value: 10, unit: "px" },
				},
			};

			expect(toCss(value)).toBe("inset(10px round 5px 10px)");
		});

		it("should optimize TR/BL same to 3 values", () => {
			const value: Type.ClipPathInset = {
				kind: "clip-path-inset",
				top: { value: 10, unit: "px" },
				right: { value: 10, unit: "px" },
				bottom: { value: 10, unit: "px" },
				left: { value: 10, unit: "px" },
				borderRadius: {
					topLeft: { value: 5, unit: "px" },
					topRight: { value: 10, unit: "px" },
					bottomRight: { value: 15, unit: "px" },
					bottomLeft: { value: 10, unit: "px" },
				},
			};

			expect(toCss(value)).toBe("inset(10px round 5px 10px 15px)");
		});

		it("should generate all different as 4 values", () => {
			const value: Type.ClipPathInset = {
				kind: "clip-path-inset",
				top: { value: 10, unit: "px" },
				right: { value: 10, unit: "px" },
				bottom: { value: 10, unit: "px" },
				left: { value: 10, unit: "px" },
				borderRadius: {
					topLeft: { value: 5, unit: "px" },
					topRight: { value: 10, unit: "px" },
					bottomRight: { value: 15, unit: "px" },
					bottomLeft: { value: 20, unit: "px" },
				},
			};

			expect(toCss(value)).toBe("inset(10px round 5px 10px 15px 20px)");
		});

		it("should handle zero radius", () => {
			const value: Type.ClipPathInset = {
				kind: "clip-path-inset",
				top: { value: 10, unit: "px" },
				right: { value: 10, unit: "px" },
				bottom: { value: 10, unit: "px" },
				left: { value: 10, unit: "px" },
				borderRadius: {
					topLeft: { value: 0, unit: "px" },
					topRight: { value: 0, unit: "px" },
					bottomRight: { value: 0, unit: "px" },
					bottomLeft: { value: 0, unit: "px" },
				},
			};

			expect(toCss(value)).toBe("inset(10px round 0px)");
		});
	});

	describe("round-trip validation", () => {
		it("should round-trip simple inset", () => {
			const original = "inset(10px)";
			const parsed = Parse.Inset.parse(original);

			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = toCss(parsed.value);
				expect(generated.ok && generated.value).toBe(original);
			}
		});

		it("should round-trip with 4 values", () => {
			const original = "inset(10px 20px 30px 40px)";
			const parsed = Parse.Inset.parse(original);

			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = toCss(parsed.value);
				expect(generated.ok && generated.value).toBe(original);
			}
		});

		it("should round-trip with border-radius", () => {
			const original = "inset(10px round 5px)";
			const parsed = Parse.Inset.parse(original);

			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = toCss(parsed.value);
				expect(generated.ok && generated.value).toBe(original);
			}
		});

		it("should normalize optimizable values", () => {
			const original = "inset(10px 10px 10px 10px)";
			const parsed = Parse.Inset.parse(original);

			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = toCss(parsed.value);
				expect(generated).toEqual({ ok: true, issues: [], value: "inset(10px)" });
			}
		});

		it("should round-trip complex example", () => {
			const original = "inset(5% 10% 15% 20% round 2px 4px 6px 8px)";
			const parsed = Parse.Inset.parse(original);

			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = toCss(parsed.value);
				expect(generated.ok && generated.value).toBe(original);
			}
		});
	});
});
