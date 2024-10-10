import { z } from "zod";

export const NodeDto = z.object({
  x: z.number(),
  y: z.number(),
  z: z.number(),
});

export type Node = z.infer<typeof NodeDto>;
