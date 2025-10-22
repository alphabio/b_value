import { describe, expect, it } from "vitest";
import { generate } from "./duration.js";

describe("generate/transition/duration", () => {
	it("generates seconds", () => {
		const result = generate({ kind: "transition-duration", durations: [{ value: 0.3, unit: "s" }] });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("0.3s");
	});

	it("generates milliseconds", () => {
		const result = generate({ kind: "transition-duration", durations: [{ value: 300, unit: "ms" }] });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("300ms");
	});

	it("generates zero seconds", () => {
		const result = generate({ kind: "transition-duration", durations: [{ value: 0, unit: "s" }] });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("0s");
	});

	it("generates multiple values", () => {
		const result = generate({
			kind: "transition-duration",
			durations: [
				{ value: 0.3, unit: "s" },
				{ value: 0.5, unit: "s" },
			],
		});
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("0.3s, 0.5s");
	});
});
