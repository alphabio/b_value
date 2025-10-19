// b_path:: src/generate/layout/layout.test.ts
import { describe, expect, it } from "vitest";
import type * as Type from "@/core/types";
import * as Display from "./display";
import * as Opacity from "./opacity";
import * as Visibility from "./visibility";

describe("Generate Layout - Display", () => {
	it("should generate flex display", () => {
		const ir: Type.Display = { kind: "display", value: "flex" };
		expect(Display.toCss(ir)).toBe("flex");
	});

	it("should generate block display", () => {
		const ir: Type.Display = { kind: "display", value: "block" };
		expect(Display.toCss(ir)).toBe("block");
	});

	it("should generate inline display", () => {
		const ir: Type.Display = { kind: "display", value: "inline" };
		expect(Display.toCss(ir)).toBe("inline");
	});

	it("should generate inline-block display", () => {
		const ir: Type.Display = { kind: "display", value: "inline-block" };
		expect(Display.toCss(ir)).toBe("inline-block");
	});

	it("should generate grid display", () => {
		const ir: Type.Display = { kind: "display", value: "grid" };
		expect(Display.toCss(ir)).toBe("grid");
	});

	it("should generate none display", () => {
		const ir: Type.Display = { kind: "display", value: "none" };
		expect(Display.toCss(ir)).toBe("none");
	});

	it("should generate table display", () => {
		const ir: Type.Display = { kind: "display", value: "table" };
		expect(Display.toCss(ir)).toBe("table");
	});

	it("should generate inline-flex display", () => {
		const ir: Type.Display = { kind: "display", value: "inline-flex" };
		expect(Display.toCss(ir)).toBe("inline-flex");
	});
});

describe("Generate Layout - Visibility", () => {
	it("should generate visible visibility", () => {
		const ir: Type.Visibility = { kind: "visibility", value: "visible" };
		expect(Visibility.toCss(ir)).toBe("visible");
	});

	it("should generate hidden visibility", () => {
		const ir: Type.Visibility = { kind: "visibility", value: "hidden" };
		expect(Visibility.toCss(ir)).toBe("hidden");
	});

	it("should generate collapse visibility", () => {
		const ir: Type.Visibility = { kind: "visibility", value: "collapse" };
		expect(Visibility.toCss(ir)).toBe("collapse");
	});
});

describe("Generate Layout - Opacity", () => {
	it("should generate opacity 0", () => {
		const ir: Type.Opacity = { kind: "opacity", value: 0 };
		expect(Opacity.toCss(ir)).toBe("0");
	});

	it("should generate opacity 1", () => {
		const ir: Type.Opacity = { kind: "opacity", value: 1 };
		expect(Opacity.toCss(ir)).toBe("1");
	});

	it("should generate opacity 0.5", () => {
		const ir: Type.Opacity = { kind: "opacity", value: 0.5 };
		expect(Opacity.toCss(ir)).toBe("0.5");
	});

	it("should generate opacity 0.75", () => {
		const ir: Type.Opacity = { kind: "opacity", value: 0.75 };
		expect(Opacity.toCss(ir)).toBe("0.75");
	});

	it("should generate opacity 0.25", () => {
		const ir: Type.Opacity = { kind: "opacity", value: 0.25 };
		expect(Opacity.toCss(ir)).toBe("0.25");
	});
});
