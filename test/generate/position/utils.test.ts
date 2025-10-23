// Test file for generate/position/utils.ts
import { describe, expect, it } from "vitest";
import type * as Type from "@/core/types";
import * as PositionUtils from "@/generate/position/utils";

describe("generate (Position2D)", () => {
	it("should handle null input", () => {
		const result = PositionUtils.generate(null as unknown as Type.Position2D);
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.issues[0]?.code).toBe("invalid-ir");
		}
	});

	it("should handle undefined input", () => {
		const result = PositionUtils.generate(undefined as unknown as Type.Position2D);
		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.issues[0]?.code).toBe("invalid-ir");
		}
	});

	it("should generate keyword positions", () => {
		const result = PositionUtils.generate({
			horizontal: "center",
			vertical: "center",
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("center center");
		}
	});

	it("should generate mixed keyword and length", () => {
		const result = PositionUtils.generate({
			horizontal: "left",
			vertical: { value: 50, unit: "%" },
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("left 50%");
		}
	});

	it("should generate length/percentage positions", () => {
		const result = PositionUtils.generate({
			horizontal: { value: 100, unit: "px" },
			vertical: { value: 50, unit: "%" },
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("100px 50%");
		}
	});

	it("should handle all position keywords", () => {
		const positions: Array<[Type.Position2D, string]> = [
			[{ horizontal: "left", vertical: "top" }, "left top"],
			[{ horizontal: "right", vertical: "bottom" }, "right bottom"],
			[{ horizontal: "center", vertical: "top" }, "center top"],
			[{ horizontal: "left", vertical: "center" }, "left center"],
		];

		for (const [pos, expected] of positions) {
			const result = PositionUtils.generate(pos);
			expect(result.ok).toBe(true);
			if (result.ok) {
				expect(result.value).toBe(expected);
			}
		}
	});
});

describe("to3DCss", () => {
	it("should generate 3D position with lengths", () => {
		const result = PositionUtils.to3DCss({
			x: { value: 100, unit: "px" },
			y: { value: 50, unit: "%" },
			z: { value: 10, unit: "px" },
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("100px 50% 10px");
		}
	});

	it("should generate 3D position with keywords", () => {
		const result = PositionUtils.to3DCss({
			x: "center",
			y: "top",
			z: { value: 20, unit: "px" },
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("center top 20px");
		}
	});

	it("should handle zero z-value", () => {
		const result = PositionUtils.to3DCss({
			x: { value: 0, unit: "px" },
			y: { value: 0, unit: "px" },
			z: { value: 0, unit: "px" },
		});
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("0px 0px 0px");
		}
	});
});

describe("toListCss", () => {
	it("should generate single position list", () => {
		const result = PositionUtils.toListCss([{ horizontal: "center", vertical: "center" }]);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("center center");
		}
	});

	it("should generate multiple positions with comma separation", () => {
		const result = PositionUtils.toListCss([
			{ horizontal: "left", vertical: "top" },
			{ horizontal: { value: 50, unit: "%" }, vertical: { value: 50, unit: "%" } },
			{ horizontal: "right", vertical: "bottom" },
		]);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("left top, 50% 50%, right bottom");
		}
	});

	it("should handle mixed position formats in list", () => {
		const result = PositionUtils.toListCss([
			{ horizontal: "center", vertical: { value: 100, unit: "px" } },
			{ horizontal: { value: 25, unit: "%" }, vertical: "bottom" },
		]);
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("center 100px, 25% bottom");
		}
	});
});

describe("fromCommonPosition", () => {
	it("should generate center position", () => {
		const result = PositionUtils.fromCommonPosition("center");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("center center");
		}
	});

	it("should generate topLeft position", () => {
		const result = PositionUtils.fromCommonPosition("topLeft");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("left top");
		}
	});

	it("should generate topCenter position", () => {
		const result = PositionUtils.fromCommonPosition("topCenter");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("center top");
		}
	});

	it("should generate topRight position", () => {
		const result = PositionUtils.fromCommonPosition("topRight");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("right top");
		}
	});

	it("should generate middleLeft position", () => {
		const result = PositionUtils.fromCommonPosition("middleLeft");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("left center");
		}
	});

	it("should generate middleRight position", () => {
		const result = PositionUtils.fromCommonPosition("middleRight");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("right center");
		}
	});

	it("should generate bottomLeft position", () => {
		const result = PositionUtils.fromCommonPosition("bottomLeft");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("left bottom");
		}
	});

	it("should generate bottomCenter position", () => {
		const result = PositionUtils.fromCommonPosition("bottomCenter");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("center bottom");
		}
	});

	it("should generate bottomRight position", () => {
		const result = PositionUtils.fromCommonPosition("bottomRight");
		expect(result.ok).toBe(true);
		if (result.ok) {
			expect(result.value).toBe("right bottom");
		}
	});
});
