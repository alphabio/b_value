// b_path:: src/parse/clip-path/none.test.ts

import { describe, expect, it } from "vitest";
import * as Generate from "@/generate/clip-path/none";
import { parse } from "./none";

describe("parse clip-path none", () => {
	it("parses none keyword", () => {
		const result = parse("none");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toEqual({
				kind: "clip-path-none",
			});
		}
	});

	it("handles whitespace", () => {
		const result = parse("  none  ");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.kind).toBe("clip-path-none");
		}
	});

	it("rejects invalid keyword", () => {
		const result = parse("auto");
		expect(result.ok).toBe(false);
	});

	it("rejects empty string", () => {
		const result = parse("");
		expect(result.ok).toBe(false);
	});

	it("is case-sensitive", () => {
		const result = parse("None");
		expect(result.ok).toBe(false);
	});
});

describe("round-trip none", () => {
	it("round-trips: none", () => {
		const parsed = parse("none");
		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			const generated = Generate.toCss(parsed.value);
			expect(generated).toBe("none");
			const reparsed = parse(generated);
			expect(reparsed.ok).toBe(true);
			if (reparsed.ok) {
				expect(reparsed.value).toEqual(parsed.value);
			}
		}
	});
});
