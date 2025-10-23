// b_path:: src/core/types/interaction.test.ts

import { describe, expect, it } from "vitest";
import type { PointerEvents, UserSelect } from "./interaction";

describe("PointerEvents", () => {
	it("has correct type structure for auto", () => {
		const value: PointerEvents = { kind: "pointer-events", value: "auto" };
		expect(value.kind).toBe("pointer-events");
		expect(value.value).toBe("auto");
	});

	it("has correct type structure for none", () => {
		const value: PointerEvents = { kind: "pointer-events", value: "none" };
		expect(value.value).toBe("none");
	});

	it("has correct type structure for visiblePainted", () => {
		const value: PointerEvents = { kind: "pointer-events", value: "visiblePainted" };
		expect(value.value).toBe("visiblePainted");
	});

	it("has correct type structure for all", () => {
		const value: PointerEvents = { kind: "pointer-events", value: "all" };
		expect(value.value).toBe("all");
	});
});

describe("UserSelect", () => {
	it("has correct type structure for auto", () => {
		const value: UserSelect = { kind: "user-select", value: "auto" };
		expect(value.kind).toBe("user-select");
		expect(value.value).toBe("auto");
	});

	it("has correct type structure for none", () => {
		const value: UserSelect = { kind: "user-select", value: "none" };
		expect(value.value).toBe("none");
	});

	it("has correct type structure for text", () => {
		const value: UserSelect = { kind: "user-select", value: "text" };
		expect(value.value).toBe("text");
	});

	it("has correct type structure for all", () => {
		const value: UserSelect = { kind: "user-select", value: "all" };
		expect(value.value).toBe("all");
	});
});
