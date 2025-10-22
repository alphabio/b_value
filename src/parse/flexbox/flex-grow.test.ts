// b_path:: src/parse/flexbox/flex-grow.test.ts
import { describe, expect, it } from "vitest";
import { parse } from "./flex-grow";

describe("parse flex-grow", () => {
	it("should parse 0", () => {
		const result = parse("0");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("flex-grow");
			expect(result.value.value).toBe(0);
		}
	});

	it("should parse 1", () => {
		const result = parse("1");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.value).toBe(1);
		}
	});

	it("should parse decimal values", () => {
		const result = parse("0.5");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.value).toBe(0.5);
		}
	});

	it("should reject negative values", () => {
		expect(parse("-1").ok).toBe(false);
	});

	it("should reject non-numeric values", () => {
		expect(parse("auto").ok).toBe(false);
	});
});
