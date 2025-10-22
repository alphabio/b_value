// b_path:: src/generate/layout/overflow-y.generate.test.ts
import { describe, expect, it } from "vitest";
import type { OverflowY } from "@/core/types";
import * as Generate from "@/generate";

describe("Generate.Layout.OverflowY", () => {
	describe("valid overflow-y keywords", () => {
		it("should generate 'visible'", () => {
			const ir: OverflowY = { kind: "overflow-y", value: "visible" };
			const css = Generate.Layout.OverflowY.generate(ir);
			expect(css).toEqual({ ok: true, issues: [], value: "visible" });
		});

		it("should generate 'hidden'", () => {
			const ir: OverflowY = { kind: "overflow-y", value: "hidden" };
			const css = Generate.Layout.OverflowY.generate(ir);
			expect(css).toEqual({ ok: true, issues: [], value: "hidden" });
		});

		it("should generate 'clip'", () => {
			const ir: OverflowY = { kind: "overflow-y", value: "clip" };
			const css = Generate.Layout.OverflowY.generate(ir);
			expect(css).toEqual({ ok: true, issues: [], value: "clip" });
		});

		it("should generate 'scroll'", () => {
			const ir: OverflowY = { kind: "overflow-y", value: "scroll" };
			const css = Generate.Layout.OverflowY.generate(ir);
			expect(css).toEqual({ ok: true, issues: [], value: "scroll" });
		});

		it("should generate 'auto'", () => {
			const ir: OverflowY = { kind: "overflow-y", value: "auto" };
			const css = Generate.Layout.OverflowY.generate(ir);
			expect(css).toEqual({ ok: true, issues: [], value: "auto" });
		});
	});
});
