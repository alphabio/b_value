// b_path:: src/generate/layout/clear.test.ts
// Auto-generated from scripts/generate-test-generator/configs/layout/clear.ts
//
// ⚠️  No spec references found in source file
import { describe, expect, it } from "vitest";
import type * as Type from "@/core/types";
import * as Generator from "@/generate/layout/clear";
import * as Parser from "@/parse/layout/clear";

describe("generate/layout/clear - valid cases", () => {
	describe("valid-basic", () => {
		it("should generate none keyword", () => {
			const input: Type.Clear = {
				kind: "clear",
				value: "none",
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("none");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate left keyword", () => {
			const input: Type.Clear = {
				kind: "clear",
				value: "left",
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("left");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate right keyword", () => {
			const input: Type.Clear = {
				kind: "clear",
				value: "right",
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("right");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});

		it("should generate both keyword", () => {
			const input: Type.Clear = {
				kind: "clear",
				value: "both",
			};
			const result = Generator.generate(input);
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("both");

			// Roundtrip validation
			const parseResult = Parser.parse(result.value);
			expect(parseResult.ok).toBe(true);
			if (!parseResult.ok) return;
			expect(parseResult.value).toEqual(input);
		});
	});
});
