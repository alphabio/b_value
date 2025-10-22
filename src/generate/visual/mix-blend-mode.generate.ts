import type { MixBlendModeIR } from "../../parse/visual/mix-blend-mode.js";

export function generateMixBlendMode(ir: MixBlendModeIR): string {
	return ir.mode;
}
