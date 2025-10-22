import { describe, expect, test } from "vitest";
import { generate } from "./radius";

describe("border-radius generator", () => {
	test("should generate length in px", () => {
		const result = generate({ kind: "border-radius", radius: { value: 5, unit: "px" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("5px");
	});

	test("should generate length in rem", () => {
		const result = generate({ kind: "border-radius", radius: { value: 0.5, unit: "rem" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("0.5rem");
	});

	test("should generate percentage", () => {
		const result = generate({ kind: "border-radius", radius: { value: 50, unit: "%" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("50%");
	});
});
