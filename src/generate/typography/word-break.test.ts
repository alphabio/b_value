// b_path:: src/generate/typography/word-break.test.ts
import { describe, expect, test } from "vitest";
import { generate } from "./word-break";

describe("word-break generator", () => {
	test("should generate 'normal'", () => {
		const result = generate({ kind: "word-break", value: "normal" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("normal");
	});

	test("should generate 'break-all'", () => {
		const result = generate({ kind: "word-break", value: "break-all" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("break-all");
	});

	test("should generate 'keep-all'", () => {
		const result = generate({ kind: "word-break", value: "keep-all" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("keep-all");
	});

	test("should generate 'break-word'", () => {
		const result = generate({ kind: "word-break", value: "break-word" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("break-word");
	});
});
