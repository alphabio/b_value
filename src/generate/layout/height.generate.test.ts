// b_path:: src/generate/layout/height.generate.test.ts
import { describe, expect, it } from "vitest";
import * as Parse from "@/parse/layout/height";
import { toCss } from "./height";

describe("Generate.Layout.Height", () => {
	describe("auto keyword", () => {
		it("generates 'auto'", () => {
			const ir = { kind: "height" as const, value: "auto" as const };
			expect(toCss(ir)).toBe("auto");
		});
	});

	describe("intrinsic sizing keywords", () => {
		it("generates 'min-content'", () => {
			const ir = { kind: "height" as const, value: "min-content" as const };
			expect(toCss(ir)).toBe("min-content");
		});

		it("generates 'max-content'", () => {
			const ir = { kind: "height" as const, value: "max-content" as const };
			expect(toCss(ir)).toBe("max-content");
		});

		it("generates 'fit-content'", () => {
			const ir = { kind: "height" as const, value: "fit-content" as const };
			expect(toCss(ir)).toBe("fit-content");
		});
	});

	describe("length values", () => {
		it("generates px", () => {
			const ir = { kind: "height" as const, value: { value: 100, unit: "px" as const } };
			expect(toCss(ir)).toBe("100px");
		});

		it("generates vh", () => {
			const ir = { kind: "height" as const, value: { value: 100, unit: "vh" as const } };
			expect(toCss(ir)).toBe("100vh");
		});
	});

	describe("percentage values", () => {
		it("generates percentage", () => {
			const ir = { kind: "height" as const, value: { value: 100, unit: "%" as const } };
			expect(toCss(ir)).toBe("100%");
		});
	});

	describe("round-trip", () => {
		it("auto", () => {
			const parsed = Parse.parse("auto");
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const css = toCss(parsed.value);
				const reparsed = Parse.parse(css);
				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});

		it("max-content", () => {
			const parsed = Parse.parse("max-content");
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const css = toCss(parsed.value);
				const reparsed = Parse.parse(css);
				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});

		it("100px", () => {
			const parsed = Parse.parse("100px");
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const css = toCss(parsed.value);
				const reparsed = Parse.parse(css);
				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});
	});
});
