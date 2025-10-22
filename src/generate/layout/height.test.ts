import { describe, expect, test } from "vitest";
import { generate } from "./height";

describe("height generator", () => {
	test("should generate length in px", () => {
		const result = generate({ kind: "height", value: { value: 300, unit: "px" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("300px");
	});

	test("should generate percentage", () => {
		const result = generate({ kind: "height", value: { value: 100, unit: "%" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("100%");
	});

	test("should generate 'auto' keyword", () => {
		const result = generate({ kind: "height", value: "auto" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("auto");
	});

	test("should generate 'min-content' keyword", () => {
		const result = generate({ kind: "height", value: "min-content" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("min-content");
	});
});
