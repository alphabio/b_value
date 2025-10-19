// b_path:: src/core/types/url.ts

import { z } from "zod";

/**
 * CSS url() function value.
 *
 * Represents a URL reference to an external resource or SVG element.
 * Can be an absolute URL, relative URL, data URL, or hash reference.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/url_function}
 *
 * @example
 * ```typescript
 * import type { Url } from "@/core/types/url";
 *
 * // Fragment identifier (SVG reference)
 * const url1: Url = { kind: "url", value: "#clip-shape" };
 *
 * // File path
 * const url2: Url = { kind: "url", value: "shapes.svg#clip" };
 *
 * // Absolute URL
 * const url3: Url = { kind: "url", value: "https://example.com/image.png" };
 *
 * // Data URL
 * const url4: Url = { kind: "url", value: "data:image/svg+xml,..." };
 * ```
 *
 * @public
 */
export const urlSchema = z.object({
	kind: z.literal("url"),
	value: z.string(),
});

/**
 * TypeScript type for CSS url() function.
 * @public
 */
export type Url = z.infer<typeof urlSchema>;
