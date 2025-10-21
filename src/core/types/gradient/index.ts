// b_path:: src/core/types/gradient/index.ts

export * from "./conic";
export * from "./direction";
export * from "./linear";
export * from "./radial";
export * from "./radial-shape";
export * from "./radial-size";

import type { ConicGradient } from "./conic";
import type { LinearGradient } from "./linear";
import type { RadialGradient } from "./radial";

/**
 * Union type for all gradient types.
 *
 * @public
 */
export type Gradient = LinearGradient | RadialGradient | ConicGradient;
