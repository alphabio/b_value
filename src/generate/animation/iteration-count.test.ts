import { describe, expect, it } from "vitest";
import { generate } from "./iteration-count";

describe("generate() - animation-iteration-count", () => {
	it("should generate number count", () => {
		const result = generate({
			kind: "animation-iteration-count",
			counts: [{ type: "number", value: 3 }],
		});
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("3");
	});

	it("should generate infinite keyword", () => {
		const result = generate({
			kind: "animation-iteration-count",
			counts: [{ type: "infinite" }],
		});
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("infinite");
	});

	it("should generate decimal count", () => {
		const result = generate({
			kind: "animation-iteration-count",
			counts: [{ type: "number", value: 2.5 }],
		});
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("2.5");
	});

	it("should generate multiple counts", () => {
		const result = generate({
			kind: "animation-iteration-count",
			counts: [{ type: "number", value: 3 }, { type: "infinite" }, { type: "number", value: 1 }],
		});
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("3, infinite, 1");
	});

	it("should handle zero count", () => {
		const result = generate({
			kind: "animation-iteration-count",
			counts: [{ type: "number", value: 0 }],
		});
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("0");
	});
});
