// b_path:: src/core/types/auto.ts
import { z } from "zod";

export const autoSchema = z.object({
	type: z.literal("auto"),
});
