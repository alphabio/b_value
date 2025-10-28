// b_path:: src/generate/interaction/pointer-events.test.ts
import { describe, expect, test } from "vitest";
import { generate } from "./pointer-events";

describe("pointer-events generator", () => {
	test("should generate 'none'", () => {
		const result = generate({ kind: "pointer-events", value: "none" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("none");
	});

	test("should generate 'auto'", () => {
		const result = generate({ kind: "pointer-events", value: "auto" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("auto");
	});

	test("should generate 'visiblePainted'", () => {
		const result = generate({ kind: "pointer-events", value: "visiblePainted" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("visiblePainted");
	});

	test("should generate 'visibleFill'", () => {
		const result = generate({ kind: "pointer-events", value: "visibleFill" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("visibleFill");
	});
});
