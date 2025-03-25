import { z } from 'zod';

const PHONE_NUMBER_REGEX = /^\+998\d{9}$/;

export const forgotPasswordFormSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .regex(PHONE_NUMBER_REGEX, 'Invalid phone number'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters long')
});

export type ForgotPasswordFormSchema = z.infer<typeof forgotPasswordFormSchema>;
