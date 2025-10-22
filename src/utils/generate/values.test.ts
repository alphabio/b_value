import { describe, expect, it } from "vitest";
import {
	angleToCss,
	borderRadiusToCss,
	joinCssValues,
	joinCssValuesWithSpaces,
	lengthPercentageToCss,
	lengthToCss,
	numberToCss,
	positionValueToCss,
} from "./values";

describe("positionValueToCss", () => {
	it("should convert keyword position values", () => {
		expect(positionValueToCss("center")).toBe("center");
		expect(positionValueToCss("top")).toBe("top");
		expect(positionValueToCss("left")).toBe("left");
		expect(positionValueToCss("right")).toBe("right");
		expect(positionValueToCss("bottom")).toBe("bottom");
	});

	it("should convert length position values", () => {
		expect(positionValueToCss({ value: 100, unit: "px" })).toBe("100px");
		expect(positionValueToCss({ value: 50, unit: "%" })).toBe("50%");
		expect(positionValueToCss({ value: 0, unit: "px" })).toBe("0px");
		expect(positionValueToCss({ value: 2.5, unit: "rem" })).toBe("2.5rem");
	});

	it("should handle negative values", () => {
		expect(positionValueToCss({ value: -10, unit: "px" })).toBe("-10px");
		expect(positionValueToCss({ value: -5, unit: "%" })).toBe("-5%");
	});
});

describe("lengthToCss", () => {
	it("should convert length values", () => {
		expect(lengthToCss({ value: 10, unit: "px" })).toBe("10px");
		expect(lengthToCss({ value: 2.5, unit: "rem" })).toBe("2.5rem");
		expect(lengthToCss({ value: 100, unit: "vh" })).toBe("100vh");
		expect(lengthToCss({ value: 0, unit: "px" })).toBe("0px");
	});

	it("should handle negative values", () => {
		expect(lengthToCss({ value: -5, unit: "px" })).toBe("-5px");
		expect(lengthToCss({ value: -1.5, unit: "em" })).toBe("-1.5em");
	});

	it("should handle decimal values", () => {
		expect(lengthToCss({ value: 0.5, unit: "em" })).toBe("0.5em");
		expect(lengthToCss({ value: 12.345, unit: "px" })).toBe("12.345px");
	});
});

describe("lengthPercentageToCss", () => {
	it("should convert length values", () => {
		expect(lengthPercentageToCss({ value: 10, unit: "px" })).toBe("10px");
		expect(lengthPercentageToCss({ value: 2.5, unit: "rem" })).toBe("2.5rem");
	});

	it("should convert percentage values", () => {
		expect(lengthPercentageToCss({ value: 50, unit: "%" })).toBe("50%");
		expect(lengthPercentageToCss({ value: 100, unit: "%" })).toBe("100%");
		expect(lengthPercentageToCss({ value: 0, unit: "%" })).toBe("0%");
	});

	it("should handle negative values", () => {
		expect(lengthPercentageToCss({ value: -10, unit: "px" })).toBe("-10px");
		expect(lengthPercentageToCss({ value: -25, unit: "%" })).toBe("-25%");
	});
});

describe("angleToCss", () => {
	it("should convert angle values in degrees", () => {
		expect(angleToCss({ value: 45, unit: "deg" })).toBe("45deg");
		expect(angleToCss({ value: 90, unit: "deg" })).toBe("90deg");
		expect(angleToCss({ value: 0, unit: "deg" })).toBe("0deg");
	});

	it("should convert angle values in radians", () => {
		expect(angleToCss({ value: Math.PI, unit: "rad" })).toBe(`${Math.PI}rad`);
		expect(angleToCss({ value: 1.5708, unit: "rad" })).toBe("1.5708rad");
	});

	it("should convert angle values in gradians", () => {
		expect(angleToCss({ value: 100, unit: "grad" })).toBe("100grad");
		expect(angleToCss({ value: 200, unit: "grad" })).toBe("200grad");
	});

	it("should convert angle values in turns", () => {
		expect(angleToCss({ value: 0.5, unit: "turn" })).toBe("0.5turn");
		expect(angleToCss({ value: 1, unit: "turn" })).toBe("1turn");
	});

	it("should handle negative angles", () => {
		expect(angleToCss({ value: -45, unit: "deg" })).toBe("-45deg");
		expect(angleToCss({ value: -0.25, unit: "turn" })).toBe("-0.25turn");
	});
});

describe("numberToCss", () => {
	it("should convert integers", () => {
		expect(numberToCss(0)).toBe("0");
		expect(numberToCss(1)).toBe("1");
		expect(numberToCss(100)).toBe("100");
		expect(numberToCss(999)).toBe("999");
	});

	it("should convert decimals", () => {
		expect(numberToCss(0.5)).toBe("0.5");
		expect(numberToCss(1.25)).toBe("1.25");
		expect(numberToCss(Math.PI)).toBe(String(Math.PI));
	});

	it("should handle negative numbers", () => {
		expect(numberToCss(-1)).toBe("-1");
		expect(numberToCss(-0.5)).toBe("-0.5");
		expect(numberToCss(-100)).toBe("-100");
	});

	it("should handle zero", () => {
		expect(numberToCss(0)).toBe("0");
		expect(numberToCss(-0)).toBe("0");
	});
});

