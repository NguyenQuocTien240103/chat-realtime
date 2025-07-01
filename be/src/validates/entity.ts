import { z } from "zod";

export const entitySchema = z.object({
  entityId: z.number(),
});

export type EntitySchemaType = z.infer<typeof entitySchema>;
