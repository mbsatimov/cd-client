import { z } from 'zod';

export const bookExamFormSchema = z.object({
  speakingTimeId: z.string({ required_error: 'Speaking time is required' })
});

export type BookExamFormSchema = z.infer<typeof bookExamFormSchema>;
