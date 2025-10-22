import { describe, expect, it } from "vitest";
import { generate } from "./fill-mode";

describe("generate() - animation-fill-mode", () => {
	it("should generate none", () => {
		const result = generate({
			kind: "animation-fill-mode",
			modes: ["none"],
		});
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("none");
	});

	it("should generate forwards", () => {
		const result = generate({
			kind: "animation-fill-mode",
			modes: ["forwards"],
		});
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("forwards");
	});

	it("should generate backwards", () => {
		const result = generate({
			kind: "animation-fill-mode",
			modes: ["backwards"],
		});
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("backwards");
	});

	it("should generate both", () => {
		const result = generate({
			kind: "animation-fill-mode",
			modes: ["both"],
		});
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("both");
	});

	it("should generate multiple fill modes", () => {
		const result = generate({
			kind: "animation-fill-mode",
			modes: ["none", "forwards", "both"],
		});
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("none, forwards, both");
	});
});
