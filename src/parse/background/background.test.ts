// b_path:: src/parse/background/background.test.ts
import { describe, expect, it } from "vitest";
import * as Generate from "../../generate/background";
import * as Parse from "./index";

describe("Background.Attachment", () => {
	it("parses scroll", () => {
		const result = Parse.Attachment.parse("scroll");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("scroll");
	});

	it("parses fixed", () => {
		const result = Parse.Attachment.parse("fixed");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("fixed");
	});

	it("parses local", () => {
		const result = Parse.Attachment.parse("local");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("local");
	});

	it("rejects invalid keyword", () => {
		const result = Parse.Attachment.parse("invalid");
		expect(result.ok).toBe(false);
	});

	it("round-trips", () => {
		const original = "fixed";
		const parsed = Parse.Attachment.parse(original);
		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = Generate.Attachment.toCss(parsed.value);
			expect(generated).toBe(original);
		}
	});
});

describe("Background.Repeat", () => {
	it("parses repeat", () => {
		const result = Parse.Repeat.parse("repeat");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("repeat");
	});

	it("parses repeat-x", () => {
		const result = Parse.Repeat.parse("repeat-x");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("repeat-x");
	});

	it("parses repeat-y", () => {
		const result = Parse.Repeat.parse("repeat-y");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("repeat-y");
	});

	it("parses no-repeat", () => {
		const result = Parse.Repeat.parse("no-repeat");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("no-repeat");
	});

	it("parses space", () => {
		const result = Parse.Repeat.parse("space");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("space");
	});

	it("parses round", () => {
		const result = Parse.Repeat.parse("round");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("round");
	});

	it("rejects invalid keyword", () => {
		const result = Parse.Repeat.parse("invalid");
		expect(result.ok).toBe(false);
	});

	it("round-trips", () => {
		const original = "repeat-x";
		const parsed = Parse.Repeat.parse(original);
		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = Generate.Repeat.toCss(parsed.value);
			expect(generated).toBe(original);
		}
	});
});

describe("Background.Clip", () => {
	it("parses border-box", () => {
		const result = Parse.Clip.parse("border-box");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("border-box");
	});

	it("parses padding-box", () => {
		const result = Parse.Clip.parse("padding-box");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("padding-box");
	});

	it("parses content-box", () => {
		const result = Parse.Clip.parse("content-box");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("content-box");
	});

	it("parses text", () => {
		const result = Parse.Clip.parse("text");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("text");
	});

	it("rejects invalid keyword", () => {
		const result = Parse.Clip.parse("invalid");
		expect(result.ok).toBe(false);
	});

	it("round-trips", () => {
		const original = "padding-box";
		const parsed = Parse.Clip.parse(original);
		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = Generate.Clip.toCss(parsed.value);
			expect(generated).toBe(original);
		}
	});
});

describe("Background.Origin", () => {
	it("parses border-box", () => {
		const result = Parse.Origin.parse("border-box");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("border-box");
	});

	it("parses padding-box", () => {
		const result = Parse.Origin.parse("padding-box");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("padding-box");
	});

	it("parses content-box", () => {
		const result = Parse.Origin.parse("content-box");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("content-box");
	});

	it("rejects invalid keyword", () => {
		const result = Parse.Origin.parse("invalid");
		expect(result.ok).toBe(false);
	});

	it("round-trips", () => {
		const original = "content-box";
		const parsed = Parse.Origin.parse(original);
		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = Generate.Origin.toCss(parsed.value);
			expect(generated).toBe(original);
		}
	});
});

describe("Background.Size", () => {
	describe("keywords", () => {
		it("parses cover", () => {
			const result = Parse.Size.parse("cover");
			expect(result.ok).toBe(true);
			if (result.ok) expect(result.value).toBe("cover");
		});

		it("parses contain", () => {
			const result = Parse.Size.parse("contain");
			expect(result.ok).toBe(true);
			if (result.ok) expect(result.value).toBe("contain");
		});

		it("parses auto", () => {
			const result = Parse.Size.parse("auto");
			expect(result.ok).toBe(true);
			if (result.ok) expect(result.value).toBe("auto");
		});
	});

	describe("length/percentage values", () => {
		it("parses pixel values", () => {
			const result = Parse.Size.parse("100px");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ value: 100, unit: "px" });
			}
		});

		it("parses percentage values", () => {
			const result = Parse.Size.parse("50%");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ value: 50, unit: "%" });
			}
		});

		it("parses em values", () => {
			const result = Parse.Size.parse("2em");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual({ value: 2, unit: "em" });
			}
		});
	});

	it("rejects invalid keyword", () => {
		const result = Parse.Size.parse("invalid");
		expect(result.ok).toBe(false);
	});

	describe("round-trips", () => {
		it("round-trips keywords", () => {
			const original = "cover";
			const parsed = Parse.Size.parse(original);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Generate.Size.toCss(parsed.value);
				expect(generated).toBe(original);
			}
		});

		it("round-trips auto", () => {
			const original = "auto";
			const parsed = Parse.Size.parse(original);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Generate.Size.toCss(parsed.value);
				expect(generated).toBe(original);
			}
		});

		it("round-trips length values", () => {
			const original = "100px";
			const parsed = Parse.Size.parse(original);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Generate.Size.toCss(parsed.value);
				expect(generated).toBe(original);
			}
		});

		it("round-trips percentage values", () => {
			const original = "50%";
			const parsed = Parse.Size.parse(original);
			expect(parsed.ok).toBe(true);
			if (parsed.ok) {
				const generated = Generate.Size.toCss(parsed.value);
				expect(generated).toBe(original);
			}
		});
	});
});
