// b_path:: src/generate/layout/z-index.test.ts
import { describe, expect, test } from "vitest";
import { generate } from "./z-index";

describe("z-index generator", () => {
	test("should generate positive integer", () => {
		const result = generate({ kind: "z-index", value: 10 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("10");
	});

	test("should generate zero", () => {
		const result = generate({ kind: "z-index", value: 0 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("0");
	});

	test("should generate negative integer", () => {
		const result = generate({ kind: "z-index", value: -5 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("-5");
	});

	test("should generate 'auto'", () => {
		const result = generate({ kind: "z-index", value: "auto" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("auto");
	});
});
