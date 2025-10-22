import { describe, expect, test } from "vitest";
import { generate } from "./max-height";

describe("max-height generator", () => {
	test("should generate length in px", () => {
		const result = generate({ kind: "max-height", value: { value: 600, unit: "px" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("600px");
	});

	test("should generate percentage", () => {
		const result = generate({ kind: "max-height", value: { value: 80, unit: "%" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("80%");
	});

	test("should generate 'none' keyword", () => {
		const result = generate({ kind: "max-height", value: "none" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("none");
	});
});
