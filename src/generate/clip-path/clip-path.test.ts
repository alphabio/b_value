// b_path:: src/generate/clip-path/clip-path.test.ts

import { describe, expect, test } from "vitest";
import type * as Type from "@/core/types";
import { generate } from "./clip-path";

describe("ClipPath.generate()", () => {
	test("generates none", () => {
		const clipPath: Type.ClipPathValue = { kind: "clip-path-none" };
		const result = generate(clipPath);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("none");
			expect(result.issues).toEqual([]);
		}
	});

	test("generates geometry-box", () => {
		const clipPath: Type.ClipPathValue = {
			kind: "clip-path-geometry-box",
			value: "border-box",
		};
		const result = generate(clipPath);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("border-box");
			expect(result.issues).toEqual([]);
		}
	});

	test("generates circle", () => {
		const clipPath: Type.ClipPathValue = {
			kind: "clip-path-circle",
			radius: { value: 50, unit: "%" },
		};
		const result = generate(clipPath);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("circle(50%)");
			expect(result.issues).toEqual([]);
		}
	});

	test("generates ellipse", () => {
		const clipPath: Type.ClipPathValue = {
			kind: "clip-path-ellipse",
			radiusX: { value: 50, unit: "%" },
			radiusY: { value: 30, unit: "%" },
		};
		const result = generate(clipPath);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("ellipse(50% 30%)");
			expect(result.issues).toEqual([]);
		}
	});

	test("generates inset", () => {
		const clipPath: Type.ClipPathValue = {
			kind: "clip-path-inset",
			top: { value: 10, unit: "px" },
			right: { value: 20, unit: "px" },
			bottom: { value: 10, unit: "px" },
			left: { value: 20, unit: "px" },
		};
		const result = generate(clipPath);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("inset(10px 20px)");
			expect(result.issues).toEqual([]);
		}
	});

	test("generates polygon", () => {
		const clipPath: Type.ClipPathValue = {
			kind: "clip-path-polygon",
			fillRule: "nonzero",
			points: [
				{
					x: { value: 0, unit: "%" },
					y: { value: 0, unit: "%" },
				},
				{
					x: { value: 100, unit: "%" },
					y: { value: 0, unit: "%" },
				},
				{
					x: { value: 50, unit: "%" },
					y: { value: 100, unit: "%" },
				},
			],
		};
		const result = generate(clipPath);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("polygon(nonzero, 0% 0%, 100% 0%, 50% 100%)");
			expect(result.issues).toEqual([]);
		}
	});

	test("generates rect", () => {
		const clipPath: Type.ClipPathValue = {
			kind: "clip-path-rect",
			top: { value: 10, unit: "px" },
			right: { value: 20, unit: "px" },
			bottom: { value: 30, unit: "px" },
			left: { value: 40, unit: "px" },
		};
		const result = generate(clipPath);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("rect(10px 20px 30px 40px)");
			expect(result.issues).toEqual([]);
		}
	});

	test("generates xywh", () => {
		const clipPath: Type.ClipPathValue = {
			kind: "clip-path-xywh",
			x: { value: 10, unit: "px" },
			y: { value: 20, unit: "px" },
			width: { value: 100, unit: "px" },
			height: { value: 50, unit: "px" },
		};
		const result = generate(clipPath);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("xywh(10px 20px 100px 50px)");
			expect(result.issues).toEqual([]);
		}
	});

	test("generates path", () => {
		const clipPath: Type.ClipPathValue = {
			kind: "clip-path-path",
			fillRule: "nonzero",
			pathData: "M 10 10 L 90 90",
		};
		const result = generate(clipPath);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("path(nonzero, 'M 10 10 L 90 90')");
			expect(result.issues).toEqual([]);
		}
	});

	test("generates url", () => {
		const clipPath: Type.ClipPathValue = {
			kind: "url",
			value: "#clip-shape",
		};
		const result = generate(clipPath);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("url(#clip-shape)");
			expect(result.issues).toEqual([]);
		}
	});

	test("returns error for invalid IR (missing kind)", () => {
		const clipPath = {} as Type.ClipPathValue;
		const result = generate(clipPath);
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.issues).toHaveLength(1);
			expect(result.issues[0]?.severity).toBe("error");
			expect(result.issues[0]?.message).toContain("missing 'kind' field");
			expect(result.issues[0]?.suggestion).toBeDefined();
		}
	});

	test("returns error for unknown kind", () => {
		const clipPath = { kind: "unknown" } as unknown as Type.ClipPathValue;
		const result = generate(clipPath);
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.issues).toHaveLength(1);
			expect(result.issues[0]?.severity).toBe("error");
			expect(result.issues[0]?.message).toContain("Unknown clip-path kind");
			expect(result.issues[0]?.suggestion).toBeDefined();
		}
	});
});
