// b_path:: src/generate/border/width.generate.test.ts
import { describe, expect, it } from "vitest";
import * as Parse from "@/parse/border/width";
import * as Generate from "./width";

describe("Generate.Border.Width", () => {
	describe("round-trip", () => {
		it("should round-trip 'thin'", () => {
			const input = "thin";
			const parsed = Parse.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const css = Generate.toCss(parsed.value);
				expect(css).toBe("thin");
			}
		});

		it("should round-trip 'medium'", () => {
			const input = "medium";
			const parsed = Parse.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const css = Generate.toCss(parsed.value);
				expect(css).toBe("medium");
			}
		});

		it("should round-trip 'thick'", () => {
			const input = "thick";
			const parsed = Parse.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const css = Generate.toCss(parsed.value);
				expect(css).toBe("thick");
			}
		});

		it("should round-trip '1px'", () => {
			const input = "1px";
			const parsed = Parse.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const css = Generate.toCss(parsed.value);
				expect(css).toBe("1px");
			}
		});

		it("should round-trip '2.5em'", () => {
			const input = "2.5em";
			const parsed = Parse.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const css = Generate.toCss(parsed.value);
				expect(css).toBe("2.5em");
			}
		});

		it("should round-trip '0' as '0px'", () => {
			const input = "0";
			const parsed = Parse.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const css = Generate.toCss(parsed.value);
				expect(css).toBe("0px");
			}
		});
	});
});
