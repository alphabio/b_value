// b_path:: src/generate/clip-path/rect.test.ts

import { describe, expect, it } from "vitest";
import { generate } from "./rect";

describe("generate rect", () => {
	it("generates rect with all pixel values", () => {
		const result = generate({
			kind: "clip-path-rect",
			top: { value: 10, unit: "px" },
			right: { value: 90, unit: "px" },
			bottom: { value: 80, unit: "px" },
			left: { value: 20, unit: "px" },
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("rect(10px 90px 80px 20px)");
		}
	});

	it("generates rect with auto values", () => {
		const result = generate({
			kind: "clip-path-rect",
			top: { value: 10, unit: "px" },
			right: "auto",
			bottom: { value: 20, unit: "px" },
			left: "auto",
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("rect(10px auto 20px auto)");
		}
	});

	it("generates rect with all auto", () => {
		const result = generate({
			kind: "clip-path-rect",
			top: "auto",
			right: "auto",
			bottom: "auto",
			left: "auto",
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("rect(auto auto auto auto)");
		}
	});

	it("generates rect with percentages", () => {
		const result = generate({
			kind: "clip-path-rect",
			top: { value: 10, unit: "%" },
			right: { value: 90, unit: "%" },
			bottom: { value: 80, unit: "%" },
			left: { value: 20, unit: "%" },
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("rect(10% 90% 80% 20%)");
		}
	});

	it("generates rect with border-radius", () => {
		const result = generate({
			kind: "clip-path-rect",
			top: { value: 0, unit: "px" },
			right: { value: 100, unit: "px" },
			bottom: { value: 100, unit: "px" },
			left: { value: 0, unit: "px" },
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
