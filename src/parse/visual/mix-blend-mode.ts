import { err, ok, type Result } from "../../core/result.js";

export type MixBlendMode =
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

export interface MixBlendModeIR {
	kind: "mix-blend-mode";
	mode: MixBlendMode;
}

const VALID_MODES = new Set<MixBlendMode>([
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

export function parseMixBlendMode(value: string): Result<MixBlendModeIR, string> {
	const trimmed = value.trim();

	if (VALID_MODES.has(trimmed as MixBlendMode)) {
		return ok({
			kind: "mix-blend-mode",
			mode: trimmed as MixBlendMode,
		});
	}

	return err(
		`Invalid mix-blend-mode: "${value}". Expected: normal, multiply, screen, overlay, darken, lighten, color-dodge, color-burn, hard-light, soft-light, difference, exclusion, hue, saturation, color, or luminosity`,
	);
}
