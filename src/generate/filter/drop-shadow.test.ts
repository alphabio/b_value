import { describe, expect, test } from "vitest";
import { generate } from "./drop-shadow";

describe("drop-shadow generator", () => {
	test("should generate drop-shadow with named color", () => {
		const result = generate({
			kind: "drop-shadow",
			offsetX: { value: 2, unit: "px" },
			offsetY: { value: 4, unit: "px" },
			blurRadius: { value: 6, unit: "px" },
			color: { kind: "named", name: "black" },
		});
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("drop-shadow(2px 4px 6px black)");
	});

	test("should generate drop-shadow with rgb", () => {
		const result = generate({
			kind: "drop-shadow",
			offsetX: { value: 1, unit: "px" },
			offsetY: { value: 1, unit: "px" },
			blurRadius: { value: 2, unit: "px" },
			color: { kind: "rgb", r: 0, g: 0, b: 0, alpha: 0.5 },
		});
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("drop-shadow(1px 1px 2px rgb(0 0 0 / 0.5))");
	});

	test("should generate drop-shadow with only color", () => {
		const result = generate({
			kind: "drop-shadow",
			offsetX: { value: 3, unit: "px" },
			offsetY: { value: 3, unit: "px" },
			color: { kind: "named", name: "gray" },
		});
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("drop-shadow(3px 3px gray)");
	});

	test("should generate drop-shadow with minimal params", () => {
		const result = generate({
			kind: "drop-shadow",
			offsetX: { value: 1, unit: "px" },
			offsetY: { value: 2, unit: "px" },
		});
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("drop-shadow(1px 2px)");
	});

	test("should error on null input", () => {
		const result = generate(null as any);
		expect(result.ok).toBe(false);
	});
});
