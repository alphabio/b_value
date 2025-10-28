// b_path:: src/generate/outline/color.test.ts
import { describe, expect, it } from "vitest";
import { generate } from "./color.js";

describe("generate/outline/color", () => {
	it("generates hex color", () => {
		const result = generate({ kind: "outline-color", color: "#ff0000" });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("#ff0000");
	});

	it("generates named color", () => {
		const result = generate({ kind: "outline-color", color: "blue" });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("blue");
	});

	it("generates rgb", () => {
		const result = generate({ kind: "outline-color", color: "rgb(255, 0, 0)" });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("rgb(255, 0, 0)");
	});

	it("generates rgba", () => {
		const result = generate({ kind: "outline-color", color: "rgba(255, 0, 0, 0.5)" });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("rgba(255, 0, 0, 0.5)");
	});
});
