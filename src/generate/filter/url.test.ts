import { describe, expect, test } from "vitest";
import { generate } from "./url";

describe("url filter generator", () => {
	test("should generate url with fragment", () => {
		const result = generate({ kind: "url", url: "#filter-id" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("url(#filter-id)");
	});

	test("should generate url with svg path", () => {
		const result = generate({ kind: "url", url: "filters.svg#blur" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("url(filters.svg#blur)");
	});

	test("should generate url with full path", () => {
		const result = generate({ kind: "url", url: "/assets/filters.svg#shadow" });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe("url(/assets/filters.svg#shadow)");
	});

	test("should error on null input", () => {
		const result = generate(null as any);
		expect(result.ok).toBe(false);
	});
});
