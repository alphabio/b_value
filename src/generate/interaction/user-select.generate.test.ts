// b_path:: src/generate/interaction/user-select.generate.test.ts
import { describe, expect, it } from "vitest";
import { toCss } from "./user-select";

describe("Generate.Interaction.UserSelect", () => {
	it("should generate 'auto'", () => {
		const result = toCss({ kind: "user-select", value: "auto" });
		expect(result).toBe("auto");
	});

	it("should generate 'text'", () => {
		const result = toCss({ kind: "user-select", value: "text" });
		expect(result).toBe("text");
	});

	it("should generate 'none'", () => {
		const result = toCss({ kind: "user-select", value: "none" });
		expect(result).toBe("none");
	});

	it("should generate 'contain'", () => {
		const result = toCss({ kind: "user-select", value: "contain" });
		expect(result).toBe("contain");
	});

	it("should generate 'all'", () => {
		const result = toCss({ kind: "user-select", value: "all" });
		expect(result).toBe("all");
	});
});
