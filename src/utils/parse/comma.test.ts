// b_path:: src/utils/parse/comma.test.ts

import * as csstree from "css-tree";
import { describe, expect, test } from "vitest";
import { err, ok } from "@/core/result";
import { splitLayer, splitValue } from "./comma";

describe("splitValue", () => {
	test("parses single value", () => {
		const result = splitValue("fade", (node) => ok({ name: csstree.generate(node) }), "test");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toHaveLength(1);
			expect(result.value[0]?.name).toBe("fade");
		}
	});

	test("parses multiple values", () => {
		const result = splitValue("fade, slide, bounce", (node) => ok({ name: csstree.generate(node) }), "test");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toHaveLength(3);
			expect(result.value[0]?.name).toBe("fade");
			expect(result.value[1]?.name).toBe("slide");
			expect(result.value[2]?.name).toBe("bounce");
		}
	});

	test("parses function values", () => {
		const result = splitValue("url(a.png), url(b.png)", (node) => ok({ value: csstree.generate(node) }), "test");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toHaveLength(2);
			expect(result.value[0]?.value).toBe("url(a.png)");
			expect(result.value[1]?.value).toBe("url(b.png)");
		}
	});

	test("CRITICAL: handles nested commas in function values", () => {
		const result = splitValue(
			"linear-gradient(red, blue), url(a.png)",
			(node) => ok({ value: csstree.generate(node) }),
			"test",
		);
		expect(result.ok).toBe(true);
		if (result.ok) {
			// Should be 2 values, NOT 3!
			expect(result.value).toHaveLength(2);
			expect(result.value[0]?.value).toContain("linear-gradient");
			expect(result.value[0]?.value).toContain("red");
			expect(result.value[0]?.value).toContain("blue");
			expect(result.value[1]?.value).toBe("url(a.png)");
		}
	});

	test("handles values with whitespace", () => {
		const result = splitValue("  fade  ,  slide  ", (node) => ok({ name: csstree.generate(node) }), "test");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toHaveLength(2);
		}
	});

	test("errors on empty value", () => {
		const result = splitValue("fade, , slide", (node) => ok({ name: csstree.generate(node) }), "test");
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("Empty value");
		}
	});

	test("errors on multiple nodes between commas", () => {
		const result = splitValue("fade slide, bounce", (node) => ok({ name: csstree.generate(node) }), "test");
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("Expected single value");
		}
	});

	test("errors on trailing comma", () => {
		const result = splitValue("fade, slide,", (node) => ok({ name: csstree.generate(node) }), "test");
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("Empty value");
		}
	});

	test("errors on leading comma", () => {
		const result = splitValue(", fade, slide", (node) => ok({ name: csstree.generate(node) }), "test");
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("Empty value");
		}
	});

	test("propagates parser errors", () => {
		const result = splitValue("fade, slide", () => err("custom error"), "test");
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("custom error");
		}
	});
});

describe("splitLayer", () => {
	test("parses single layer with multiple tokens", () => {
		const result = splitLayer(
			"2px 2px red",
			(nodes) => ok({ count: nodes.filter((n) => n.type !== "WhiteSpace").length }),
			"test",
		);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toHaveLength(1);
			expect(result.value[0]?.count).toBe(3);
		}
	});

	test("parses multiple layers", () => {
		const result = splitLayer(
			"2px 2px red, 3px 3px blue",
			(nodes) => ok({ count: nodes.filter((n) => n.type !== "WhiteSpace").length }),
			"test",
		);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toHaveLength(2);
			expect(result.value[0]?.count).toBe(3);
			expect(result.value[1]?.count).toBe(3);
		}
	});

	test("CRITICAL: handles nested function commas in layer", () => {
		const result = splitLayer(
			"drop-shadow(1px 2px red), 3px 3px blue",
			(nodes) => ok({ nodeCount: nodes.filter((n) => n.type !== "WhiteSpace").length }),
			"test",
		);
		expect(result.ok).toBe(true);
		if (result.ok) {
			// Should be 2 layers, NOT 3!
			expect(result.value).toHaveLength(2);
			expect(result.value[0]?.nodeCount).toBe(1); // drop-shadow function
			expect(result.value[1]?.nodeCount).toBe(3); // 3px 3px blue
		}
	});

	test("handles layers with different token counts", () => {
		const result = splitLayer(
			"2px, 3px 3px 5px red",
			(nodes) => ok({ count: nodes.filter((n) => n.type !== "WhiteSpace").length }),
			"test",
		);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toHaveLength(2);
			expect(result.value[0]?.count).toBe(1); // First layer: 1 token
			expect(result.value[1]?.count).toBe(4); // Second layer: 4 tokens
		}
	});

	test("handles layers with whitespace", () => {
		const result = splitLayer(
			"  2px 2px  ,  3px 3px  ",
			(nodes) => ok({ count: nodes.filter((n) => n.type !== "WhiteSpace").length }),
			"test",
		);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toHaveLength(2);
		}
	});

	test("errors on empty layer", () => {
		const result = splitLayer("2px 2px, , 3px 3px", (nodes) => ok({ count: nodes.length }), "test");
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("Empty layer");
		}
	});

	test("allows trailing comma (matches CSS parser behavior)", () => {
		const result = splitLayer(
			"2px 2px,",
			(nodes) => ok({ count: nodes.filter((n) => n.type !== "WhiteSpace").length }),
			"test",
		);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toHaveLength(1);
		}
	});

	test("propagates parser errors", () => {
		const result = splitLayer("2px 2px, 3px 3px", () => err("layer error"), "test");
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("layer error");
		}
	});
});
