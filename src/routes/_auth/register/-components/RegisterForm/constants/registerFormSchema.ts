import { z } from 'zod';

const PHONE_NUMBER_REGEX = /^\+998\d{9}$/;

export const registerFormSchema = z
  .object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    phoneNumber: z
      .string()
      .min(1, 'Phone number is required')
      .regex(PHONE_NUMBER_REGEX, 'Invalid phone number'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters long'),
    passwordConfirm: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters long')
  })
  .refine(
    (data) => data.password === data.passwordConfirm,
    () => ({
      message: 'Passwords do not match',
      path: ['passwordConfirm']
    })
  );

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;
