// b_path:: src/generate/border/style.test.ts
import { describe, expect, test } from "vitest";
import { generate } from "./style";

describe("border-style generator", () => {
	test("should generate 'none'", () => {
		const result = generate({ kind: "border-style", style: "none" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("none");
	});

	test("should generate 'solid'", () => {
		const result = generate({ kind: "border-style", style: "solid" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("solid");
	});

	test("should generate 'dashed'", () => {
		const result = generate({ kind: "border-style", style: "dashed" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("dashed");
	});

	test("should generate 'dotted'", () => {
		const result = generate({ kind: "border-style", style: "dotted" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("dotted");
	});

	test("should generate 'double'", () => {
		const result = generate({ kind: "border-style", style: "double" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("double");
	});

	test("should generate 'groove'", () => {
		const result = generate({ kind: "border-style", style: "groove" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("groove");
	});
});
