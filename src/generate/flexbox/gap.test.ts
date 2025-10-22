import { describe, expect, it } from "vitest";
import { generate } from "./gap.js";

describe("generate/flexbox/gap", () => {
	it("generates pixel value", () => {
		const result = generate({ kind: "gap", value: { value: 16, unit: "px" } });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("16px");
	});

	it("generates rem value", () => {
		const result = generate({ kind: "gap", value: { value: 1, unit: "rem" } });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("1rem");
	});

	it("generates percentage", () => {
		const result = generate({ kind: "gap", value: { value: 10, unit: "%" } });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("10%");
	});

	it("generates normal keyword", () => {
		const result = generate({ kind: "gap", value: "normal" });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("normal");
	});
});
