// b_path:: src/parse/layout/layout.test.ts
import { describe, expect, it } from "vitest";
import * as Display from "./display";
import * as Opacity from "./opacity";
import * as Visibility from "./visibility";

describe("Parse Layout - Display", () => {
	it("should parse flex display", () => {
		const result = Display.parse("flex");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toEqual({ kind: "display", value: "flex" });
		}
	});

	it("should parse block display", () => {
		const result = Display.parse("block");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toEqual({ kind: "display", value: "block" });
		}
	});

	it("should parse inline display", () => {
		const result = Display.parse("inline");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toEqual({ kind: "display", value: "inline" });
		}
	});

	it("should parse inline-block display", () => {
		const result = Display.parse("inline-block");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toEqual({ kind: "display", value: "inline-block" });
		}
	});

	it("should parse grid display", () => {
		const result = Display.parse("grid");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toEqual({ kind: "display", value: "grid" });
		}
	});

	it("should parse none display", () => {
		const result = Display.parse("none");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toEqual({ kind: "display", value: "none" });
		}
	});

	it("should parse table display", () => {
		const result = Display.parse("table");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toEqual({ kind: "display", value: "table" });
		}
	});

	it("should parse inline-flex display", () => {
		const result = Display.parse("inline-flex");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toEqual({ kind: "display", value: "inline-flex" });
		}
	});

	it("should parse inline-grid display", () => {
		const result = Display.parse("inline-grid");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toEqual({ kind: "display", value: "inline-grid" });
		}
	});

	it("should parse contents display", () => {
		const result = Display.parse("contents");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toEqual({ kind: "display", value: "contents" });
		}
	});

	it("should parse flow-root display", () => {
		const result = Display.parse("flow-root");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toEqual({ kind: "display", value: "flow-root" });
		}
	});

	it("should reject invalid display value", () => {
		const result = Display.parse("invalid");
		expect(result.ok).toBe(false);
	});
});

describe("Parse Layout - Visibility", () => {
	it("should parse visible visibility", () => {
		const result = Visibility.parse("visible");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toEqual({ kind: "visibility", value: "visible" });
		}
	});

	it("should parse hidden visibility", () => {
		const result = Visibility.parse("hidden");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toEqual({ kind: "visibility", value: "hidden" });
		}
	});

	it("should parse collapse visibility", () => {
		const result = Visibility.parse("collapse");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toEqual({ kind: "visibility", value: "collapse" });
		}
	});

	it("should reject invalid visibility value", () => {
		const result = Visibility.parse("invalid");
		expect(result.ok).toBe(false);
	});
});

describe("Parse Layout - Opacity", () => {
	it("should parse opacity 0", () => {
		const result = Opacity.parse("0");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toEqual({ kind: "opacity", value: 0 });
		}
	});

	it("should parse opacity 1", () => {
		const result = Opacity.parse("1");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toEqual({ kind: "opacity", value: 1 });
		}
	});

	it("should parse opacity 0.5", () => {
		const result = Opacity.parse("0.5");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toEqual({ kind: "opacity", value: 0.5 });
		}
	});

	it("should parse opacity percentage 50%", () => {
		const result = Opacity.parse("50%");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toEqual({ kind: "opacity", value: 0.5 });
		}
	});

	it("should parse opacity percentage 100%", () => {
		const result = Opacity.parse("100%");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toEqual({ kind: "opacity", value: 1 });
		}
	});

	it("should parse opacity percentage 0%", () => {
		const result = Opacity.parse("0%");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toEqual({ kind: "opacity", value: 0 });
		}
	});

	it("should clamp opacity above 1", () => {
		const result = Opacity.parse("1.5");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toEqual({ kind: "opacity", value: 1 });
		}
	});

	it("should clamp opacity below 0", () => {
		const result = Opacity.parse("-0.5");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toEqual({ kind: "opacity", value: 0 });
		}
	});

	it("should reject invalid opacity value", () => {
		const result = Opacity.parse("invalid");
		expect(result.ok).toBe(false);
	});
});
