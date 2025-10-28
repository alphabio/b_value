// b_path:: src/generate/flexbox/align-self.test.ts
import { describe, expect, it } from "vitest";
import { generate } from "./align-self.js";

describe("generate/flexbox/align-self", () => {
	it("generates auto", () => {
		const result = generate({ kind: "align-self", value: "auto" });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("auto");
	});

	it("generates flex-start", () => {
		const result = generate({ kind: "align-self", value: "flex-start" });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("flex-start");
	});

	it("generates flex-end", () => {
		const result = generate({ kind: "align-self", value: "flex-end" });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("flex-end");
	});

	it("generates center", () => {
		const result = generate({ kind: "align-self", value: "center" });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("center");
	});

	it("generates stretch", () => {
		const result = generate({ kind: "align-self", value: "stretch" });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("stretch");
	});

	it("generates baseline", () => {
		const result = generate({ kind: "align-self", value: "baseline" });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("baseline");
	});
});
