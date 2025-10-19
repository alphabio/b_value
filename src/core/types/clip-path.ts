// b_path:: src/core/types/clip-path.ts

/**
 * Clip-path value types for CSS clip-path property.
 *
 * @public
 */
export type ClipPathValue = ClipPathUrl | ClipPathNone;

/**
 * URL reference to SVG clip path.
 *
 * @public
 */
export type ClipPathUrl = {
	kind: "clip-path-url";
	url: string;
};

/**
 * No clipping (default).
 *
 * @public
 */
export type ClipPathNone = {
	kind: "clip-path-none";
};
