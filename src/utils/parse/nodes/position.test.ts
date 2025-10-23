import type * as csstree from "css-tree";
import { describe, expect, it } from "vitest";
import { parseAtPosition, parsePosition2D, parsePositionValueNode } from "./position";

describe("parsePositionValueNode", () => {
	const createIdentifier = (name: string): csstree.Identifier => ({
		type: "Identifier",
		loc: undefined,
		name,
	});

	const createDimension = (value: string, unit: string): csstree.Dimension => ({
		type: "Dimension",
		loc: undefined,
		value,
		unit,
	});

	const createPercentage = (value: string): csstree.Percentage => ({
		type: "Percentage",
		loc: undefined,
		value,
	});

	describe("keywords", () => {
		it("parses center keyword", () => {
			const node = createIdentifier("center");
			const result = parsePositionValueNode(node);
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toBe("center");
			}
		});

		it("parses left keyword", () => {
			const node = createIdentifier("left");
			const result = parsePositionValueNode(node);
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toBe("left");
			}
		});

		it("parses right keyword", () => {
			const node = createIdentifier("right");
			const result = parsePositionValueNode(node);
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toBe("right");
			}
		});

		it("parses top keyword", () => {
			const node = createIdentifier("top");
			const result = parsePositionValueNode(node);
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toBe("top");
			}
		});

		it("parses bottom keyword", () => {
			const node = createIdentifier("bottom");
			const result = parsePositionValueNode(node);
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toBe("bottom");
			}
		});

		it("handles case-insensitive keywords", () => {
			const node = createIdentifier("CENTER");
			const result = parsePositionValueNode(node);
			expect(result.ok).toBe(true);
		});

		it("rejects invalid keyword", () => {
			const node = createIdentifier("invalid");
			const result = parsePositionValueNode(node);
			expect(result.ok).toBe(false);
		});
	});

	describe("length values", () => {
		it("parses length dimension", () => {
			const node = createDimension("10", "px");
			const result = parsePositionValueNode(node);
			expect(result.ok).toBe(true);
			if (result.ok && typeof result.value === "object") {
				expect(result.value.value).toBe(10);
				expect(result.value.unit).toBe("px");
			}
		});

		it("parses percentage", () => {
			const node = createPercentage("50");
			const result = parsePositionValueNode(node);
			expect(result.ok).toBe(true);
			if (result.ok && typeof result.value === "object") {
				expect(result.value.value).toBe(50);
				expect(result.value.unit).toBe("%");
			}
		});
	});
});

describe("parsePosition2D", () => {
	const createIdentifier = (name: string): csstree.Identifier => ({
		type: "Identifier",
		loc: undefined,
		name,
	});

	const createDimension = (value: string, unit: string): csstree.Dimension => ({
		type: "Dimension",
		loc: undefined,
		value,
		unit,
	});

	const createPercentage = (value: string): csstree.Percentage => ({
		type: "Percentage",
		loc: undefined,
		value,
	});

	describe("single value", () => {
		it("defaults horizontal keyword to vertical center", () => {
			const nodes = [createIdentifier("left")];
			const result = parsePosition2D(nodes, 0);
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.position.horizontal).toBe("left");
				expect(result.value.position.vertical).toBe("center");
				expect(result.value.nextIdx).toBe(1);
			}
		});

		it("defaults vertical keyword to horizontal center", () => {
			const nodes = [createIdentifier("top")];
			const result = parsePosition2D(nodes, 0);
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.position.horizontal).toBe("center");
				expect(result.value.position.vertical).toBe("top");
				expect(result.value.nextIdx).toBe(1);
			}
		});

		it("handles bottom keyword", () => {
			const nodes = [createIdentifier("bottom")];
			const result = parsePosition2D(nodes, 0);
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.position.vertical).toBe("bottom");
			}
		});

		it("defaults length value to horizontal", () => {
			const nodes = [createDimension("10", "px")];
			const result = parsePosition2D(nodes, 0);
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.position.vertical).toBe("center");
			}
		});

		it("defaults center to horizontal center", () => {
			const nodes = [createIdentifier("center")];
			const result = parsePosition2D(nodes, 0);
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.position.horizontal).toBe("center");
				expect(result.value.position.vertical).toBe("center");
			}
		});
	});

	describe("two values", () => {
		it("parses horizontal and vertical keywords", () => {
			const nodes = [createIdentifier("left"), createIdentifier("top")];
			const result = parsePosition2D(nodes, 0);
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.position.horizontal).toBe("left");
				expect(result.value.position.vertical).toBe("top");
				expect(result.value.nextIdx).toBe(2);
			}
		});

		it("parses length values", () => {
			const nodes = [createDimension("10", "px"), createDimension("20", "px")];
			const result = parsePosition2D(nodes, 0);
			expect(result.ok).toBe(true);
			if (result.ok) {
				const h = result.value.position.horizontal;
				const v = result.value.position.vertical;
				if (typeof h === "object" && typeof v === "object") {
					expect(h.value).toBe(10);
					expect(v.value).toBe(20);
				}
			}
		});

		it("parses mixed keyword and length", () => {
			const nodes = [createIdentifier("center"), createDimension("20", "px")];
			const result = parsePosition2D(nodes, 0);
			expect(result.ok).toBe(true);
		});

		it("parses percentages", () => {
			const nodes = [createPercentage("50"), createPercentage("75")];
			const result = parsePosition2D(nodes, 0);
			expect(result.ok).toBe(true);
		});
	});

	describe("start index", () => {
		it("parses from non-zero start index", () => {
			const nodes = [createIdentifier("invalid"), createIdentifier("center"), createIdentifier("top")];
			const result = parsePosition2D(nodes, 1);
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.position.horizontal).toBe("center");
				expect(result.value.position.vertical).toBe("top");
				expect(result.value.nextIdx).toBe(3);
			}
		});
	});

	describe("validation", () => {
		it("rejects empty array", () => {
			const result = parsePosition2D([], 0);
			expect(result.ok).toBe(false);
		});

		it("rejects out-of-bounds start index", () => {
			const nodes = [createIdentifier("center")];
			const result = parsePosition2D(nodes, 5);
			expect(result.ok).toBe(false);
		});

		it("stops parsing after 2 values", () => {
			const nodes = [createIdentifier("left"), createIdentifier("top"), createIdentifier("center")];
			const result = parsePosition2D(nodes, 0);
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.nextIdx).toBe(2);
			}
		});
	});
});

