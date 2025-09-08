import { z } from 'zod';

export const placementFormSchema = z.object({
  leadId: z.string()
});

export type PlacementFormSchema = z.infer<typeof placementFormSchema>;
