import { describe, expect, it } from "vitest";
import { generate } from "./text-align";

describe("text-align generator", () => {
	it("should generate alignment keywords", () => {
		let result = generate({ kind: "text-align", value: "left" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("left");

		result = generate({ kind: "text-align", value: "right" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("right");

		result = generate({ kind: "text-align", value: "center" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("center");

		result = generate({ kind: "text-align", value: "justify" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("justify");
	});

	it("should generate extended alignment keywords", () => {
		let result = generate({ kind: "text-align", value: "start" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("start");

		result = generate({ kind: "text-align", value: "end" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("end");
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
