// b_path:: test/integration/trbl.test.ts
import { describe, expect, it } from "vitest";
import * as Generate from "@/generate";
import * as Parse from "@/parse";

describe("Integration: Top/Right/Bottom/Left Properties", () => {
	describe("top property", () => {
		it("round-trip: length", () => {
			const css = "10px";
			const parsed = Parse.Layout.Top.parse(css);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Generate.Layout.Top.generate(parsed.value);
				expect(generated.ok).toBe(true);
				if (!generated.ok) return;
				const reparsed = Parse.Layout.Top.parse(generated.value);
				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});

		it("round-trip: percentage", () => {
			const css = "50%";
			const parsed = Parse.Layout.Top.parse(css);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Generate.Layout.Top.generate(parsed.value);
				expect(generated.ok).toBe(true);
				if (!generated.ok) return;
				const reparsed = Parse.Layout.Top.parse(generated.value);
				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});

		it("round-trip: auto", () => {
			const css = "auto";
			const parsed = Parse.Layout.Top.parse(css);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Generate.Layout.Top.generate(parsed.value);
				expect(generated).toBe("auto");
			}
		});
	});

	describe("right property", () => {
		it("round-trip: length", () => {
			const css = "2em";
			const parsed = Parse.Layout.Right.parse(css);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Generate.Layout.Right.generate(parsed.value);
				expect(generated.ok).toBe(true);
				if (!generated.ok) return;
				const reparsed = Parse.Layout.Right.parse(generated.value);
				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});

		it("round-trip: negative", () => {
			const css = "-10px";
			const parsed = Parse.Layout.Right.parse(css);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Generate.Layout.Right.generate(parsed.value);
				expect(generated.ok).toBe(true);
				if (!generated.ok) return;
				const reparsed = Parse.Layout.Right.parse(generated.value);
				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});
	});

	describe("bottom property", () => {
		it("round-trip: viewport units", () => {
			const css = "50vh";
			const parsed = Parse.Layout.Bottom.parse(css);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Generate.Layout.Bottom.generate(parsed.value);
				expect(generated.ok).toBe(true);
				if (!generated.ok) return;
				const reparsed = Parse.Layout.Bottom.parse(generated.value);
				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});
	});

	describe("left property", () => {
		it("round-trip: rem", () => {
			const css = "1.5rem";
			const parsed = Parse.Layout.Left.parse(css);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Generate.Layout.Left.generate(parsed.value);
				expect(generated.ok).toBe(true);
				if (!generated.ok) return;
				const reparsed = Parse.Layout.Left.parse(generated.value);
				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});
	});

	describe("all four properties", () => {
		it("absolute positioning", () => {
			const top = Parse.Layout.Top.parse("0");
			const right = Parse.Layout.Right.parse("0");
			const bottom = Parse.Layout.Bottom.parse("0");
			const left = Parse.Layout.Left.parse("0");

			expect(top.ok && right.ok && bottom.ok && left.ok).toBe(true);

			if (top.ok && right.ok && bottom.ok && left.ok) {
				expect(Generate.Layout.Top.generate(top.value)).toBe("0px");
				expect(Generate.Layout.Right.generate(right.value)).toBe("0px");
				expect(Generate.Layout.Bottom.generate(bottom.value)).toBe("0px");
				expect(Generate.Layout.Left.generate(left.value)).toBe("0px");
			}
		});

		it("centered element", () => {
			const top = Parse.Layout.Top.parse("50%");
			const left = Parse.Layout.Left.parse("50%");

			expect(top.ok && left.ok).toBe(true);

			if (top.ok && left.ok) {
				expect(Generate.Layout.Top.generate(top.value)).toBe("50%");
				expect(Generate.Layout.Left.generate(left.value)).toBe("50%");
			}
		});

		it("offset from sides", () => {
			const top = Parse.Layout.Top.parse("10px");
			const right = Parse.Layout.Right.parse("20px");
			const bottom = Parse.Layout.Bottom.parse("10px");
			const left = Parse.Layout.Left.parse("20px");

			expect(top.ok && right.ok && bottom.ok && left.ok).toBe(true);

			if (top.ok && right.ok && bottom.ok && left.ok) {
				expect(Generate.Layout.Top.generate(top.value)).toBe("10px");
				expect(Generate.Layout.Right.generate(right.value)).toBe("20px");
				expect(Generate.Layout.Bottom.generate(bottom.value)).toBe("10px");
				expect(Generate.Layout.Left.generate(left.value)).toBe("20px");
			}
		});
	});
});
