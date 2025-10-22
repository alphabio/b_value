import type { BackgroundBlendModeIR } from "../../parse/visual/background-blend-mode.js";

export function generateBackgroundBlendMode(ir: BackgroundBlendModeIR): string {
	return generateOk(ir.mode);
}
