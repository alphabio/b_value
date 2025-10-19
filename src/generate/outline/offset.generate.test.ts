// b_path:: src/generate/outline/offset.generate.test.ts
import { describe, expect, it } from "vitest";
import * as Parse from "@/parse/outline/offset";
import * as Generate from "./offset";

describe("Generate.Outline.Offset", () => {
	describe("round-trip", () => {
		it("should round-trip '5px'", () => {
			const input = "5px";
			const parsed = Parse.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const css = Generate.toCss(parsed.value);
				expect(css).toBe("5px");
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

		it("should round-trip '-1px'", () => {
			const input = "-1px";
			const parsed = Parse.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const css = Generate.toCss(parsed.value);
				expect(css).toBe("-1px");
			}
		});

		it("should round-trip '-2.5em'", () => {
			const input = "-2.5em";
			const parsed = Parse.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const css = Generate.toCss(parsed.value);
				expect(css).toBe("-2.5em");
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
