import { describe, expect, it } from "vitest";
import type * as Type from "@/core/types";
import { generate } from "./circle";

describe("generate circle()", () => {
	it("generates minimal circle", () => {
		const circle: Type.ClipPathCircle = { kind: "clip-path-circle" };
		const result = generate(circle);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("circle()");
		}
	});

	it("generates circle with radius", () => {
		const circle: Type.ClipPathCircle = {
			kind: "clip-path-circle",
			radius: { value: 50, unit: "px" },
		};
		const result = generate(circle);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("circle(50px)");
		}
	});

	it("generates circle with percentage radius", () => {
		const circle: Type.ClipPathCircle = {
			kind: "clip-path-circle",
			radius: { value: 50, unit: "%" },
		};
		const result = generate(circle);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("circle(50%)");
		}
	});

	it("generates circle with keyword radius", () => {
		const circle: Type.ClipPathCircle = {
			kind: "clip-path-circle",
			radius: "closest-side",
		};
		const result = generate(circle);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("circle(closest-side)");
		}
	});

	it("generates circle with farthest-side radius", () => {
		const circle: Type.ClipPathCircle = {
			kind: "clip-path-circle",
			radius: "farthest-side",
		};
		const result = generate(circle);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("circle(farthest-side)");
		}
	});

	it("generates circle with position", () => {
		const circle: Type.ClipPathCircle = {
			kind: "clip-path-circle",
			radius: { value: 50, unit: "px" },
			position: { horizontal: "center", vertical: "center" },
		};
		const result = generate(circle);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("circle(50px at center center)");
		}
	});

	it("generates circle with custom position", () => {
		const circle: Type.ClipPathCircle = {
			kind: "clip-path-circle",
			radius: { value: 40, unit: "%" },
			position: {
				horizontal: { value: 30, unit: "%" },
				vertical: { value: 70, unit: "%" },
			},
		};
		const result = generate(circle);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("circle(40% at 30% 70%)");
		}
	});

	it("generates circle with only position (no radius)", () => {
		const circle: Type.ClipPathCircle = {
			kind: "clip-path-circle",
			position: { horizontal: "left", vertical: "top" },
		};
		const result = generate(circle);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("circle(at left top)");
		}
	});

	it("generates circle with position using length values", () => {
		const circle: Type.ClipPathCircle = {
			kind: "clip-path-circle",
			radius: { value: 100, unit: "px" },
			position: {
				horizontal: { value: 20, unit: "px" },
				vertical: { value: 50, unit: "px" },
			},
		};
		const result = generate(circle);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("circle(100px at 20px 50px)");
		}
	});

	it("returns error for null input", () => {
		// biome-ignore lint/suspicious/noExplicitAny: Testing error handling
		const result = generate(null as any);
		expect(result.ok).toBe(false);
	});

	it("returns error for undefined input", () => {
		// biome-ignore lint/suspicious/noExplicitAny: Testing error handling
		const result = generate(undefined as any);
		expect(result.ok).toBe(false);
	});
});
