// b_path:: src/generate/layout/margin-left.test.ts
import { describe, expect, test } from "vitest";
import { generate } from "./margin-left";

describe("margin-left generator", () => {
	test("should generate length in px", () => {
		const result = generate({ kind: "margin-left", value: { value: 25, unit: "px" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("25px");
	});

	test("should generate length in vw", () => {
		const result = generate({ kind: "margin-left", value: { value: 5, unit: "vw" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("5vw");
	});

	test("should generate percentage", () => {
		const result = generate({ kind: "margin-left", value: { value: 12, unit: "%" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("12%");
	});

	test("should generate 'auto' keyword", () => {
		const result = generate({ kind: "margin-left", value: "auto" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("auto");
	});
});
