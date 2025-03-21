import { z } from 'zod';

const PHONE_NUMBER_REGEX = /^\+998\d{9}$/;

export const personalInfoFormSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .regex(PHONE_NUMBER_REGEX, 'Invalid phone number')
});

export type PersonalInfoFormSchema = z.infer<typeof personalInfoFormSchema>;
