import { z } from 'zod';

export const verifyFormSchema = z.object({
  code: z.string().min(4, {
    message: 'Your one-time password must be 4 characters.'
  })
});

export type VerifyFormSchema = z.infer<typeof verifyFormSchema>;
