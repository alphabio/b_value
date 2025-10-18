// b_path:: src/utils/math.ts
/**
 * Math utility functions
 */

/**
 * Add two numbers
 * @param a - First number
 * @param b - Second number
 * @returns Sum of a and b
 */
export function add(a: number, b: number): number {
	return a + b;
}

/**
 * Subtract two numbers
 * @param a - First number
 * @param b - Second number
 * @returns Difference of a and b
 */
export function subtract(a: number, b: number): number {
	return a - b;
}

/**
 * Multiply two numbers
 * @param a - First number
 * @param b - Second number
 * @returns Product of a and b
 */
export function multiply(a: number, b: number): number {
	return a * b;
}

/**
 * Divide two numbers
 * @param a - Dividend
 * @param b - Divisor
 * @returns Quotient of a and b
 * @throws Error if divisor is zero
 */
export function divide(a: number, b: number): number {
	if (b === 0) {
		throw new Error("Division by zero is not allowed");
	}
	return a / b;
}
