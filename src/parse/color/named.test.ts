// b_path:: src/parse/color/named.test.ts
import { describe, expect, it } from "vitest";
import * as Gen from "@/generate/color/named";
import * as Named from "./named";

describe("named color parser", () => {
	describe("basic colors", () => {
		it("parses 'red'", () => {
			const result = Named.parse("red");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("named");
				expect(result.value.name).toBe("red");
			}
		});

		it("parses 'blue'", () => {
			const result = Named.parse("blue");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.name).toBe("blue");
			}
		});

		it("parses 'green'", () => {
			const result = Named.parse("green");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.name).toBe("green");
			}
		});

		it("parses 'yellow'", () => {
			const result = Named.parse("yellow");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.name).toBe("yellow");
			}
		});

		it("parses 'black'", () => {
			const result = Named.parse("black");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.name).toBe("black");
			}
		});

		it("parses 'white'", () => {
			const result = Named.parse("white");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.name).toBe("white");
			}
		});

		it("parses 'gray'", () => {
			const result = Named.parse("gray");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.name).toBe("gray");
			}
		});

		it("parses 'grey'", () => {
			const result = Named.parse("grey");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.name).toBe("grey");
			}
		});
	});

	describe("extended colors", () => {
		it("parses 'cornflowerblue'", () => {
			const result = Named.parse("cornflowerblue");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.kind).toBe("named");
				expect(result.value.name).toBe("cornflowerblue");
			}
		});

		it("parses 'aliceblue'", () => {
			const result = Named.parse("aliceblue");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.name).toBe("aliceblue");
			}
		});

		it("parses 'antiquewhite'", () => {
			const result = Named.parse("antiquewhite");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.name).toBe("antiquewhite");
			}
		});

		it("parses 'aquamarine'", () => {
			const result = Named.parse("aquamarine");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.name).toBe("aquamarine");
			}
		});

		it("parses 'blanchedalmond'", () => {
			const result = Named.parse("blanchedalmond");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.name).toBe("blanchedalmond");
			}
		});

		it("parses 'darkorchid'", () => {
			const result = Named.parse("darkorchid");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.name).toBe("darkorchid");
			}
		});

		it("parses 'mediumspringgreen'", () => {
			const result = Named.parse("mediumspringgreen");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.name).toBe("mediumspringgreen");
			}
		});
	});

	describe("case insensitivity", () => {
		it("parses 'RED'", () => {
			const result = Named.parse("RED");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.name).toBe("red");
			}
		});

		it("parses 'Blue'", () => {
			const result = Named.parse("Blue");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.name).toBe("blue");
			}
		});

		it("parses 'CORNFLOWERBLUE'", () => {
			const result = Named.parse("CORNFLOWERBLUE");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.name).toBe("cornflowerblue");
			}
		});

		it("parses 'AliceBlue'", () => {
			const result = Named.parse("AliceBlue");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.name).toBe("aliceblue");
			}
		});

		it("parses 'MediumSpringGreen'", () => {
			const result = Named.parse("MediumSpringGreen");
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.name).toBe("mediumspringgreen");
			}
		});
	});

	describe("error handling", () => {
		it("rejects unknown color name", () => {
			const result = Named.parse("notacolor");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toBe("Unknown color name: notacolor");
			}
		});

		it("rejects empty string", () => {
			const result = Named.parse("");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toBe("Unknown color name: ");
			}
		});

		it("rejects numbers", () => {
			const result = Named.parse("123");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toBe("Unknown color name: 123");
			}
		});

		it("rejects special characters", () => {
			const result = Named.parse("red@blue");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toBe("Unknown color name: red@blue");
			}
		});

		it("rejects hex-like strings", () => {
			const result = Named.parse("#ff5733");
			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toBe("Unknown color name: #ff5733");
			}
		});
	});

	describe("round-trip accuracy", () => {
		it("maintains 'red'", () => {
			const result = Named.parse("red");
			expect(result.ok).toBe(true);
			if (result.ok) {
				const css = Gen.toCss(result.value);
				expect(css).toBe("red");
			}
		});

		it("normalizes uppercase to lowercase", () => {
			const result = Named.parse("BLUE");
			expect(result.ok).toBe(true);
			if (result.ok) {
				const css = Gen.toCss(result.value);
				expect(css).toBe("blue");
			}
		});

		it("maintains 'cornflowerblue'", () => {
			const result = Named.parse("cornflowerblue");
			expect(result.ok).toBe(true);
			if (result.ok) {
				const css = Gen.toCss(result.value);
				expect(css).toBe("cornflowerblue");
			}
		});

		it("normalizes mixed case", () => {
			const result = Named.parse("AliceBlue");
			expect(result.ok).toBe(true);
			if (result.ok) {
				const css = Gen.toCss(result.value);
				expect(css).toBe("aliceblue");
			}
		});

		it("maintains 'mediumspringgreen'", () => {
			const result = Named.parse("mediumspringgreen");
			expect(result.ok).toBe(true);
			if (result.ok) {
				const css = Gen.toCss(result.value);
				expect(css).toBe("mediumspringgreen");
			}
		});
	});
});
