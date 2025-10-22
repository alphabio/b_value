import { describe, expect, test } from "vitest";
import { generate } from "./width";

describe("width generator", () => {
	test("should generate length in px", () => {
		const result = generate({ kind: "width", value: { value: 200, unit: "px" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("200px");
	});

	test("should generate percentage", () => {
		const result = generate({ kind: "width", value: { value: 50, unit: "%" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("50%");
	});

	test("should generate 'auto' keyword", () => {
		const result = generate({ kind: "width", value: "auto" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("auto");
	});

	test("should generate 'min-content' keyword", () => {
		const result = generate({ kind: "width", value: "min-content" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("min-content");
	});

	test("should generate 'max-content' keyword", () => {
		const result = generate({ kind: "width", value: "max-content" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("max-content");
	});
});
