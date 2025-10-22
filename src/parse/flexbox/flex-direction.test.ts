// b_path:: src/parse/flexbox/flex-direction.test.ts
import { describe, expect, it } from "vitest";
import { parse } from "./flex-direction";

describe("parse flex-direction", () => {
	it("should parse row", () => {
		const result = parse("row");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("flex-direction");
			expect(result.value.value).toBe("row");
		}
	});

	it("should parse row-reverse", () => {
		const result = parse("row-reverse");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.value).toBe("row-reverse");
		}
	});

	it("should parse column", () => {
		const result = parse("column");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.value).toBe("column");
		}
	});

	it("should parse column-reverse", () => {
		const result = parse("column-reverse");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.value).toBe("column-reverse");
		}
	});

	it("should reject invalid values", () => {
		expect(parse("invalid").ok).toBe(false);
		expect(parse("vertical").ok).toBe(false);
	});
});
