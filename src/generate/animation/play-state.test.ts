import { describe, expect, it } from "vitest";
import { generate } from "./play-state";

describe("generate() - animation-play-state", () => {
	it("should generate running", () => {
		const result = generate({
			kind: "animation-play-state",
			states: ["running"],
		});
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("running");
	});

	it("should generate paused", () => {
		const result = generate({
			kind: "animation-play-state",
			states: ["paused"],
		});
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("paused");
	});

	it("should generate multiple play states", () => {
		const result = generate({
			kind: "animation-play-state",
			states: ["running", "paused", "running"],
		});
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("running, paused, running");
	});
});
