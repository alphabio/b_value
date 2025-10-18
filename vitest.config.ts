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
			],
			all: true,
			thresholds: {
				lines: 90,
				functions: 90,
				branches: 90,
				statements: 90,
			},
		},
	},
	esbuild: {
		target: "node18",
	},
});
