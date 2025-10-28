// b_path:: src/generate/flexbox/flex-grow.test.ts
import { describe, expect, it } from "vitest";
import { generate } from "./flex-grow.js";

describe("generate/flexbox/flex-grow", () => {
	it("generates number 0", () => {
		const result = generate({ kind: "flex-grow", value: 0 });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("0");
	});

	it("generates number 1", () => {
		const result = generate({ kind: "flex-grow", value: 1 });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("1");
	});

	it("generates number 2", () => {
		const result = generate({ kind: "flex-grow", value: 2 });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("2");
	});

	it("generates fractional number", () => {
		const result = generate({ kind: "flex-grow", value: 0.5 });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("0.5");
	});
});
