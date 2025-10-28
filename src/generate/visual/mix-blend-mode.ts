import type { GenerateResult } from "@/core/result";
import { generateOk } from "@/core/result";
import type { MixBlendModeIR } from "../../parse/visual/mix-blend-mode.js";

export function generateMixBlendMode(ir: MixBlendModeIR): GenerateResult {
	return generateOk(ir.mode);
}