describe("joinCssValues", () => {
	it("should join values with comma and space", () => {
		expect(joinCssValues(["red", "blue", "green"])).toBe("red, blue, green");
		expect(joinCssValues(["1px", "2px", "3px"])).toBe("1px, 2px, 3px");
	});

	it("should handle single value", () => {
		expect(joinCssValues(["red"])).toBe("red");
	});

	it("should handle empty array", () => {
		expect(joinCssValues([])).toBe("");
	});

	it("should handle complex values", () => {
		expect(joinCssValues(["linear-gradient(red, blue)", "url(image.png)", "#fff"])).toBe(
			"linear-gradient(red, blue), url(image.png), #fff",
		);
	});
});

describe("joinCssValuesWithSpaces", () => {
	it("should join values with spaces", () => {
		expect(joinCssValuesWithSpaces(["10px", "20px", "30px"])).toBe("10px 20px 30px");
		expect(joinCssValuesWithSpaces(["red", "blue"])).toBe("red blue");
	});

	it("should handle single value", () => {
		expect(joinCssValuesWithSpaces(["10px"])).toBe("10px");
	});

	it("should handle empty array", () => {
		expect(joinCssValuesWithSpaces([])).toBe("");
	});

	it("should handle keyword values", () => {
		expect(joinCssValuesWithSpaces(["none", "repeat", "scroll"])).toBe("none repeat scroll");
	});
});

describe("borderRadiusToCss", () => {
	it("should optimize to 1 value when all corners equal", () => {
		const radius = {
			topLeft: { value: 5, unit: "px" as const },
			topRight: { value: 5, unit: "px" as const },
			bottomRight: { value: 5, unit: "px" as const },
			bottomLeft: { value: 5, unit: "px" as const },
		};
		expect(borderRadiusToCss(radius)).toBe("5px");
	});

	it("should optimize to 2 values when diagonals same", () => {
		const radius = {
			topLeft: { value: 5, unit: "px" as const },
			topRight: { value: 10, unit: "px" as const },
			bottomRight: { value: 5, unit: "px" as const },
			bottomLeft: { value: 10, unit: "px" as const },
		};
		expect(borderRadiusToCss(radius)).toBe("5px 10px");
	});

	it("should optimize to 3 values when top-right equals bottom-left", () => {
		const radius = {
			topLeft: { value: 5, unit: "px" as const },
			topRight: { value: 10, unit: "px" as const },
			bottomRight: { value: 15, unit: "px" as const },
			bottomLeft: { value: 10, unit: "px" as const },
		};
		expect(borderRadiusToCss(radius)).toBe("5px 10px 15px");
	});

	it("should use 4 values when all different", () => {
		const radius = {
			topLeft: { value: 5, unit: "px" as const },
			topRight: { value: 10, unit: "px" as const },
			bottomRight: { value: 15, unit: "px" as const },
			bottomLeft: { value: 20, unit: "px" as const },
		};
		expect(borderRadiusToCss(radius)).toBe("5px 10px 15px 20px");
	});

	it("should handle percentage values", () => {
		const radius = {
			topLeft: { value: 50, unit: "%" as const },
			topRight: { value: 50, unit: "%" as const },
			bottomRight: { value: 50, unit: "%" as const },
			bottomLeft: { value: 50, unit: "%" as const },
		};
		expect(borderRadiusToCss(radius)).toBe("50%");
	});

	it("should handle mixed units", () => {
		const radius = {
			topLeft: { value: 5, unit: "px" as const },
			topRight: { value: 10, unit: "%" as const },
			bottomRight: { value: 5, unit: "px" as const },
			bottomLeft: { value: 10, unit: "%" as const },
		};
		expect(borderRadiusToCss(radius)).toBe("5px 10%");
	});

	it("should handle zero values", () => {
		const radius = {
			topLeft: { value: 0, unit: "px" as const },
			topRight: { value: 0, unit: "px" as const },
			bottomRight: { value: 0, unit: "px" as const },
			bottomLeft: { value: 0, unit: "px" as const },
		};
		expect(borderRadiusToCss(radius)).toBe("0px");
	});

	it("should handle decimal values", () => {
		const radius = {
			topLeft: { value: 2.5, unit: "rem" as const },
			topRight: { value: 2.5, unit: "rem" as const },
			bottomRight: { value: 2.5, unit: "rem" as const },
			bottomLeft: { value: 2.5, unit: "rem" as const },
		};
		expect(borderRadiusToCss(radius)).toBe("2.5rem");
	});
});
