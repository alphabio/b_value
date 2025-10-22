import { describe, expect, it } from "vitest";
import { generate } from "./name";

describe("generate() - animation-name", () => {
	it("should generate identifier name", () => {
		const result = generate({
			kind: "animation-name",
			names: [{ type: "identifier", value: "slideIn" }],
		});
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("slideIn");
	});

	it("should generate none keyword", () => {
		const result = generate({
			kind: "animation-name",
			names: [{ type: "none" }],
		});
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("none");
	});

	it("should generate multiple names", () => {
		const result = generate({
			kind: "animation-name",
			names: [{ type: "identifier", value: "fadeIn" }, { type: "identifier", value: "slideUp" }, { type: "none" }],
		});
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("fadeIn, slideUp, none");
	});

	it("should handle kebab-case names", () => {
		const result = generate({
			kind: "animation-name",
			names: [{ type: "identifier", value: "slide-in-from-top" }],
		});
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("slide-in-from-top");
	});
});
