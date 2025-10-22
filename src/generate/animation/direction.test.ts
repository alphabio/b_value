import { describe, expect, it } from "vitest";
import { generate } from "./direction";

describe("generate() - animation-direction", () => {
	it("should generate single direction - normal", () => {
		const result = generate({
			kind: "animation-direction",
			directions: ["normal"],
		});
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("normal");
	});

	it("should generate single direction - reverse", () => {
		const result = generate({
			kind: "animation-direction",
			directions: ["reverse"],
		});
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("reverse");
	});

	it("should generate single direction - alternate", () => {
		const result = generate({
			kind: "animation-direction",
			directions: ["alternate"],
		});
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("alternate");
	});

	it("should generate single direction - alternate-reverse", () => {
		const result = generate({
			kind: "animation-direction",
			directions: ["alternate-reverse"],
		});
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("alternate-reverse");
	});

	it("should generate multiple directions", () => {
		const result = generate({
			kind: "animation-direction",
			directions: ["normal", "reverse", "alternate"],
		});
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("normal, reverse, alternate");
	});
});
