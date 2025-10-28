// b_path:: src/generate/flexbox/flex-basis.test.ts
import { describe, expect, test } from "vitest";
import { generate } from "./flex-basis";

describe("flex-basis generator", () => {
	test("should generate length in px", () => {
		const result = generate({ kind: "flex-basis", value: { value: 200, unit: "px" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("200px");
	});

	test("should generate percentage", () => {
		const result = generate({ kind: "flex-basis", value: { value: 50, unit: "%" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("50%");
	});

	test("should generate 'auto' keyword", () => {
		const result = generate({ kind: "flex-basis", value: "auto" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("auto");
	});

	test("should generate 'content' keyword", () => {
		const result = generate({ kind: "flex-basis", value: "content" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("content");
	});
});
