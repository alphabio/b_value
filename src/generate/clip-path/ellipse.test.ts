// b_path:: src/generate/clip-path/ellipse.test.ts
import { describe, expect, it } from "vitest";
import { generate } from "./ellipse";

describe("generate ellipse clip-path", () => {
	it("generates basic ellipse", () => {
		const result = generate({ kind: "clip-path-ellipse" });
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("ellipse()");
		}
	});

	it("generates ellipse with radiusX", () => {
		const result = generate({
			kind: "clip-path-ellipse",
			radiusX: { value: 50, unit: "px" },
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("ellipse(50px)");
		}
	});

	it("generates ellipse with both radii", () => {
		const result = generate({
			kind: "clip-path-ellipse",
			radiusX: { value: 50, unit: "px" },
			radiusY: { value: 100, unit: "px" },
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("ellipse(50px 100px)");
		}
	});

	it("generates ellipse with keyword radii", () => {
		const result = generate({
			kind: "clip-path-ellipse",
			radiusX: "closest-side",
			radiusY: "farthest-side",
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("ellipse(closest-side farthest-side)");
		}
	});

	it("generates ellipse with percentage radii", () => {
		const result = generate({
			kind: "clip-path-ellipse",
			radiusX: { value: 50, unit: "%" },
			radiusY: { value: 75, unit: "%" },
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("ellipse(50% 75%)");
		}
	});

	it("generates ellipse with position", () => {
		const result = generate({
			kind: "clip-path-ellipse",
			radiusX: { value: 50, unit: "px" },
			position: { horizontal: "center", vertical: "center" },
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("ellipse(50px at center center)");
		}
	});

	it("rejects null input", () => {
		// biome-ignore lint/suspicious/noExplicitAny: testing invalid input
		const result = generate(null as any);
		expect(result.ok).toBe(false);
	});

	it("rejects undefined input", () => {
		// biome-ignore lint/suspicious/noExplicitAny: testing invalid input
		const result = generate(undefined as any);
		expect(result.ok).toBe(false);
	});
});
