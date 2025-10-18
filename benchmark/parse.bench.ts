// b_path:: benchmark/parse.bench.ts

import { Bench } from "tinybench";
import { Parse } from "../src";

async function runBenchmark() {
	const bench = new Bench({ time: 100 });

	// Radial Gradient Parsing - Simple Cases
	bench
		.add("parse radial: minimal (two colors)", () => {
			Parse.Gradient.Radial.parse("radial-gradient(red, blue)");
		})
		.add("parse radial: circle shape", () => {
			Parse.Gradient.Radial.parse("radial-gradient(circle, red, blue)");
		})
		.add("parse radial: ellipse shape", () => {
			Parse.Gradient.Radial.parse("radial-gradient(ellipse, red, blue)");
		});

	// Radial Gradient Parsing - With Positions
	bench
		.add("parse radial: at center", () => {
			Parse.Gradient.Radial.parse("radial-gradient(circle at center, red, blue)");
		})
		.add("parse radial: at top left", () => {
			Parse.Gradient.Radial.parse("radial-gradient(circle at top left, red, blue)");
		})
		.add("parse radial: at 50% 50%", () => {
			Parse.Gradient.Radial.parse("radial-gradient(circle at 50% 50%, red, blue)");
		})
		.add("parse radial: at 100px 200px", () => {
			Parse.Gradient.Radial.parse("radial-gradient(circle at 100px 200px, red, blue)");
		});

	// Radial Gradient Parsing - With Color Stops
	bench
		.add("parse radial: color stops with %", () => {
			Parse.Gradient.Radial.parse("radial-gradient(red 0%, blue 100%)");
		})
		.add("parse radial: color stops with px", () => {
			Parse.Gradient.Radial.parse("radial-gradient(red 0px, blue 100px)");
		})
		.add("parse radial: multiple color stops", () => {
			Parse.Gradient.Radial.parse("radial-gradient(red 0%, yellow 25%, green 50%, blue 75%, purple 100%)");
		});

	// Radial Gradient Parsing - With Size Keywords
	bench
		.add("parse radial: closest-side", () => {
			Parse.Gradient.Radial.parse("radial-gradient(closest-side, red, blue)");
		})
		.add("parse radial: closest-corner", () => {
			Parse.Gradient.Radial.parse("radial-gradient(closest-corner, red, blue)");
		})
		.add("parse radial: farthest-side", () => {
			Parse.Gradient.Radial.parse("radial-gradient(farthest-side, red, blue)");
		})
		.add("parse radial: farthest-corner", () => {
			Parse.Gradient.Radial.parse("radial-gradient(farthest-corner, red, blue)");
		});

	// Radial Gradient Parsing - Complex Cases
	bench
		.add("parse radial: circle + size + position", () => {
			Parse.Gradient.Radial.parse("radial-gradient(circle closest-side at center, red, blue)");
		})
		.add("parse radial: full featured", () => {
			Parse.Gradient.Radial.parse("radial-gradient(circle farthest-corner at 50% 50%, red 0%, yellow 25%, blue 100%)");
		})
		.add("parse radial: repeating", () => {
			Parse.Gradient.Radial.parse("repeating-radial-gradient(circle, red 0%, blue 10%)");
		});

	// Radial Gradient Parsing - Color Formats
	bench
		.add("parse radial: hex colors", () => {
			Parse.Gradient.Radial.parse("radial-gradient(#ff0000, #0000ff)");
		})
		.add("parse radial: rgb colors", () => {
			Parse.Gradient.Radial.parse("radial-gradient(rgb(255,0,0), rgb(0,0,255))");
		})
		.add("parse radial: rgba colors", () => {
			Parse.Gradient.Radial.parse("radial-gradient(rgba(255,0,0,0.5), rgba(0,0,255,0.8))");
		})
		.add("parse radial: hsl colors", () => {
			Parse.Gradient.Radial.parse("radial-gradient(hsl(0,100%,50%), hsl(240,100%,50%))");
		});

	await bench.run();

	console.log("\n=== Parse Operations Benchmark ===\n");
	console.table(bench.table());

	// Summary statistics
	console.log("\n=== Summary ===");
	console.log(`Total operations: ${bench.tasks.length}`);
	console.log(`Fastest: ${bench.tasks.reduce((a, b) => ((a.result?.hz || 0) > (b.result?.hz || 0) ? a : b)).name}`);
	console.log(`Slowest: ${bench.tasks.reduce((a, b) => ((a.result?.hz || 0) < (b.result?.hz || 0) ? a : b)).name}`);
}

runBenchmark().catch(console.error);
