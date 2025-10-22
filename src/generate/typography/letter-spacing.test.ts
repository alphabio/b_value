// b_path:: src/generate/typography/letter-spacing.test.ts
import { describe, expect, test } from "vitest";
import * as Parse from "@/parse/typography/letter-spacing";
import * as Generate from "./letter-spacing";

describe("letter-spacing generator", () => {
	test("should generate 'normal'", () => {
		const result = Generate.generate({ kind: "letter-spacing", value: "normal" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("normal");
	});

	test("should generate length in px", () => {
		const result = Generate.generate({ kind: "letter-spacing", value: { value: 2, unit: "px" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("2px");
	});

	test("should generate length in em", () => {
		const result = Generate.generate({ kind: "letter-spacing", value: { value: 0.1, unit: "em" } });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("0.1em");
	});

	test("should round-trip with parser", () => {
		const inputs = ["normal", "2px", "0.1em", "-1px"];
		for (const input of inputs) {
			const parsed = Parse.parse(input);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Generate.generate(parsed.value);
				expect(generated.ok).toBe(true);
				if (generated.ok) expect(generated.value).toBe(input);
			}
		}
	});
});
