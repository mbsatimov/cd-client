import type { HTMLAttributes } from 'react';

import { Button, Input } from '@/components/ui';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form.tsx';
import { cn } from '@/lib/utils.ts';

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
                  <FormControl>
                    <Input
                      type='number'
                      autoComplete='off'
                      inputMode='numeric'
                      placeholder='Enter id'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              name='leadId'
              control={form.control}
            />
            <Button
              className='mt-2'
              disabled={!form.formState.isDirty}
              type='submit'
              loading={state.isPending}
            >
              Start test
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
