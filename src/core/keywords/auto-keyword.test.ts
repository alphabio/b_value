import { describe, expect, it } from "vitest";
import { AUTO_KEYWORD, type AutoKeyword, autoKeywordSchema } from "./auto-keyword";

describe("autoKeywordSchema", () => {
	it("accepts auto keyword", () => {
		const result = autoKeywordSchema.safeParse("auto");
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data).toBe("auto");
		}
	});

	it("rejects invalid keywords", () => {
		expect(autoKeywordSchema.safeParse("invalid").success).toBe(false);
		expect(autoKeywordSchema.safeParse("").success).toBe(false);
		expect(autoKeywordSchema.safeParse(123).success).toBe(false);
		expect(autoKeywordSchema.safeParse("none").success).toBe(false);
	});

	it("exports AUTO_KEYWORD constant", () => {
		expect(AUTO_KEYWORD).toBe("auto");
		const keyword: AutoKeyword = AUTO_KEYWORD;
		expect(keyword).toBe("auto");
	});
});
