import { describe, expect, test } from "vitest";
import { generate } from "./margin-right";

describe("margin-right generator", () => {
	test("should generate length in px", () => {
		const result = generate({ kind: "margin-right", value: { value: 15, unit: "px" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("15px");
	});

	test("should generate length in em", () => {
		const result = generate({ kind: "margin-right", value: { value: 1.5, unit: "em" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("1.5em");
	});

	test("should generate percentage", () => {
		const result = generate({ kind: "margin-right", value: { value: 10, unit: "%" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("10%");
	});

	test("should generate 'auto' keyword", () => {
		const result = generate({ kind: "margin-right", value: "auto" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("auto");
	});
});
