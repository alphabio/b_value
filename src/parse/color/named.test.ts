// b_path:: src/parse/color/named.test.ts
import { describe, expect, it } from "vitest";
import { parse } from "./named";

describe("parse named color", () => {
	it("parses basic color 'red'", () => {
		const result = parse("red");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toEqual({
				kind: "named",
				name: "red",
			});
		}
	});

	it("parses basic color 'blue'", () => {
		const result = parse("blue");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.name).toBe("blue");
		}
	});

	it("parses basic color 'green'", () => {
		const result = parse("green");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.name).toBe("green");
		}
	});

	it("parses extended color 'cornflowerblue'", () => {
		const result = parse("cornflowerblue");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.name).toBe("cornflowerblue");
		}
	});

	it("parses extended color 'rebeccapurple'", () => {
		const result = parse("rebeccapurple");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.name).toBe("rebeccapurple");
		}
	});

	it("parses case-insensitively", () => {
		const result = parse("RED");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.name).toBe("red");
		}
	});

	it("parses mixed case", () => {
		const result = parse("CornFlowerBlue");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.name).toBe("cornflowerblue");
		}
	});

	it("rejects invalid color name", () => {
		const result = parse("notacolor");
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("Unknown color name");
		}
	});

	it("rejects empty string", () => {
		const result = parse("");
		expect(result.ok).toBe(false);
	});

	it("rejects whitespace only", () => {
		const result = parse("   ");
		expect(result.ok).toBe(false);
	});

	it("parses all basic colors", () => {
		const basicColors = [
			"aqua",
			"black",
			"blue",
			"fuchsia",
			"gray",
			"green",
			"lime",
			"maroon",
			"navy",
			"olive",
			"purple",
			"red",
			"silver",
			"teal",
			"white",
			"yellow",
		];

		for (const color of basicColors) {
			const result = parse(color);
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.name).toBe(color);
			}
		}
	});
});
