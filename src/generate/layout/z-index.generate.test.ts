// b_path:: src/generate/layout/z-index.generate.test.ts
import { describe, expect, it } from "vitest";
import type { ZIndex } from "@/core/types";
import * as Generate from "@/generate";

describe("Generate.Layout.ZIndex", () => {
	describe("integer values", () => {
		it("should generate positive integer", () => {
			const ir: ZIndex = { kind: "z-index", value: 10 };
			const css = Generate.Layout.ZIndex.toCss(ir);
			expect(css).toBe("10");
		});

		it("should generate negative integer", () => {
			const ir: ZIndex = { kind: "z-index", value: -5 };
			const css = Generate.Layout.ZIndex.toCss(ir);
			expect(css).toBe("-5");
		});

		it("should generate zero", () => {
			const ir: ZIndex = { kind: "z-index", value: 0 };
			const css = Generate.Layout.ZIndex.toCss(ir);
			expect(css).toBe("0");
		});

		it("should generate large positive integer", () => {
			const ir: ZIndex = { kind: "z-index", value: 999 };
			const css = Generate.Layout.ZIndex.toCss(ir);
			expect(css).toBe("999");
		});

		it("should generate large negative integer", () => {
			const ir: ZIndex = { kind: "z-index", value: -999 };
			const css = Generate.Layout.ZIndex.toCss(ir);
			expect(css).toBe("-999");
		});
	});

	describe("auto keyword", () => {
		it("should generate 'auto'", () => {
			const ir: ZIndex = { kind: "z-index", value: "auto" };
			const css = Generate.Layout.ZIndex.toCss(ir);
			expect(css).toBe("auto");
		});
	});
});
