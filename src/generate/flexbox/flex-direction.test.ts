// b_path:: src/generate/flexbox/flex-direction.test.ts
import { describe, expect, it } from "vitest";
import { generate } from "./flex-direction.js";

describe("generate/flexbox/flex-direction", () => {
	it("generates row", () => {
		const result = generate({ kind: "flex-direction", value: "row" });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("row");
	});

	it("generates row-reverse", () => {
		const result = generate({ kind: "flex-direction", value: "row-reverse" });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("row-reverse");
	});

	it("generates column", () => {
		const result = generate({ kind: "flex-direction", value: "column" });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("column");
	});

	it("generates column-reverse", () => {
		const result = generate({ kind: "flex-direction", value: "column-reverse" });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("column-reverse");
	});
});
