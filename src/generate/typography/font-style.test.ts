// b_path:: src/generate/typography/font-style.test.ts
import { describe, expect, test } from "vitest";
import { generate } from "./font-style";

describe("font-style generator", () => {
	test("should generate 'normal'", () => {
		const result = generate({ kind: "font-style", value: "normal" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("normal");
	});

	test("should generate 'italic'", () => {
		const result = generate({ kind: "font-style", value: "italic" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("italic");
	});

	test("should generate 'oblique'", () => {
		const result = generate({ kind: "font-style", value: "oblique" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("oblique");
	});
});
