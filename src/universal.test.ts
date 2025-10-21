// b_path:: src/universal.test.ts

import { describe, expect, it } from "vitest";
import { generate, parse } from "./universal";

describe("parse() - Universal CSS longhand property parser", () => {
	describe("Color properties", () => {
		it("should parse color property", () => {
			const result = parse("color: red");
			expect(result.ok).toBe(true);
			expect(result.property).toBe("color");
			if (result.ok) {
				expect(result.value).toEqual({ kind: "named", name: "red" });
			}
		});

		it("should parse background-color property", () => {
			const result = parse("background-color: #ff0000");
			expect(result.ok).toBe(true);
			expect(result.property).toBe("background-color");
		});

		it("should parse text-decoration-color property", () => {
			const result = parse("text-decoration-color: rgb(255, 0, 0)");
			expect(result.ok).toBe(true);
			expect(result.property).toBe("text-decoration-color");
		});
	});

	describe("Layout properties", () => {
		it("should parse top property", () => {
			const result = parse("top: 10px");
			expect(result.ok).toBe(true);
			expect(result.property).toBe("top");
		});

		it("should parse width property", () => {
			const result = parse("width: 100%");
			expect(result.ok).toBe(true);
			expect(result.property).toBe("width");
		});

		it("should parse display property", () => {
			const result = parse("display: flex");
			expect(result.ok).toBe(true);
			expect(result.property).toBe("display");
		});

		it("should parse position property", () => {
			const result = parse("position: absolute");
			expect(result.ok).toBe(true);
			expect(result.property).toBe("position");
		});
	});

	describe("Text decoration properties", () => {
		it("should parse text-decoration-line property", () => {
			const result = parse("text-decoration-line: underline");
			expect(result.ok).toBe(true);
			expect(result.property).toBe("text-decoration-line");
		});

		it("should parse text-decoration-style property", () => {
			const result = parse("text-decoration-style: wavy");
			expect(result.ok).toBe(true);
			expect(result.property).toBe("text-decoration-style");
		});

		it("should parse text-decoration-thickness property", () => {
			const result = parse("text-decoration-thickness: 2px");
			expect(result.ok).toBe(true);
			expect(result.property).toBe("text-decoration-thickness");
		});
	});

	describe("Background properties", () => {
		it("should parse background-size property", () => {
			const result = parse("background-size: cover");
			expect(result.ok).toBe(true);
			expect(result.property).toBe("background-size");
		});

		it("should parse background-repeat property", () => {
			const result = parse("background-repeat: repeat-x");
			expect(result.ok).toBe(true);
			expect(result.property).toBe("background-repeat");
		});

		it("should parse background-position property", () => {
			const result = parse("background-position: center top");
			expect(result.ok).toBe(true);
			expect(result.property).toBe("background-position");
		});
	});

	describe("Border properties", () => {
		it("should parse border-top-width property", () => {
			const result = parse("border-top-width: 1px");
			expect(result.ok).toBe(true);
			expect(result.property).toBe("border-top-width");
		});

		it("should parse border-top-style property", () => {
			const result = parse("border-top-style: solid");
			expect(result.ok).toBe(true);
			expect(result.property).toBe("border-top-style");
		});

		it("should parse border-top-color property", () => {
			const result = parse("border-top-color: red");
			expect(result.ok).toBe(true);
			expect(result.property).toBe("border-top-color");
		});

		it("should parse border-radius property", () => {
			const result = parse("border-radius: 5px");
			expect(result.ok).toBe(true);
			expect(result.property).toBe("border-radius");
		});
	});

	describe("Complex properties", () => {
		it("should parse transform property", () => {
			const result = parse("transform: rotate(45deg)");
			expect(result.ok).toBe(true);
			expect(result.property).toBe("transform");
		});

		it("should parse filter property", () => {
			const result = parse("filter: blur(5px)");
			expect(result.ok).toBe(true);
			expect(result.property).toBe("filter");
		});

		it("should parse clip-path property", () => {
			const result = parse("clip-path: circle(50%)");
			expect(result.ok).toBe(true);
			expect(result.property).toBe("clip-path");
		});
	});

	describe("Declaration syntax", () => {
		it("should handle trailing semicolon", () => {
			const result = parse("color: red;");
			expect(result.ok).toBe(true);
			expect(result.property).toBe("color");
		});

		it("should handle extra whitespace", () => {
			const result = parse("  color  :  red  ");
			expect(result.ok).toBe(true);
			expect(result.property).toBe("color");
		});

		it("should reject invalid syntax", () => {
			const result = parse("not a declaration");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.issues[0]?.message).toContain("Invalid CSS declaration syntax");
			}
		});

		it("should reject empty string", () => {
			const result = parse("");
			expect(result.ok).toBe(false);
		});
	});

	describe("Shorthand rejection", () => {
		it("should reject background shorthand", () => {
			const result = parse("background: red url(image.png) repeat-x");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.issues[0]?.message).toContain("shorthand");
				expect(result.issues[0]?.action).toContain("b_short");
				expect(result.property).toBe("background");
			}
		});

		it("should reject border shorthand", () => {
			const result = parse("border: 1px solid red");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.issues[0]?.message).toContain("shorthand");
				expect(result.property).toBe("border");
			}
		});

		it("should reject border-color shorthand", () => {
			const result = parse("border-color: red blue");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.issues[0]?.message).toContain("shorthand");
			}
		});

		it("should reject border-style shorthand", () => {
			const result = parse("border-style: solid dashed");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.issues[0]?.message).toContain("shorthand");
			}
		});

		it("should reject border-width shorthand", () => {
			const result = parse("border-width: 1px 2px");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.issues[0]?.message).toContain("shorthand");
			}
		});

		it("should reject text-decoration shorthand", () => {
			const result = parse("text-decoration: underline wavy red");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.issues[0]?.message).toContain("shorthand");
				expect(result.property).toBe("text-decoration");
			}
		});

		it("should reject margin shorthand", () => {
			const result = parse("margin: 10px 20px");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.issues[0]?.message).toContain("shorthand");
			}
		});

		it("should reject padding shorthand", () => {
			const result = parse("padding: 10px");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.issues[0]?.message).toContain("shorthand");
			}
		});

		it("should reject animation shorthand", () => {
			const result = parse("animation: spin 1s linear infinite");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.issues[0]?.message).toContain("shorthand");
			}
		});

		it("should reject transition shorthand", () => {
			const result = parse("transition: all 0.3s ease");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.issues[0]?.message).toContain("shorthand");
			}
		});
	});

	describe("Unknown properties", () => {
		it("should reject unknown property", () => {
			const result = parse("not-a-real-property: value");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.issues[0]?.message).toContain("Unknown or unsupported");
				expect(result.property).toBe("not-a-real-property");
			}
		});

		it("should reject typo in property name", () => {
			const result = parse("colr: red");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.issues[0]?.message).toContain("Unknown or unsupported");
			}
		});
	});
});

