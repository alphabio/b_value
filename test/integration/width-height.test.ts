// b_path:: test/integration/width-height.test.ts
import { describe, expect, it } from "vitest";
import * as Generate from "@/generate";
import * as Parse from "@/parse";

describe("Integration: Width/Height Properties", () => {
	describe("width property", () => {
		it("round-trip: length", () => {
			const css = "200px";
			const parsed = Parse.Layout.Width.parse(css);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Generate.Layout.Width.generate(parsed.value);
				expect(generated.ok).toBe(true);
				if (!generated.ok) return;
				const reparsed = Parse.Layout.Width.parse(generated.value);
				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});

		it("round-trip: percentage", () => {
			const css = "50%";
			const parsed = Parse.Layout.Width.parse(css);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Generate.Layout.Width.generate(parsed.value);
				expect(generated).toBe("50%");
			}
		});

		it("round-trip: auto", () => {
			const css = "auto";
			const parsed = Parse.Layout.Width.parse(css);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Generate.Layout.Width.generate(parsed.value);
				expect(generated).toBe("auto");
			}
		});

		it("round-trip: min-content", () => {
			const css = "min-content";
			const parsed = Parse.Layout.Width.parse(css);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Generate.Layout.Width.generate(parsed.value);
				expect(generated).toBe("min-content");
			}
		});

		it("round-trip: max-content", () => {
			const css = "max-content";
			const parsed = Parse.Layout.Width.parse(css);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Generate.Layout.Width.generate(parsed.value);
				expect(generated).toBe("max-content");
			}
		});

		it("round-trip: fit-content", () => {
			const css = "fit-content";
			const parsed = Parse.Layout.Width.parse(css);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Generate.Layout.Width.generate(parsed.value);
				expect(generated).toBe("fit-content");
			}
		});
	});

	describe("height property", () => {
		it("round-trip: length", () => {
			const css = "100px";
			const parsed = Parse.Layout.Height.parse(css);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Generate.Layout.Height.generate(parsed.value);
				expect(generated.ok).toBe(true);
				if (!generated.ok) return;
				const reparsed = Parse.Layout.Height.parse(generated.value);
				expect(reparsed.ok).toBe(true);
				if (reparsed.ok) {
					expect(reparsed.value).toEqual(parsed.value);
				}
			}
		});

		it("round-trip: viewport units", () => {
			const css = "100vh";
			const parsed = Parse.Layout.Height.parse(css);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Generate.Layout.Height.generate(parsed.value);
				expect(generated).toBe("100vh");
			}
		});

		it("round-trip: intrinsic sizing", () => {
			const css = "max-content";
			const parsed = Parse.Layout.Height.parse(css);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Generate.Layout.Height.generate(parsed.value);
				expect(generated).toBe("max-content");
			}
		});
	});

	describe("combined box model", () => {
		it("fixed size box", () => {
			const width = Parse.Layout.Width.parse("200px");
			const height = Parse.Layout.Height.parse("100px");

			expect(width.ok && height.ok).toBe(true);

			if (width.ok && height.ok) {
				expect(Generate.Layout.Width.generate(width.value)).toBe("200px");
				expect(Generate.Layout.Height.generate(height.value)).toBe("100px");
			}
		});

		it("responsive box", () => {
			const width = Parse.Layout.Width.parse("100%");
			const height = Parse.Layout.Height.parse("auto");

			expect(width.ok && height.ok).toBe(true);

			if (width.ok && height.ok) {
				expect(Generate.Layout.Width.generate(width.value)).toBe("100%");
				expect(Generate.Layout.Height.generate(height.value)).toBe("auto");
			}
		});

		it("intrinsic sizing", () => {
			const width = Parse.Layout.Width.parse("min-content");
			const height = Parse.Layout.Height.parse("fit-content");

			expect(width.ok && height.ok).toBe(true);

			if (width.ok && height.ok) {
				expect(Generate.Layout.Width.generate(width.value)).toBe("min-content");
				expect(Generate.Layout.Height.generate(height.value)).toBe("fit-content");
			}
		});
	});
});
