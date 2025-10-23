import { describe, expect, it } from "vitest";
import { parseColor } from "./color";

describe("parseColor", () => {
	describe("hex colors", () => {
		it("parses valid 6-digit hex", () => {
			const result = parseColor("#ff0000");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("hex");
			}
		});

		it("parses valid 3-digit hex", () => {
			const result = parseColor("#f00");
			expect(result.ok).toBe(true);
		});

		it("parses valid 8-digit hex with alpha", () => {
			const result = parseColor("#ff0000ff");
			expect(result.ok).toBe(true);
		});

		it("trims whitespace before parsing hex", () => {
			const result = parseColor("  #ff0000  ");
			expect(result.ok).toBe(true);
		});
	});

	describe("rgb/rgba colors", () => {
		it("parses rgb() format", () => {
			const result = parseColor("rgb(255, 0, 0)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("rgb");
			}
		});

		it("parses rgba() format", () => {
			const result = parseColor("rgba(255, 0, 0, 0.5)");
			expect(result.ok).toBe(true);
		});

		it("handles uppercase RGB", () => {
			const result = parseColor("RGB(255, 0, 0)");
			expect(result.ok).toBe(true);
		});
	});

	describe("hsl/hsla colors", () => {
		it("parses hsl() format", () => {
			const result = parseColor("hsl(0, 100%, 50%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("hsl");
			}
		});

		it("parses hsla() format", () => {
			const result = parseColor("hsla(0, 100%, 50%, 0.5)");
			expect(result.ok).toBe(true);
		});
	});

	describe("hwb colors", () => {
		it("parses hwb() format", () => {
			const result = parseColor("hwb(0 0% 0%)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("hwb");
			}
		});
	});

	describe("lab colors", () => {
		it("parses lab() format", () => {
			const result = parseColor("lab(50% 40 30)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("lab");
			}
		});
	});

	describe("lch colors", () => {
		it("parses lch() format", () => {
			const result = parseColor("lch(50% 40 30)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("lch");
			}
		});
	});

	describe("oklab colors", () => {
		it("parses oklab() format", () => {
			const result = parseColor("oklab(0.5 0.4 0.3)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("oklab");
			}
		});
	});

	describe("oklch colors", () => {
		it("parses oklch() format", () => {
			const result = parseColor("oklch(0.5 0.4 30)");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("oklch");
			}
		});
	});

	describe("special keywords", () => {
		it("parses transparent keyword", () => {
			const result = parseColor("transparent");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("special");
			}
		});

		it("parses currentcolor keyword", () => {
			const result = parseColor("currentcolor");
			expect(result.ok).toBe(true);
		});

		it("handles case-insensitive keywords", () => {
			const result = parseColor("TRANSPARENT");
			expect(result.ok).toBe(true);
		});
	});

	describe("system colors", () => {
		it("parses system color keywords", () => {
			const result = parseColor("Canvas");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("system");
			}
		});
	});

	describe("named colors", () => {
		it("parses named color keywords", () => {
			const result = parseColor("red");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("named");
			}
		});

		it("handles case-insensitive named colors", () => {
			const result = parseColor("RED");
			expect(result.ok).toBe(true);
		});

		it("rejects invalid color names", () => {
			const result = parseColor("notacolor");
			expect(result.ok).toBe(false);
		});
	});

	describe("edge cases", () => {
		it("trims whitespace", () => {
			const result = parseColor("  red  ");
			expect(result.ok).toBe(true);
		});

		it("handles empty string", () => {
			const result = parseColor("");
			expect(result.ok).toBe(false);
		});

		it("rejects invalid format", () => {
			const result = parseColor("invalid(1, 2, 3)");
			expect(result.ok).toBe(false);
		});
	});
});
