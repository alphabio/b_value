// b_path:: src/generate/layout/bottom.test.ts
import { describe, expect, it } from "vitest";
import { generate } from "./bottom.js";

describe("generate/layout/bottom", () => {
	it("generates pixel value", () => {
		const result = generate({ kind: "bottom", value: { value: 10, unit: "px" } });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("10px");
	});

	it("generates percentage", () => {
		const result = generate({ kind: "bottom", value: { value: 50, unit: "%" } });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("50%");
	});

	it("generates rem value", () => {
		const result = generate({ kind: "bottom", value: { value: 2, unit: "rem" } });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("2rem");
	});

	it("generates auto", () => {
		const result = generate({ kind: "bottom", value: "auto" });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("auto");
	});

	it("generates zero", () => {
		const result = generate({ kind: "bottom", value: { value: 0, unit: "px" } });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("0px");
	});
});
