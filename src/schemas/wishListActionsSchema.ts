import { z } from "zod";
import { GameSchema } from "./gameSchema";

export const wishListActionsSchema = z.union([
  z.object({
    type: z.literal("ADD_TO_WISHLIST"),
    game: GameSchema,
  }),
  z.object({
    type: z.literal("REMOVE_FROM_WISHLIST"),
    game: GameSchema,
  }),
]);

export type WishListAction = z.infer<typeof wishListActionsSchema>;
