// b_path:: src/generate/clip-path/path.test.ts

import { describe, expect, it } from "vitest";
import { generate } from "./path";

describe("generate path", () => {
	it("generates simple path", () => {
		const result = generate({
			kind: "clip-path-path",
			pathData: "M 10,10 L 90,10 L 50,90 Z",
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("path('M 10,10 L 90,10 L 50,90 Z')");
		}
	});

	it("generates path with fill-rule", () => {
		const result = generate({
			kind: "clip-path-path",
			fillRule: "evenodd",
			pathData: "M 10,10 L 90,10 Z",
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("path(evenodd, 'M 10,10 L 90,10 Z')");
		}
	});

	it("generates path with nonzero fill-rule", () => {
		const result = generate({
			kind: "clip-path-path",
			fillRule: "nonzero",
			pathData: "M 0,0 L 100,100",
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("path(nonzero, 'M 0,0 L 100,100')");
		}
	});

	it("escapes single quotes in path data", () => {
		const result = generate({
			kind: "clip-path-path",
			pathData: "M 0,0 L 10,'10'",
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("path('M 0,0 L 10,\\'10\\'')");
		}
	});

	it("handles complex path data", () => {
		const result = generate({
			kind: "clip-path-path",
			pathData: "M 0,0 C 10,20 30,40 50,50 Z",
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toContain("M 0,0 C 10,20 30,40 50,50 Z");
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
