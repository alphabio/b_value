import { describe, expect, it } from "vitest";
import { generate } from "./display";

describe("generateDisplay", () => {
	it("should generate block", () => {
		const result = generate({ kind: "display", value: "block" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("block");
	});

	it("should generate flex", () => {
		const result = generate({ kind: "display", value: "flex" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("flex");
	});

	it("should generate none", () => {
		const result = generate({ kind: "display", value: "none" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("none");
	});

	it("should generate inline-block", () => {
		const result = generate({ kind: "display", value: "inline-block" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("inline-block");
	});

	it("should handle null input", () => {
		const result = generate(null as any);
		expect(result.ok).toBe(false);
	});

	it("should handle undefined input", () => {
		const result = generate(undefined as any);
		expect(result.ok).toBe(false);
	});
});
