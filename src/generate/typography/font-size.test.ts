// b_path:: src/generate/typography/font-size.test.ts
import { describe, expect, it } from "vitest";
import { generate } from "./font-size";

describe("font-size generator", () => {
	it("should generate absolute sizes", () => {
		let result = generate({ kind: "font-size", value: "xx-small" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("xx-small");

		result = generate({ kind: "font-size", value: "x-small" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("x-small");

		result = generate({ kind: "font-size", value: "small" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("small");

		result = generate({ kind: "font-size", value: "medium" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("medium");

		result = generate({ kind: "font-size", value: "large" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("large");

		result = generate({ kind: "font-size", value: "x-large" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("x-large");

		result = generate({ kind: "font-size", value: "xx-large" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("xx-large");

		result = generate({ kind: "font-size", value: "xxx-large" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("xxx-large");
	});

	it("should generate relative sizes", () => {
		let result = generate({ kind: "font-size", value: "larger" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("larger");

		result = generate({ kind: "font-size", value: "smaller" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("smaller");
	});

	it("should generate length values", () => {
		let result = generate({ kind: "font-size", value: { value: 16, unit: "px" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("16px");

		result = generate({ kind: "font-size", value: { value: 1.5, unit: "em" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("1.5em");

		result = generate({ kind: "font-size", value: { value: 2, unit: "rem" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("2rem");

		result = generate({ kind: "font-size", value: { value: 14, unit: "pt" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("14pt");
	});

	it("should generate percentage values", () => {
		let result = generate({ kind: "font-size", value: { value: 100, unit: "%" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("100%");

		result = generate({ kind: "font-size", value: { value: 120, unit: "%" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("120%");
	});

	it("should handle zero", () => {
		const result = generate({ kind: "font-size", value: { value: 0, unit: "px" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("0px");
	});

	it("should return error for null input", () => {
		// @ts-expect-error - testing invalid input
		const result = generate(null);
		expect(result.ok).toBe(false);
	});

	it("should return error for undefined input", () => {
		// @ts-expect-error - testing invalid input
		const result = generate(undefined);
		expect(result.ok).toBe(false);
	});
});
