import * as csstree from "css-tree";
import { describe, expect, it } from "vitest";
import { isCommaAt, skipComma, splitNodesByComma } from "./split-by-comma";

describe("splitNodesByComma", () => {
	it("splits simple comma-separated values", () => {
		const ast = csstree.parse("red, blue, green", { context: "value" });
		const nodes = ast.type === "Value" ? ast.children.toArray() : [];

		const groups = splitNodesByComma(nodes);

		expect(groups).toHaveLength(3);
		expect(groups[0]).toHaveLength(1);
		expect(groups[1]).toHaveLength(1);
		expect(groups[2]).toHaveLength(1);
	});

	it("handles multi-node groups", () => {
		const ast = csstree.parse("red, blue 50%, green", { context: "value" });
		const nodes = ast.type === "Value" ? ast.children.toArray() : [];

		const groups = splitNodesByComma(nodes);

		expect(groups).toHaveLength(3);
		expect(groups[0]).toHaveLength(1);
		expect(groups[1]).toHaveLength(2);
		expect(groups[2]).toHaveLength(1);
	});

	it("handles single value (no commas)", () => {
		const ast = csstree.parse("red", { context: "value" });
		const nodes = ast.type === "Value" ? ast.children.toArray() : [];

		const groups = splitNodesByComma(nodes);

		expect(groups).toHaveLength(1);
		expect(groups[0]).toHaveLength(1);
	});

	it("handles empty input", () => {
		const groups = splitNodesByComma([]);

		expect(groups).toHaveLength(0);
	});

	it("handles startIndex option", () => {
		const ast = csstree.parse("45deg, red, blue", { context: "value" });
		const nodes = ast.type === "Value" ? ast.children.toArray() : [];

		// Find the comma after 45deg
		const firstCommaIdx = nodes.findIndex((n) => n.type === "Operator" && "value" in n && n.value === ",");

		// Start after first comma
		const groups = splitNodesByComma(nodes, {
			startIndex: firstCommaIdx + 1,
		});

		expect(groups).toHaveLength(2);
	});

	it("rejects empty groups by default", () => {
		const ast = csstree.parse("red,, blue", { context: "value" });
		const nodes = ast.type === "Value" ? ast.children.toArray() : [];

		const groups = splitNodesByComma(nodes);

		expect(groups).toHaveLength(2);
		expect(groups[0]).toHaveLength(1);
		expect(groups[1]).toHaveLength(1);
	});

	it("allows empty groups when requested", () => {
		const ast = csstree.parse("red,, blue", { context: "value" });
		const nodes = ast.type === "Value" ? ast.children.toArray() : [];

		const groups = splitNodesByComma(nodes, { allowEmpty: true });

		expect(groups).toHaveLength(3);
		expect(groups[0]).toHaveLength(1);
		expect(groups[1]).toHaveLength(0);
		expect(groups[2]).toHaveLength(1);
	});

	it("handles trailing comma (creates empty group if allowEmpty)", () => {
		const ast = csstree.parse("red, blue,", { context: "value" });
		const nodes = ast.type === "Value" ? ast.children.toArray() : [];

		const withoutEmpty = splitNodesByComma(nodes);
		expect(withoutEmpty).toHaveLength(2);

		const withEmpty = splitNodesByComma(nodes, { allowEmpty: true });
		expect(withEmpty).toHaveLength(3);
		expect(withEmpty[2]).toHaveLength(0);
	});

	it("handles whitespace nodes by default", () => {
		const ast = csstree.parse("red  ,  blue", { context: "value" });
		const nodes = ast.type === "Value" ? ast.children.toArray() : [];

		const groups = splitNodesByComma(nodes);

		expect(groups).toHaveLength(2);
		expect(groups[0]).toHaveLength(1);
		expect(groups[1]).toHaveLength(1);
	});

	it("handles complex multi-value groups", () => {
		const ast = csstree.parse("1px 2px 3px, 4px 5px, 6px", {
			context: "value",
		});
		const nodes = ast.type === "Value" ? ast.children.toArray() : [];

		const groups = splitNodesByComma(nodes);

		expect(groups).toHaveLength(3);
		expect(groups[0]).toHaveLength(3);
		expect(groups[1]).toHaveLength(2);
		expect(groups[2]).toHaveLength(1);
	});

	it("handles percentage and length mixed", () => {
		const ast = csstree.parse("50% 0%, 100% 50%, 0% 100%", {
			context: "value",
		});
		const nodes = ast.type === "Value" ? ast.children.toArray() : [];

		const groups = splitNodesByComma(nodes);

		expect(groups).toHaveLength(3);
		expect(groups[0]).toHaveLength(2);
		expect(groups[1]).toHaveLength(2);
		expect(groups[2]).toHaveLength(2);
	});
});

