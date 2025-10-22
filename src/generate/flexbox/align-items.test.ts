import { describe, expect, it } from "vitest";
import { generate } from "./align-items.js";

describe("generate/flexbox/align-items", () => {
	it("generates flex-start", () => {
		const result = generate({ kind: "align-items", value: "flex-start" });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("flex-start");
	});

	it("generates flex-end", () => {
		const result = generate({ kind: "align-items", value: "flex-end" });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("flex-end");
	});

	it("generates center", () => {
		const result = generate({ kind: "align-items", value: "center" });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("center");
	});

	it("generates stretch", () => {
		const result = generate({ kind: "align-items", value: "stretch" });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("stretch");
	});

	it("generates baseline", () => {
		const result = generate({ kind: "align-items", value: "baseline" });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("baseline");
	});
});
