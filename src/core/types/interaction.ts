// b_path:: src/core/types/interaction.ts

/**
 * pointer-events property
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events}
 */
export interface PointerEvents {
	readonly kind: "pointer-events";
	readonly value:
		| "auto"
		| "none"
		| "visiblePainted"
		| "visibleFill"
		| "visibleStroke"
		| "visible"
		| "painted"
		| "fill"
		| "stroke"
		| "all"
		| "bounding-box";
}

/**
 * user-select property
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/user-select}
 */
export interface UserSelect {
	readonly kind: "user-select";
	readonly value: "auto" | "text" | "none" | "contain" | "all";
}
