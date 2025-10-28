// b_path:: src/generate/layout/overflow-x.test.ts
import { describe, expect, test } from "vitest";
import { generate } from "./overflow-x";

describe("overflow-x generator", () => {
	test("should generate 'visible'", () => {
		const result = generate({ kind: "overflow-x", value: "visible" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("visible");
	});

	test("should generate 'hidden'", () => {
		const result = generate({ kind: "overflow-x", value: "hidden" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("hidden");
	});

	test("should generate 'scroll'", () => {
		const result = generate({ kind: "overflow-x", value: "scroll" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("scroll");
	});

	test("should generate 'auto'", () => {
		const result = generate({ kind: "overflow-x", value: "auto" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("auto");
	});
});
