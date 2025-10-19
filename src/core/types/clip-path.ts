// b_path:: src/core/types/clip-path.ts

import type { Url } from "./url";

/**
 * Clip-path value types for CSS clip-path property.
 *
 * @public
 */
export type ClipPathValue = Url | ClipPathNone;

/**
 * No clipping (default).
 *
 * @public
 */
export type ClipPathNone = {
	kind: "clip-path-none";
};
