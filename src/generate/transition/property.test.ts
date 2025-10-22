import { describe, expect, it } from "vitest";
import { generate } from "./property.js";

describe("generate/transition/property", () => {
	it("generates all", () => {
		const result = generate({ kind: "transition-property", properties: [{ type: "all" }] });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("all");
	});

	it("generates none", () => {
		const result = generate({ kind: "transition-property", properties: [{ type: "none" }] });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("none");
	});

	it("generates single property", () => {
		const result = generate({ kind: "transition-property", properties: [{ type: "identifier", value: "opacity" }] });
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("opacity");
	});

	it("generates multiple properties", () => {
		const result = generate({
			kind: "transition-property",
			properties: [
				{ type: "identifier", value: "opacity" },
				{ type: "identifier", value: "transform" },
			],
		});
		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.value).toBe("opacity, transform");
	});
});
