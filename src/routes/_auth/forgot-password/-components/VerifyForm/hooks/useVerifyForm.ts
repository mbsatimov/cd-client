import type { AxiosError } from 'axios';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useCanGoBack, useRouter } from '@tanstack/react-router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useTimer } from '@/hooks';
import { postResendCode, putResetPassword } from '@/utils/api/requests';

import { verifyFormSchema, type VerifyFormSchema } from '../constants';

interface Props {
  otpKey: number;
}

export const useVerifyForm = ({ otpKey }: Props) => {
  const form = useForm<VerifyFormSchema>({
    resolver: zodResolver(verifyFormSchema),
    defaultValues: {
      code: ''
    }
  });
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const [showResetButton, setShowResetButton] = React.useState(false);
  const {
    start,
    reset,
    minutesLeft: minutesLeftToNewReset,
    secondsLeft: secondsLeftToNewReset
  } = useTimer({
    autoStart: true,
    initialTime: 180,
    onTimerEnd: () => setShowResetButton(true)
  });

  const putVerifyMutation = useMutation({
    mutationFn: putResetPassword,
    onSuccess: () => {
      toast.success('Password reset successfully');
      if (canGoBack) router.history.back();
      else router.navigate({ to: '/login' });
    },
    onError(error: AxiosError<{ message: string }>) {
      form.setError('code', {
        type: 'custom',
        message: error.response?.data?.message
      });
    }
  });

  const postResendCodeMutation = useMutation({
    mutationFn: postResendCode,
    onSuccess: () => {
      toast.success('Verification code updated, check your phone');
      reset();
      start();
      setShowResetButton(false);
    },
    onError(error: AxiosError<{ message: string }>) {
      toast.error(error.response?.data?.message);
    }
  });

  const onSubmit = (data: VerifyFormSchema) => {
    putVerifyMutation.mutate({
      otpKey,
      config: { params: { code: data.code } }
    });
  };

  const onResendCode = () => {
    postResendCodeMutation.mutate({ otpKey });
  };

  return {
    form,
    state: {
      isPending: putVerifyMutation.isPending,
      isResendPending: postResendCodeMutation.isPending,
      minutesLeftToNewReset,
      secondsLeftToNewReset,
      showResetButton
    },
    functions: {
      onSubmit,
      onResendCode
    }
  };
};
