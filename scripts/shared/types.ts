// b_path:: scripts/shared/types.ts
/**
 * Shared types for verification scripts
 */

export interface TestFixture {
	css: string;
	category: string;
	file: string;
	line: number;
}

export interface ValidationResult {
	fixture: TestFixture;
	parseSuccess: boolean;
	parseError?: string;
	generateSuccess: boolean;
	generateError?: string;
	roundTripSuccess: boolean;
	roundTripError?: string;
	originalIR?: unknown;
	regeneratedIR?: unknown;
	generatedCSS?: string;
}

export interface ValidationReport {
	totalFixtures: number;
	parseSuccesses: number;
	parseFailures: number;
	generateSuccesses: number;
	generateFailures: number;
	roundTripSuccesses: number;
	roundTripFailures: number;
	results: ValidationResult[];
}

export interface Metrics {
	parseSuccessRate: number;
	generateSuccessRate: number;
	roundTripSuccessRate: number;
	avgParseTime: number;
	avgGenerateTime: number;
}
