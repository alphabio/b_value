// b_path:: src/generate/outline/offset.test.ts
import { describe, expect, it } from "vitest";
import { generate } from "./offset.js";

describe("generate/outline/offset", () => {
	it("generates pixel value", () => {
		const result = generate({ kind: "outline-offset", offset: { value: 4, unit: "px" } });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("4px");
	});

	it("generates rem value", () => {
		const result = generate({ kind: "outline-offset", offset: { value: 0.5, unit: "rem" } });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("0.5rem");
	});

	it("generates negative value", () => {
		const result = generate({ kind: "outline-offset", offset: { value: -2, unit: "px" } });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("-2px");
	});

	it("generates zero", () => {
		const result = generate({ kind: "outline-offset", offset: { value: 0, unit: "px" } });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("0px");
	});
});
