// b_path:: src/parse/shadow/shadow.test.ts
import { describe, expect, it } from "vitest";
import { parse } from "./shadow";

describe("parse shadow", () => {
	it("parses box-shadow with offsets and blur", () => {
		const result = parse("2px 2px 4px rgba(0,0,0,0.5)");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("box-shadow");
		}
	});

	it("parses box-shadow with inset", () => {
		const result = parse("inset 0 0 10px black");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("box-shadow");
		}
	});

	it("parses text-shadow", () => {
		const result = parse("1px 1px 2px black");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toMatch(/shadow/);
		}
	});

	it("parses text-shadow without blur", () => {
		const result = parse("1px 1px red");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toMatch(/shadow/);
		}
	});

	it("rejects invalid shadow", () => {
		const result = parse("invalid");
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.issues.length).toBeGreaterThan(0);
		}
	});

	it("rejects empty string", () => {
		const result = parse("");
		expect(result.ok).toBe(false);
	});
});
