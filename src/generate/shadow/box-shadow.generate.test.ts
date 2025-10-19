// b_path:: src/generate/shadow/box-shadow.generate.test.ts

import { describe, expect, it } from "vitest";
import * as Parse from "@/parse/shadow/box-shadow";
import * as Generate from "./box-shadow";

describe("BoxShadow Generator", () => {
	it("should generate basic box-shadow with offsets only", () => {
		const ir = {
			kind: "box-shadow" as const,
			shadows: [
				{
					offsetX: { value: 2, unit: "px" as const },
					offsetY: { value: 2, unit: "px" as const },
				},
			],
		};

		const css = Generate.toCss(ir);
		expect(css).toBe("2px 2px");
	});

	it("should generate box-shadow with blur radius", () => {
		const ir = {
			kind: "box-shadow" as const,
			shadows: [
				{
					offsetX: { value: 2, unit: "px" as const },
					offsetY: { value: 2, unit: "px" as const },
					blurRadius: { value: 4, unit: "px" as const },
				},
			],
		};

		const css = Generate.toCss(ir);
		expect(css).toBe("2px 2px 4px");
	});

	it("should generate box-shadow with spread radius", () => {
		const ir = {
			kind: "box-shadow" as const,
			shadows: [
				{
					offsetX: { value: 2, unit: "px" as const },
					offsetY: { value: 2, unit: "px" as const },
					blurRadius: { value: 4, unit: "px" as const },
					spreadRadius: { value: 2, unit: "px" as const },
				},
			],
		};

		const css = Generate.toCss(ir);
		expect(css).toBe("2px 2px 4px 2px");
	});

	it("should generate box-shadow with color", () => {
		const ir = {
			kind: "box-shadow" as const,
			shadows: [
				{
					offsetX: { value: 2, unit: "px" as const },
					offsetY: { value: 2, unit: "px" as const },
					color: { kind: "named" as const, name: "black" },
				},
			],
		};

		const css = Generate.toCss(ir);
		expect(css).toBe("2px 2px black");
	});

	it("should generate inset box-shadow", () => {
		const ir = {
			kind: "box-shadow" as const,
			shadows: [
				{
					inset: true,
					offsetX: { value: 0, unit: "px" as const },
					offsetY: { value: 0, unit: "px" as const },
					blurRadius: { value: 10, unit: "px" as const },
				},
			],
		};

		const css = Generate.toCss(ir);
		expect(css).toBe("inset 0px 0px 10px");
	});

	it("should generate inset box-shadow with color", () => {
		const ir = {
			kind: "box-shadow" as const,
			shadows: [
				{
					inset: true,
					offsetX: { value: 0, unit: "px" as const },
					offsetY: { value: 0, unit: "px" as const },
					blurRadius: { value: 10, unit: "px" as const },
					color: { kind: "named" as const, name: "black" },
				},
			],
		};

		const css = Generate.toCss(ir);
		expect(css).toBe("inset 0px 0px 10px black");
	});

	it("should generate box-shadow with all parameters", () => {
		const ir = {
			kind: "box-shadow" as const,
			shadows: [
				{
					inset: true,
					offsetX: { value: 1, unit: "px" as const },
					offsetY: { value: 2, unit: "px" as const },
					blurRadius: { value: 3, unit: "px" as const },
					spreadRadius: { value: 4, unit: "px" as const },
					color: { kind: "named" as const, name: "red" },
				},
			],
		};

		const css = Generate.toCss(ir);
		expect(css).toBe("inset 1px 2px 3px 4px red");
	});

	it("should generate multiple box-shadows", () => {
		const ir = {
			kind: "box-shadow" as const,
			shadows: [
				{
					offsetX: { value: 2, unit: "px" as const },
					offsetY: { value: 2, unit: "px" as const },
					color: { kind: "named" as const, name: "black" },
				},
				{
					inset: true,
					offsetX: { value: 0, unit: "px" as const },
					offsetY: { value: 0, unit: "px" as const },
					blurRadius: { value: 10, unit: "px" as const },
					color: { kind: "named" as const, name: "white" },
				},
			],
		};

		const css = Generate.toCss(ir);
		expect(css).toBe("2px 2px black, inset 0px 0px 10px white");
	});

	it("should preserve different length units", () => {
		const ir = {
			kind: "box-shadow" as const,
			shadows: [
				{
					offsetX: { value: 1, unit: "em" as const },
					offsetY: { value: 1.5, unit: "rem" as const },
					blurRadius: { value: 0.5, unit: "vw" as const },
				},
			],
		};

		const css = Generate.toCss(ir);
		expect(css).toBe("1em 1.5rem 0.5vw");
	});

	it("should handle negative offsets", () => {
		const ir = {
			kind: "box-shadow" as const,
			shadows: [
				{
					offsetX: { value: -2, unit: "px" as const },
					offsetY: { value: -2, unit: "px" as const },
				},
			],
		};

		const css = Generate.toCss(ir);
		expect(css).toBe("-2px -2px");
	});

	it("should generate box-shadow with rgba color", () => {
		const ir = {
			kind: "box-shadow" as const,
			shadows: [
				{
					offsetX: { value: 2, unit: "px" as const },
					offsetY: { value: 2, unit: "px" as const },
					blurRadius: { value: 4, unit: "px" as const },
					color: {
						kind: "rgb" as const,
						r: 0,
						g: 0,
						b: 0,
						alpha: 0.5,
					},
				},
			],
		};

		const css = Generate.toCss(ir);
		expect(css).toBe("2px 2px 4px rgb(0 0 0 / 0.5)");
	});

	describe("Round-trip parsing", () => {
		it("should round-trip basic shadow", () => {
			const original = "2px 2px";
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
			const original = "inset 1px 2px 3px 4px red";
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
			const original = "2px 2px black, inset 0px 0px 10px white";
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
