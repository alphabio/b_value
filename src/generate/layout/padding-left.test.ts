import { describe, expect, test } from "vitest";
import { generate } from "./padding-left";

describe("padding-left generator", () => {
	test("should generate length in px", () => {
		const result = generate({ kind: "padding-left", value: { value: 14, unit: "px" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("14px");
	});

	test("should generate length in vw", () => {
		const result = generate({ kind: "padding-left", value: { value: 3, unit: "vw" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("3vw");
	});

	test("should generate percentage", () => {
		const result = generate({ kind: "padding-left", value: { value: 25, unit: "%" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("25%");
	});
});
