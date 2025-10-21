// b_path:: src/parse/color/color.test.ts

import { describe, expect, it } from "vitest";
import { parse } from "./color";

describe("parse() - unified color dispatcher", () => {
	describe("hex colors", () => {
		it("detects 3-digit hex", () => {
			const result = parse("#abc");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value?.kind).toBe("hex");
			}
		});

		it("detects 6-digit hex", () => {
			const result = parse("#ff5733");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value?.kind).toBe("hex");
			}
		});

		it("detects 8-digit hex with alpha", () => {
			const result = parse("#ff573380");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value?.kind).toBe("hex");
			}
		});
	});

	describe("rgb/rgba functions", () => {
		it("detects rgb()", () => {
			const result = parse("rgb(255, 0, 0)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value?.kind).toBe("rgb");
			}
		});

		it("detects rgba()", () => {
			const result = parse("rgba(255, 0, 0, 0.5)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value?.kind).toBe("rgb");
			}
		});

		it("detects modern rgb with alpha", () => {
			const result = parse("rgb(255 0 0 / 50%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value?.kind).toBe("rgb");
			}
		});
	});

	describe("hsl/hsla functions", () => {
		it("detects hsl()", () => {
			const result = parse("hsl(0, 100%, 50%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value?.kind).toBe("hsl");
			}
		});

		it("detects hsla()", () => {
			const result = parse("hsla(120, 100%, 50%, 0.5)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value?.kind).toBe("hsl");
			}
		});

		it("detects modern hsl with alpha", () => {
			const result = parse("hsl(240 100% 50% / 0.5)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value?.kind).toBe("hsl");
			}
		});
	});

	describe("hwb function", () => {
		it("detects hwb()", () => {
			const result = parse("hwb(0 0% 0%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value?.kind).toBe("hwb");
			}
		});

		it("detects hwb with alpha", () => {
			const result = parse("hwb(120 30% 40% / 0.5)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value?.kind).toBe("hwb");
			}
		});
	});

	describe("lab function", () => {
		it("detects lab()", () => {
			const result = parse("lab(50% 40 30)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value?.kind).toBe("lab");
			}
		});

		it("detects lab with alpha", () => {
			const result = parse("lab(50% 40 30 / 0.5)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value?.kind).toBe("lab");
			}
		});
	});

	describe("lch function", () => {
		it("detects lch()", () => {
			const result = parse("lch(50% 40 30)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value?.kind).toBe("lch");
			}
		});

		it("detects lch with alpha", () => {
			const result = parse("lch(50% 40 30 / 0.5)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value?.kind).toBe("lch");
			}
		});
	});

	describe("oklab function", () => {
		it("detects oklab()", () => {
			const result = parse("oklab(0.5 0.4 0.3)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value?.kind).toBe("oklab");
			}
		});

		it("detects oklab with alpha", () => {
			const result = parse("oklab(0.5 0.4 0.3 / 0.5)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value?.kind).toBe("oklab");
			}
		});
	});

	describe("oklch function", () => {
		it("detects oklch()", () => {
			const result = parse("oklch(0.5 0.4 30)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value?.kind).toBe("oklch");
			}
		});

		it("detects oklch with alpha", () => {
			const result = parse("oklch(0.5 0.4 30 / 0.5)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value?.kind).toBe("oklch");
			}
		});
	});

	describe("color function", () => {
		it("detects color() with srgb", () => {
			const result = parse("color(srgb 1 0 0)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value?.kind).toBe("color");
			}
		});

		it("detects color() with display-p3", () => {
			const result = parse("color(display-p3 1 0 0)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value?.kind).toBe("color");
			}
		});
	});

	describe("named colors", () => {
		it("detects basic named color", () => {
			const result = parse("red");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value?.kind).toBe("named");
				if (result.value?.kind === "named") {
					expect(result.value?.name).toBe("red");
				}
			}
		});

		it("detects extended named color", () => {
			const result = parse("cornflowerblue");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value?.kind).toBe("named");
				if (result.value?.kind === "named") {
					expect(result.value?.name).toBe("cornflowerblue");
				}
			}
		});

		it("handles case insensitivity", () => {
			const result = parse("BLUE");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value?.kind).toBe("named");
			}
		});
	});

	describe("special colors", () => {
		it("detects transparent", () => {
			const result = parse("transparent");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value?.kind).toBe("special");
				if (result.value?.kind === "special") {
					expect(result.value?.keyword).toBe("transparent");
				}
			}
		});

		it("detects currentcolor", () => {
			const result = parse("currentcolor");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value?.kind).toBe("special");
				if (result.value?.kind === "special") {
					expect(result.value?.keyword).toBe("currentcolor");
				}
			}
		});

		it("handles case insensitivity for special", () => {
			const result = parse("CurrentColor");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value?.kind).toBe("special");
			}
		});
	});

	describe("system colors", () => {
		it("detects Canvas", () => {
			const result = parse("Canvas");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value?.kind).toBe("system");
			}
		});

		it("detects ButtonText", () => {
			const result = parse("ButtonText");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value?.kind).toBe("system");
			}
		});
	});

	describe("error cases", () => {
		it("rejects empty value", () => {
			const result = parse("");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.issues[0]?.message).toContain("Empty");
			}
		});

		it("rejects unknown function", () => {
			const result = parse("unknown(10, 20, 30)");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.issues[0]?.message).toContain("Unknown color function");
			}
		});

		it("rejects invalid identifier", () => {
			const result = parse("notacolor");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.issues[0]?.message).toContain("color name");
			}
		});

		it("rejects invalid hex", () => {
			const result = parse("#gggggg");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.issues[0]?.message).toContain("Invalid hex");
			}
		});
	});

	describe("case insensitivity", () => {
		it("handles RGB()", () => {
			const result = parse("RGB(255, 0, 0)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value?.kind).toBe("rgb");
			}
		});

		it("handles HSL()", () => {
			const result = parse("HSL(0, 100%, 50%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value?.kind).toBe("hsl");
			}
		});

		it("handles OKLCH()", () => {
			const result = parse("OKLCH(0.5 0.4 30)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value?.kind).toBe("oklch");
			}
		});
	});
});
