import { z } from "zod";

export const autoSchema = z.object({
	type: z.literal("auto"),
});
