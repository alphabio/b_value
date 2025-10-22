// b_path:: src/generate/typography/overflow-wrap.test.ts
import { describe, expect, test } from "vitest";
import { generate } from "./overflow-wrap";

describe("overflow-wrap generator", () => {
	test("should generate 'normal'", () => {
		const result = generate({ kind: "overflow-wrap", value: "normal" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("normal");
	});

	test("should generate 'break-word'", () => {
		const result = generate({ kind: "overflow-wrap", value: "break-word" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("break-word");
	});

	test("should generate 'anywhere'", () => {
		const result = generate({ kind: "overflow-wrap", value: "anywhere" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("anywhere");
	});
});
