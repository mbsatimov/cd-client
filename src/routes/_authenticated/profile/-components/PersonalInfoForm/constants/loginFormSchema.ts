import { z } from 'zod';

export const personalInfoFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required')
});

export type PersonalInfoFormSchema = z.infer<typeof personalInfoFormSchema>;
