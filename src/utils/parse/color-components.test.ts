// b_path:: src/utils/parse/color-components.test.ts

import * as csstree from "css-tree";
import { describe, expect, it } from "vitest";
import { parseAlpha, parseHue, parseLightness, parsePercentage } from "./color-components";

describe("parseAlpha", () => {
	it("parses number in valid range (0-1)", () => {
		const ast = csstree.parse("0.5", { context: "value" }) as csstree.Value;
		const node = ast.children.first;
		if (!node) throw new Error("Failed to parse");
		const result = parseAlpha(node);
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe(0.5);
	});

	it("parses percentage (0%-100%)", () => {
		const ast = csstree.parse("50%", { context: "value" }) as csstree.Value;
		const node = ast.children.first;
		if (!node) throw new Error("Failed to parse");
		const result = parseAlpha(node);
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe(0.5);
	});

	it("rejects number out of range without clamp", () => {
		const ast = csstree.parse("1.5", { context: "value" }) as csstree.Value;
		const node = ast.children.first;
		if (!node) throw new Error("Failed to parse");
		const result = parseAlpha(node);
		expect(result.ok).toBe(false);
	});

	it("clamps number out of range with clamp option", () => {
		const ast = csstree.parse("1.5", { context: "value" }) as csstree.Value;
		const node = ast.children.first;
		if (!node) throw new Error("Failed to parse");
		const result = parseAlpha(node, { clamp: true });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe(1);
	});

	it("clamps percentage with clamp option", () => {
		const ast = csstree.parse("150%", { context: "value" }) as csstree.Value;
		const node = ast.children.first;
		if (!node) throw new Error("Failed to parse");
		const result = parseAlpha(node, { clamp: true });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe(1);
	});
});

describe("parseHue", () => {
	it("parses unitless number as degrees", () => {
		const ast = csstree.parse("120", { context: "value" }) as csstree.Value;
		const node = ast.children.first;
		if (!node) throw new Error("Failed to parse");
		const result = parseHue(node);
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe(120);
	});

	it("parses angle in degrees", () => {
		const ast = csstree.parse("180deg", { context: "value" }) as csstree.Value;
		const node = ast.children.first;
		if (!node) throw new Error("Failed to parse");
		const result = parseHue(node);
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe(180);
	});

	it("parses angle in radians", () => {
		const ast = csstree.parse("3.14159rad", { context: "value" }) as csstree.Value;
		const node = ast.children.first;
		if (!node) throw new Error("Failed to parse");
		const result = parseHue(node);
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBeCloseTo(180, 0);
	});

	it("parses angle in turns", () => {
		const ast = csstree.parse("0.5turn", { context: "value" }) as csstree.Value;
		const node = ast.children.first;
		if (!node) throw new Error("Failed to parse");
		const result = parseHue(node);
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe(180);
	});

	it("normalizes hue with wrapping (negative)", () => {
		const ast = csstree.parse("-30", { context: "value" }) as csstree.Value;
		const node = ast.children.first;
		if (!node) throw new Error("Failed to parse");
		const result = parseHue(node);
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe(330);
	});

	it("normalizes hue with wrapping (>360)", () => {
		const ast = csstree.parse("400", { context: "value" }) as csstree.Value;
		const node = ast.children.first;
		if (!node) throw new Error("Failed to parse");
		const result = parseHue(node);
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe(40);
	});
});

describe("parseLightness", () => {
	it("parses number in 0-100 range", () => {
		const ast = csstree.parse("50", { context: "value" }) as csstree.Value;
		const node = ast.children.first;
		if (!node) throw new Error("Failed to parse");
		const result = parseLightness(node, "0-100");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe(50);
	});

	it("parses number in 0-1 range", () => {
		const ast = csstree.parse("0.5", { context: "value" }) as csstree.Value;
		const node = ast.children.first;
		if (!node) throw new Error("Failed to parse");
		const result = parseLightness(node, "0-1");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe(0.5);
	});

	it("parses percentage and converts to 0-100 range", () => {
		const ast = csstree.parse("50%", { context: "value" }) as csstree.Value;
		const node = ast.children.first;
		if (!node) throw new Error("Failed to parse");
		const result = parseLightness(node, "0-100");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe(50);
	});

	it("parses percentage and converts to 0-1 range", () => {
		const ast = csstree.parse("50%", { context: "value" }) as csstree.Value;
		const node = ast.children.first;
		if (!node) throw new Error("Failed to parse");
		const result = parseLightness(node, "0-1");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe(0.5);
	});

	it("clamps value to 0-100 range", () => {
		const ast = csstree.parse("150", { context: "value" }) as csstree.Value;
		const node = ast.children.first;
		if (!node) throw new Error("Failed to parse");
		const result = parseLightness(node, "0-100");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe(100);
	});

	it("clamps value to 0-1 range", () => {
		const ast = csstree.parse("1.5", { context: "value" }) as csstree.Value;
		const node = ast.children.first;
		if (!node) throw new Error("Failed to parse");
		const result = parseLightness(node, "0-1");
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe(1);
	});
});

describe("parsePercentage", () => {
	it("parses valid percentage", () => {
		const ast = csstree.parse("75%", { context: "value" }) as csstree.Value;
		const node = ast.children.first;
		if (!node) throw new Error("Failed to parse");
		const result = parsePercentage(node);
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe(75);
	});

	it("rejects out of range percentage without clamp", () => {
		const ast = csstree.parse("150%", { context: "value" }) as csstree.Value;
		const node = ast.children.first;
		if (!node) throw new Error("Failed to parse");
		const result = parsePercentage(node);
		expect(result.ok).toBe(false);
	});

	it("clamps percentage with clamp option", () => {
		const ast = csstree.parse("150%", { context: "value" }) as csstree.Value;
		const node = ast.children.first;
		if (!node) throw new Error("Failed to parse");
		const result = parsePercentage(node, { clamp: true });
		expect(result.ok).toBe(true);
		if (result.ok) expect(result.value).toBe(100);
	});

	it("rejects non-percentage node", () => {
		const ast = csstree.parse("50", { context: "value" }) as csstree.Value;
		const node = ast.children.first;
		if (!node) throw new Error("Failed to parse");
		const result = parsePercentage(node);
		expect(result.ok).toBe(false);
	});
});
