// b_path:: src/utils/parse/nodes/number.test.ts
import { describe, expect, it } from "vitest";
import { parseIdentifierNode } from "./number";

describe("parseIdentifierNode", () => {
	it("parses identifier node", () => {
		const node = { type: "Identifier" as const, name: "MyValue" };
		const result = parseIdentifierNode(node);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("myvalue");
		}
	});

	it("converts to lowercase", () => {
		const node = { type: "Identifier" as const, name: "CamelCase" };
		const result = parseIdentifierNode(node);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("camelcase");
		}
	});

	it("handles simple identifier", () => {
		const node = { type: "Identifier" as const, name: "auto" };
		const result = parseIdentifierNode(node);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("auto");
		}
	});

	it("rejects non-identifier node", () => {
		const node = { type: "Number" as const, value: "123" };
		const result = parseIdentifierNode(node);
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.error).toContain("Expected identifier");
		}
	});

	it("rejects string node", () => {
		const node = { type: "String" as const, value: "test" };
		const result = parseIdentifierNode(node);
		expect(result.ok).toBe(false);
	});
});
