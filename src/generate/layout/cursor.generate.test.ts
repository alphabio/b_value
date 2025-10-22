import { describe, expect, it } from "vitest";
import { generate } from "./cursor";

describe("generateCursor", () => {
	it("should generate pointer", () => {
		const result = generate({ kind: "cursor", value: "pointer" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("pointer");
	});

	it("should generate default", () => {
		const result = generate({ kind: "cursor", value: "default" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("default");
	});

	it("should generate text", () => {
		const result = generate({ kind: "cursor", value: "text" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("text");
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
