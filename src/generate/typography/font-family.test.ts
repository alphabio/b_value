// b_path:: src/generate/typography/font-family.test.ts
import { describe, expect, it } from "vitest";
import { generate } from "./font-family";

describe("font-family generator", () => {
	it("should generate single font family", () => {
		let result = generate({ kind: "font-family", families: ["Arial"] });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("Arial");

		result = generate({ kind: "font-family", families: ["serif"] });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("serif");
	});

	it("should generate multiple font families", () => {
		let result = generate({ kind: "font-family", families: ["Arial", "sans-serif"] });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("Arial, sans-serif");

		result = generate({ kind: "font-family", families: ["Georgia", "serif"] });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("Georgia, serif");
	});

	it("should quote families with spaces", () => {
		let result = generate({ kind: "font-family", families: ["Times New Roman", "serif"] });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe('"Times New Roman", serif');

		result = generate({ kind: "font-family", families: ["Courier New", "monospace"] });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe('"Courier New", monospace');
	});

	it("should handle mixed quoted and unquoted families", () => {
		const result = generate({ kind: "font-family", families: ["Open Sans", "Arial", "sans-serif"] });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe('"Open Sans", Arial, sans-serif');
	});

	it("should handle generic font families", () => {
		let result = generate({ kind: "font-family", families: ["sans-serif"] });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("sans-serif");

		result = generate({ kind: "font-family", families: ["serif"] });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("serif");

		result = generate({ kind: "font-family", families: ["monospace"] });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("monospace");

		result = generate({ kind: "font-family", families: ["cursive"] });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("cursive");

		result = generate({ kind: "font-family", families: ["fantasy"] });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("fantasy");
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
