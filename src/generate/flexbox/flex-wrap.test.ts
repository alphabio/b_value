// b_path:: src/generate/flexbox/flex-wrap.test.ts
import { describe, expect, it } from "vitest";
import { generate } from "./flex-wrap.js";

describe("generate/flexbox/flex-wrap", () => {
	it("generates nowrap", () => {
		const result = generate({ kind: "flex-wrap", value: "nowrap" });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("nowrap");
	});

	it("generates wrap", () => {
		const result = generate({ kind: "flex-wrap", value: "wrap" });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("wrap");
	});

	it("generates wrap-reverse", () => {
		const result = generate({ kind: "flex-wrap", value: "wrap-reverse" });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("wrap-reverse");
	});
});
