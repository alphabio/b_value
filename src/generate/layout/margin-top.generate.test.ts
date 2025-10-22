// b_path:: src/generate/layout/margin-top.generate.test.ts
import { describe, expect, it } from "vitest";
import type * as Type from "@/core/types";

describe("generate margin-top", () => {
	it("should generate pixel values", () => {
		const ir: Type.MarginTop = {
			kind: "margin-top",
			value: { value: 10, unit: "px" },
		};
		expect(toCss(ir)).toBe("10px");
	});

	it("should generate percentage values", () => {
		const ir: Type.MarginTop = {
			kind: "margin-top",
			value: { value: 50, unit: "%" },
		};
		expect(toCss(ir)).toBe("50%");
	});

	it("should generate auto keyword", () => {
		const ir: Type.MarginTop = {
			kind: "margin-top",
			value: "auto",
		};
		expect(toCss(ir)).toBe("auto");
	});
});
