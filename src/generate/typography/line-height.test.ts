import { describe, expect, it } from "vitest";
import { generate } from "./line-height";

describe("line-height generator", () => {
	it("should generate keyword values", () => {
		const result = generate({ kind: "line-height", value: "normal" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("normal");
	});

	it("should generate unitless numbers", () => {
		let result = generate({ kind: "line-height", value: 1 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("1");

		result = generate({ kind: "line-height", value: 1.5 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("1.5");

		result = generate({ kind: "line-height", value: 2 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("2");

		result = generate({ kind: "line-height", value: 0.8 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("0.8");
	});

	it("should generate length values", () => {
		let result = generate({ kind: "line-height", value: { value: 20, unit: "px" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("20px");

		result = generate({ kind: "line-height", value: { value: 1.5, unit: "em" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("1.5em");

		result = generate({ kind: "line-height", value: { value: 2, unit: "rem" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("2rem");
	});

	it("should generate percentage values", () => {
		let result = generate({ kind: "line-height", value: { value: 120, unit: "%" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("120%");

		result = generate({ kind: "line-height", value: { value: 150, unit: "%" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("150%");
	});

	it("should handle zero", () => {
		let result = generate({ kind: "line-height", value: 0 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("0");

		result = generate({ kind: "line-height", value: { value: 0, unit: "px" } });
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
