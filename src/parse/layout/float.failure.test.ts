// b_path:: src/parse/layout/float.failure.test.ts
import { describe, expect, it } from "vitest";
import * as Parser from "@/parse/layout/float";

describe("parse/layout/float - invalid cases", () => {
	it("should reject empty value", () => {
		const result = Parser.parse("");
		expect(result.ok).toBe(false);
	});

	it("should reject invalid keyword", () => {
		const result = Parser.parse("center");
		expect(result.ok).toBe(false);
	});
});
