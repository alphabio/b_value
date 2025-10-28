import type { GenerateResult } from "@/core/result";
import { generateOk } from "@/core/result";
import type { BackgroundBlendModeIR } from "../../parse/visual/background-blend-mode.js";

export function generateBackgroundBlendMode(ir: BackgroundBlendModeIR): GenerateResult {
	return generateOk(ir.mode);
}
