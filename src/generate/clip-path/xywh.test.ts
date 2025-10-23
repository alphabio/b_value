// b_path:: src/generate/clip-path/xywh.test.ts

import { describe, expect, it } from "vitest";
import { generate } from "./xywh";

describe("generate xywh", () => {
	it("generates simple xywh", () => {
		const result = generate({
			kind: "clip-path-xywh",
			x: { value: 10, unit: "px" },
			y: { value: 20, unit: "px" },
			width: { value: 100, unit: "px" },
			height: { value: 50, unit: "px" },
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("xywh(10px 20px 100px 50px)");
		}
	});

	it("generates xywh with percentages", () => {
		const result = generate({
			kind: "clip-path-xywh",
			x: { value: 10, unit: "%" },
			y: { value: 20, unit: "%" },
			width: { value: 50, unit: "%" },
			height: { value: 30, unit: "%" },
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("xywh(10% 20% 50% 30%)");
		}
	});

	it("generates xywh with border-radius", () => {
		const result = generate({
			kind: "clip-path-xywh",
			x: { value: 0, unit: "px" },
			y: { value: 0, unit: "px" },
			width: { value: 100, unit: "px" },
			height: { value: 100, unit: "px" },
			borderRadius: {
				topLeft: { value: 10, unit: "px" },
				topRight: { value: 10, unit: "px" },
				bottomRight: { value: 10, unit: "px" },
				bottomLeft: { value: 10, unit: "px" },
			},
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toContain("round");
		}
	});

	it("generates xywh with zero values", () => {
		const result = generate({
			kind: "clip-path-xywh",
			x: { value: 0, unit: "px" },
			y: { value: 0, unit: "px" },
			width: { value: 0, unit: "px" },
			height: { value: 0, unit: "px" },
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("xywh(0px 0px 0px 0px)");
		}
	});

	it("handles null input", () => {
		// biome-ignore lint/suspicious/noExplicitAny: Testing error handling
		const result = generate(null as any);
		expect(result.ok).toBe(false);
	});

	it("handles undefined input", () => {
		// biome-ignore lint/suspicious/noExplicitAny: Testing error handling
		const result = generate(undefined as any);
		expect(result.ok).toBe(false);
	});
});
