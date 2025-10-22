// b_path:: src/generate/layout/cursor.test.ts
import { describe, expect, test } from "vitest";
import { generate } from "./cursor";

describe("cursor generator", () => {
	test("should generate 'auto'", () => {
		const result = generate({ kind: "cursor", value: "auto" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("auto");
	});

	test("should generate 'pointer'", () => {
		const result = generate({ kind: "cursor", value: "pointer" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("pointer");
	});

	test("should generate 'text'", () => {
		const result = generate({ kind: "cursor", value: "text" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("text");
	});

	test("should generate 'move'", () => {
		const result = generate({ kind: "cursor", value: "move" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("move");
	});

	test("should generate 'not-allowed'", () => {
		const result = generate({ kind: "cursor", value: "not-allowed" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("not-allowed");
	});

	test("should generate 'grab'", () => {
		const result = generate({ kind: "cursor", value: "grab" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("grab");
	});
});
