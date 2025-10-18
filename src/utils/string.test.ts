// b_path:: src/utils/string.test.ts
import { describe, expect, it } from "vitest";
import { camelCase, capitalize, kebabCase, truncate } from "./string";

describe("String Utilities", () => {
	describe("capitalize", () => {
		it("should capitalize the first letter of a lowercase string", () => {
			expect(capitalize("hello")).toBe("Hello");
			expect(capitalize("world")).toBe("World");
			expect(capitalize("typescript")).toBe("Typescript");
		});

		it("should handle already capitalized strings", () => {
			expect(capitalize("Hello")).toBe("Hello");
			expect(capitalize("WORLD")).toBe("World");
			expect(capitalize("TypeScript")).toBe("Typescript");
		});

		it("should handle mixed case strings", () => {
			expect(capitalize("hELLO")).toBe("Hello");
			expect(capitalize("WorLD")).toBe("World");
		});

		it("should handle empty string", () => {
			expect(capitalize("")).toBe("");
		});

		it("should handle single character strings", () => {
			expect(capitalize("a")).toBe("A");
			expect(capitalize("Z")).toBe("Z");
		});

		it("should handle strings with numbers and special characters", () => {
			expect(capitalize("hello123")).toBe("Hello123");
			expect(capitalize("test-world")).toBe("Test-world");
			expect(capitalize("hello world")).toBe("Hello world");
		});

		it("should handle unicode characters", () => {
			expect(capitalize("ñoño")).toBe("Ñoño");
			expect(capitalize("αβγ")).toBe("Αβγ");
		});
	});

	describe("camelCase", () => {
		it("should convert space-separated words to camelCase", () => {
			expect(camelCase("hello world")).toBe("helloWorld");
			expect(camelCase("foo bar baz")).toBe("fooBarBaz");
			expect(camelCase("test case")).toBe("testCase");
		});

		it("should not convert hyphen-separated words to camelCase", () => {
			expect(camelCase("hello-world")).toBe("hello-World");
			expect(camelCase("foo-bar-baz")).toBe("foo-Bar-Baz");
		});

		it("should not convert underscore-separated words to camelCase", () => {
			expect(camelCase("hello_world")).toBe("hello_world");
			expect(camelCase("foo_bar_baz")).toBe("foo_bar_baz");
		});

		it("should handle mixed separators", () => {
			expect(camelCase("hello-world_test")).toBe("hello-World_test");
			expect(camelCase("foo bar-baz_test")).toBe("fooBar-Baz_test");
		});

		it("should handle already camelCase strings", () => {
			expect(camelCase("helloWorld")).toBe("helloWorld");
			expect(camelCase("fooBarBaz")).toBe("fooBarBaz");
		});

		it("should handle empty string", () => {
			expect(camelCase("")).toBe("");
		});

		it("should handle single word", () => {
			expect(camelCase("hello")).toBe("hello");
			expect(camelCase("WORLD")).toBe("wORLD");
		});

		it("should handle strings with numbers", () => {
			expect(camelCase("test 123 case")).toBe("test123Case");
			expect(camelCase("hello-world-123")).toBe("hello-World-123");
		});

		it("should handle multiple consecutive separators", () => {
			expect(camelCase("hello  world")).toBe("helloWorld");
			expect(camelCase("foo--bar")).toBe("foo--Bar");
			expect(camelCase("baz__test")).toBe("baz__test");
		});

		it("should handle leading/trailing separators", () => {
			expect(camelCase(" hello world")).toBe("helloWorld");
			expect(camelCase("hello world ")).toBe("helloWorld");
			expect(camelCase("-hello-world-")).toBe("-Hello-World-");
		});
	});

	describe("kebabCase", () => {
		it("should convert space-separated words to kebab-case", () => {
			expect(kebabCase("hello world")).toBe("hello-world");
			expect(kebabCase("foo bar baz")).toBe("foo-bar-baz");
			expect(kebabCase("test case")).toBe("test-case");
		});

		it("should convert camelCase to kebab-case", () => {
			expect(kebabCase("helloWorld")).toBe("hello-world");
			expect(kebabCase("fooBarBaz")).toBe("foo-bar-baz");
			expect(kebabCase("testCase")).toBe("test-case");
		});

		it("should convert underscore-separated words to kebab-case", () => {
			expect(kebabCase("hello_world")).toBe("hello-world");
			expect(kebabCase("foo_bar_baz")).toBe("foo-bar-baz");
		});

		it("should handle mixed separators", () => {
			expect(kebabCase("hello world_test")).toBe("hello-world-test");
			expect(kebabCase("foo-bar baz_test")).toBe("foo-bar-baz-test");
		});

		it("should handle already kebab-case strings", () => {
			expect(kebabCase("hello-world")).toBe("hello-world");
			expect(kebabCase("foo-bar-baz")).toBe("foo-bar-baz");
		});

		it("should handle empty string", () => {
			expect(kebabCase("")).toBe("");
		});

		it("should handle single word", () => {
			expect(kebabCase("hello")).toBe("hello");
			expect(kebabCase("WORLD")).toBe("world");
		});

		it("should handle strings with numbers", () => {
			expect(kebabCase("testCase123")).toBe("test-case123");
			expect(kebabCase("hello world 123")).toBe("hello-world-123");
		});

		it("should handle multiple consecutive separators", () => {
			expect(kebabCase("hello  world")).toBe("hello-world");
			expect(kebabCase("foo__bar")).toBe("foo-bar");
			expect(kebabCase("baz--test")).toBe("baz--test");
		});

		it("should handle leading/trailing separators", () => {
			expect(kebabCase(" hello world")).toBe("hello-world");
			expect(kebabCase("hello world ")).toBe("hello-world");
			expect(kebabCase("-hello-world-")).toBe("-hello-world-");
		});

		it("should convert uppercase letters correctly", () => {
			expect(kebabCase("HelloWorld")).toBe("hello-world");
			expect(kebabCase("XMLHttpRequest")).toBe("xmlhttp-request");
		});
	});

	describe("truncate", () => {
		it("should truncate string longer than specified length", () => {
			expect(truncate("hello world", 5)).toBe("he...");
			expect(truncate("typescript", 4)).toBe("t...");
			expect(truncate("hello world this is a long string", 10)).toBe("hello w...");
		});

		it("should not truncate string shorter than or equal to specified length", () => {
			expect(truncate("hello", 5)).toBe("hello");
			expect(truncate("hello", 10)).toBe("hello");
			expect(truncate("hi", 2)).toBe("hi");
		});

		it("should use custom suffix", () => {
			expect(truncate("hello world", 5, "***")).toBe("he***");
			expect(truncate("typescript", 4, ">>")).toBe("ty>>");
			expect(truncate("hello world this is a long string", 10, "...more")).toBe("hel...more");
		});

		it("should handle empty string", () => {
			expect(truncate("", 5)).toBe("");
			expect(truncate("", 0)).toBe("");
		});

		it("should handle zero length", () => {
			expect(truncate("hello world", 0)).toBe("hello wo...");
			expect(truncate("test", 0, "***")).toBe("t***");
		});

		it("should handle suffix longer than length", () => {
			expect(truncate("hello world", 2)).toBe("hello worl...");
			expect(truncate("test", 1)).toBe("te...");
		});

		it("should handle exact length match with suffix", () => {
			expect(truncate("hello", 2)).toBe("hell...");
			expect(truncate("test", 1)).toBe("te...");
		});

		it("should handle unicode characters", () => {
			expect(truncate("héllo wörld", 5)).toBe("hé...");
			expect(truncate("αβγδε", 3)).toBe("...");
		});

		it("should handle strings with special characters", () => {
			expect(truncate("hello-world!", 5)).toBe("he...");
			expect(truncate("test@example.com", 8)).toBe("test@...");
		});

		it("should handle very long strings", () => {
			const longString = "a".repeat(1000);
			expect(truncate(longString, 10)).toBe(`${"a".repeat(7)}...`);
			expect(truncate(longString, 100)).toBe(`${"a".repeat(97)}...`);
		});
	});
});
