import { z } from "zod";

export const achievementInputSchema = z.object({
  title: z.string().trim().min(2).max(240),
  description: z.string().trim().min(2).max(5000),
  category: z.string().trim().min(2).max(80),
  achievementDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  imageUrl: z.string().max(4_500_000).nullable().optional(),
  published: z.boolean().default(true),
  sortOrder: z.number().int().min(0).max(100000).default(0),
});
