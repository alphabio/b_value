// b_path:: src/generate/layout/overflow-y.generate.test.ts
import { describe, expect, it } from "vitest";
import type { OverflowY } from "@/core/types";
import * as Generate from "@/generate";

describe("Generate.Layout.OverflowY", () => {
	describe("valid overflow-y keywords", () => {
		it("should generate 'visible'", () => {
			const ir: OverflowY = { kind: "overflow-y", value: "visible" };
			const css = Generate.Layout.OverflowY.toCss(ir);
			expect(css).toBe("visible");
		});

		it("should generate 'hidden'", () => {
			const ir: OverflowY = { kind: "overflow-y", value: "hidden" };
			const css = Generate.Layout.OverflowY.toCss(ir);
			expect(css).toBe("hidden");
		});

		it("should generate 'clip'", () => {
			const ir: OverflowY = { kind: "overflow-y", value: "clip" };
			const css = Generate.Layout.OverflowY.toCss(ir);
			expect(css).toBe("clip");
		});

		it("should generate 'scroll'", () => {
			const ir: OverflowY = { kind: "overflow-y", value: "scroll" };
			const css = Generate.Layout.OverflowY.toCss(ir);
			expect(css).toBe("scroll");
		});

		it("should generate 'auto'", () => {
			const ir: OverflowY = { kind: "overflow-y", value: "auto" };
			const css = Generate.Layout.OverflowY.toCss(ir);
			expect(css).toBe("auto");
		});
	});
});
