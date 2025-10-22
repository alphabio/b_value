import { describe, expect, test } from "vitest";
import { generate } from "./hex";

describe("hex color generator", () => {
	test("should generate 6-digit hex color", () => {
		const result = generate({ kind: "hex", value: "#FF5733" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("#FF5733");
	});

	test("should generate 8-digit hex color with alpha", () => {
		const result = generate({ kind: "hex", value: "#FF573380" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("#FF573380");
	});

	test("should generate 3-digit shorthand hex", () => {
		const result = generate({ kind: "hex", value: "#F00" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("#F00");
	});

	test("should generate black color", () => {
		const result = generate({ kind: "hex", value: "#000000" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("#000000");
	});
});