describe("isCommaAt", () => {
	it("returns true for comma at index", () => {
		const ast = csstree.parse("red, blue", { context: "value" });
		const nodes = ast.type === "Value" ? ast.children.toArray() : [];

		const commaIndex = nodes.findIndex((n) => n.type === "Operator" && "value" in n && n.value === ",");

		expect(isCommaAt(nodes, commaIndex)).toBe(true);
	});

	it("returns false for non-comma node", () => {
		const ast = csstree.parse("red, blue", { context: "value" });
		const nodes = ast.type === "Value" ? ast.children.toArray() : [];

		expect(isCommaAt(nodes, 0)).toBe(false);
	});

	it("returns false for out of bounds index", () => {
		const ast = csstree.parse("red", { context: "value" });
		const nodes = ast.type === "Value" ? ast.children.toArray() : [];

		expect(isCommaAt(nodes, 999)).toBe(false);
	});

	it("returns false for negative index", () => {
		const ast = csstree.parse("red", { context: "value" });
		const nodes = ast.type === "Value" ? ast.children.toArray() : [];

		expect(isCommaAt(nodes, -1)).toBe(false);
	});

	it("returns false for empty array", () => {
		expect(isCommaAt([], 0)).toBe(false);
	});
});

describe("skipComma", () => {
	it("skips comma and returns next index", () => {
		const ast = csstree.parse("red, blue", { context: "value" });
		const nodes = ast.type === "Value" ? ast.children.toArray() : [];

		const commaIndex = nodes.findIndex((n) => n.type === "Operator" && "value" in n && n.value === ",");

		expect(skipComma(nodes, commaIndex)).toBe(commaIndex + 1);
	});

	it("returns same index if not comma", () => {
		const ast = csstree.parse("red, blue", { context: "value" });
		const nodes = ast.type === "Value" ? ast.children.toArray() : [];

		expect(skipComma(nodes, 0)).toBe(0);
	});

	it("handles out of bounds index", () => {
		const ast = csstree.parse("red", { context: "value" });
		const nodes = ast.type === "Value" ? ast.children.toArray() : [];

		expect(skipComma(nodes, 999)).toBe(999);
	});

	it("handles empty array", () => {
		expect(skipComma([], 0)).toBe(0);
	});

	it("can chain multiple skipComma calls", () => {
		const ast = csstree.parse("red, blue, green", { context: "value" });
		const nodes = ast.type === "Value" ? ast.children.toArray() : [];

		let idx = 0;
		// Skip to first value
		idx = nodes.findIndex((n) => n.type === "Identifier");
		expect(idx).toBeGreaterThanOrEqual(0);

		// Find first comma
		idx = nodes.findIndex((n, i) => i > idx && n.type === "Operator" && "value" in n && n.value === ",");
		// Skip it
		idx = skipComma(nodes, idx);

		// Should be at blue now (or whitespace before it)
		const nextIdentifier = nodes[idx];
		expect(nextIdentifier?.type === "Identifier" || nextIdentifier?.type === "WhiteSpace").toBe(true);
	});
});
