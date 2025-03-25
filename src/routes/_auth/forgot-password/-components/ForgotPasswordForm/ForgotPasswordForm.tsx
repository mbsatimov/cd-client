import type { HTMLAttributes } from 'react';

import { Link } from '@tanstack/react-router';

import { Button, PasswordInput } from '@/components/ui';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { PhoneInput } from '@/components/ui/phone-input.tsx';
import { cn } from '@/lib/utils';

import { useForgotPasswordForm } from './hooks';

interface Props extends HTMLAttributes<HTMLDivElement> {}

interface Props {
  onSuccess: (otpKey: number) => void;
}

export const ForgotPasswordForm = ({ className, onSuccess, ...props }: Props) => {
  const { form, state, functions } = useForgotPasswordForm({ onSuccess });
  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(functions.onSubmit)}>
          <div className='grid gap-2'>
            <FormField
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <PhoneInput placeholder='+998 XX XXX XX XX' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name='phoneNumber'
              control={form.control}
            />
            <FormField
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name='password'
              control={form.control}
            />
            <div className='mt-2 grid gap-2 sm:grid-cols-2'>
              <Button asChild variant='outline'>
                <Link replace to='/login'>
                  Back
                </Link>
              </Button>
              <Button type='submit' loading={state.isPending}>
                Next
              </Button>
            </div>
          </div>
          <div className='mt-4 text-center text-sm'>
            Don&apos;t have an account?{' '}
            <Link replace className='underline underline-offset-4' to='/register'>
              Sign up
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};
