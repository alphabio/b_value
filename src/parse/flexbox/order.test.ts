// b_path:: src/parse/flexbox/order.test.ts

import { describe, expect, it } from "vitest";
import * as Order from "./order";

describe("parse/flexbox/order", () => {
	describe("valid values", () => {
		it("parses 0", () => {
			const result = Order.parse("0");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "order", value: 0 });
			}
		});

		it("parses positive integer", () => {
			const result = Order.parse("5");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "order", value: 5 });
			}
		});

		it("parses negative integer", () => {
			const result = Order.parse("-1");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "order", value: -1 });
			}
		});

		it("parses large integer", () => {
			const result = Order.parse("100");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "order", value: 100 });
			}
		});
	});

	describe("invalid values", () => {
		it("rejects keyword", () => {
			const result = Order.parse("auto");
			expect(result.ok).toBe(false);
		});

		it("rejects empty string", () => {
			const result = Order.parse("");
			expect(result.ok).toBe(false);
		});
	});
});
