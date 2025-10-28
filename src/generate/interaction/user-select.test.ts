// b_path:: src/generate/interaction/user-select.test.ts
import { describe, expect, test } from "vitest";
import { generate } from "./user-select";

describe("user-select generator", () => {
	test("should generate 'none'", () => {
		const result = generate({ kind: "user-select", value: "none" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("none");
	});

	test("should generate 'auto'", () => {
		const result = generate({ kind: "user-select", value: "auto" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("auto");
	});

	test("should generate 'text'", () => {
		const result = generate({ kind: "user-select", value: "text" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("text");
	});

	test("should generate 'all'", () => {
		const result = generate({ kind: "user-select", value: "all" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("all");
	});
});
