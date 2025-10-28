// b_path:: src/generate/typography/font-weight.test.ts
import { describe, expect, it } from "vitest";
import { generate } from "./font-weight";

describe("font-weight generator", () => {
	it("should generate keyword values", () => {
		let result = generate({ kind: "font-weight", value: "normal" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("normal");

		result = generate({ kind: "font-weight", value: "bold" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("bold");

		result = generate({ kind: "font-weight", value: "bolder" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("bolder");

		result = generate({ kind: "font-weight", value: "lighter" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("lighter");
	});

	it("should generate numeric values", () => {
		let result = generate({ kind: "font-weight", value: 100 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("100");

		result = generate({ kind: "font-weight", value: 200 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("200");

		result = generate({ kind: "font-weight", value: 300 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("300");

		result = generate({ kind: "font-weight", value: 400 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("400");

		result = generate({ kind: "font-weight", value: 500 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("500");

		result = generate({ kind: "font-weight", value: 600 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("600");

		result = generate({ kind: "font-weight", value: 700 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("700");

		result = generate({ kind: "font-weight", value: 800 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("800");

		result = generate({ kind: "font-weight", value: 900 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("900");
	});

	it("should generate variable font weights", () => {
		let result = generate({ kind: "font-weight", value: 350 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("350");

		result = generate({ kind: "font-weight", value: 550 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("550");

		result = generate({ kind: "font-weight", value: 750 });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("750");
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
