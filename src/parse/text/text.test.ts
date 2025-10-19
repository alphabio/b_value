// b_path:: src/parse/text/text.test.ts
import { describe, expect, it } from "vitest";
import * as Generate from "../../generate/text";
import * as Parse from "./index";

describe("Text.Color", () => {
	it("parses named colors", () => {
		const result = Parse.Color.parse("red");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toEqual({ kind: "named", name: "red" });
		}
	});

	it("parses hex colors", () => {
		const result = Parse.Color.parse("#ff0000");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("hex");
		}
	});

	it("parses RGB colors", () => {
		const result = Parse.Color.parse("rgb(255 0 0)");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("rgb");
		}
	});

	it("parses HSL colors", () => {
		const result = Parse.Color.parse("hsl(0 100% 50%)");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("hsl");
		}
	});

	it("rejects invalid colors", () => {
		const result = Parse.Color.parse("not-a-color");
		expect(result.ok).toBe(false);
	});

	it("round-trips named colors", () => {
		const original = "blue";
		const parsed = Parse.Color.parse(original);
		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = Generate.Color.toCss(parsed.value);
			const reparsed = Parse.Color.parse(generated);
			expect(reparsed.ok).toBe(true);
			if (reparsed.ok) {
				expect(reparsed.value).toEqual(parsed.value);
			}
		}
	});
});

describe("Text.Style", () => {
	it("parses solid", () => {
		const result = Parse.Style.parse("solid");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("solid");
	});

	it("parses double", () => {
		const result = Parse.Style.parse("double");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("double");
	});

	it("parses dotted", () => {
		const result = Parse.Style.parse("dotted");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("dotted");
	});

	it("parses dashed", () => {
		const result = Parse.Style.parse("dashed");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("dashed");
	});

	it("parses wavy", () => {
		const result = Parse.Style.parse("wavy");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("wavy");
	});

	it("rejects invalid keywords", () => {
		const result = Parse.Style.parse("invalid");
		expect(result.ok).toBe(false);
	});

	it("round-trips", () => {
		const original = "wavy";
		const parsed = Parse.Style.parse(original);
		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = Generate.Style.toCss(parsed.value);
			expect(generated).toBe(original);
		}
	});
});

describe("Text.Line", () => {
	it("parses none", () => {
		const result = Parse.Line.parse("none");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("none");
	});

	it("parses underline", () => {
		const result = Parse.Line.parse("underline");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("underline");
	});

	it("parses overline", () => {
		const result = Parse.Line.parse("overline");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("overline");
	});

	it("parses line-through", () => {
		const result = Parse.Line.parse("line-through");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("line-through");
	});

	it("rejects invalid keywords", () => {
		const result = Parse.Line.parse("invalid");
		expect(result.ok).toBe(false);
	});

	it("round-trips", () => {
		const original = "underline";
		const parsed = Parse.Line.parse(original);
		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = Generate.Line.toCss(parsed.value);
			expect(generated).toBe(original);
		}
	});
});

describe("Text.Thickness", () => {
	describe("keywords", () => {
		it("parses auto", () => {
			const result = Parse.Thickness.parse("auto");
			expect(result.ok).toBe(true);
			if (result.ok) expect(result.value).toBe("auto");
		});

		it("parses from-font", () => {
			const result = Parse.Thickness.parse("from-font");
			expect(result.ok).toBe(true);
			if (result.ok) expect(result.value).toBe("from-font");
		});
	});

	describe("length/percentage values", () => {
		it("parses pixel values", () => {
			const result = Parse.Thickness.parse("2px");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ value: 2, unit: "px" });
			}
		});

		it("parses percentage values", () => {
			const result = Parse.Thickness.parse("10%");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ value: 10, unit: "%" });
			}
		});

		it("parses em values", () => {
			const result = Parse.Thickness.parse("0.5em");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ value: 0.5, unit: "em" });
			}
		});
	});

	it("rejects invalid values", () => {
		const result = Parse.Thickness.parse("invalid");
		expect(result.ok).toBe(false);
	});

	describe("round-trips", () => {
		it("round-trips keywords", () => {
			const original = "auto";
			const parsed = Parse.Thickness.parse(original);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Generate.Thickness.toCss(parsed.value);
				expect(generated).toBe(original);
			}
		});

		it("round-trips length values", () => {
			const original = "2px";
			const parsed = Parse.Thickness.parse(original);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Generate.Thickness.toCss(parsed.value);
				expect(generated).toBe(original);
			}
		});

		it("round-trips percentage values", () => {
			const original = "10%";
			const parsed = Parse.Thickness.parse(original);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Generate.Thickness.toCss(parsed.value);
				expect(generated).toBe(original);
			}
		});
	});
});
