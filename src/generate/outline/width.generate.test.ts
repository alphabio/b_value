// b_path:: src/generate/outline/width.generate.test.ts
import { describe, expect, it } from "vitest";
import * as Parse from "@/parse/outline/width";
import * as Generate from "./width";

describe("Generate.Outline.Width", () => {
	describe("round-trip", () => {
		it("should round-trip 'thin'", () => {
			const input = "thin";
			const parsed = Parse.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const css = Generate.generate(parsed.value);
				expect(css).toEqual({ ok: true, issues: [], value: "thin" });
			}
		});

		it("should round-trip 'medium'", () => {
			const input = "medium";
			const parsed = Parse.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const css = Generate.generate(parsed.value);
				expect(css).toEqual({ ok: true, issues: [], value: "medium" });
			}
		});

		it("should round-trip 'thick'", () => {
			const input = "thick";
			const parsed = Parse.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const css = Generate.generate(parsed.value);
				expect(css).toEqual({ ok: true, issues: [], value: "thick" });
			}
		});

		it("should round-trip '1px'", () => {
			const input = "1px";
			const parsed = Parse.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const css = Generate.generate(parsed.value);
				expect(css).toEqual({ ok: true, issues: [], value: "1px" });
			}
		});

		it("should round-trip '2.5em'", () => {
			const input = "2.5em";
			const parsed = Parse.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const css = Generate.generate(parsed.value);
				expect(css).toEqual({ ok: true, issues: [], value: "2.5em" });
			}
		});

		it("should round-trip '0' as '0px'", () => {
			const input = "0";
			const parsed = Parse.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const css = Generate.generate(parsed.value);
				expect(css).toEqual({ ok: true, issues: [], value: "0px" });
			}
		});
	});
});
