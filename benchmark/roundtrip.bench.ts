// b_path:: benchmark/roundtrip.bench.ts

import { Bench } from "tinybench";
import { Generate, Parse } from "../src";

async function runBenchmark() {
	const bench = new Bench({ time: 100 });

	// Radial Gradient Roundtrip - Simple Cases
	bench
		.add("roundtrip radial: minimal (two colors)", () => {
			const parsed = Parse.Gradient.Radial.parse("radial-gradient(red, blue)");
			if (parsed.ok) {
				Generate.Gradient.Radial.toCss(parsed.value);
			}
		})
		.add("roundtrip radial: circle shape", () => {
			const parsed = Parse.Gradient.Radial.parse("radial-gradient(circle, red, blue)");
			if (parsed.ok) {
				Generate.Gradient.Radial.toCss(parsed.value);
			}
		})
		.add("roundtrip radial: ellipse shape", () => {
			const parsed = Parse.Gradient.Radial.parse("radial-gradient(ellipse, red, blue)");
			if (parsed.ok) {
				Generate.Gradient.Radial.toCss(parsed.value);
			}
		});

	// Radial Gradient Roundtrip - With Positions
	bench
		.add("roundtrip radial: at center", () => {
			const parsed = Parse.Gradient.Radial.parse("radial-gradient(circle at center, red, blue)");
			if (parsed.ok) {
				Generate.Gradient.Radial.toCss(parsed.value);
			}
		})
		.add("roundtrip radial: at top left", () => {
			const parsed = Parse.Gradient.Radial.parse("radial-gradient(circle at top left, red, blue)");
			if (parsed.ok) {
				Generate.Gradient.Radial.toCss(parsed.value);
			}
		})
		.add("roundtrip radial: at 50% 50%", () => {
			const parsed = Parse.Gradient.Radial.parse("radial-gradient(circle at 50% 50%, red, blue)");
			if (parsed.ok) {
				Generate.Gradient.Radial.toCss(parsed.value);
			}
		})
		.add("roundtrip radial: at 100px 200px", () => {
			const parsed = Parse.Gradient.Radial.parse("radial-gradient(circle at 100px 200px, red, blue)");
			if (parsed.ok) {
				Generate.Gradient.Radial.toCss(parsed.value);
			}
		});

	// Radial Gradient Roundtrip - With Color Stops
	bench
		.add("roundtrip radial: color stops with %", () => {
			const parsed = Parse.Gradient.Radial.parse("radial-gradient(red 0%, blue 100%)");
			if (parsed.ok) {
				Generate.Gradient.Radial.toCss(parsed.value);
			}
		})
		.add("roundtrip radial: color stops with px", () => {
			const parsed = Parse.Gradient.Radial.parse("radial-gradient(red 0px, blue 100px)");
			if (parsed.ok) {
				Generate.Gradient.Radial.toCss(parsed.value);
			}
		})
		.add("roundtrip radial: multiple color stops", () => {
			const parsed = Parse.Gradient.Radial.parse(
				"radial-gradient(red 0%, yellow 25%, green 50%, blue 75%, purple 100%)",
			);
			if (parsed.ok) {
				Generate.Gradient.Radial.toCss(parsed.value);
			}
		});

	// Radial Gradient Roundtrip - With Size Keywords
	bench
		.add("roundtrip radial: closest-side", () => {
			const parsed = Parse.Gradient.Radial.parse("radial-gradient(closest-side, red, blue)");
			if (parsed.ok) {
				Generate.Gradient.Radial.toCss(parsed.value);
			}
		})
		.add("roundtrip radial: closest-corner", () => {
			const parsed = Parse.Gradient.Radial.parse("radial-gradient(closest-corner, red, blue)");
			if (parsed.ok) {
				Generate.Gradient.Radial.toCss(parsed.value);
			}
		})
		.add("roundtrip radial: farthest-side", () => {
			const parsed = Parse.Gradient.Radial.parse("radial-gradient(farthest-side, red, blue)");
			if (parsed.ok) {
				Generate.Gradient.Radial.toCss(parsed.value);
			}
		})
		.add("roundtrip radial: farthest-corner", () => {
			const parsed = Parse.Gradient.Radial.parse("radial-gradient(farthest-corner, red, blue)");
			if (parsed.ok) {
				Generate.Gradient.Radial.toCss(parsed.value);
			}
		});

	// Radial Gradient Roundtrip - Complex Cases
	bench
		.add("roundtrip radial: circle + size + position", () => {
			const parsed = Parse.Gradient.Radial.parse("radial-gradient(circle closest-side at center, red, blue)");
			if (parsed.ok) {
				Generate.Gradient.Radial.toCss(parsed.value);
			}
		})
		.add("roundtrip radial: full featured", () => {
			const parsed = Parse.Gradient.Radial.parse(
				"radial-gradient(circle farthest-corner at 50% 50%, red 0%, yellow 25%, blue 100%)",
			);
			if (parsed.ok) {
				Generate.Gradient.Radial.toCss(parsed.value);
			}
		})
		.add("roundtrip radial: repeating", () => {
			const parsed = Parse.Gradient.Radial.parse("repeating-radial-gradient(circle, red 0%, blue 10%)");
			if (parsed.ok) {
				Generate.Gradient.Radial.toCss(parsed.value);
			}
		});

	// Radial Gradient Roundtrip - Color Formats
	bench
		.add("roundtrip radial: hex colors", () => {
			const parsed = Parse.Gradient.Radial.parse("radial-gradient(#ff0000, #0000ff)");
			if (parsed.ok) {
				Generate.Gradient.Radial.toCss(parsed.value);
			}
		})
		.add("roundtrip radial: rgb colors", () => {
			const parsed = Parse.Gradient.Radial.parse("radial-gradient(rgb(255,0,0), rgb(0,0,255))");
			if (parsed.ok) {
				Generate.Gradient.Radial.toCss(parsed.value);
			}
		})
		.add("roundtrip radial: rgba colors", () => {
			const parsed = Parse.Gradient.Radial.parse("radial-gradient(rgba(255,0,0,0.5), rgba(0,0,255,0.8))");
			if (parsed.ok) {
				Generate.Gradient.Radial.toCss(parsed.value);
			}
		})
		.add("roundtrip radial: hsl colors", () => {
			const parsed = Parse.Gradient.Radial.parse("radial-gradient(hsl(0,100%,50%), hsl(240,100%,50%))");
			if (parsed.ok) {
				Generate.Gradient.Radial.toCss(parsed.value);
			}
		});

	await bench.run();

	console.log("\n=== Roundtrip Operations Benchmark ===\n");
	console.table(bench.table());

	console.log("\n=== Summary ===");
	console.log(`Total operations: ${bench.tasks.length}`);
	console.log(`Fastest: ${bench.tasks.reduce((a, b) => ((a.result?.hz || 0) > (b.result?.hz || 0) ? a : b)).name}`);
	console.log(`Slowest: ${bench.tasks.reduce((a, b) => ((a.result?.hz || 0) < (b.result?.hz || 0) ? a : b)).name}`);
}

runBenchmark().catch(console.error);
