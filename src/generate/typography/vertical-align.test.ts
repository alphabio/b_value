import { describe, expect, it } from "vitest";
import { generate } from "./vertical-align";

describe("vertical-align generator", () => {
	it("should generate baseline alignment keywords", () => {
		let result = generate({ kind: "vertical-align", value: "baseline" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("baseline");

		result = generate({ kind: "vertical-align", value: "sub" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("sub");

		result = generate({ kind: "vertical-align", value: "super" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("super");
	});

	it("should generate text alignment keywords", () => {
		let result = generate({ kind: "vertical-align", value: "text-top" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("text-top");

		result = generate({ kind: "vertical-align", value: "text-bottom" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("text-bottom");
	});

	it("should generate box alignment keywords", () => {
		let result = generate({ kind: "vertical-align", value: "top" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("top");

		result = generate({ kind: "vertical-align", value: "middle" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("middle");

		result = generate({ kind: "vertical-align", value: "bottom" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("bottom");
	});

	it("should generate length values", () => {
		let result = generate({ kind: "vertical-align", value: { value: 5, unit: "px" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("5px");

		result = generate({ kind: "vertical-align", value: { value: -2, unit: "px" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("-2px");

		result = generate({ kind: "vertical-align", value: { value: 0.5, unit: "em" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("0.5em");
	});

	it("should generate percentage values", () => {
		let result = generate({ kind: "vertical-align", value: { value: 50, unit: "%" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("50%");

		result = generate({ kind: "vertical-align", value: { value: -25, unit: "%" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("-25%");
	});

	it("should handle zero", () => {
		const result = generate({ kind: "vertical-align", value: { value: 0, unit: "px" } });
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
