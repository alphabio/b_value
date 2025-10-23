// Test file for generate/transform/utils.ts
import { describe, expect, it } from "vitest";
import type * as Type from "@/core/types";
import * as TransformUtils from "@/generate/transform/utils";

describe("generate (Transform)", () => {
	it("should handle null input", () => {
		const result = TransformUtils.generate(null as unknown as Type.Transform);
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.issues[0]?.code).toBe("invalid-ir");
		}
	});

	it("should handle undefined input", () => {
		const result = TransformUtils.generate(undefined as unknown as Type.Transform);
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.issues[0]?.code).toBe("invalid-ir");
		}
	});

	it("should generate empty string for empty array", () => {
		const result = TransformUtils.generate([]);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("");
		}
	});

	it("should generate single translate function", () => {
		const result = TransformUtils.generate([
			{ kind: "translate", x: { value: 100, unit: "px" }, y: { value: 50, unit: "px" } },
		]);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("translate(100px, 50px)");
		}
	});

	it("should generate multiple transform functions", () => {
		const result = TransformUtils.generate([
			{ kind: "translate", x: { value: 100, unit: "px" }, y: { value: 50, unit: "px" } },
			{ kind: "rotate", angle: { value: 45, unit: "deg" } },
			{ kind: "scale", x: 1.5, y: 1.5 },
		]);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("translate(100px, 50px) rotate(45deg) scale(1.5, 1.5)");
		}
	});
});

