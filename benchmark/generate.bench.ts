// b_path:: benchmark/generate.bench.ts

import { Bench } from "tinybench";
import type { Core } from "../src";
import { Generate } from "../src";

async function runBenchmark() {
	const bench = new Bench({ time: 100 });

	// Radial Gradient Generation - Simple Cases
	const minimal: Core.Type.RadialGradient = {
		kind: "radial",
		colorStops: [{ color: "red" }, { color: "blue" }],
		repeating: false,
	};

	const withCircle: Core.Type.RadialGradient = {
		kind: "radial",
		shape: "circle",
		colorStops: [{ color: "red" }, { color: "blue" }],
		repeating: false,
	};

	const withEllipse: Core.Type.RadialGradient = {
		kind: "radial",
		shape: "ellipse",
		colorStops: [{ color: "red" }, { color: "blue" }],
		repeating: false,
	};

	bench
		.add("generate radial: minimal (two colors)", () => {
			Generate.Gradient.Radial.toCss(minimal);
		})
		.add("generate radial: circle shape", () => {
			Generate.Gradient.Radial.toCss(withCircle);
		})
		.add("generate radial: ellipse shape", () => {
			Generate.Gradient.Radial.toCss(withEllipse);
		});

	// Radial Gradient Generation - With Positions
	const atCenter: Core.Type.RadialGradient = {
		kind: "radial",
		shape: "circle",
		position: { horizontal: "center", vertical: "center" },
		colorStops: [{ color: "red" }, { color: "blue" }],
		repeating: false,
	};

	const atTopLeft: Core.Type.RadialGradient = {
		kind: "radial",
		shape: "circle",
		position: { horizontal: "left", vertical: "top" },
		colorStops: [{ color: "red" }, { color: "blue" }],
		repeating: false,
	};

	const atPercentage: Core.Type.RadialGradient = {
		kind: "radial",
		shape: "circle",
		position: {
			horizontal: { value: 50, unit: "%" },
			vertical: { value: 50, unit: "%" },
		},
		colorStops: [{ color: "red" }, { color: "blue" }],
		repeating: false,
	};

	const atPixels: Core.Type.RadialGradient = {
		kind: "radial",
		shape: "circle",
		position: {
			horizontal: { value: 100, unit: "px" },
			vertical: { value: 200, unit: "px" },
		},
		colorStops: [{ color: "red" }, { color: "blue" }],
		repeating: false,
	};

	bench
		.add("generate radial: at center", () => {
			Generate.Gradient.Radial.toCss(atCenter);
		})
		.add("generate radial: at top left", () => {
			Generate.Gradient.Radial.toCss(atTopLeft);
		})
		.add("generate radial: at 50% 50%", () => {
			Generate.Gradient.Radial.toCss(atPercentage);
		})
		.add("generate radial: at 100px 200px", () => {
			Generate.Gradient.Radial.toCss(atPixels);
		});

	// Radial Gradient Generation - With Color Stops
	const withStopsPercent: Core.Type.RadialGradient = {
		kind: "radial",
		colorStops: [
			{ color: "red", position: { value: 0, unit: "%" } },
			{ color: "blue", position: { value: 100, unit: "%" } },
		],
		repeating: false,
	};

	const withStopsPx: Core.Type.RadialGradient = {
		kind: "radial",
		colorStops: [
			{ color: "red", position: { value: 0, unit: "px" } },
			{ color: "blue", position: { value: 100, unit: "px" } },
		],
		repeating: false,
	};

	const multipleStops: Core.Type.RadialGradient = {
		kind: "radial",
		colorStops: [
			{ color: "red", position: { value: 0, unit: "%" } },
			{ color: "yellow", position: { value: 25, unit: "%" } },
			{ color: "green", position: { value: 50, unit: "%" } },
			{ color: "blue", position: { value: 75, unit: "%" } },
			{ color: "purple", position: { value: 100, unit: "%" } },
		],
		repeating: false,
	};

	bench
		.add("generate radial: color stops with %", () => {
			Generate.Gradient.Radial.toCss(withStopsPercent);
		})
		.add("generate radial: color stops with px", () => {
			Generate.Gradient.Radial.toCss(withStopsPx);
		})
		.add("generate radial: multiple color stops", () => {
			Generate.Gradient.Radial.toCss(multipleStops);
		});

	// Radial Gradient Generation - With Size Keywords
	const closestSide: Core.Type.RadialGradient = {
		kind: "radial",
		size: { kind: "keyword", value: "closest-side" },
		colorStops: [{ color: "red" }, { color: "blue" }],
		repeating: false,
	};

	const closestCorner: Core.Type.RadialGradient = {
		kind: "radial",
		size: { kind: "keyword", value: "closest-corner" },
		colorStops: [{ color: "red" }, { color: "blue" }],
		repeating: false,
	};

	const farthestSide: Core.Type.RadialGradient = {
		kind: "radial",
		size: { kind: "keyword", value: "farthest-side" },
		colorStops: [{ color: "red" }, { color: "blue" }],
		repeating: false,
	};

	const farthestCorner: Core.Type.RadialGradient = {
		kind: "radial",
		size: { kind: "keyword", value: "farthest-corner" },
		colorStops: [{ color: "red" }, { color: "blue" }],
		repeating: false,
	};

	bench
		.add("generate radial: closest-side", () => {
			Generate.Gradient.Radial.toCss(closestSide);
		})
		.add("generate radial: closest-corner", () => {
			Generate.Gradient.Radial.toCss(closestCorner);
		})
		.add("generate radial: farthest-side", () => {
			Generate.Gradient.Radial.toCss(farthestSide);
		})
		.add("generate radial: farthest-corner", () => {
			Generate.Gradient.Radial.toCss(farthestCorner);
		});

	// Radial Gradient Generation - Complex Cases
	const complex: Core.Type.RadialGradient = {
		kind: "radial",
		shape: "circle",
		size: { kind: "keyword", value: "closest-side" },
		position: { horizontal: "center", vertical: "center" },
		colorStops: [{ color: "red" }, { color: "blue" }],
		repeating: false,
	};

	const fullFeatured: Core.Type.RadialGradient = {
		kind: "radial",
		shape: "circle",
		size: { kind: "keyword", value: "farthest-corner" },
		position: {
			horizontal: { value: 50, unit: "%" },
			vertical: { value: 50, unit: "%" },
		},
		colorStops: [
			{ color: "red", position: { value: 0, unit: "%" } },
			{ color: "yellow", position: { value: 25, unit: "%" } },
			{ color: "blue", position: { value: 100, unit: "%" } },
		],
		repeating: false,
	};

	const repeating: Core.Type.RadialGradient = {
		kind: "radial",
		shape: "circle",
		colorStops: [
			{ color: "red", position: { value: 0, unit: "%" } },
			{ color: "blue", position: { value: 10, unit: "%" } },
		],
		repeating: true,
	};

	bench
		.add("generate radial: circle + size + position", () => {
			Generate.Gradient.Radial.toCss(complex);
		})
		.add("generate radial: full featured", () => {
			Generate.Gradient.Radial.toCss(fullFeatured);
		})
		.add("generate radial: repeating", () => {
			Generate.Gradient.Radial.toCss(repeating);
		});

	await bench.run();

	console.log("\n=== Generate Operations Benchmark ===\n");
	console.table(bench.table());

	console.log("\n=== Summary ===");
	console.log(`Total operations: ${bench.tasks.length}`);
	console.log(`Fastest: ${bench.tasks.reduce((a, b) => ((a.result?.hz || 0) > (b.result?.hz || 0) ? a : b)).name}`);
	console.log(`Slowest: ${bench.tasks.reduce((a, b) => ((a.result?.hz || 0) < (b.result?.hz || 0) ? a : b)).name}`);
}

runBenchmark().catch(console.error);
