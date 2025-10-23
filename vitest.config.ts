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
				"examples/**", // Example files not production code
				"docs/**",
				"docs.internal/**",
				"docs.llm/**",
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
				// Index files (barrel exports only)
				"**/index.ts",
				// Core infrastructure (tested via usage)
				"src/core/result.ts", // Result type utilities
				"src/core/units/**", // Simple type exports
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
