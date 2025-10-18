// b_path:: src/parse/transform/transform.parse.test.ts
import { describe, expect, it } from "vitest";
import * as TransformParser from "./transform";

describe("Transform Parser", () => {
	describe("Translation transforms", () => {
		it("should parse translate with two values", () => {
			const css = "translate(100px, 50px)";
			const result = TransformParser.parse(css);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toHaveLength(1);
				expect(result.value[0]).toEqual({
					kind: "translate",
					x: { value: 100, unit: "px" },
					y: { value: 50, unit: "px" },
				});
			}
		});

		it("should parse translate with one value", () => {
			const css = "translate(100px)";
			const result = TransformParser.parse(css);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toHaveLength(1);
				expect(result.value[0]).toEqual({
					kind: "translate",
					x: { value: 100, unit: "px" },
					y: undefined,
				});
			}
		});

		it("should parse translate with percentage values", () => {
			const css = "translate(50%, 25%)";
			const result = TransformParser.parse(css);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value[0]).toEqual({
					kind: "translate",
					x: { value: 50, unit: "%" },
					y: { value: 25, unit: "%" },
				});
			}
		});

		it("should parse translateX", () => {
			const css = "translateX(100px)";
			const result = TransformParser.parse(css);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value[0]).toEqual({
					kind: "translateX",
					x: { value: 100, unit: "px" },
				});
			}
		});

		it("should parse translateY", () => {
			const css = "translateY(50%)";
			const result = TransformParser.parse(css);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value[0]).toEqual({
					kind: "translateY",
					y: { value: 50, unit: "%" },
				});
			}
		});

		it("should parse translateZ", () => {
			const css = "translateZ(30px)";
			const result = TransformParser.parse(css);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value[0]).toEqual({
					kind: "translateZ",
					z: { value: 30, unit: "px" },
				});
			}
		});

		it("should parse translate3d", () => {
			const css = "translate3d(10px, 20px, 30px)";
			const result = TransformParser.parse(css);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value[0]).toEqual({
					kind: "translate3d",
					x: { value: 10, unit: "px" },
					y: { value: 20, unit: "px" },
					z: { value: 30, unit: "px" },
				});
			}
		});
	});

	describe("Rotation transforms", () => {
		it("should parse rotate", () => {
			const css = "rotate(45deg)";
			const result = TransformParser.parse(css);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value[0]).toEqual({
					kind: "rotate",
					angle: { value: 45, unit: "deg" },
				});
			}
		});

		it("should parse rotate with radians", () => {
			const css = "rotate(1.57rad)";
			const result = TransformParser.parse(css);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value[0]).toEqual({
					kind: "rotate",
					angle: { value: 1.57, unit: "rad" },
				});
			}
		});

		it("should parse rotate with turns", () => {
			const css = "rotate(0.25turn)";
			const result = TransformParser.parse(css);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value[0]).toEqual({
					kind: "rotate",
					angle: { value: 0.25, unit: "turn" },
				});
			}
		});

		it("should parse rotateX", () => {
			const css = "rotateX(45deg)";
			const result = TransformParser.parse(css);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value[0]).toEqual({
					kind: "rotateX",
					angle: { value: 45, unit: "deg" },
				});
			}
		});

		it("should parse rotateY", () => {
			const css = "rotateY(45deg)";
			const result = TransformParser.parse(css);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value[0]).toEqual({
					kind: "rotateY",
					angle: { value: 45, unit: "deg" },
				});
			}
		});

		it("should parse rotateZ", () => {
			const css = "rotateZ(45deg)";
			const result = TransformParser.parse(css);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value[0]).toEqual({
					kind: "rotateZ",
					angle: { value: 45, unit: "deg" },
				});
			}
		});

		it("should parse rotate3d", () => {
			const css = "rotate3d(1, 1, 0, 45deg)";
			const result = TransformParser.parse(css);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value[0]).toEqual({
					kind: "rotate3d",
					x: 1,
					y: 1,
					z: 0,
					angle: { value: 45, unit: "deg" },
				});
			}
		});
	});

	describe("Scale transforms", () => {
		it("should parse scale with two values", () => {
			const css = "scale(1.5, 2)";
			const result = TransformParser.parse(css);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value[0]).toEqual({
					kind: "scale",
					x: 1.5,
					y: 2,
				});
			}
		});

		it("should parse scale with one value", () => {
			const css = "scale(1.5)";
			const result = TransformParser.parse(css);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value[0]).toEqual({
					kind: "scale",
					x: 1.5,
					y: 1.5,
				});
			}
		});

		it("should parse scaleX", () => {
			const css = "scaleX(1.5)";
			const result = TransformParser.parse(css);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value[0]).toEqual({
					kind: "scaleX",
					x: 1.5,
				});
			}
		});

		it("should parse scaleY", () => {
			const css = "scaleY(2)";
			const result = TransformParser.parse(css);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value[0]).toEqual({
					kind: "scaleY",
					y: 2,
				});
			}
		});

		it("should parse scaleZ", () => {
			const css = "scaleZ(0.5)";
			const result = TransformParser.parse(css);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value[0]).toEqual({
					kind: "scaleZ",
					z: 0.5,
				});
			}
		});

		it("should parse scale3d", () => {
			const css = "scale3d(1.5, 2, 0.5)";
			const result = TransformParser.parse(css);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value[0]).toEqual({
					kind: "scale3d",
					x: 1.5,
					y: 2,
					z: 0.5,
				});
			}
		});
	});

	describe("Skew transforms", () => {
		it("should parse skew with two values", () => {
			const css = "skew(45deg, 10deg)";
			const result = TransformParser.parse(css);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value[0]).toEqual({
					kind: "skew",
					x: { value: 45, unit: "deg" },
					y: { value: 10, unit: "deg" },
				});
			}
		});

		it("should parse skew with one value", () => {
			const css = "skew(45deg)";
			const result = TransformParser.parse(css);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value[0]).toEqual({
					kind: "skew",
					x: { value: 45, unit: "deg" },
					y: { value: 0, unit: "deg" },
				});
			}
		});

		it("should parse skewX", () => {
			const css = "skewX(45deg)";
			const result = TransformParser.parse(css);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value[0]).toEqual({
					kind: "skewX",
					x: { value: 45, unit: "deg" },
				});
			}
		});

		it("should parse skewY", () => {
			const css = "skewY(10deg)";
			const result = TransformParser.parse(css);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value[0]).toEqual({
					kind: "skewY",
					y: { value: 10, unit: "deg" },
				});
			}
		});
	});

	describe("Matrix transforms", () => {
		it("should parse matrix", () => {
			const css = "matrix(1, 0.5, -0.5, 1, 10, 20)";
			const result = TransformParser.parse(css);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value[0]).toEqual({
					kind: "matrix",
					a: 1,
					b: 0.5,
					c: -0.5,
					d: 1,
					e: { value: 10, unit: "px" },
					f: { value: 20, unit: "px" },
				});
			}
		});

		it("should parse matrix3d", () => {
			const css = "matrix3d(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1)";
			const result = TransformParser.parse(css);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value[0]).toEqual({
					kind: "matrix3d",
					values: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
				});
			}
		});
	});

	describe("Perspective transform", () => {
		it("should parse perspective", () => {
			const css = "perspective(1000px)";
			const result = TransformParser.parse(css);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value[0]).toEqual({
					kind: "perspective",
					depth: { value: 1000, unit: "px" },
				});
			}
		});
	});

	describe("Multiple transforms", () => {
		it("should parse multiple transforms", () => {
			const css = "translateX(100px) rotate(45deg) scale(1.5)";
			const result = TransformParser.parse(css);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toHaveLength(3);
				expect(result.value[0]?.kind).toBe("translateX");
				expect(result.value[1]?.kind).toBe("rotate");
				expect(result.value[2]?.kind).toBe("scale");
			}
		});

		it("should parse complex transform chain", () => {
			const css = "translate3d(10px, 20px, 30px) rotateY(45deg) scale3d(1.5, 2, 0.5)";
			const result = TransformParser.parse(css);

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toHaveLength(3);
				expect(result.value[0]?.kind).toBe("translate3d");
				expect(result.value[1]?.kind).toBe("rotateY");
				expect(result.value[2]?.kind).toBe("scale3d");
			}
		});
	});

	describe("Error handling", () => {
		it("should return error for invalid function name", () => {
			const css = "invalid-transform(red, blue)";
			const result = TransformParser.parse(css);

			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("No valid transform functions found");
			}
		});

		it("should return error for invalid CSS syntax", () => {
			const css = "not valid css";
			const result = TransformParser.parse(css);

			expect(result.ok).toBe(false);
		});

		it("should return error for translate with wrong number of arguments", () => {
			const css = "translate(100px, 50px, 30px)";
			const result = TransformParser.parse(css);

			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("expects 1 or 2 arguments");
			}
		});

		it("should return error for rotate3d with wrong number of arguments", () => {
			const css = "rotate3d(1, 1, 0)";
			const result = TransformParser.parse(css);

			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("expects 4 arguments");
			}
		});

		it("should return error for matrix with wrong number of arguments", () => {
			const css = "matrix(1, 0.5, -0.5, 1, 10)";
			const result = TransformParser.parse(css);

			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("expects 6 arguments");
			}
		});

		it("should return error for matrix3d with wrong number of arguments", () => {
			const css = "matrix3d(1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0)";
			const result = TransformParser.parse(css);

			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("expects 16 arguments");
			}
		});
	});
});
