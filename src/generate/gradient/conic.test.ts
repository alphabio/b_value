// b_path:: src/generate/gradient/conic.test.ts

import { describe, expect, test } from "vitest";
import type * as Type from "@/core/types";
import { generate } from "./conic";

describe("generate() for conic gradient", () => {
	test("generates basic conic gradient", () => {
		const ir: Type.ConicGradient = {
			kind: "conic",
			colorStops: [{ color: { kind: "named", name: "red" } }, { color: { kind: "named", name: "blue" } }],
			repeating: false,
		};
		const result = generate(ir);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toContain("conic-gradient");
			expect(result.value).toContain("red");
		}
	});

	test("generates conic gradient with from angle", () => {
		const ir: Type.ConicGradient = {
			kind: "conic",
			fromAngle: { value: 45, unit: "deg" },
			colorStops: [{ color: { kind: "named", name: "red" } }, { color: { kind: "named", name: "blue" } }],
			repeating: false,
		};
		const result = generate(ir);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toContain("from 45deg");
		}
	});

	test("generates conic gradient with position only (no from angle)", () => {
		const ir: Type.ConicGradient = {
			kind: "conic",
			position: {
				horizontal: "center",
				vertical: "center",
			},
			colorStops: [{ color: { kind: "named", name: "red" } }, { color: { kind: "named", name: "blue" } }],
			repeating: false,
		};
		const result = generate(ir);
		expect(result.ok).toBe(true);
		if (result.ok) {
			// Lines 158-159: position without from angle
			expect(result.value).toContain("at center center");
			expect(result.value).not.toContain("from");
		}
	});

	test("generates conic gradient with from angle and position", () => {
		const ir: Type.ConicGradient = {
			kind: "conic",
			fromAngle: { value: 90, unit: "deg" },
			position: {
				horizontal: { value: 75, unit: "%" },
				vertical: { value: 25, unit: "%" },
			},
			colorStops: [{ color: { kind: "named", name: "red" } }, { color: { kind: "named", name: "blue" } }],
			repeating: false,
		};
		const result = generate(ir);
		expect(result.ok).toBe(true);
		if (result.ok) {
			// Lines 160-161: from angle with position
			expect(result.value).toContain("from 90deg at 75% 25%");
		}
	});

	test("generates conic gradient with colorSpace (no from/position)", () => {
		const ir: Type.ConicGradient = {
			kind: "conic",
			colorSpace: "oklch",
			colorStops: [{ color: { kind: "named", name: "red" } }, { color: { kind: "named", name: "blue" } }],
			repeating: false,
		};
		const result = generate(ir);
		expect(result.ok).toBe(true);
		if (result.ok) {
			// Lines 164-165: colorSpace as standalone part
			expect(result.value).toContain("in oklch");
		}
	});

	test("generates conic gradient with colorSpace (with from/position)", () => {
		const ir: Type.ConicGradient = {
			kind: "conic",
			fromAngle: { value: 0, unit: "deg" },
			colorSpace: "hsl",
			colorStops: [{ color: { kind: "named", name: "red" } }, { color: { kind: "named", name: "blue" } }],
			repeating: false,
		};
		const result = generate(ir);
		expect(result.ok).toBe(true);
		if (result.ok) {
			// Lines 162: colorSpace appended to existing parts
			expect(result.value).toContain("from 0deg in hsl");
		}
	});

	test("generates repeating conic gradient", () => {
		const ir: Type.ConicGradient = {
			kind: "conic",
			colorStops: [{ color: { kind: "named", name: "red" } }, { color: { kind: "named", name: "blue" } }],
			repeating: true,
		};
		const result = generate(ir);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toContain("repeating-conic-gradient");
		}
	});

	test("generates conic gradient with color stops at specific angles", () => {
		const ir: Type.ConicGradient = {
			kind: "conic",
			colorStops: [
				{ color: { kind: "named", name: "red" }, position: { value: 0, unit: "deg" } },
				{ color: { kind: "named", name: "blue" }, position: { value: 180, unit: "deg" } },
			],
			repeating: false,
		};
		const result = generate(ir);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toContain("red 0deg");
			expect(result.value).toContain("blue 180deg");
		}
	});
});
