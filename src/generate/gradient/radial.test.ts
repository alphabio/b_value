// b_path:: src/generate/gradient/radial.test.ts

import { describe, expect, test } from "vitest";
import type * as Type from "@/core/types";
import { generate } from "./radial";

describe("generate() for radial gradient", () => {
	test("generates basic radial gradient with shape only", () => {
		const ir: Type.RadialGradient = {
			kind: "radial",
			shape: "circle",
			colorStops: [{ color: { kind: "named", name: "red" } }, { color: { kind: "named", name: "blue" } }],
			repeating: false,
		};
		const result = generate(ir);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toContain("circle");
			expect(result.value).toContain("red");
		}
	});

	test("generates radial gradient with position only (no shape/size)", () => {
		const ir: Type.RadialGradient = {
			kind: "radial",
			position: {
				horizontal: "left",
				vertical: "top",
			},
			colorStops: [{ color: { kind: "named", name: "red" } }, { color: { kind: "named", name: "blue" } }],
			repeating: false,
		};
		const result = generate(ir);
		expect(result.ok).toBe(true);
		if (result.ok) {
			// Lines 182-183: position without shape/size
			expect(result.value).toContain("at left top");
			expect(result.value).not.toContain("circle");
			expect(result.value).not.toContain("ellipse");
		}
	});

	test("generates radial gradient with shape, size and position", () => {
		const ir: Type.RadialGradient = {
			kind: "radial",
			shape: "circle",
			size: { kind: "keyword", value: "closest-side" },
			position: {
				horizontal: { value: 50, unit: "%" },
				vertical: { value: 50, unit: "%" },
			},
			colorStops: [{ color: { kind: "named", name: "red" } }, { color: { kind: "named", name: "blue" } }],
			repeating: false,
		};
		const result = generate(ir);
		expect(result.ok).toBe(true);
		if (result.ok) {
			// Lines 180-181: shape+size with position
			expect(result.value).toContain("circle closest-side at 50% 50%");
		}
	});

	test("generates radial gradient with colorSpace (with existing parts)", () => {
		const ir: Type.RadialGradient = {
			kind: "radial",
			shape: "circle",
			colorSpace: "srgb",
			colorStops: [{ color: { kind: "named", name: "red" } }, { color: { kind: "named", name: "blue" } }],
			repeating: false,
		};
		const result = generate(ir);
		expect(result.ok).toBe(true);
		if (result.ok) {
			// Lines 191-193: colorSpace appended to existing parts
			expect(result.value).toContain("circle in srgb");
		}
	});

	test("generates radial gradient with colorSpace only (no shape/size/position)", () => {
		const ir: Type.RadialGradient = {
			kind: "radial",
			colorSpace: "display-p3",
			colorStops: [{ color: { kind: "named", name: "red" } }, { color: { kind: "named", name: "blue" } }],
			repeating: false,
		};
		const result = generate(ir);
		expect(result.ok).toBe(true);
		if (result.ok) {
			// Lines 195-196: colorSpace as standalone part
			expect(result.value).toContain("in display-p3");
		}
	});

	test("generates repeating radial gradient", () => {
		const ir: Type.RadialGradient = {
			kind: "radial",
			shape: "ellipse",
			colorStops: [{ color: { kind: "named", name: "red" } }, { color: { kind: "named", name: "blue" } }],
			repeating: true,
		};
		const result = generate(ir);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toContain("repeating-radial-gradient");
		}
	});

	test("handles explicit ellipse size", () => {
		const ir: Type.RadialGradient = {
			kind: "radial",
			size: {
				kind: "ellipse-explicit",
				radiusX: { kind: "length", value: 100, unit: "px" },
				radiusY: { kind: "length", value: 50, unit: "px" },
			},
			colorStops: [{ color: { kind: "named", name: "red" } }, { color: { kind: "named", name: "blue" } }],
			repeating: false,
		};
		const result = generate(ir);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toContain("100px 50px");
		}
	});
});
