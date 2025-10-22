import { describe, expect, test } from "vitest";
import { generate } from "./width";

describe("border-width generator", () => {
	test("should generate length in px", () => {
		const result = generate({ kind: "border-width", width: { value: 1, unit: "px" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("1px");
	});

	test("should generate length in em", () => {
		const result = generate({ kind: "border-width", width: { value: 0.1, unit: "em" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("0.1em");
	});

	test("should generate 'thin' keyword", () => {
		const result = generate({ kind: "border-width", width: "thin" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("thin");
	});

	test("should generate 'medium' keyword", () => {
		const result = generate({ kind: "border-width", width: "medium" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("medium");
	});

	test("should generate 'thick' keyword", () => {
		const result = generate({ kind: "border-width", width: "thick" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("thick");
	});
});
