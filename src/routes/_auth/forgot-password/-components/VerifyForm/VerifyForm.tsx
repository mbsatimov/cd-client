import type { HTMLAttributes } from 'react';

import { MoveRightIcon } from 'lucide-react';

import { Button } from '@/components/ui';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp.tsx';
import { cn } from '@/lib/utils';

import { useVerifyForm } from './hooks';

interface Props extends HTMLAttributes<HTMLDivElement> {
  otpKey: number;
  setOtpKey: (otpKey: number | null) => void;
}

export const VerifyForm = ({ otpKey, setOtpKey, className, ...props }: Props) => {
  const { form, state, functions } = useVerifyForm({ otpKey });

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form className='grid gap-3' onSubmit={form.handleSubmit(functions.onSubmit)}>
          <Button asChild className='justify-between' size='sm' variant='secondary'>
            <a href='https://t.me/ieltszone_cd_bot' rel='noreferrer' target='_blank'>
              Open bot to get code
              <MoveRightIcon />
            </a>
          </Button>
          <FormField
            render={({ field }) => (
              <FormItem className='flex flex-col items-center'>
                <FormControl>
                  <InputOTP maxLength={4} {...field} className='flex justify-center'>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            name='code'
            control={form.control}
          />
          {state.showResetButton ? (
            <Button
              className='mx-auto w-fit'
              size='sm'
              variant='ghost'
              loading={state.isResendPending}
              onClick={functions.onResendCode}
            >
              Resend code
            </Button>
          ) : (
            <div className='h-8 text-center text-muted-foreground'>
              {state.minutesLeftToNewReset}:{state.secondsLeftToNewReset}
            </div>
          )}
          <div className='grid grid-cols-2 gap-3'>
            <Button
              className='mt-2'
              disabled={state.isPending}
              type='button'
              variant='outline'
              onClick={() => setOtpKey(null)}
            >
              Back
            </Button>
            <Button className='mt-2' type='submit' loading={state.isPending}>
              Verify
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
