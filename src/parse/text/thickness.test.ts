import { describe, expect, it } from "vitest";
import { parse } from "./thickness";

describe("parse text-decoration-thickness", () => {
	it("parses auto keyword", () => {
		const result = parse("auto");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("auto");
		}
	});

	it("parses from-font keyword", () => {
		const result = parse("from-font");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("from-font");
		}
	});

	it("parses px length values", () => {
		const result = parse("2px");
		expect(result.ok).toBe(true);
		if (result.ok && typeof result.value === "object") {
			expect(result.value.value).toBe(2);
			expect(result.value.unit).toBe("px");
		}
	});

	it("parses em length values", () => {
		const result = parse("0.1em");
		expect(result.ok).toBe(true);
		if (result.ok && typeof result.value === "object") {
			expect(result.value.value).toBe(0.1);
			expect(result.value.unit).toBe("em");
		}
	});

	it("parses percentage values", () => {
		const result = parse("10%");
		expect(result.ok).toBe(true);
		if (result.ok && typeof result.value === "object") {
			expect(result.value.value).toBe(10);
			expect(result.value.unit).toBe("%");
		}
	});

	it("handles whitespace", () => {
		const result = parse("  auto  ");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("auto");
		}
	});

	it("rejects invalid keywords", () => {
		const result = parse("invalid");
		expect(result.ok).toBe(false);
	});

	it("rejects empty string", () => {
		const result = parse("");
		expect(result.ok).toBe(false);
	});
});
