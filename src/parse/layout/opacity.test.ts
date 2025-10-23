// b_path:: src/parse/layout/opacity.test.ts

import { describe, expect, it } from "vitest";
import * as Opacity from "./opacity";

describe("parse/layout/opacity", () => {
	describe("number values", () => {
		it("parses 0", () => {
			const result = Opacity.parse("0");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "opacity", value: 0 });
			}
		});

		it("parses 0.5", () => {
			const result = Opacity.parse("0.5");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "opacity", value: 0.5 });
			}
		});

		it("parses 1", () => {
			const result = Opacity.parse("1");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "opacity", value: 1 });
			}
		});
	});

	describe("percentage values", () => {
		it("parses 0%", () => {
			const result = Opacity.parse("0%");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "opacity", value: 0 });
			}
		});

		it("parses 50%", () => {
			const result = Opacity.parse("50%");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "opacity", value: 0.5 });
			}
		});

		it("parses 100%", () => {
			const result = Opacity.parse("100%");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ kind: "opacity", value: 1 });
			}
		});
	});

	describe("clamping", () => {
		it("clamps negative to 0", () => {
			const result = Opacity.parse("-0.5");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toBe(0);
			}
		});

		it("clamps greater than 1", () => {
			const result = Opacity.parse("2");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toBe(1);
			}
		});

		it("clamps percentage greater than 100%", () => {
			const result = Opacity.parse("150%");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.value).toBe(1);
			}
		});
	});

	describe("invalid values", () => {
		it("rejects keyword", () => {
			const result = Opacity.parse("transparent");
			expect(result.ok).toBe(false);
		});

		it("rejects empty string", () => {
			const result = Opacity.parse("");
			expect(result.ok).toBe(false);
		});
	});
});