describe("toFunctionCss - translate", () => {
	it("should generate translate with both x and y", () => {
		const result = TransformUtils.toFunctionCss({
			kind: "translate",
			x: { value: 100, unit: "px" },
			y: { value: 50, unit: "px" },
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("translate(100px, 50px)");
		}
	});

	it("should generate translate with only x", () => {
		const result = TransformUtils.toFunctionCss({
			kind: "translate",
			x: { value: 100, unit: "px" },
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("translate(100px)");
		}
	});

	it("should generate translateX", () => {
		const result = TransformUtils.toFunctionCss({
			kind: "translateX",
			x: { value: 100, unit: "px" },
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("translateX(100px)");
		}
	});

	it("should generate translateY", () => {
		const result = TransformUtils.toFunctionCss({
			kind: "translateY",
			y: { value: 50, unit: "%" },
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("translateY(50%)");
		}
	});

	it("should generate translateZ", () => {
		const result = TransformUtils.toFunctionCss({
			kind: "translateZ",
			z: { value: 10, unit: "px" },
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("translateZ(10px)");
		}
	});

	it("should generate translate3d", () => {
		const result = TransformUtils.toFunctionCss({
			kind: "translate3d",
			x: { value: 10, unit: "px" },
			y: { value: 20, unit: "px" },
			z: { value: 30, unit: "px" },
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("translate3d(10px, 20px, 30px)");
		}
	});
});

describe("toFunctionCss - rotate", () => {
	it("should generate rotate", () => {
		const result = TransformUtils.toFunctionCss({
			kind: "rotate",
			angle: { value: 45, unit: "deg" },
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("rotate(45deg)");
		}
	});

	it("should generate rotateX", () => {
		const result = TransformUtils.toFunctionCss({
			kind: "rotateX",
			angle: { value: 90, unit: "deg" },
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("rotateX(90deg)");
		}
	});

	it("should generate rotateY", () => {
		const result = TransformUtils.toFunctionCss({
			kind: "rotateY",
			angle: { value: 180, unit: "deg" },
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("rotateY(180deg)");
		}
	});

	it("should generate rotateZ", () => {
		const result = TransformUtils.toFunctionCss({
			kind: "rotateZ",
			angle: { value: 270, unit: "deg" },
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("rotateZ(270deg)");
		}
	});

	it("should generate rotate3d", () => {
		const result = TransformUtils.toFunctionCss({
			kind: "rotate3d",
			x: 1,
			y: 0,
			z: 0,
			angle: { value: 45, unit: "deg" },
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("rotate3d(1, 0, 0, 45deg)");
		}
	});

	it("should handle different angle units", () => {
		const tests: Array<[Type.Angle, string]> = [
			[{ value: 1, unit: "rad" }, "rotate(1rad)"],
			[{ value: 100, unit: "grad" }, "rotate(100grad)"],
			[{ value: 0.5, unit: "turn" }, "rotate(0.5turn)"],
		];

		for (const [angle, expected] of tests) {
			const result = TransformUtils.toFunctionCss({
				kind: "rotate",
				angle,
			});
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toBe(expected);
			}
		}
	});
});

describe("toFunctionCss - scale", () => {
	it("should generate scale with both x and y", () => {
		const result = TransformUtils.toFunctionCss({
			kind: "scale",
			x: 1.5,
			y: 2,
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("scale(1.5, 2)");
		}
	});

	it("should generate scale with only x", () => {
		const result = TransformUtils.toFunctionCss({
			kind: "scale",
			x: 2,
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("scale(2)");
		}
	});

	it("should generate scaleX", () => {
		const result = TransformUtils.toFunctionCss({
			kind: "scaleX",
			x: 1.5,
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("scaleX(1.5)");
		}
	});

	it("should generate scaleY", () => {
		const result = TransformUtils.toFunctionCss({
			kind: "scaleY",
			y: 0.5,
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("scaleY(0.5)");
		}
	});

	it("should generate scaleZ", () => {
		const result = TransformUtils.toFunctionCss({
			kind: "scaleZ",
			z: 2,
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("scaleZ(2)");
		}
	});

	it("should generate scale3d", () => {
		const result = TransformUtils.toFunctionCss({
			kind: "scale3d",
			x: 1,
			y: 2,
			z: 3,
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("scale3d(1, 2, 3)");
		}
	});
});

describe("toFunctionCss - skew", () => {
	it("should generate skew with both x and y", () => {
		const result = TransformUtils.toFunctionCss({
			kind: "skew",
			x: { value: 10, unit: "deg" },
			y: { value: 20, unit: "deg" },
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("skew(10deg, 20deg)");
		}
	});

	it("should generate skew with only x", () => {
		const result = TransformUtils.toFunctionCss({
			kind: "skew",
			x: { value: 15, unit: "deg" },
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("skew(15deg)");
		}
	});

	it("should generate skewX", () => {
		const result = TransformUtils.toFunctionCss({
			kind: "skewX",
			x: { value: 30, unit: "deg" },
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("skewX(30deg)");
		}
	});

	it("should generate skewY", () => {
		const result = TransformUtils.toFunctionCss({
			kind: "skewY",
			y: { value: 45, unit: "deg" },
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("skewY(45deg)");
		}
	});
});

describe("toFunctionCss - matrix", () => {
	it("should generate matrix", () => {
		const result = TransformUtils.toFunctionCss({
			kind: "matrix",
			a: 1,
			b: 0.5,
			c: -0.5,
			d: 1,
			e: { value: 10, unit: "px" },
			f: { value: 20, unit: "px" },
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("matrix(1, 0.5, -0.5, 1, 10, 20)");
		}
	});

	it("should generate matrix3d", () => {
		const values = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
		const result = TransformUtils.toFunctionCss({
			kind: "matrix3d",
			values,
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)");
		}
	});
});

describe("toFunctionCss - perspective", () => {
	it("should generate perspective", () => {
		const result = TransformUtils.toFunctionCss({
			kind: "perspective",
			depth: { value: 500, unit: "px" },
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("perspective(500px)");
		}
	});

	it("should handle different length units", () => {
		const tests: Array<[Type.Length, string]> = [
			[{ value: 1, unit: "em" }, "perspective(1em)"],
			[{ value: 100, unit: "rem" }, "perspective(100rem)"],
			[{ value: 50, unit: "vw" }, "perspective(50vw)"],
		];

		for (const [depth, expected] of tests) {
			const result = TransformUtils.toFunctionCss({
				kind: "perspective",
				depth,
			});
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toBe(expected);
			}
		}
	});
});

describe("toFunctionCss - complex scenarios", () => {
	it("should handle zero values", () => {
		const result = TransformUtils.toFunctionCss({
			kind: "translate",
			x: { value: 0, unit: "px" },
			y: { value: 0, unit: "px" },
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("translate(0px, 0px)");
		}
	});

	it("should handle negative values", () => {
		const result = TransformUtils.toFunctionCss({
			kind: "translate",
			x: { value: -50, unit: "px" },
			y: { value: -100, unit: "%" },
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("translate(-50px, -100%)");
		}
	});

	it("should handle decimal values", () => {
		const result = TransformUtils.toFunctionCss({
			kind: "scale",
			x: 0.75,
			y: 1.25,
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("scale(0.75, 1.25)");
		}
	});
});
