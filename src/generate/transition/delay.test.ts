import { describe, expect, it } from "vitest";
import { generate } from "./delay.js";

describe("generate/transition/delay", () => {
	it("generates seconds", () => {
		const result = generate({ kind: "transition-delay", delays: [{ value: 0.1, unit: "s" }] });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("0.1s");
	});

	it("generates milliseconds", () => {
		const result = generate({ kind: "transition-delay", delays: [{ value: 100, unit: "ms" }] });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("100ms");
	});

	it("generates zero", () => {
		const result = generate({ kind: "transition-delay", delays: [{ value: 0, unit: "s" }] });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("0s");
	});

	it("generates multiple values", () => {
		const result = generate({
			kind: "transition-delay",
			delays: [
				{ value: 0.1, unit: "s" },
				{ value: 0.2, unit: "s" },
			],
		});
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("0.1s, 0.2s");
	});
});
