import type { AxiosError } from 'axios';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useCanGoBack, useRouter } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { postResendCode, putVerify } from '@/utils/api/requests';
import { useAuth } from '@/utils/stores';

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
  const authStore = useAuth();
  const router = useRouter();
  const canGoBack = useCanGoBack();

  const putVerifyMutation = useMutation({
    mutationFn: putVerify,
    onSuccess: ({ data }) => {
      toast.success('Registered successfully');
      authStore.setAccessToken(data.token);
      if (canGoBack) router.history.back();
      else router.navigate({ to: '/' });
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
      isResendPending: postResendCodeMutation.isPending
    },
    functions: {
      onSubmit,
      onResendCode
    }
  };
};
