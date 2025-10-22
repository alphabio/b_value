import { describe, expect, it } from "vitest";
import { generate } from "./justify-content.js";

describe("generate/flexbox/justify-content", () => {
	it("generates flex-start", () => {
		const result = generate({ kind: "justify-content", value: "flex-start" });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("flex-start");
	});

	it("generates flex-end", () => {
		const result = generate({ kind: "justify-content", value: "flex-end" });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("flex-end");
	});

	it("generates center", () => {
		const result = generate({ kind: "justify-content", value: "center" });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("center");
	});

	it("generates space-between", () => {
		const result = generate({ kind: "justify-content", value: "space-between" });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("space-between");
	});

	it("generates space-around", () => {
		const result = generate({ kind: "justify-content", value: "space-around" });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("space-around");
	});

	it("generates space-evenly", () => {
		const result = generate({ kind: "justify-content", value: "space-evenly" });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("space-evenly");
	});
});
