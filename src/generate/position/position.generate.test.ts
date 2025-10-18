// b_path:: src/generate/position/position.generate.test.ts
import { describe, expect, it } from "vitest";
import type * as Type from "@/core/types";
import * as PositionGenerator from "./position";

describe("Position Generator", () => {
	describe("2D Position generation", () => {
		it("should generate single keyword position", () => {
			const ir: Type.Position2D = {
				horizontal: "center",
				vertical: "center",
			};
			const css = PositionGenerator.toCss(ir);
			expect(css).toBe("center center");
		});

		it("should generate two keyword positions", () => {
			const ir: Type.Position2D = {
				horizontal: "left",
				vertical: "top",
			};
			const css = PositionGenerator.toCss(ir);
			expect(css).toBe("left top");
		});

		it("should generate all keyword combinations", () => {
			const positions: Array<{ ir: Type.Position2D; expected: string }> = [
				{
					ir: { horizontal: "center", vertical: "center" },
					expected: "center center",
				},
				{
					ir: { horizontal: "left", vertical: "center" },
					expected: "left center",
				},
				{
					ir: { horizontal: "right", vertical: "center" },
					expected: "right center",
				},
				{
					ir: { horizontal: "center", vertical: "top" },
					expected: "center top",
				},
				{
					ir: { horizontal: "center", vertical: "bottom" },
					expected: "center bottom",
				},
				{
					ir: { horizontal: "left", vertical: "top" },
					expected: "left top",
				},
				{
					ir: { horizontal: "right", vertical: "bottom" },
					expected: "right bottom",
				},
			];

			for (const { ir, expected } of positions) {
				const css = PositionGenerator.toCss(ir);
				expect(css).toBe(expected);
			}
		});

		it("should generate length values", () => {
			const ir: Type.Position2D = {
				horizontal: { value: 100, unit: "px" },
				vertical: { value: 50, unit: "px" },
			};
			const css = PositionGenerator.toCss(ir);
			expect(css).toBe("100px 50px");
		});

		it("should generate percentage values", () => {
			const ir: Type.Position2D = {
				horizontal: { value: 50, unit: "%" },
				vertical: { value: 25, unit: "%" },
			};
			const css = PositionGenerator.toCss(ir);
			expect(css).toBe("50% 25%");
		});

		it("should generate mixed keyword and length", () => {
			const ir: Type.Position2D = {
				horizontal: "left",
				vertical: { value: 50, unit: "px" },
			};
			const css = PositionGenerator.toCss(ir);
			expect(css).toBe("left 50px");
		});

		it("should generate mixed keyword and percentage", () => {
			const ir: Type.Position2D = {
				horizontal: { value: 50, unit: "%" },
				vertical: "top",
			};
			const css = PositionGenerator.toCss(ir);
			expect(css).toBe("50% top");
		});

		it("should generate mixed length and percentage", () => {
			const ir: Type.Position2D = {
				horizontal: { value: 100, unit: "px" },
				vertical: { value: 50, unit: "%" },
			};
			const css = PositionGenerator.toCss(ir);
			expect(css).toBe("100px 50%");
		});
	});

	describe("3D Position generation", () => {
		it("should generate 3D position", () => {
			const ir: Type.Position3D = {
				x: { value: 10, unit: "px" },
				y: { value: 20, unit: "px" },
				z: { value: 30, unit: "px" },
			};
			const css = PositionGenerator.to3DCss(ir);
			expect(css).toBe("10px 20px 30px");
		});

		it("should generate 3D position with mixed units", () => {
			const ir: Type.Position3D = {
				x: { value: 50, unit: "%" },
				y: { value: 100, unit: "px" },
				z: { value: 2, unit: "em" },
			};
			const css = PositionGenerator.to3DCss(ir);
			expect(css).toBe("50% 100px 2em");
		});

		it("should generate 3D position with mixed keyword and values", () => {
			const ir: Type.Position3D = {
				x: "center",
				y: { value: 20, unit: "px" },
				z: { value: 30, unit: "px" },
			};
			const css = PositionGenerator.to3DCss(ir);
			expect(css).toBe("center 20px 30px");
		});
	});

	describe("Position list generation", () => {
		it("should generate position list", () => {
			const ir: Type.PositionList = [
				{ horizontal: "center", vertical: "center" },
				{ horizontal: "left", vertical: "top" },
				{ horizontal: { value: 50, unit: "%" }, vertical: { value: 25, unit: "%" } },
			];
			const css = PositionGenerator.toListCss(ir);
			expect(css).toBe("center center, left top, 50% 25%");
		});

		it("should generate single position in list", () => {
			const ir: Type.PositionList = [{ horizontal: "center", vertical: "center" }];
			const css = PositionGenerator.toListCss(ir);
			expect(css).toBe("center center");
		});

		it("should generate empty position list", () => {
			const ir: Type.PositionList = [];
			const css = PositionGenerator.toListCss(ir);
			expect(css).toBe("");
		});
	});

	describe("Common position presets", () => {
		it("should generate from common position presets", () => {
			const css = PositionGenerator.fromCommonPosition("center");
			expect(css).toBe("center center");
		});

		it("should generate from all common position presets", () => {
			const presets: Array<{ name: keyof Type.CommonPositions; expected: string }> = [
				{ name: "center", expected: "center center" },
				{ name: "topLeft", expected: "left top" },
				{ name: "topCenter", expected: "center top" },
				{ name: "topRight", expected: "right top" },
				{ name: "middleLeft", expected: "left center" },
				{ name: "middleRight", expected: "right center" },
				{ name: "bottomLeft", expected: "left bottom" },
				{ name: "bottomCenter", expected: "center bottom" },
				{ name: "bottomRight", expected: "right bottom" },
			];

			for (const { name, expected } of presets) {
				const css = PositionGenerator.fromCommonPosition(name);
				expect(css).toBe(expected);
			}
		});
	});
});
