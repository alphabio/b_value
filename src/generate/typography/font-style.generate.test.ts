// b_path:: src/generate/typography/font-style.generate.test.ts
import { describe, expect, it } from "vitest";
import { toCss } from "./font-style";

describe("Generate.Typography.FontStyle", () => {
	it("should generate 'normal'", () => {
		const result = toCss({ kind: "font-style", value: "normal" });
		expect(result).toBe("normal");
	});

	it("should generate 'italic'", () => {
		const result = toCss({ kind: "font-style", value: "italic" });
		expect(result).toBe("italic");
	});

	it("should generate 'oblique'", () => {
		const result = toCss({ kind: "font-style", value: "oblique" });
		expect(result).toBe("oblique");
	});
});
