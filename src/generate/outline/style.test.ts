// b_path:: src/generate/outline/style.test.ts
import { describe, expect, it } from "vitest";
import { generate } from "./style.js";

describe("generate/outline/style", () => {
	it("generates none", () => {
		const result = generate({ kind: "outline-style", style: "none" });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("none");
	});

	it("generates solid", () => {
		const result = generate({ kind: "outline-style", style: "solid" });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("solid");
	});

	it("generates dashed", () => {
		const result = generate({ kind: "outline-style", style: "dashed" });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("dashed");
	});

	it("generates dotted", () => {
		const result = generate({ kind: "outline-style", style: "dotted" });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("dotted");
	});

	it("generates double", () => {
		const result = generate({ kind: "outline-style", style: "double" });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("double");
	});
});
