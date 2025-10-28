// b_path:: src/generate/animation/animation.test.ts
import { describe, expect, test } from "vitest";
import { generate } from "./animation";

describe("animation generator (dispatcher)", () => {
	test("should dispatch animation-delay", () => {
		const result = generate({
			kind: "animation-delay",
			delays: [{ value: 500, unit: "ms" }],
		});
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("500ms");
	});

	test("should dispatch animation-direction", () => {
		const result = generate({
			kind: "animation-direction",
			directions: ["normal"],
		});
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("normal");
	});

	test("should dispatch animation-duration", () => {
		const result = generate({
			kind: "animation-duration",
			durations: [{ type: "time", value: 2, unit: "s" }],
		});
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("2s");
	});

	test("should dispatch animation-fill-mode", () => {
		const result = generate({
			kind: "animation-fill-mode",
			modes: ["forwards"],
		});
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("forwards");
	});

	test("should dispatch animation-iteration-count", () => {
		const result = generate({
			kind: "animation-iteration-count",
			counts: [{ type: "infinite" }],
		});
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("infinite");
	});

	test("should dispatch animation-name", () => {
		const result = generate({
			kind: "animation-name",
			names: [{ type: "identifier", value: "fadeIn" }],
		});
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("fadeIn");
	});

	test("should dispatch animation-play-state", () => {
		const result = generate({
			kind: "animation-play-state",
			states: ["paused"],
		});
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("paused");
	});

	test("should dispatch animation-timing-function", () => {
		const result = generate({
			kind: "animation-timing-function",
			functions: ["ease-in-out"],
		});
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("ease-in-out");
	});

	test("should error on missing kind", () => {
		// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
		const result = generate({} as any);
		expect(result.ok).toBe(false);
		if (!result.ok) expect(result.issues?.[0]?.message).toContain("missing 'kind' field");
	});

	test("should error on invalid kind", () => {
		// biome-ignore lint/suspicious/noExplicitAny: Testing invalid input
		const result = generate({ kind: "animation-invalid" } as any);
		expect(result.ok).toBe(false);
		if (!result.ok) expect(result.issues?.[0]?.message).toContain("Unknown animation kind");
	});
});
