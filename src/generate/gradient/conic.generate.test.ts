// b_path:: src/generate/gradient/conic.generate.test.ts

import { describe, expect, it } from "vitest";
import * as ConicGenerator from "./conic";

describe("Conic Gradient Generator", () => {
	it("should generate simple conic gradient", () => {
		const ir = {
			kind: "conic" as const,
			colorStops: [
				{ color: { kind: "named", name: "red" } as const },
				{ color: { kind: "named", name: "blue" } as const },
			],
			repeating: false,
		};

		const css = ConicGenerator.generate(ir);
		expect(css).toEqual({ ok: true, issues: [], value: "conic-gradient(red, blue)" });
	});

	it("should generate conic gradient with starting angle", () => {
		const ir = {
			kind: "conic" as const,
			fromAngle: { value: 45, unit: "deg" as const },
			colorStops: [
				{ color: { kind: "named", name: "red" } as const },
				{ color: { kind: "named", name: "blue" } as const },
			],
			repeating: false,
		};

		const css = ConicGenerator.generate(ir);
		expect(css).toEqual({ ok: true, issues: [], value: "conic-gradient(from 45deg, red, blue)" });
	});

	it("should generate conic gradient with position", () => {
		const ir = {
			kind: "conic" as const,
			position: {
				horizontal: "center" as const,
				vertical: "center" as const,
			},
			colorStops: [
				{ color: { kind: "named", name: "red" } as const },
				{ color: { kind: "named", name: "blue" } as const },
			],
			repeating: false,
		};

		const css = ConicGenerator.generate(ir);
		expect(css).toEqual({ ok: true, issues: [], value: "conic-gradient(at center center, red, blue)" });
	});

	it("should generate conic gradient with position keywords", () => {
		const ir = {
			kind: "conic" as const,
			position: {
				horizontal: "left" as const,
				vertical: "top" as const,
			},
			colorStops: [
				{ color: { kind: "named", name: "red" } as const },
				{ color: { kind: "named", name: "blue" } as const },
			],
			repeating: false,
		};

		const css = ConicGenerator.generate(ir);
		expect(css).toEqual({ ok: true, issues: [], value: "conic-gradient(at left top, red, blue)" });
	});

	it("should generate conic gradient with percentage position", () => {
		const ir = {
			kind: "conic" as const,
			position: {
				horizontal: { value: 50, unit: "%" as const },
				vertical: { value: 75, unit: "%" as const },
			},
			colorStops: [
				{ color: { kind: "named", name: "red" } as const },
				{ color: { kind: "named", name: "blue" } as const },
			],
			repeating: false,
		};

		const css = ConicGenerator.generate(ir);
		expect(css).toEqual({ ok: true, issues: [], value: "conic-gradient(at 50% 75%, red, blue)" });
	});

	it("should generate conic gradient with both angle and position", () => {
		const ir = {
			kind: "conic" as const,
			fromAngle: { value: 90, unit: "deg" as const },
			position: {
				horizontal: { value: 50, unit: "%" as const },
				vertical: { value: 50, unit: "%" as const },
			},
			colorStops: [
				{ color: { kind: "named", name: "red" } as const },
				{ color: { kind: "named", name: "blue" } as const },
			],
			repeating: false,
		};

		const css = ConicGenerator.generate(ir);
		expect(css).toEqual({ ok: true, issues: [], value: "conic-gradient(from 90deg at 50% 50%, red, blue)" });
	});

	it("should generate conic gradient with turn unit", () => {
		const ir = {
			kind: "conic" as const,
			fromAngle: { value: 0.25, unit: "turn" as const },
			colorStops: [
				{ color: { kind: "named", name: "red" } as const },
				{ color: { kind: "named", name: "blue" } as const },
			],
			repeating: false,
		};

		const css = ConicGenerator.generate(ir);
		expect(css).toEqual({ ok: true, issues: [], value: "conic-gradient(from 0.25turn, red, blue)" });
	});

	it("should generate conic gradient with rad unit", () => {
		const ir = {
			kind: "conic" as const,
			fromAngle: { value: 1.57, unit: "rad" as const },
			colorStops: [
				{ color: { kind: "named", name: "red" } as const },
				{ color: { kind: "named", name: "blue" } as const },
			],
			repeating: false,
		};

		const css = ConicGenerator.generate(ir);
		expect(css).toEqual({ ok: true, issues: [], value: "conic-gradient(from 1.57rad, red, blue)" });
	});

	it("should generate conic gradient with color stop angle positions", () => {
		const ir = {
			kind: "conic" as const,
			colorStops: [
				{ color: { kind: "named", name: "red" } as const, position: { value: 0, unit: "deg" as const } },
				{ color: { kind: "named", name: "blue" } as const, position: { value: 180, unit: "deg" as const } },
			],
			repeating: false,
		};

		const css = ConicGenerator.generate(ir);
		expect(css).toEqual({ ok: true, issues: [], value: "conic-gradient(red 0deg, blue 180deg)" });
	});

	it("should generate conic gradient with color interpolation", () => {
		const ir = {
			kind: "conic" as const,
			colorSpace: "oklch" as const,
			colorStops: [
				{ color: { kind: "named", name: "red" } as const },
				{ color: { kind: "named", name: "blue" } as const },
			],
			repeating: false,
		};

		const css = ConicGenerator.generate(ir);
		expect(css).toEqual({ ok: true, issues: [], value: "conic-gradient(in oklch, red, blue)" });
	});

	it("should generate conic gradient with angle and color interpolation", () => {
		const ir = {
			kind: "conic" as const,
			fromAngle: { value: 45, unit: "deg" as const },
			colorSpace: "oklch" as const,
			colorStops: [
				{ color: { kind: "named", name: "red" } as const },
				{ color: { kind: "named", name: "blue" } as const },
			],
			repeating: false,
		};

		const css = ConicGenerator.generate(ir);
		expect(css).toEqual({ ok: true, issues: [], value: "conic-gradient(from 45deg in oklch, red, blue)" });
	});

	it("should generate repeating conic gradient", () => {
		const ir = {
			kind: "conic" as const,
			colorStops: [
				{ color: { kind: "named", name: "red" } as const, position: { value: 0, unit: "deg" as const } },
				{ color: { kind: "named", name: "blue" } as const, position: { value: 45, unit: "deg" as const } },
			],
			repeating: true,
		};

		const css = ConicGenerator.generate(ir);
		expect(css).toEqual({ ok: true, issues: [], value: "repeating-conic-gradient(red 0deg, blue 45deg)" });
	});

	it("should generate complex conic gradient", () => {
		const ir = {
			kind: "conic" as const,
			fromAngle: { value: 90, unit: "deg" as const },
			position: {
				horizontal: { value: 30, unit: "%" as const },
				vertical: { value: 30, unit: "%" as const },
			},
			colorStops: [
				{ color: { kind: "named", name: "red" } as const, position: { value: 0, unit: "deg" as const } },
				{ color: { kind: "named", name: "yellow" } as const, position: { value: 120, unit: "deg" as const } },
				{ color: { kind: "named", name: "blue" } as const, position: { value: 240, unit: "deg" as const } },
			],
			repeating: false,
		};

		const css = ConicGenerator.generate(ir);
		expect(css).toEqual({
			ok: true,
			issues: [],
			value: "conic-gradient(from 90deg at 30% 30%, red 0deg, yellow 120deg, blue 240deg)",
		});
	});

	it("should generate conic gradient with multiple color stops", () => {
		const ir = {
			kind: "conic" as const,
			colorStops: [
				{ color: { kind: "named", name: "red" } as const },
				{ color: { kind: "named", name: "orange" } as const },
				{ color: { kind: "named", name: "yellow" } as const },
				{ color: { kind: "named", name: "green" } as const },
				{ color: { kind: "named", name: "blue" } as const },
			],
			repeating: false,
		};

		const css = ConicGenerator.generate(ir);
		expect(css).toEqual({ ok: true, issues: [], value: "conic-gradient(red, orange, yellow, green, blue)" });
	});

	it("should generate conic gradient with percentage color stop positions", () => {
		const ir = {
			kind: "conic" as const,
			colorStops: [
				{ color: { kind: "named", name: "red" } as const, position: { value: 0, unit: "%" as const } },
				{ color: { kind: "named", name: "blue" } as const, position: { value: 100, unit: "%" as const } },
			],
			repeating: false,
		};

		const css = ConicGenerator.generate(ir);
		expect(css).toEqual({ ok: true, issues: [], value: "conic-gradient(red 0%, blue 100%)" });
	});
});