describe("parseAtPosition", () => {
	const createIdentifier = (name: string): csstree.Identifier => ({
		type: "Identifier",
		loc: undefined,
		name,
	});

	const createDimension = (value: string, unit: string): csstree.Dimension => ({
		type: "Dimension",
		loc: undefined,
		value,
		unit,
	});

	describe("no 'at' keyword", () => {
		it("returns no position when 'at' not found", () => {
			const children = [createDimension("50", "px"), createDimension("100", "px")];
			const result = parseAtPosition(children, 0);
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.position).toBeUndefined();
				expect(result.value.nextIdx).toBe(0);
			}
		});

		it("handles empty array", () => {
			const result = parseAtPosition([], 0);
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.position).toBeUndefined();
				expect(result.value.nextIdx).toBe(0);
			}
		});

		it("handles out-of-bounds start index", () => {
			const children = [createIdentifier("center")];
			const result = parseAtPosition(children, 5);
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.position).toBeUndefined();
			}
		});
	});

	describe("with 'at' keyword", () => {
		it("parses position after 'at'", () => {
			const children = [createIdentifier("at"), createIdentifier("center"), createIdentifier("top")];
			const result = parseAtPosition(children, 0);
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.position).toBeDefined();
				expect(result.value.position?.horizontal).toBe("center");
				expect(result.value.position?.vertical).toBe("top");
				expect(result.value.nextIdx).toBe(3);
			}
		});

		it("handles case-insensitive 'at'", () => {
			const children = [createIdentifier("AT"), createIdentifier("center")];
			const result = parseAtPosition(children, 0);
			expect(result.ok).toBe(true);
		});

		it("parses 'at' from non-zero index", () => {
			const children = [createDimension("50", "px"), createIdentifier("at"), createIdentifier("left")];
			const result = parseAtPosition(children, 1);
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.position).toBeDefined();
				expect(result.value.nextIdx).toBe(3);
			}
		});

		it("parses single position value after 'at'", () => {
			const children = [createIdentifier("at"), createIdentifier("center")];
			const result = parseAtPosition(children, 0);
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value.position).toBeDefined();
			}
		});

		it("parses length values after 'at'", () => {
			const children = [createIdentifier("at"), createDimension("10", "px"), createDimension("20", "px")];
			const result = parseAtPosition(children, 0);
			expect(result.ok).toBe(true);
		});
	});

	describe("validation", () => {
		it("rejects 'at' without position", () => {
			const children = [createIdentifier("at")];
			const result = parseAtPosition(children, 0);
			expect(result.ok).toBe(false);
		});

		it("rejects 'at' at end of array", () => {
			const children = [createDimension("50", "px"), createIdentifier("at")];
			const result = parseAtPosition(children, 1);
			expect(result.ok).toBe(false);
		});
	});
});
