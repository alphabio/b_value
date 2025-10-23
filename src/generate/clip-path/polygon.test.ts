// b_path:: src/generate/clip-path/polygon.test.ts

import { describe, expect, it } from "vitest";
import { generate } from "./polygon";

describe("generate polygon", () => {
	it("generates simple triangle", () => {
		const result = generate({
			kind: "clip-path-polygon",
			points: [
				{ x: { value: 50, unit: "%" }, y: { value: 0, unit: "%" } },
				{ x: { value: 100, unit: "%" }, y: { value: 50, unit: "%" } },
				{ x: { value: 50, unit: "%" }, y: { value: 100, unit: "%" } },
			],
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("polygon(50% 0%, 100% 50%, 50% 100%)");
		}
	});

	it("generates polygon with fill-rule", () => {
		const result = generate({
			kind: "clip-path-polygon",
			fillRule: "nonzero",
			points: [
				{ x: { value: 50, unit: "%" }, y: { value: 0, unit: "%" } },
				{ x: { value: 100, unit: "%" }, y: { value: 100, unit: "%" } },
			],
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("polygon(nonzero, 50% 0%, 100% 100%)");
		}
	});

	it("generates polygon with evenodd fill-rule", () => {
		const result = generate({
			kind: "clip-path-polygon",
			fillRule: "evenodd",
			points: [
				{ x: { value: 0, unit: "%" }, y: { value: 0, unit: "%" } },
				{ x: { value: 100, unit: "%" }, y: { value: 0, unit: "%" } },
			],
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toContain("evenodd");
		}
	});

	it("generates polygon with px units", () => {
		const result = generate({
			kind: "clip-path-polygon",
			points: [
				{ x: { value: 10, unit: "px" }, y: { value: 20, unit: "px" } },
				{ x: { value: 30, unit: "px" }, y: { value: 40, unit: "px" } },
			],
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("polygon(10px 20px, 30px 40px)");
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
