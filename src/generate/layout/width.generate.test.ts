// b_path:: src/generate/layout/width.generate.test.ts
import { describe, expect, it } from "vitest";
import * as Parse from "@/parse/layout/width";
import { toCss } from "./width";

describe("Generate.Layout.Width", () => {
	describe("auto keyword", () => {
		it("generates 'auto'", () => {
			const ir = { kind: "width" as const, value: "auto" as const };
			expect(toCss(ir)).toBe("auto");
		});
	});

	describe("intrinsic sizing keywords", () => {
		it("generates 'min-content'", () => {
			const ir = { kind: "width" as const, value: "min-content" as const };
			expect(toCss(ir)).toBe("min-content");
		});

		it("generates 'max-content'", () => {
			const ir = { kind: "width" as const, value: "max-content" as const };
			expect(toCss(ir)).toBe("max-content");
		});

		it("generates 'fit-content'", () => {
			const ir = { kind: "width" as const, value: "fit-content" as const };
			expect(toCss(ir)).toBe("fit-content");
		});
	});

	describe("length values", () => {
		it("generates px", () => {
			const ir = { kind: "width" as const, value: { value: 200, unit: "px" as const } };
			expect(toCss(ir)).toBe("200px");
		});

		it("generates em", () => {
			const ir = { kind: "width" as const, value: { value: 10, unit: "em" as const } };
			expect(toCss(ir)).toBe("10em");
		});
	});

	describe("percentage values", () => {
		it("generates percentage", () => {
			const ir = { kind: "width" as const, value: { value: 50, unit: "%" as const } };
			expect(toCss(ir)).toBe("50%");
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

		it("min-content", () => {
			const parsed = Parse.parse("min-content");
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

		it("200px", () => {
			const parsed = Parse.parse("200px");
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

		it("50%", () => {
			const parsed = Parse.parse("50%");
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
