// b_path:: src/generate/background/position-y.generate.test.ts

import { describe, expect, it } from "vitest";
import * as Parse from "@/parse/background/position-y";
import { generate } from "./position-y";

describe("Generate.Background.PositionY", () => {
	describe("keywords", () => {
		it("generates 'top'", () => {
			const result = generate("top");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("top");
		});

		it("generates 'center'", () => {
			const result = generate("center");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("center");
		});

		it("generates 'bottom'", () => {
			const result = generate("bottom");
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("bottom");
		});
	});

	describe("length values", () => {
		it("generates px", () => {
			const result = generate({ value: 20, unit: "px" });
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("20px");
		});

		it("generates em", () => {
			const result = generate({ value: 3, unit: "em" });
			expect(result.ok).toBe(true);
			if (!result.ok) return;
			expect(result.value).toBe("3em");
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
		it("top", () => {
			const parsed = Parse.parse("top");
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

		it("50%", () => {
			const parsed = Parse.parse("50%");
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

		it("20px", () => {
			const parsed = Parse.parse("20px");
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
