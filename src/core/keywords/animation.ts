// b_path:: src/core/keywords/animation.ts

/**
 * CSS Animation Direction Keywords
 *
 * Keywords for the animation-direction property.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/animation-direction}
 * @see {@link https://www.w3.org/TR/css-animations-1/#animation-direction}
 *
 * @public
 */
export const ANIMATION_DIRECTION_KEYWORDS = ["normal", "reverse", "alternate", "alternate-reverse"] as const;

/**
 * CSS Animation Direction Keyword Type
 *
 * @public
 */
export type AnimationDirectionKeyword = (typeof ANIMATION_DIRECTION_KEYWORDS)[number];

/**
 * CSS Animation Fill Mode Keywords
 *
 * Keywords for the animation-fill-mode property.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/animation-fill-mode}
 * @see {@link https://www.w3.org/TR/css-animations-1/#animation-fill-mode}
 *
 * @public
 */
export const ANIMATION_FILL_MODE_KEYWORDS = ["none", "forwards", "backwards", "both"] as const;

/**
 * CSS Animation Fill Mode Keyword Type
 *
 * @public
 */
export type AnimationFillModeKeyword = (typeof ANIMATION_FILL_MODE_KEYWORDS)[number];

/**
 * CSS Animation Play State Keywords
 *
 * Keywords for the animation-play-state property.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/animation-play-state}
 * @see {@link https://www.w3.org/TR/css-animations-1/#animation-play-state}
 *
 * @public
 */
export const ANIMATION_PLAY_STATE_KEYWORDS = ["running", "paused"] as const;

/**
 * CSS Animation Play State Keyword Type
 *
 * @public
 */
export type AnimationPlayStateKeyword = (typeof ANIMATION_PLAY_STATE_KEYWORDS)[number];

/**
 * CSS Easing Function Keywords
 *
 * Keyword values for easing functions (animation-timing-function, transition-timing-function).
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function}
 * @see {@link https://www.w3.org/TR/css-easing-1/#easing-functions}
 *
 * @public
 */
export const EASING_KEYWORD_KEYWORDS = [
	"ease",
	"ease-in",
	"ease-out",
	"ease-in-out",
	"linear",
	"step-start",
	"step-end",
] as const;

/**
 * CSS Easing Function Keyword Type
 *
 * @public
 */
export type EasingKeywordKeyword = (typeof EASING_KEYWORD_KEYWORDS)[number];

/**
 * CSS Step Position Keywords
 *
 * Keywords for the step position parameter in steps() easing function.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function#steps}
 * @see {@link https://www.w3.org/TR/css-easing-1/#step-easing-functions}
 *
 * @public
 */
export const STEP_POSITION_KEYWORDS = ["jump-start", "jump-end", "jump-none", "jump-both", "start", "end"] as const;

/**
 * CSS Step Position Keyword Type
 *
 * @public
 */
export type StepPositionKeyword = (typeof STEP_POSITION_KEYWORDS)[number];
