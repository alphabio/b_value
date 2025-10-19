// b_path:: src/generate/border/style.generate.test.ts
import { describe, expect, it } from "vitest";
import * as Parse from "@/parse/border/style";
import * as Generate from "./style";

describe("Generate.Border.Style", () => {
	describe("round-trip", () => {
		it("should round-trip 'none'", () => {
			const input = "none";
			const parsed = Parse.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const css = Generate.toCss(parsed.value);
				expect(css).toBe("none");
			}
		});

		it("should round-trip 'hidden'", () => {
			const input = "hidden";
			const parsed = Parse.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const css = Generate.toCss(parsed.value);
				expect(css).toBe("hidden");
			}
		});

		it("should round-trip 'solid'", () => {
			const input = "solid";
			const parsed = Parse.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const css = Generate.toCss(parsed.value);
				expect(css).toBe("solid");
			}
		});

		it("should round-trip 'dashed'", () => {
			const input = "dashed";
			const parsed = Parse.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const css = Generate.toCss(parsed.value);
				expect(css).toBe("dashed");
			}
		});

		it("should round-trip 'dotted'", () => {
			const input = "dotted";
			const parsed = Parse.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const css = Generate.toCss(parsed.value);
				expect(css).toBe("dotted");
			}
		});

		it("should round-trip 'double'", () => {
			const input = "double";
			const parsed = Parse.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const css = Generate.toCss(parsed.value);
				expect(css).toBe("double");
			}
		});

		it("should round-trip 'groove'", () => {
			const input = "groove";
			const parsed = Parse.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const css = Generate.toCss(parsed.value);
				expect(css).toBe("groove");
			}
		});

		it("should round-trip 'ridge'", () => {
			const input = "ridge";
			const parsed = Parse.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const css = Generate.toCss(parsed.value);
				expect(css).toBe("ridge");
			}
		});

		it("should round-trip 'inset'", () => {
			const input = "inset";
			const parsed = Parse.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const css = Generate.toCss(parsed.value);
				expect(css).toBe("inset");
			}
		});

		it("should round-trip 'outset'", () => {
			const input = "outset";
			const parsed = Parse.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const css = Generate.toCss(parsed.value);
				expect(css).toBe("outset");
			}
		});
	});
});
