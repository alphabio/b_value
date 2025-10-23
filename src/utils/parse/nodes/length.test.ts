import type * as csstree from "css-tree";
import { describe, expect, it } from "vitest";
import { parseLengthNode, parseLengthPercentageNode, parseNumberNode } from "./length";

describe("parseLengthNode", () => {
	it("parses valid pixel dimension", () => {
		const node: csstree.Dimension = {
			type: "Dimension",
			loc: undefined,
			value: "10",
			unit: "px",
		};
		const result = parseLengthNode(node);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.value).toBe(10);
			expect(result.value.unit).toBe("px");
		}
	});

	it("parses absolute length units", () => {
		const units = ["px", "cm", "mm", "in", "pt", "pc"];
		for (const unit of units) {
			const node: csstree.Dimension = {
				type: "Dimension",
				loc: undefined,
				value: "10",
				unit,
			};
			const result = parseLengthNode(node);
			expect(result.ok).toBe(true);
		}
	});

	it("parses font-relative length units", () => {
		const units = ["em", "rem", "ex", "ch"];
		for (const unit of units) {
			const node: csstree.Dimension = {
				type: "Dimension",
				loc: undefined,
				value: "2",
				unit,
			};
			const result = parseLengthNode(node);
			expect(result.ok).toBe(true);
		}
	});

	it("parses viewport length units", () => {
		const units = ["vw", "vh", "vmin", "vmax"];
		for (const unit of units) {
			const node: csstree.Dimension = {
				type: "Dimension",
				loc: undefined,
				value: "50",
				unit,
			};
			const result = parseLengthNode(node);
			expect(result.ok).toBe(true);
		}
	});

	it("rejects invalid length unit", () => {
		const node: csstree.Dimension = {
			type: "Dimension",
			loc: undefined,
			value: "10",
			unit: "invalid",
		};
		const result = parseLengthNode(node);
		expect(result.ok).toBe(false);
	});

	it("rejects NaN value", () => {
		const node: csstree.Dimension = {
			type: "Dimension",
			loc: undefined,
			value: "notanumber",
			unit: "px",
		};
		const result = parseLengthNode(node);
		expect(result.ok).toBe(false);
	});

	it("rejects non-dimension node", () => {
		const node: csstree.Identifier = {
			type: "Identifier",
			loc: undefined,
			name: "auto",
		};
		const result = parseLengthNode(node);
		expect(result.ok).toBe(false);
	});

	it("handles decimal values", () => {
		const node: csstree.Dimension = {
			type: "Dimension",
			loc: undefined,
			value: "10.5",
			unit: "px",
		};
		const result = parseLengthNode(node);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.value).toBe(10.5);
		}
	});

	it("handles negative values", () => {
		const node: csstree.Dimension = {
			type: "Dimension",
			loc: undefined,
			value: "-10",
			unit: "px",
		};
		const result = parseLengthNode(node);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.value).toBe(-10);
		}
	});
});

describe("parseLengthPercentageNode", () => {
	it("parses length dimension", () => {
		const node: csstree.Dimension = {
			type: "Dimension",
			loc: undefined,
			value: "10",
			unit: "px",
		};
		const result = parseLengthPercentageNode(node);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.value).toBe(10);
			expect(result.value.unit).toBe("px");
		}
	});

	it("parses percentage", () => {
		const node: csstree.Percentage = {
			type: "Percentage",
			loc: undefined,
			value: "50",
		};
		const result = parseLengthPercentageNode(node);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.value).toBe(50);
			expect(result.value.unit).toBe("%");
		}
	});

	it("parses unitless zero", () => {
		const node: csstree.NumberNode = {
			type: "Number",
			loc: undefined,
			value: "0",
		};
		const result = parseLengthPercentageNode(node);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.value).toBe(0);
			expect(result.value.unit).toBe("px");
		}
	});

	it("rejects unitless non-zero", () => {
		const node: csstree.NumberNode = {
			type: "Number",
			loc: undefined,
			value: "10",
		};
		const result = parseLengthPercentageNode(node);
		expect(result.ok).toBe(false);
	});

	it("rejects invalid length unit", () => {
		const node: csstree.Dimension = {
			type: "Dimension",
			loc: undefined,
			value: "10",
			unit: "invalid",
		};
		const result = parseLengthPercentageNode(node);
		expect(result.ok).toBe(false);
	});

	it("rejects NaN length value", () => {
		const node: csstree.Dimension = {
			type: "Dimension",
			loc: undefined,
			value: "notanumber",
			unit: "px",
		};
		const result = parseLengthPercentageNode(node);
		expect(result.ok).toBe(false);
	});

	it("rejects NaN percentage value", () => {
		const node: csstree.Percentage = {
			type: "Percentage",
			loc: undefined,
			value: "notanumber",
		};
		const result = parseLengthPercentageNode(node);
		expect(result.ok).toBe(false);
	});

	it("rejects unsupported node type", () => {
		const node: csstree.Identifier = {
			type: "Identifier",
			loc: undefined,
			name: "auto",
		};
		const result = parseLengthPercentageNode(node);
		expect(result.ok).toBe(false);
	});

	it("handles negative length", () => {
		const node: csstree.Dimension = {
			type: "Dimension",
			loc: undefined,
			value: "-10",
			unit: "px",
		};
		const result = parseLengthPercentageNode(node);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.value).toBe(-10);
		}
	});

	it("handles negative percentage", () => {
		const node: csstree.Percentage = {
			type: "Percentage",
			loc: undefined,
			value: "-50",
		};
		const result = parseLengthPercentageNode(node);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value.value).toBe(-50);
		}
	});
});

describe("parseNumberNode", () => {
	it("parses valid number", () => {
		const node: csstree.NumberNode = {
			type: "Number",
			loc: undefined,
			value: "10",
		};
		const result = parseNumberNode(node);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe(10);
		}
	});

	it("parses decimal number", () => {
		const node: csstree.NumberNode = {
			type: "Number",
			loc: undefined,
			value: "10.5",
		};
		const result = parseNumberNode(node);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe(10.5);
		}
	});

	it("parses negative number", () => {
		const node: csstree.NumberNode = {
			type: "Number",
			loc: undefined,
			value: "-10",
		};
		const result = parseNumberNode(node);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe(-10);
		}
	});

	it("parses zero", () => {
		const node: csstree.NumberNode = {
			type: "Number",
			loc: undefined,
			value: "0",
		};
		const result = parseNumberNode(node);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe(0);
		}
	});

	it("rejects NaN value", () => {
		const node: csstree.NumberNode = {
			type: "Number",
			loc: undefined,
			value: "notanumber",
		};
		const result = parseNumberNode(node);
		expect(result.ok).toBe(false);
	});

	it("rejects non-number node", () => {
		const node: csstree.Identifier = {
			type: "Identifier",
			loc: undefined,
			name: "auto",
		};
		const result = parseNumberNode(node);
		expect(result.ok).toBe(false);
	});
});
