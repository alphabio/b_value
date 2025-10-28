// b_path:: src/generate/outline/width.test.ts
import { describe, expect, it } from "vitest";
import { generate } from "./width.js";

describe("generate/outline/width", () => {
	it("generates pixel value", () => {
		const result = generate({ kind: "outline-width", width: { value: 2, unit: "px" } });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("2px");
	});

	it("generates thin", () => {
		const result = generate({ kind: "outline-width", width: "thin" });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("thin");
	});

	it("generates medium", () => {
		const result = generate({ kind: "outline-width", width: "medium" });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("medium");
	});

	it("generates thick", () => {
		const result = generate({ kind: "outline-width", width: "thick" });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("thick");
	});

	it("generates zero", () => {
		const result = generate({ kind: "outline-width", width: { value: 0, unit: "px" } });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("0px");
	});
});
