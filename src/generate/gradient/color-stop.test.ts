// b_path:: src/generate/gradient/color-stop.test.ts

import { describe, expect, it } from "vitest";
import { generate } from "./color-stop";

describe("generate color-stop", () => {
	it("generates color without position", () => {
		const result = generate({
			color: { kind: "named", name: "red" },
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("red");
		}
	});

	it("generates color with position", () => {
		const result = generate({
			color: { kind: "named", name: "blue" },
			position: { value: 50, unit: "%" },
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("blue 50%");
		}
	});

	it("generates rgb color with position", () => {
		const result = generate({
			color: { kind: "rgb", r: 255, g: 0, b: 0 },
			position: { value: 100, unit: "px" },
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("rgb(255 0 0) 100px");
		}
	});

	it("generates rgba color with alpha", () => {
		const result = generate({
			color: { kind: "rgb", r: 255, g: 0, b: 0, alpha: 0.5 },
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("rgb(255 0 0 / 0.5)");
		}
	});

	it("generates color at 0%", () => {
		const result = generate({
			color: { kind: "named", name: "black" },
			position: { value: 0, unit: "%" },
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("black 0%");
		}
	});

	it("generates color at 100%", () => {
		const result = generate({
			color: { kind: "named", name: "white" },
			position: { value: 100, unit: "%" },
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("white 100%");
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
