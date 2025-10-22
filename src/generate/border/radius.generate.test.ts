// b_path:: src/generate/border/radius.generate.test.ts
import { describe, expect, it } from "vitest";
import * as Parse from "@/parse/border/radius";
import * as Generate from "./radius";

describe("Generate.Border.Radius", () => {
	describe("round-trip", () => {
		it("should round-trip '5px'", () => {
			const input = "5px";
			const parsed = Parse.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const css = Generate.generate(parsed.value);
				expect(css).toEqual({ ok: true, issues: [], value: "5px" });
			}
		});

		it("should round-trip '10.5px'", () => {
			const input = "10.5px";
			const parsed = Parse.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const css = Generate.generate(parsed.value);
				expect(css).toEqual({ ok: true, issues: [], value: "10.5px" });
			}
		});

		it("should round-trip '50%'", () => {
			const input = "50%";
			const parsed = Parse.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const css = Generate.generate(parsed.value);
				expect(css).toEqual({ ok: true, issues: [], value: "50%" });
			}
		});

		it("should round-trip '1em'", () => {
			const input = "1em";
			const parsed = Parse.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const css = Generate.generate(parsed.value);
				expect(css).toEqual({ ok: true, issues: [], value: "1em" });
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
