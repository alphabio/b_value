// b_path:: src/generate/layout/position.generate.test.ts
import { describe, expect, it } from "vitest";
import type { PositionProperty } from "@/core/types";
import * as Generate from "@/generate";

describe("Generate.Layout.Position", () => {
	describe("valid position keywords", () => {
		it("should generate 'static'", () => {
			const ir: PositionProperty = { kind: "position-property", value: "static" };
			const css = Generate.Layout.Position.generate(ir);
			expect(css).toEqual({ ok: true, issues: [], value: "static" });
		});

		it("should generate 'relative'", () => {
			const ir: PositionProperty = { kind: "position-property", value: "relative" };
			const css = Generate.Layout.Position.generate(ir);
			expect(css).toEqual({ ok: true, issues: [], value: "relative" });
		});

		it("should generate 'absolute'", () => {
			const ir: PositionProperty = { kind: "position-property", value: "absolute" };
			const css = Generate.Layout.Position.generate(ir);
			expect(css).toEqual({ ok: true, issues: [], value: "absolute" });
		});

		it("should generate 'fixed'", () => {
			const ir: PositionProperty = { kind: "position-property", value: "fixed" };
			const css = Generate.Layout.Position.generate(ir);
			expect(css).toEqual({ ok: true, issues: [], value: "fixed" });
		});

		it("should generate 'sticky'", () => {
			const ir: PositionProperty = { kind: "position-property", value: "sticky" };
			const css = Generate.Layout.Position.generate(ir);
			expect(css).toEqual({ ok: true, issues: [], value: "sticky" });
		});
	});
});
