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

import { useLoginForm } from './hooks';

interface Props extends HTMLAttributes<HTMLDivElement> {}

export const LoginForm = ({ className, ...props }: Props) => {
  const { form, state, functions } = useLoginForm();
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name='password'
              control={form.control}
            />
            <Button className='mt-2' type='submit' loading={state.isPending}>
              Login
            </Button>
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
