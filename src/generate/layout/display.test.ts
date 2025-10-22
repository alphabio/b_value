// b_path:: src/generate/layout/display.test.ts
import { describe, expect, test } from "vitest";
import { generate } from "./display";

describe("display generator", () => {
	test("should generate 'none'", () => {
		const result = generate({ kind: "display", value: "none" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("none");
	});

	test("should generate 'block'", () => {
		const result = generate({ kind: "display", value: "block" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("block");
	});

	test("should generate 'inline'", () => {
		const result = generate({ kind: "display", value: "inline" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("inline");
	});

	test("should generate 'flex'", () => {
		const result = generate({ kind: "display", value: "flex" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("flex");
	});

	test("should generate 'grid'", () => {
		const result = generate({ kind: "display", value: "grid" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("grid");
	});

	test("should generate 'inline-block'", () => {
		const result = generate({ kind: "display", value: "inline-block" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("inline-block");
	});
});
