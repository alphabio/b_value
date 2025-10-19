// b_path:: src/generate/border/color.generate.test.ts
import { describe, expect, it } from "vitest";
import * as Parse from "@/parse/border/color";
import * as Generate from "./color";

describe("Generate.Border.Color", () => {
	describe("round-trip", () => {
		it("should round-trip 'transparent'", () => {
			const input = "transparent";
			const parsed = Parse.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const css = Generate.toCss(parsed.value);
				expect(css).toBe("transparent");
			}
		});

		it("should round-trip 'currentcolor'", () => {
			const input = "currentcolor";
			const parsed = Parse.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const css = Generate.toCss(parsed.value);
				expect(css).toBe("currentcolor");
			}
		});

		it("should round-trip 'red'", () => {
			const input = "red";
			const parsed = Parse.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const css = Generate.toCss(parsed.value);
				expect(css).toBe("red");
			}
		});

		it("should round-trip 'blue'", () => {
			const input = "blue";
			const parsed = Parse.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const css = Generate.toCss(parsed.value);
				expect(css).toBe("blue");
			}
		});

		it("should round-trip 'green'", () => {
			const input = "green";
			const parsed = Parse.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const css = Generate.toCss(parsed.value);
				expect(css).toBe("green");
			}
		});
	});
});
