import { err, ok, type Result } from "../../core/result.js";

export type BackgroundBlendMode =
	| "normal"
	| "multiply"
	| "screen"
	| "overlay"
	| "darken"
	| "lighten"
	| "color-dodge"
	| "color-burn"
	| "hard-light"
	| "soft-light"
	| "difference"
	| "exclusion"
	| "hue"
	| "saturation"
	| "color"
	| "luminosity";

export interface BackgroundBlendModeIR {
	kind: "background-blend-mode";
	mode: BackgroundBlendMode;
}

const VALID_MODES = new Set<BackgroundBlendMode>([
	"normal",
	"multiply",
	"screen",
	"overlay",
	"darken",
	"lighten",
	"color-dodge",
	"color-burn",
	"hard-light",
	"soft-light",
	"difference",
	"exclusion",
	"hue",
	"saturation",
	"color",
	"luminosity",
]);

export function parseBackgroundBlendMode(value: string): Result<BackgroundBlendModeIR, string> {
	const trimmed = value.trim();

	if (VALID_MODES.has(trimmed as BackgroundBlendMode)) {
		return ok({
			kind: "background-blend-mode",
			mode: trimmed as BackgroundBlendMode,
		});
	}

	return err(
		`Invalid background-blend-mode: "${value}". Expected: normal, multiply, screen, overlay, darken, lighten, color-dodge, color-burn, hard-light, soft-light, difference, exclusion, hue, saturation, color, or luminosity`,
	);
}
