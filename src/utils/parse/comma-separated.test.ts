// b_path:: src/utils/parse/comma-separated.test.ts

import type * as csstree from "css-tree";
import { describe, expect, it } from "vitest";
import { err, ok, type Result } from "@/core/result";
import { parseCommaSeparatedSingle } from "./comma-separated";

function mockIdentifierParser(node: csstree.CssNode): Result<string, string> {
	if (node.type !== "Identifier") {
		return err(`Expected Identifier, got ${node.type}`);
	}
	return ok(node.name);
}

function mockNumberParser(node: csstree.CssNode): Result<number, string> {
	if (node.type === "Number") {
		return ok(Number.parseFloat(node.value));
	}
	if (node.type === "Dimension" && node.unit === "px") {
		return ok(Number.parseFloat(node.value));
	}
	return err(`Expected number or dimension, got ${node.type}`);
}

describe("parseCommaSeparatedSingle", () => {
	describe("Basic Functionality", () => {
		it("parses single value", () => {
			const result = parseCommaSeparatedSingle("value", mockIdentifierParser, "test-property");

			expect(result).toEqual({
				ok: true,
				value: ["value"],
			});
		});

		it("parses two comma-separated values", () => {
			const result = parseCommaSeparatedSingle("first, second", mockIdentifierParser, "test-property");

			expect(result).toEqual({
				ok: true,
				value: ["first", "second"],
			});
		});

		it("parses three comma-separated values", () => {
			const result = parseCommaSeparatedSingle("one, two, three", mockIdentifierParser, "test-property");

			expect(result).toEqual({
				ok: true,
				value: ["one", "two", "three"],
			});
		});

		it("parses many comma-separated values", () => {
			const result = parseCommaSeparatedSingle("a, b, c, d, e, f, g", mockIdentifierParser, "test-property");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toHaveLength(7);
				expect(result.value).toEqual(["a", "b", "c", "d", "e", "f", "g"]);
			}
		});
	});

	describe("Whitespace Handling", () => {
		it("handles values with no spaces around commas", () => {
			const result = parseCommaSeparatedSingle("first,second,third", mockIdentifierParser, "test-property");

			expect(result).toEqual({
				ok: true,
				value: ["first", "second", "third"],
			});
		});

		it("handles values with multiple spaces around commas", () => {
			const result = parseCommaSeparatedSingle("first  ,  second  ,  third", mockIdentifierParser, "test-property");

			expect(result).toEqual({
				ok: true,
				value: ["first", "second", "third"],
			});
		});

		it("handles values with tabs and newlines", () => {
			const result = parseCommaSeparatedSingle("first\t,\nsecond\t,\nthird", mockIdentifierParser, "test-property");

			expect(result).toEqual({
				ok: true,
				value: ["first", "second", "third"],
			});
		});
	});

	describe("Different Value Types", () => {
		it("parses numeric values", () => {
			const result = parseCommaSeparatedSingle("1, 2, 3", mockNumberParser, "test-property");

			expect(result).toEqual({
				ok: true,
				value: [1, 2, 3],
			});
		});

		it("parses dimension values", () => {
			const result = parseCommaSeparatedSingle("10px, 20px, 30px", mockNumberParser, "test-property");

			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toEqual([10, 20, 30]);
			}
		});

		it("parses mixed identifiers", () => {
			const result = parseCommaSeparatedSingle("ease, linear, ease-in-out", mockIdentifierParser, "test-property");

			expect(result).toEqual({
				ok: true,
				value: ["ease", "linear", "ease-in-out"],
			});
		});
	});

	describe("Error Cases", () => {
		it("rejects empty string", () => {
			const result = parseCommaSeparatedSingle("", mockIdentifierParser, "test-property");

			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("test-property");
			}
		});

		it("rejects empty value before comma", () => {
			const result = parseCommaSeparatedSingle(", second", mockIdentifierParser, "test-property");

			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Empty value");
			}
		});

		it("rejects empty value after comma", () => {
			const result = parseCommaSeparatedSingle("first, ", mockIdentifierParser, "test-property");

			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Empty value");
			}
		});

		it("rejects empty value between commas", () => {
			const result = parseCommaSeparatedSingle("first, , third", mockIdentifierParser, "test-property");

			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Empty value");
			}
		});

		it("propagates parser errors", () => {
			const result = parseCommaSeparatedSingle("123, 456", mockIdentifierParser, "test-property");

			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("Expected Identifier");
			}
		});

		it("includes property name in error messages", () => {
			const result = parseCommaSeparatedSingle(", invalid", mockIdentifierParser, "my-custom-property");

			expect(result.ok).toBe(false);
			if (!result.ok) {
				expect(result.error).toContain("my-custom-property");
			}
		});
	});

	describe("Edge Cases", () => {
		it("handles single comma (two empty values)", () => {
			const result = parseCommaSeparatedSingle(",", mockIdentifierParser, "test-property");

			expect(result.ok).toBe(false);
		});

		it("handles multiple consecutive commas", () => {
			const result = parseCommaSeparatedSingle("first,,third", mockIdentifierParser, "test-property");

			expect(result.ok).toBe(false);
		});

		it("handles only whitespace", () => {
			const result = parseCommaSeparatedSingle("   ", mockIdentifierParser, "test-property");

			expect(result.ok).toBe(false);
		});
	});
});
