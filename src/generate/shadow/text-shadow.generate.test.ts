// b_path:: src/generate/shadow/text-shadow.generate.test.ts

import { describe, expect, it } from "vitest";
import * as Parse from "@/parse/shadow/text-shadow";
import * as Generate from "./text-shadow";

describe("TextShadow Generator", () => {
	it("should generate basic text-shadow with offsets only", () => {
		const ir = {
			kind: "text-shadow" as const,
			shadows: [
				{
					offsetX: { value: 1, unit: "px" as const },
					offsetY: { value: 1, unit: "px" as const },
				},
			],
		};

		const css = Generate.toCss(ir);
		expect(css).toBe("1px 1px");
	});

	it("should generate text-shadow with blur radius", () => {
		const ir = {
			kind: "text-shadow" as const,
			shadows: [
				{
					offsetX: { value: 1, unit: "px" as const },
					offsetY: { value: 1, unit: "px" as const },
					blurRadius: { value: 2, unit: "px" as const },
				},
			],
		};

		const css = Generate.toCss(ir);
		expect(css).toBe("1px 1px 2px");
	});

	it("should generate text-shadow with color", () => {
		const ir = {
			kind: "text-shadow" as const,
			shadows: [
				{
					offsetX: { value: 1, unit: "px" as const },
					offsetY: { value: 1, unit: "px" as const },
					color: { kind: "named" as const, name: "gray" },
				},
			],
		};

		const css = Generate.toCss(ir);
		expect(css).toBe("1px 1px gray");
	});

	it("should generate text-shadow with blur and color", () => {
		const ir = {
			kind: "text-shadow" as const,
			shadows: [
				{
					offsetX: { value: 1, unit: "px" as const },
					offsetY: { value: 1, unit: "px" as const },
					blurRadius: { value: 2, unit: "px" as const },
					color: { kind: "named" as const, name: "gray" },
				},
			],
		};

		const css = Generate.toCss(ir);
		expect(css).toBe("1px 1px 2px gray");
	});

	it("should generate multiple text-shadows", () => {
		const ir = {
			kind: "text-shadow" as const,
			shadows: [
				{
					offsetX: { value: 1, unit: "px" as const },
					offsetY: { value: 1, unit: "px" as const },
					blurRadius: { value: 2, unit: "px" as const },
					color: { kind: "named" as const, name: "black" },
				},
				{
					offsetX: { value: -1, unit: "px" as const },
					offsetY: { value: -1, unit: "px" as const },
					blurRadius: { value: 2, unit: "px" as const },
					color: { kind: "named" as const, name: "white" },
				},
			],
		};

		const css = Generate.toCss(ir);
		expect(css).toBe("1px 1px 2px black, -1px -1px 2px white");
	});

	it("should preserve different length units", () => {
		const ir = {
			kind: "text-shadow" as const,
			shadows: [
				{
					offsetX: { value: 0.5, unit: "em" as const },
					offsetY: { value: 0.5, unit: "rem" as const },
					blurRadius: { value: 1, unit: "vw" as const },
				},
			],
		};

		const css = Generate.toCss(ir);
		expect(css).toBe("0.5em 0.5rem 1vw");
	});

	it("should handle negative offsets", () => {
		const ir = {
			kind: "text-shadow" as const,
			shadows: [
				{
					offsetX: { value: -1, unit: "px" as const },
					offsetY: { value: -1, unit: "px" as const },
				},
			],
		};

		const css = Generate.toCss(ir);
		expect(css).toBe("-1px -1px");
	});

	it("should handle zero offsets", () => {
		const ir = {
			kind: "text-shadow" as const,
			shadows: [
				{
					offsetX: { value: 0, unit: "px" as const },
					offsetY: { value: 0, unit: "px" as const },
					blurRadius: { value: 5, unit: "px" as const },
				},
			],
		};

		const css = Generate.toCss(ir);
		expect(css).toBe("0px 0px 5px");
	});

	it("should generate text-shadow with rgba color", () => {
		const ir = {
			kind: "text-shadow" as const,
			shadows: [
				{
					offsetX: { value: 1, unit: "px" as const },
					offsetY: { value: 1, unit: "px" as const },
					blurRadius: { value: 2, unit: "px" as const },
					color: {
						kind: "rgb" as const,
						r: 128,
						g: 128,
						b: 128,
						alpha: 0.5,
					},
				},
			],
		};

		const css = Generate.toCss(ir);
		expect(css).toBe("1px 1px 2px rgb(128 128 128 / 0.5)");
	});

	it("should generate text-shadow with hex color", () => {
		const ir = {
			kind: "text-shadow" as const,
			shadows: [
				{
					offsetX: { value: 2, unit: "px" as const },
					offsetY: { value: 2, unit: "px" as const },
					color: {
						kind: "hex" as const,
						value: "#FF0000",
					},
				},
			],
		};

		const css = Generate.toCss(ir);
		expect(css).toBe("2px 2px #FF0000");
	});

	it("should generate complex multi-layer shadow", () => {
		const ir = {
			kind: "text-shadow" as const,
			shadows: [
				{
					offsetX: { value: 0, unit: "px" as const },
					offsetY: { value: 1, unit: "px" as const },
					blurRadius: { value: 2, unit: "px" as const },
					color: {
						kind: "rgb" as const,
						r: 0,
						g: 0,
						b: 0,
						alpha: 0.3,
					},
				},
				{
					offsetX: { value: 0, unit: "px" as const },
					offsetY: { value: 2, unit: "px" as const },
					blurRadius: { value: 4, unit: "px" as const },
					color: {
						kind: "rgb" as const,
						r: 0,
						g: 0,
						b: 0,
						alpha: 0.2,
					},
				},
				{
					offsetX: { value: 0, unit: "px" as const },
					offsetY: { value: 3, unit: "px" as const },
					blurRadius: { value: 6, unit: "px" as const },
					color: {
						kind: "rgb" as const,
						r: 0,
						g: 0,
						b: 0,
						alpha: 0.1,
					},
				},
			],
		};

		const css = Generate.toCss(ir);
		expect(css).toBe("0px 1px 2px rgb(0 0 0 / 0.3), 0px 2px 4px rgb(0 0 0 / 0.2), 0px 3px 6px rgb(0 0 0 / 0.1)");
	});

	describe("Round-trip parsing", () => {
		it("should round-trip basic shadow", () => {
			const original = "1px 1px";
			const parsed = Parse.parse(original);
			expect(parsed.ok).toBe(true);
			if (!parsed.ok) return;

			const generated = Generate.toCss(parsed.value);
			const reparsed = Parse.parse(generated);
			expect(reparsed.ok).toBe(true);
			if (!reparsed.ok) return;

			expect(reparsed.value).toEqual(parsed.value);
		});

		it("should round-trip shadow with all parameters", () => {
			const original = "1px 1px 2px gray";
			const parsed = Parse.parse(original);
			expect(parsed.ok).toBe(true);
			if (!parsed.ok) return;

			const generated = Generate.toCss(parsed.value);
			const reparsed = Parse.parse(generated);
			expect(reparsed.ok).toBe(true);
			if (!reparsed.ok) return;

			expect(reparsed.value).toEqual(parsed.value);
		});

		it("should round-trip multiple shadows", () => {
			const original = "1px 1px 2px black, -1px -1px 2px white";
			const parsed = Parse.parse(original);
			expect(parsed.ok).toBe(true);
			if (!parsed.ok) return;

			const generated = Generate.toCss(parsed.value);
			const reparsed = Parse.parse(generated);
			expect(reparsed.ok).toBe(true);
			if (!reparsed.ok) return;

			expect(reparsed.value).toEqual(parsed.value);
		});
	});
});
