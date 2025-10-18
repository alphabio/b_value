// b_path:: src/generate/gradient/radial.generate.test.ts

import { describe, expect, it } from "vitest";
import * as RadialGenerator from "./radial";

describe("Radial Gradient Generator", () => {
	it("should generate simple radial gradient", () => {
		const ir = {
			kind: "radial" as const,
			colorStops: [{ color: "red" }, { color: "blue" }],
			repeating: false,
		};

		const css = RadialGenerator.toCss(ir);
		expect(css).toBe("radial-gradient(red, blue)");
	});

	it("should generate radial gradient with shape", () => {
		const ir = {
			kind: "radial" as const,
			shape: "circle" as const,
			colorStops: [{ color: "red" }, { color: "blue" }],
			repeating: false,
		};

		const css = RadialGenerator.toCss(ir);
		expect(css).toBe("radial-gradient(circle, red, blue)");
	});

	it("should generate radial gradient with size keyword", () => {
		const ir = {
			kind: "radial" as const,
			shape: "circle" as const,
			size: { kind: "keyword" as const, value: "closest-side" as const },
			colorStops: [{ color: "red" }, { color: "blue" }],
			repeating: false,
		};

		const css = RadialGenerator.toCss(ir);
		expect(css).toBe("radial-gradient(circle closest-side, red, blue)");
	});

	it("should generate radial gradient with position", () => {
		const ir = {
			kind: "radial" as const,
			position: {
				horizontal: "left" as const,
				vertical: "top" as const,
			},
			colorStops: [{ color: "red" }, { color: "blue" }],
			repeating: false,
		};

		const css = RadialGenerator.toCss(ir);
		expect(css).toBe("radial-gradient(at left top, red, blue)");
	});

	it("should generate radial gradient with center position", () => {
		const ir = {
			kind: "radial" as const,
			position: {
				horizontal: "center" as const,
				vertical: "center" as const,
			},
			colorStops: [{ color: "red" }, { color: "blue" }],
			repeating: false,
		};

		const css = RadialGenerator.toCss(ir);
		expect(css).toBe("radial-gradient(at center center, red, blue)");
	});

	it("should generate radial gradient with percentage positions", () => {
		const ir = {
			kind: "radial" as const,
			position: {
				horizontal: { value: 50, unit: "%" as const },
				vertical: { value: 75, unit: "%" as const },
			},
			colorStops: [{ color: "red" }, { color: "blue" }],
			repeating: false,
		};

		const css = RadialGenerator.toCss(ir);
		expect(css).toBe("radial-gradient(at 50% 75%, red, blue)");
	});

	it("should generate radial gradient with color stop positions", () => {
		const ir = {
			kind: "radial" as const,
			colorStops: [
				{ color: "red", position: { value: 0, unit: "%" as const } },
				{ color: "blue", position: { value: 100, unit: "%" as const } },
			],
			repeating: false,
		};

		const css = RadialGenerator.toCss(ir);
		expect(css).toBe("radial-gradient(red 0%, blue 100%)");
	});

	it("should generate repeating radial gradient", () => {
		const ir = {
			kind: "radial" as const,
			colorStops: [{ color: "red" }, { color: "blue", position: { value: 20, unit: "px" as const } }],
			repeating: true,
		};

		const css = RadialGenerator.toCss(ir);
		expect(css).toBe("repeating-radial-gradient(red, blue 20px)");
	});

	it("should generate complex radial gradient", () => {
		const ir = {
			kind: "radial" as const,
			shape: "ellipse" as const,
			size: { kind: "keyword" as const, value: "farthest-corner" as const },
			position: {
				horizontal: { value: 30, unit: "%" as const },
				vertical: { value: 30, unit: "%" as const },
			},
			colorStops: [
				{ color: "red", position: { value: 0, unit: "%" as const } },
				{ color: "blue", position: { value: 100, unit: "%" as const } },
			],
			repeating: false,
		};

		const css = RadialGenerator.toCss(ir);
		expect(css).toBe("radial-gradient(ellipse farthest-corner at 30% 30%, red 0%, blue 100%)");
	});

	it("should generate radial gradient with multiple color stops", () => {
		const ir = {
			kind: "radial" as const,
			colorStops: [
				{ color: "red" },
				{ color: "yellow", position: { value: 30, unit: "%" as const } },
				{ color: "green", position: { value: 60, unit: "%" as const } },
				{ color: "blue" },
			],
			repeating: false,
		};

		const css = RadialGenerator.toCss(ir);
		expect(css).toBe("radial-gradient(red, yellow 30%, green 60%, blue)");
	});

	it("should generate radial gradient with explicit circle radius", () => {
		const ir = {
			kind: "radial" as const,
			shape: "circle" as const,
			size: {
				kind: "circle-explicit" as const,
				radius: { value: 100, unit: "px" as const },
			},
			colorStops: [{ color: "red" }, { color: "blue" }],
			repeating: false,
		};

		const css = RadialGenerator.toCss(ir);
		expect(css).toBe("radial-gradient(circle 100px, red, blue)");
	});

	it("should generate radial gradient with explicit ellipse radii", () => {
		const ir = {
			kind: "radial" as const,
			shape: "ellipse" as const,
			size: {
				kind: "ellipse-explicit" as const,
				radiusX: { value: 100, unit: "px" as const },
				radiusY: { value: 50, unit: "px" as const },
			},
			colorStops: [{ color: "red" }, { color: "blue" }],
			repeating: false,
		};

		const css = RadialGenerator.toCss(ir);
		expect(css).toBe("radial-gradient(ellipse 100px 50px, red, blue)");
	});
});
