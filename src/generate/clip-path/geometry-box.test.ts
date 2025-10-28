// b_path:: src/generate/clip-path/geometry-box.test.ts
import { describe, expect, it } from "vitest";
import { generate } from "./geometry-box";

describe("generate clip-path geometry-box", () => {
	it("generates 'content-box'", () => {
		const result = generate({ kind: "clip-path-geometry-box", value: "content-box" });
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("content-box");
		}
	});

	it("generates 'padding-box'", () => {
		const result = generate({ kind: "clip-path-geometry-box", value: "padding-box" });
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("padding-box");
		}
	});

	it("generates 'border-box'", () => {
		const result = generate({ kind: "clip-path-geometry-box", value: "border-box" });
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("border-box");
		}
	});

	it("generates 'margin-box'", () => {
		const result = generate({ kind: "clip-path-geometry-box", value: "margin-box" });
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("margin-box");
		}
	});

	it("generates 'fill-box'", () => {
		const result = generate({ kind: "clip-path-geometry-box", value: "fill-box" });
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("fill-box");
		}
	});

	it("generates 'stroke-box'", () => {
		const result = generate({ kind: "clip-path-geometry-box", value: "stroke-box" });
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("stroke-box");
		}
	});

	it("generates 'view-box'", () => {
		const result = generate({ kind: "clip-path-geometry-box", value: "view-box" });
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("view-box");
		}
	});

	it("rejects null", () => {
		// biome-ignore lint/suspicious/noExplicitAny: Testing error handling
		const result = generate(null as any);
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.issues.length).toBeGreaterThan(0);
		}
	});

	it("rejects undefined", () => {
		// biome-ignore lint/suspicious/noExplicitAny: Testing error handling
		const result = generate(undefined as any);
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.issues.length).toBeGreaterThan(0);
		}
	});
});
