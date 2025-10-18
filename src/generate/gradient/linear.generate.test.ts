// b_path:: src/generate/gradient/linear.generate.test.ts

import { describe, expect, it } from "vitest";
import * as LinearGenerator from "./linear";

describe("Linear Gradient Generator", () => {
	it("should generate simple linear gradient", () => {
		const ir = {
			kind: "linear" as const,
			colorStops: [
				{ color: { kind: "named", name: "red" } as const },
				{ color: { kind: "named", name: "blue" } as const },
			],
			repeating: false,
		};

		const css = LinearGenerator.toCss(ir);
		expect(css).toBe("linear-gradient(red, blue)");
	});

	it("should generate linear gradient with angle direction", () => {
		const ir = {
			kind: "linear" as const,
			direction: { kind: "angle" as const, value: { value: 45, unit: "deg" as const } },
			colorStops: [
				{ color: { kind: "named", name: "red" } as const },
				{ color: { kind: "named", name: "blue" } as const },
			],
			repeating: false,
		};

		const css = LinearGenerator.toCss(ir);
		expect(css).toBe("linear-gradient(45deg, red, blue)");
	});

	it("should generate linear gradient with to-side direction", () => {
		const ir = {
			kind: "linear" as const,
			direction: { kind: "to-side" as const, value: "right" as const },
			colorStops: [
				{ color: { kind: "named", name: "red" } as const },
				{ color: { kind: "named", name: "blue" } as const },
			],
			repeating: false,
		};

		const css = LinearGenerator.toCss(ir);
		expect(css).toBe("linear-gradient(to right, red, blue)");
	});

	it("should generate linear gradient with to-corner direction", () => {
		const ir = {
			kind: "linear" as const,
			direction: { kind: "to-corner" as const, value: "top right" as const },
			colorStops: [
				{ color: { kind: "named", name: "red" } as const },
				{ color: { kind: "named", name: "blue" } as const },
			],
			repeating: false,
		};

		const css = LinearGenerator.toCss(ir);
		expect(css).toBe("linear-gradient(to top right, red, blue)");
	});

	it("should generate linear gradient with turn unit", () => {
		const ir = {
			kind: "linear" as const,
			direction: { kind: "angle" as const, value: { value: 0.25, unit: "turn" as const } },
			colorStops: [
				{ color: { kind: "named", name: "red" } as const },
				{ color: { kind: "named", name: "blue" } as const },
			],
			repeating: false,
		};

		const css = LinearGenerator.toCss(ir);
		expect(css).toBe("linear-gradient(0.25turn, red, blue)");
	});

	it("should generate linear gradient with rad unit", () => {
		const ir = {
			kind: "linear" as const,
			direction: { kind: "angle" as const, value: { value: 1.57, unit: "rad" as const } },
			colorStops: [
				{ color: { kind: "named", name: "red" } as const },
				{ color: { kind: "named", name: "blue" } as const },
			],
			repeating: false,
		};

		const css = LinearGenerator.toCss(ir);
		expect(css).toBe("linear-gradient(1.57rad, red, blue)");
	});

	it("should generate linear gradient with color stop positions", () => {
		const ir = {
			kind: "linear" as const,
			colorStops: [
				{ color: { kind: "named", name: "red" } as const, position: { value: 0, unit: "%" as const } },
				{ color: { kind: "named", name: "blue" } as const, position: { value: 100, unit: "%" as const } },
			],
			repeating: false,
		};

		const css = LinearGenerator.toCss(ir);
		expect(css).toBe("linear-gradient(red 0%, blue 100%)");
	});

	it("should generate linear gradient with color interpolation", () => {
		const ir = {
			kind: "linear" as const,
			colorSpace: "oklch" as const,
			colorStops: [
				{ color: { kind: "named", name: "red" } as const },
				{ color: { kind: "named", name: "blue" } as const },
			],
			repeating: false,
		};

		const css = LinearGenerator.toCss(ir);
		expect(css).toBe("linear-gradient(in oklch, red, blue)");
	});

	it("should generate linear gradient with direction and color interpolation", () => {
		const ir = {
			kind: "linear" as const,
			direction: { kind: "angle" as const, value: { value: 45, unit: "deg" as const } },
			colorSpace: "oklch" as const,
			colorStops: [
				{ color: { kind: "named", name: "red" } as const },
				{ color: { kind: "named", name: "blue" } as const },
			],
			repeating: false,
		};

		const css = LinearGenerator.toCss(ir);
		expect(css).toBe("linear-gradient(45deg in oklch, red, blue)");
	});

	it("should generate repeating linear gradient", () => {
		const ir = {
			kind: "linear" as const,
			direction: { kind: "angle" as const, value: { value: 45, unit: "deg" as const } },
			colorStops: [
				{ color: { kind: "named", name: "red" } as const, position: { value: 0, unit: "px" as const } },
				{ color: { kind: "named", name: "blue" } as const, position: { value: 20, unit: "px" as const } },
			],
			repeating: true,
		};

		const css = LinearGenerator.toCss(ir);
		expect(css).toBe("repeating-linear-gradient(45deg, red 0px, blue 20px)");
	});

	it("should generate complex linear gradient", () => {
		const ir = {
			kind: "linear" as const,
			direction: { kind: "to-corner" as const, value: "bottom right" as const },
			colorStops: [
				{ color: { kind: "named", name: "red" } as const, position: { value: 0, unit: "%" as const } },
				{ color: { kind: "named", name: "yellow" } as const, position: { value: 50, unit: "%" as const } },
				{ color: { kind: "named", name: "blue" } as const, position: { value: 100, unit: "%" as const } },
			],
			repeating: false,
		};

		const css = LinearGenerator.toCss(ir);
		expect(css).toBe("linear-gradient(to bottom right, red 0%, yellow 50%, blue 100%)");
	});

	it("should generate linear gradient with all side directions", () => {
		const sides: Array<"top" | "right" | "bottom" | "left"> = ["top", "right", "bottom", "left"];

		for (const side of sides) {
			const ir = {
				kind: "linear" as const,
				direction: { kind: "to-side" as const, value: side },
				colorStops: [
					{ color: { kind: "named", name: "red" } as const },
					{ color: { kind: "named", name: "blue" } as const },
				],
				repeating: false,
			};

			const css = LinearGenerator.toCss(ir);
			expect(css).toBe(`linear-gradient(to ${side}, red, blue)`);
		}
	});

	it("should generate linear gradient with all corner directions", () => {
		const corners: Array<"top left" | "top right" | "bottom left" | "bottom right"> = [
			"top left",
			"top right",
			"bottom left",
			"bottom right",
		];

		for (const corner of corners) {
			const ir = {
				kind: "linear" as const,
				direction: { kind: "to-corner" as const, value: corner },
				colorStops: [
					{ color: { kind: "named", name: "red" } as const },
					{ color: { kind: "named", name: "blue" } as const },
				],
				repeating: false,
			};

			const css = LinearGenerator.toCss(ir);
			expect(css).toBe(`linear-gradient(to ${corner}, red, blue)`);
		}
	});

	it("should generate linear gradient with multiple color stops", () => {
		const ir = {
			kind: "linear" as const,
			colorStops: [
				{ color: { kind: "named", name: "red" } as const },
				{ color: { kind: "named", name: "orange" } as const },
				{ color: { kind: "named", name: "yellow" } as const },
				{ color: { kind: "named", name: "green" } as const },
				{ color: { kind: "named", name: "blue" } as const },
			],
			repeating: false,
		};

		const css = LinearGenerator.toCss(ir);
		expect(css).toBe("linear-gradient(red, orange, yellow, green, blue)");
	});
});
