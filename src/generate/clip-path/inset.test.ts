// b_path:: src/generate/clip-path/inset.test.ts
import { describe, expect, it } from "vitest";
import type * as Type from "@/core/types";
import { generate } from "./inset";

describe("generate inset()", () => {
	it("generates inset with all equal values (optimized to 1 value)", () => {
		const inset: Type.ClipPathInset = {
			kind: "clip-path-inset",
			top: { value: 10, unit: "px" },
			right: { value: 10, unit: "px" },
			bottom: { value: 10, unit: "px" },
			left: { value: 10, unit: "px" },
		};
		const result = generate(inset);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("inset(10px)");
		}
	});

	it("generates inset with vertical/horizontal pairs (optimized to 2 values)", () => {
		const inset: Type.ClipPathInset = {
			kind: "clip-path-inset",
			top: { value: 10, unit: "px" },
			right: { value: 20, unit: "px" },
			bottom: { value: 10, unit: "px" },
			left: { value: 20, unit: "px" },
		};
		const result = generate(inset);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("inset(10px 20px)");
		}
	});

	it("generates inset with left/right same (optimized to 3 values)", () => {
		const inset: Type.ClipPathInset = {
			kind: "clip-path-inset",
			top: { value: 10, unit: "px" },
			right: { value: 20, unit: "px" },
			bottom: { value: 30, unit: "px" },
			left: { value: 20, unit: "px" },
		};
		const result = generate(inset);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("inset(10px 20px 30px)");
		}
	});

	it("generates inset with all different values (4 values)", () => {
		const inset: Type.ClipPathInset = {
			kind: "clip-path-inset",
			top: { value: 10, unit: "px" },
			right: { value: 20, unit: "px" },
			bottom: { value: 30, unit: "px" },
			left: { value: 40, unit: "px" },
		};
		const result = generate(inset);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("inset(10px 20px 30px 40px)");
		}
	});

	it("generates inset with percentage values", () => {
		const inset: Type.ClipPathInset = {
			kind: "clip-path-inset",
			top: { value: 10, unit: "%" },
			right: { value: 20, unit: "%" },
			bottom: { value: 30, unit: "%" },
			left: { value: 40, unit: "%" },
		};
		const result = generate(inset);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("inset(10% 20% 30% 40%)");
		}
	});

	it("generates inset with mixed units", () => {
		const inset: Type.ClipPathInset = {
			kind: "clip-path-inset",
			top: { value: 10, unit: "px" },
			right: { value: 5, unit: "%" },
			bottom: { value: 2, unit: "em" },
			left: { value: 1, unit: "rem" },
		};
		const result = generate(inset);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("inset(10px 5% 2em 1rem)");
		}
	});

	it("generates inset with border-radius", () => {
		const inset: Type.ClipPathInset = {
			kind: "clip-path-inset",
			top: { value: 10, unit: "px" },
			right: { value: 10, unit: "px" },
			bottom: { value: 10, unit: "px" },
			left: { value: 10, unit: "px" },
			borderRadius: {
				topLeft: { value: 5, unit: "px" },
				topRight: { value: 5, unit: "px" },
				bottomRight: { value: 5, unit: "px" },
				bottomLeft: { value: 5, unit: "px" },
			},
		};
		const result = generate(inset);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("inset(10px round 5px)");
		}
	});

	it("generates inset with complex border-radius", () => {
		const inset: Type.ClipPathInset = {
			kind: "clip-path-inset",
			top: { value: 10, unit: "px" },
			right: { value: 20, unit: "px" },
			bottom: { value: 10, unit: "px" },
			left: { value: 20, unit: "px" },
			borderRadius: {
				topLeft: { value: 5, unit: "px" },
				topRight: { value: 10, unit: "px" },
				bottomRight: { value: 15, unit: "px" },
				bottomLeft: { value: 20, unit: "px" },
			},
		};
		const result = generate(inset);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("inset(10px 20px round 5px 10px 15px 20px)");
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
