import { z } from "zod";

const PlatformSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
});

const RequirementsSchema = z.object({
  minimum: z.string(),
  recommended: z.string(),
});

const PlatformDetailSchema = z.object({
  platform: PlatformSchema,
  released_at: z.string(),
  requirements: RequirementsSchema,
});

const ESRBRatingSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
});

export const GameSchema = z.object({
  id: z.number(),
  slug: z.string(),
  name: z.string(),
  released: z.string(), // Date in format "YYYY-MM-DD"
  tba: z.boolean(),
  background_image: z.string().url(),
  rating: z.number(),
  rating_top: z.number(),
  ratings: z.record(z.any()), // Generic object, could be refined based on actual structure
  ratings_count: z.number(),
  reviews_text_count: z.string(), // Note: This is a string in your example, though it might be a number
  added: z.number(),
  added_by_status: z.record(z.any()), // Generic object, could be refined based on actual structure
  metacritic: z.number(),
  playtime: z.number(),
  suggestions_count: z.number(),
  updated: z.string().datetime(), // ISO date string
  esrb_rating: ESRBRatingSchema,
  platforms: z.array(PlatformDetailSchema),
});

// Type inference
export type Game = z.infer<typeof GameSchema>;
