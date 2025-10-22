// b_path:: src/generate/background/repeat.test.ts
import { describe, expect, test } from "vitest";
import { generate } from "./repeat";

describe("background-repeat generator", () => {
	test("should generate 'repeat'", () => {
		const result = generate("repeat");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("repeat");
	});

	test("should generate 'repeat-x'", () => {
		const result = generate("repeat-x");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("repeat-x");
	});

	test("should generate 'repeat-y'", () => {
		const result = generate("repeat-y");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("repeat-y");
	});

	test("should generate 'no-repeat'", () => {
		const result = generate("no-repeat");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("no-repeat");
	});

	test("should generate 'space'", () => {
		const result = generate("space");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("space");
	});

	test("should generate 'round'", () => {
		const result = generate("round");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("round");
	});
});
