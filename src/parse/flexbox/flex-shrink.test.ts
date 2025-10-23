// b_path:: src/parse/flexbox/flex-shrink.test.ts

import { describe, expect, it } from "vitest";
import * as FlexShrink from "./flex-shrink";

describe("parse/flexbox/flex-shrink", () => {
	describe("valid values", () => {
		it("parses 0", () => {
			const result = FlexShrink.parse("0");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "flex-shrink", value: 0 });
			}
		});

		it("parses 1", () => {
			const result = FlexShrink.parse("1");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "flex-shrink", value: 1 });
			}
		});

		it("parses decimal value", () => {
			const result = FlexShrink.parse("0.5");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "flex-shrink", value: 0.5 });
			}
		});

		it("parses large value", () => {
			const result = FlexShrink.parse("10");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "flex-shrink", value: 10 });
			}
		});
	});

	describe("invalid values", () => {
		it("rejects negative value", () => {
			const result = FlexShrink.parse("-1");
			expect(result.ok).toBe(false);
		});

		it("rejects keyword", () => {
			const result = FlexShrink.parse("auto");
			expect(result.ok).toBe(false);
		});

		it("rejects empty string", () => {
			const result = FlexShrink.parse("");
			expect(result.ok).toBe(false);
		});
	});
});
