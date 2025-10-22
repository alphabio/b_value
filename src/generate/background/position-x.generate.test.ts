// b_path:: src/generate/background/position-x.generate.test.ts

import { describe, expect, it } from "vitest";
import * as Parse from "@/parse/background/position-x";
import { generate } from "./position-x";

describe("Generate.Background.PositionX", () => {
	describe("keywords", () => {
		it("generates 'left'", () => {
			const result = generate("left");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("left");
		});

		it("generates 'center'", () => {
			const result = generate("center");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("center");
		});

		it("generates 'right'", () => {
			const result = generate("right");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("right");
		});
	});

	describe("length values", () => {
		it("generates px", () => {
			const result = generate({ value: 10, unit: "px" });
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("10px");
		});

		it("generates em", () => {
			const result = generate({ value: 2, unit: "em" });
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("2em");
		});

		it("generates zero", () => {
			const result = generate({ value: 0, unit: "px" });
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("0px");
		});
	});

	describe("percentage values", () => {
		it("generates 50%", () => {
			const result = generate({ value: 50, unit: "%" });
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("50%");
		});

		it("generates 0%", () => {
			const result = generate({ value: 0, unit: "%" });
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("0%");
		});

		it("generates 100%", () => {
			const result = generate({ value: 100, unit: "%" });
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("100%");
		});
	});

	describe("round-trip", () => {
		it("left", () => {
			const parsed = Parse.parse("left");
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const css = generate(parsed.value);
				expect(css.ok).toBe(true);
				if (!css.ok) return;
				const reparsed = Parse.parse(css.value);
				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});

		it("25%", () => {
			const parsed = Parse.parse("25%");
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const css = generate(parsed.value);
				expect(css.ok).toBe(true);
				if (!css.ok) return;
				const reparsed = Parse.parse(css.value);
				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});

		it("10px", () => {
			const parsed = Parse.parse("10px");
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const css = generate(parsed.value);
				expect(css.ok).toBe(true);
				if (!css.ok) return;
				const reparsed = Parse.parse(css.value);
				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});
	});
});