describe("generate() - Universal CSS value generator", () => {
	describe("Color properties", () => {
		it("should generate color property", () => {
			const result = generate({
				property: "color",
				value: { kind: "hex", value: "#ff0000" },
			});
			expect(result.ok).toBe(true);
			expect(result.property).toBe("color");
			if (result.ok) {
				expect(result.value).toBe("#ff0000");
			}
		});

		it("should generate background-color property", () => {
			const result = generate({
				property: "background-color",
				value: { kind: "named", name: "red" },
			});
			expect(result.ok).toBe(true);
			expect(result.property).toBe("background-color");
		});
	});

	describe("Transform property", () => {
		it("should generate transform property", () => {
			const result = generate({
				property: "transform",
				value: [{ kind: "rotate", angle: { value: 45, unit: "deg" } }],
			});
			expect(result.ok).toBe(true);
			expect(result.property).toBe("transform");
			if (result.ok) {
				expect(result.value).toBe("rotate(45deg)");
			}
		});
	});

	describe("Shorthand rejection", () => {
		it("should reject background shorthand", () => {
			const result = generate({
				property: "background",
				value: {},
			});
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.issues[0]?.message).toContain("shorthand");
				expect(result.property).toBe("background");
			}
		});

		it("should reject border shorthand", () => {
			const result = generate({
				property: "border",
				value: {},
			});
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.issues[0]?.message).toContain("shorthand");
			}
		});
	});

	describe("Unknown properties", () => {
		it("should reject unknown property", () => {
			const result = generate({
				property: "not-a-real-property",
				value: {},
			});
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.issues[0]?.message).toContain("Unknown or unsupported");
			}
		});
	});
});
