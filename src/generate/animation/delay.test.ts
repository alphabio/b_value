import { describe, expect, it } from "vitest";
import { generate } from "./delay";

describe("generate() - animation-delay", () => {
	it("should generate single delay", () => {
		const result = generate({
			kind: "animation-delay",
			delays: [{ value: 1, unit: "s" }],
		});
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("1s");
	});

	it("should generate multiple delays", () => {
		const result = generate({
			kind: "animation-delay",
			delays: [
				{ value: 1, unit: "s" },
				{ value: 500, unit: "ms" },
				{ value: 2, unit: "s" },
			],
		});
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("1s, 500ms, 2s");
	});

	it("should handle zero delay", () => {
		const result = generate({
			kind: "animation-delay",
			delays: [{ value: 0, unit: "s" }],
		});
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("0s");
	});

	it("should handle negative delays", () => {
		const result = generate({
			kind: "animation-delay",
			delays: [{ value: -1, unit: "s" }],
		});
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("-1s");
	});

	it("should handle milliseconds", () => {
		const result = generate({
			kind: "animation-delay",
			delays: [{ value: 250, unit: "ms" }],
		});
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("250ms");
	});
});
