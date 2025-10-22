// b_path:: src/generate/interaction/user-select.generate.test.ts
import { describe, expect, it } from "vitest";

describe("Generate.Interaction.UserSelect", () => {
	it("should generate 'auto'", () => {
		const result = toCss({ kind: "user-select", value: "auto" });
		expect(result).toEqual({ ok: true, issues: [], value: "auto" });
	});

	it("should generate 'text'", () => {
		const result = toCss({ kind: "user-select", value: "text" });
		expect(result).toEqual({ ok: true, issues: [], value: "text" });
	});

	it("should generate 'none'", () => {
		const result = toCss({ kind: "user-select", value: "none" });
		expect(result).toEqual({ ok: true, issues: [], value: "none" });
	});

	it("should generate 'contain'", () => {
		const result = toCss({ kind: "user-select", value: "contain" });
		expect(result).toEqual({ ok: true, issues: [], value: "contain" });
	});

	it("should generate 'all'", () => {
		const result = toCss({ kind: "user-select", value: "all" });
		expect(result).toEqual({ ok: true, issues: [], value: "all" });
	});
});
