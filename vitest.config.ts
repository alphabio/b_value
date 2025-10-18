// b_path:: vitest.config.ts
/// <reference types="vitest" />

import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	test: {
		globals: true,
		environment: "node",
		include: [
			"src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
			"test/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
		],
		exclude: ["node_modules", "dist", ".idea", ".git", ".cache", "TMP"],
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html", "lcov"],
			exclude: [
				"coverage/**",
				"dist/**",
				"TMP/**",
				"TMP/**/*.*",
				"NOTES/**",
				"benchmark/**",
				"scripts/**",
				"packages/*/test{,s}/**",
				"**/*.d.ts",
				"cypress/**",
				"test{,s}/**",
				"test{,-*}.{js,cjs,mjs,ts,tsx,jsx}",
				"**/*{.,-}test.{js,cjs,mjs,ts,tsx,jsx}",
				"**/*{.,-}spec.{js,cjs,mjs,ts,tsx,jsx}",
				"**/__test__/**",
				"**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*",
				"**/.{eslint,mocha,prettier}rc.{js,cjs,yml}",
				"src/types/**",
				"src/core/**", // Core is type definitions, not tested directly
				"src/index.ts", // Index files just re-export
				"src/parse/index.ts",
				"src/generate/index.ts",
				"src/parse/gradient/index.ts",
				"src/generate/gradient/index.ts",
				"src/parse/position/index.ts", // Barrel file
				"src/generate/position/index.ts", // Barrel file
				"src/parse/transform/index.ts", // Barrel file
				"src/generate/transform/index.ts", // Barrel file
			],
			all: true,
			thresholds: {
				lines: 89, // Phase 3: 89.43% achieved - includes transform/position parsers with defensive error paths
				functions: 90,
				branches: 71, // Phase 3: 71% achieved - defensive error paths and edge cases remain uncovered
				statements: 89,
			},
		},
	},
	esbuild: {
		target: "node18",
	},
});
