// b_path:: src/generate/gradient/gradient.test.ts

import { describe, expect, test } from "vitest";
import type * as Type from "@/core/types";
import { generate } from "./gradient";

describe("Gradient.generate()", () => {
	test("generates linear gradient", () => {
		const gradient: Type.Gradient = {
			kind: "linear",
			direction: { kind: "to-side", value: "bottom" },
			colorStops: [{ color: { kind: "named", name: "red" } }, { color: { kind: "named", name: "blue" } }],
			repeating: false,
		};
		const result = generate(gradient);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toContain("linear-gradient");
			expect(result.issues).toEqual([]);
		}
	});

	test("generates radial gradient", () => {
		const gradient: Type.Gradient = {
			kind: "radial",
			shape: "circle",
			colorStops: [{ color: { kind: "named", name: "red" } }, { color: { kind: "named", name: "blue" } }],
			repeating: false,
		};
		const result = generate(gradient);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toContain("radial-gradient");
			expect(result.issues).toEqual([]);
		}
	});

	test("generates conic gradient", () => {
		const gradient: Type.Gradient = {
			kind: "conic",
			colorStops: [{ color: { kind: "named", name: "red" } }, { color: { kind: "named", name: "blue" } }],
			repeating: false,
		};
		const result = generate(gradient);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toContain("conic-gradient");
			expect(result.issues).toEqual([]);
		}
	});

	test("returns error for invalid IR (missing kind)", () => {
		const gradient = {} as Type.Gradient;
		const result = generate(gradient);
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.issues).toHaveLength(1);
			expect(result.issues[0]?.severity).toBe("error");
			expect(result.issues[0]?.message).toContain("missing 'kind' field");
			expect(result.issues[0]?.suggestion).toBeDefined();
		}
	});

	test("returns error for unknown kind", () => {
		const gradient = { kind: "unknown" } as unknown as Type.Gradient;
		const result = generate(gradient);
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.issues).toHaveLength(1);
			expect(result.issues[0]?.severity).toBe("error");
			expect(result.issues[0]?.message).toContain("Unknown gradient kind");
			expect(result.issues[0]?.suggestion).toBeDefined();
		}
	});
});
