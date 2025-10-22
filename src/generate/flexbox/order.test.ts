import { describe, expect, it } from "vitest";
import { generate } from "./order.js";

describe("generate/flexbox/order", () => {
	it("generates number 0", () => {
		const result = generate({ kind: "order", value: 0 });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("0");
	});

	it("generates positive number", () => {
		const result = generate({ kind: "order", value: 1 });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("1");
	});

	it("generates negative number", () => {
		const result = generate({ kind: "order", value: -1 });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("-1");
	});

	it("generates large number", () => {
		const result = generate({ kind: "order", value: 999 });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("999");
	});
});
