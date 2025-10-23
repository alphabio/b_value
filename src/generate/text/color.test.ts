import { describe, expect, test } from "vitest";
import { generate } from "./color";

describe("text-decoration-color generator", () => {
	test("should generate RGB color", () => {
		const result = generate({ kind: "rgb", r: 255, g: 0, b: 0 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("rgb(255 0 0)");
	});

	test("should generate hex color", () => {
		const result = generate({ kind: "hex", value: "#ff0000" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("#ff0000");
	});

	test("should generate named color", () => {
		const result = generate({ kind: "named", name: "red" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("red");
	});

	test("should generate currentColor", () => {
		const result = generate({ kind: "special", keyword: "currentcolor" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("currentcolor");
	});

	test("should error on null", () => {
		// biome-ignore lint/suspicious/noExplicitAny: Testing error handling
		const result = generate(null as any);
		expect(result.ok).toBe(false);
	});

	test("should error on undefined", () => {
		// biome-ignore lint/suspicious/noExplicitAny: Testing error handling
		const result = generate(undefined as any);
		expect(result.ok).toBe(false);
	});
});
