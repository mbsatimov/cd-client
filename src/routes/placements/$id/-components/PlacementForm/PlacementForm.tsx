import type { HTMLAttributes } from 'react';

import { Button, Input } from '@/components/ui';
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

import { usePlacementForm } from './hooks';

interface Props extends HTMLAttributes<HTMLDivElement> {}

export const PlacementForm = ({ className, ...props }: Props) => {
  const { form, state, functions } = usePlacementForm();
  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(functions.onSubmit)}>
          <div className='grid gap-2'>
            <FormField
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input autoComplete='off' placeholder='Enter full name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name='fullName'
              control={form.control}
            />
            <FormField
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <PhoneInput autoComplete='off' placeholder='+998 XX XXX XX XX' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name='phoneNumber'
              control={form.control}
            />
            <Button className='mt-2' type='submit' loading={state.isPending}>
              Start test
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
