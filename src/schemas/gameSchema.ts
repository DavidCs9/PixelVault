import { z } from "zod";

export const gameSchema = z.object({
  id: z.number(),
  name: z.string(),
  rating: z.number(),
  background_image: z.string(),
  released: z.string(),
});

export type Game = z.infer<typeof gameSchema>;
