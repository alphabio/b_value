// b_path:: src/generate/layout/margin-top.test.ts
import { describe, expect, test } from "vitest";
import { generate } from "./margin-top";

describe("margin-top generator", () => {
	test("should generate length in px", () => {
		const result = generate({ kind: "margin-top", value: { value: 10, unit: "px" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("10px");
	});

	test("should generate length in rem", () => {
		const result = generate({ kind: "margin-top", value: { value: 2, unit: "rem" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("2rem");
	});

	test("should generate percentage", () => {
		const result = generate({ kind: "margin-top", value: { value: 5, unit: "%" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("5%");
	});

	test("should generate 'auto' keyword", () => {
		const result = generate({ kind: "margin-top", value: "auto" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("auto");
	});
});
