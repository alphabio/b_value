// b_path:: src/generate/layout/overflow-x.generate.test.ts
import { describe, expect, it } from "vitest";
import type { OverflowX } from "@/core/types";
import * as Generate from "@/generate";

describe("Generate.Layout.OverflowX", () => {
	describe("valid overflow-x keywords", () => {
		it("should generate 'visible'", () => {
			const ir: OverflowX = { kind: "overflow-x", value: "visible" };
			const css = Generate.Layout.OverflowX.generate(ir);
			expect(css).toEqual({ ok: true, issues: [], value: "visible" });
		});

		it("should generate 'hidden'", () => {
			const ir: OverflowX = { kind: "overflow-x", value: "hidden" };
			const css = Generate.Layout.OverflowX.generate(ir);
			expect(css).toEqual({ ok: true, issues: [], value: "hidden" });
		});

		it("should generate 'clip'", () => {
			const ir: OverflowX = { kind: "overflow-x", value: "clip" };
			const css = Generate.Layout.OverflowX.generate(ir);
			expect(css).toEqual({ ok: true, issues: [], value: "clip" });
		});

		it("should generate 'scroll'", () => {
			const ir: OverflowX = { kind: "overflow-x", value: "scroll" };
			const css = Generate.Layout.OverflowX.generate(ir);
			expect(css).toEqual({ ok: true, issues: [], value: "scroll" });
		});

		it("should generate 'auto'", () => {
			const ir: OverflowX = { kind: "overflow-x", value: "auto" };
			const css = Generate.Layout.OverflowX.generate(ir);
			expect(css).toEqual({ ok: true, issues: [], value: "auto" });
		});
	});
});
