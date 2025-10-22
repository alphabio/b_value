import { describe, expect, test } from "vitest";
import { generate } from "./timing-function";

describe("animation-timing-function generator", () => {
	test("should generate 'ease' keyword", () => {
		const result = generate({
			kind: "animation-timing-function",
			functions: ["ease"],
		});
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("ease");
	});

	test("should generate 'ease-in-out' keyword", () => {
		const result = generate({
			kind: "animation-timing-function",
			functions: ["ease-in-out"],
		});
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("ease-in-out");
	});

	test("should generate 'linear' keyword", () => {
		const result = generate({
			kind: "animation-timing-function",
			functions: ["linear"],
		});
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("linear");
	});

	test("should generate cubic-bezier function", () => {
		const result = generate({
			kind: "animation-timing-function",
			functions: [{ type: "cubic-bezier", x1: 0.1, y1: 0.7, x2: 1.0, y2: 0.1 }],
		});
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("cubic-bezier(0.1, 0.7, 1, 0.1)");
	});

	test("should generate steps function with position", () => {
		const result = generate({
			kind: "animation-timing-function",
			functions: [{ type: "steps", steps: 4, position: "jump-end" }],
		});
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("steps(4, jump-end)");
	});

	test("should generate steps function without position", () => {
		const result = generate({
			kind: "animation-timing-function",
			functions: [{ type: "steps", steps: 10 }],
		});
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("steps(10)");
	});

	test("should generate multiple timing functions", () => {
		const result = generate({
			kind: "animation-timing-function",
			functions: ["ease-in", "linear"],
		});
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("ease-in, linear");
	});
});
