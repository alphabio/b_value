import { describe, expect, it } from "vitest";
import { generate } from "./duration";

describe("generate() - animation-duration", () => {
	it("should generate single time duration in seconds", () => {
		const result = generate({
			kind: "animation-duration",
			durations: [{ type: "time", value: 1, unit: "s" }],
		});
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("1s");
	});

	it("should generate single time duration in milliseconds", () => {
		const result = generate({
			kind: "animation-duration",
			durations: [{ type: "time", value: 500, unit: "ms" }],
		});
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("500ms");
	});

	it("should generate auto keyword", () => {
		const result = generate({
			kind: "animation-duration",
			durations: [{ type: "auto" }],
		});
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("auto");
	});

	it("should generate multiple durations", () => {
		const result = generate({
			kind: "animation-duration",
			durations: [{ type: "time", value: 1, unit: "s" }, { type: "time", value: 500, unit: "ms" }, { type: "auto" }],
		});
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("1s, 500ms, auto");
	});

	it("should handle zero duration", () => {
		const result = generate({
			kind: "animation-duration",
			durations: [{ type: "time", value: 0, unit: "s" }],
		});
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("0s");
	});

	it("should handle decimal values", () => {
		const result = generate({
			kind: "animation-duration",
			durations: [{ type: "time", value: 0.5, unit: "s" }],
		});
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("0.5s");
	});
});
