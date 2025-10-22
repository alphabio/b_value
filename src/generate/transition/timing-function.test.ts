import { describe, expect, it } from "vitest";
import { generate } from "./timing-function.js";

describe("generate/transition/timing-function", () => {
	it("generates ease", () => {
		const result = generate({ kind: "transition-timing-function", functions: ["ease"] });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("ease");
	});

	it("generates linear", () => {
		const result = generate({ kind: "transition-timing-function", functions: ["linear"] });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("linear");
	});

	it("generates ease-in", () => {
		const result = generate({ kind: "transition-timing-function", functions: ["ease-in"] });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("ease-in");
	});

	it("generates ease-out", () => {
		const result = generate({ kind: "transition-timing-function", functions: ["ease-out"] });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("ease-out");
	});

	it("generates ease-in-out", () => {
		const result = generate({ kind: "transition-timing-function", functions: ["ease-in-out"] });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("ease-in-out");
	});

	it("generates cubic-bezier", () => {
		const result = generate({
			kind: "transition-timing-function",
			functions: [{ type: "cubic-bezier", x1: 0.4, y1: 0, x2: 0.2, y2: 1 }],
		});
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("cubic-bezier(0.4, 0, 0.2, 1)");
	});
});
