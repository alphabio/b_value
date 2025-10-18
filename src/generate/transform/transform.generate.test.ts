// b_path:: src/generate/transform/transform.generate.test.ts
import { describe, expect, it } from "vitest";
import type * as Type from "@/core/types";
import * as TransformGenerator from "./transform";

describe("Transform Generator", () => {
	describe("Translation transform generation", () => {
		it("should generate translate with two values", () => {
			const ir: Type.Transform = [
				{
					kind: "translate",
					x: { value: 100, unit: "px" },
					y: { value: 50, unit: "px" },
				},
			];
			const css = TransformGenerator.toCss(ir);
			expect(css).toBe("translate(100px, 50px)");
		});

		it("should generate translate with one value", () => {
			const ir: Type.Transform = [
				{
					kind: "translate",
					x: { value: 100, unit: "px" },
				},
			];
			const css = TransformGenerator.toCss(ir);
			expect(css).toBe("translate(100px)");
		});

		it("should generate translate with percentage values", () => {
			const ir: Type.Transform = [
				{
					kind: "translate",
					x: { value: 50, unit: "%" },
					y: { value: 25, unit: "%" },
				},
			];
			const css = TransformGenerator.toCss(ir);
			expect(css).toBe("translate(50%, 25%)");
		});

		it("should generate translateX", () => {
			const ir: Type.Transform = [
				{
					kind: "translateX",
					x: { value: 100, unit: "px" },
				},
			];
			const css = TransformGenerator.toCss(ir);
			expect(css).toBe("translateX(100px)");
		});

		it("should generate translateY", () => {
			const ir: Type.Transform = [
				{
					kind: "translateY",
					y: { value: 50, unit: "%" },
				},
			];
			const css = TransformGenerator.toCss(ir);
			expect(css).toBe("translateY(50%)");
		});

		it("should generate translateZ", () => {
			const ir: Type.Transform = [
				{
					kind: "translateZ",
					z: { value: 30, unit: "px" },
				},
			];
			const css = TransformGenerator.toCss(ir);
			expect(css).toBe("translateZ(30px)");
		});

		it("should generate translate3d", () => {
			const ir: Type.Transform = [
				{
					kind: "translate3d",
					x: { value: 10, unit: "px" },
					y: { value: 20, unit: "px" },
					z: { value: 30, unit: "px" },
				},
			];
			const css = TransformGenerator.toCss(ir);
			expect(css).toBe("translate3d(10px, 20px, 30px)");
		});
	});

	describe("Rotation transform generation", () => {
		it("should generate rotate", () => {
			const ir: Type.Transform = [
				{
					kind: "rotate",
					angle: { value: 45, unit: "deg" },
				},
			];
			const css = TransformGenerator.toCss(ir);
			expect(css).toBe("rotate(45deg)");
		});

		it("should generate rotate with radians", () => {
			const ir: Type.Transform = [
				{
					kind: "rotate",
					angle: { value: 1.57, unit: "rad" },
				},
			];
			const css = TransformGenerator.toCss(ir);
			expect(css).toBe("rotate(1.57rad)");
		});

		it("should generate rotate with turns", () => {
			const ir: Type.Transform = [
				{
					kind: "rotate",
					angle: { value: 0.25, unit: "turn" },
				},
			];
			const css = TransformGenerator.toCss(ir);
			expect(css).toBe("rotate(0.25turn)");
		});

		it("should generate rotateX", () => {
			const ir: Type.Transform = [
				{
					kind: "rotateX",
					angle: { value: 45, unit: "deg" },
				},
			];
			const css = TransformGenerator.toCss(ir);
			expect(css).toBe("rotateX(45deg)");
		});

		it("should generate rotateY", () => {
			const ir: Type.Transform = [
				{
					kind: "rotateY",
					angle: { value: 45, unit: "deg" },
				},
			];
			const css = TransformGenerator.toCss(ir);
			expect(css).toBe("rotateY(45deg)");
		});

		it("should generate rotateZ", () => {
			const ir: Type.Transform = [
				{
					kind: "rotateZ",
					angle: { value: 45, unit: "deg" },
				},
			];
			const css = TransformGenerator.toCss(ir);
			expect(css).toBe("rotateZ(45deg)");
		});

		it("should generate rotate3d", () => {
			const ir: Type.Transform = [
				{
					kind: "rotate3d",
					x: 1,
					y: 1,
					z: 0,
					angle: { value: 45, unit: "deg" },
				},
			];
			const css = TransformGenerator.toCss(ir);
			expect(css).toBe("rotate3d(1, 1, 0, 45deg)");
		});
	});

	describe("Scale transform generation", () => {
		it("should generate scale with two values", () => {
			const ir: Type.Transform = [
				{
					kind: "scale",
					x: 1.5,
					y: 2,
				},
			];
			const css = TransformGenerator.toCss(ir);
			expect(css).toBe("scale(1.5, 2)");
		});

		it("should generate scale with one value", () => {
			const ir: Type.Transform = [
				{
					kind: "scale",
					x: 1.5,
				},
			];
			const css = TransformGenerator.toCss(ir);
			expect(css).toBe("scale(1.5)");
		});

		it("should generate scaleX", () => {
			const ir: Type.Transform = [
				{
					kind: "scaleX",
					x: 1.5,
				},
			];
			const css = TransformGenerator.toCss(ir);
			expect(css).toBe("scaleX(1.5)");
		});

		it("should generate scaleY", () => {
			const ir: Type.Transform = [
				{
					kind: "scaleY",
					y: 2,
				},
			];
			const css = TransformGenerator.toCss(ir);
			expect(css).toBe("scaleY(2)");
		});

		it("should generate scaleZ", () => {
			const ir: Type.Transform = [
				{
					kind: "scaleZ",
					z: 0.5,
				},
			];
			const css = TransformGenerator.toCss(ir);
			expect(css).toBe("scaleZ(0.5)");
		});

		it("should generate scale3d", () => {
			const ir: Type.Transform = [
				{
					kind: "scale3d",
					x: 1.5,
					y: 2,
					z: 0.5,
				},
			];
			const css = TransformGenerator.toCss(ir);
			expect(css).toBe("scale3d(1.5, 2, 0.5)");
		});
	});

	describe("Skew transform generation", () => {
		it("should generate skew with two values", () => {
			const ir: Type.Transform = [
				{
					kind: "skew",
					x: { value: 45, unit: "deg" },
					y: { value: 10, unit: "deg" },
				},
			];
			const css = TransformGenerator.toCss(ir);
			expect(css).toBe("skew(45deg, 10deg)");
		});

		it("should generate skew with one value", () => {
			const ir: Type.Transform = [
				{
					kind: "skew",
					x: { value: 45, unit: "deg" },
				},
			];
			const css = TransformGenerator.toCss(ir);
			expect(css).toBe("skew(45deg)");
		});

		it("should generate skewX", () => {
			const ir: Type.Transform = [
				{
					kind: "skewX",
					x: { value: 45, unit: "deg" },
				},
			];
			const css = TransformGenerator.toCss(ir);
			expect(css).toBe("skewX(45deg)");
		});

		it("should generate skewY", () => {
			const ir: Type.Transform = [
				{
					kind: "skewY",
					y: { value: 10, unit: "deg" },
				},
			];
			const css = TransformGenerator.toCss(ir);
			expect(css).toBe("skewY(10deg)");
		});
	});

	describe("Matrix transform generation", () => {
		it("should generate matrix", () => {
			const ir: Type.Transform = [
				{
					kind: "matrix",
					a: 1,
					b: 0.5,
					c: -0.5,
					d: 1,
					e: { value: 10, unit: "px" },
					f: { value: 20, unit: "px" },
				},
			];
			const css = TransformGenerator.toCss(ir);
			expect(css).toBe("matrix(1, 0.5, -0.5, 1, 10, 20)");
		});

		it("should generate matrix3d", () => {
			const ir: Type.Transform = [
				{
					kind: "matrix3d",
					values: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
				},
			];
			const css = TransformGenerator.toCss(ir);
			expect(css).toBe("matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)");
		});
	});

	describe("Perspective transform generation", () => {
		it("should generate perspective", () => {
			const ir: Type.Transform = [
				{
					kind: "perspective",
					depth: { value: 1000, unit: "px" },
				},
			];
			const css = TransformGenerator.toCss(ir);
			expect(css).toBe("perspective(1000px)");
		});
	});

	describe("Multiple transform generation", () => {
		it("should generate multiple transforms", () => {
			const ir: Type.Transform = [
				{ kind: "translateX", x: { value: 100, unit: "px" } },
				{ kind: "rotate", angle: { value: 45, unit: "deg" } },
				{ kind: "scale", x: 1.5, y: 1.5 },
			];
			const css = TransformGenerator.toCss(ir);
			expect(css).toBe("translateX(100px) rotate(45deg) scale(1.5, 1.5)");
		});

		it("should generate complex transform chain", () => {
			const ir: Type.Transform = [
				{
					kind: "translate3d",
					x: { value: 10, unit: "px" },
					y: { value: 20, unit: "px" },
					z: { value: 30, unit: "px" },
				},
				{ kind: "rotateY", angle: { value: 45, unit: "deg" } },
				{ kind: "scale3d", x: 1.5, y: 2, z: 0.5 },
			];
			const css = TransformGenerator.toCss(ir);
			expect(css).toBe("translate3d(10px, 20px, 30px) rotateY(45deg) scale3d(1.5, 2, 0.5)");
		});
	});

	describe("Individual function generation", () => {
		it("should generate individual translate function", () => {
			const ir: Type.TransformFunction = {
				kind: "translate",
				x: { value: 100, unit: "px" },
				y: { value: 50, unit: "px" },
			};
			const css = TransformGenerator.toFunctionCss(ir);
			expect(css).toBe("translate(100px, 50px)");
		});

		it("should generate individual rotate function", () => {
			const ir: Type.TransformFunction = {
				kind: "rotate",
				angle: { value: 45, unit: "deg" },
			};
			const css = TransformGenerator.toFunctionCss(ir);
			expect(css).toBe("rotate(45deg)");
		});

		it("should generate individual scale function", () => {
			const ir: Type.TransformFunction = {
				kind: "scale",
				x: 1.5,
				y: 2,
			};
			const css = TransformGenerator.toFunctionCss(ir);
			expect(css).toBe("scale(1.5, 2)");
		});

		it("should generate individual matrix function", () => {
			const ir: Type.TransformFunction = {
				kind: "matrix",
				a: 1,
				b: 0.5,
				c: -0.5,
				d: 1,
				e: { value: 10, unit: "px" },
				f: { value: 20, unit: "px" },
			};
			const css = TransformGenerator.toFunctionCss(ir);
			expect(css).toBe("matrix(1, 0.5, -0.5, 1, 10, 20)");
		});
	});

	describe("Edge cases", () => {
		it("should handle empty transform array", () => {
			const ir: Type.Transform = [];
			const css = TransformGenerator.toCss(ir);
			expect(css).toBe("");
		});

		it("should handle single transform", () => {
			const ir: Type.Transform = [
				{
					kind: "translateX",
					x: { value: 100, unit: "px" },
				},
			];
			const css = TransformGenerator.toCss(ir);
			expect(css).toBe("translateX(100px)");
		});
	});
});
