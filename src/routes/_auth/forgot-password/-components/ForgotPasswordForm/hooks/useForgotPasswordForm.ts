import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { postForgotPassword } from '@/utils/api/requests';

import { forgotPasswordFormSchema, type ForgotPasswordFormSchema } from '../constants';

interface Props {
  onSuccess: (otpKey: number) => void;
}

export const useForgotPasswordForm = ({ onSuccess }: Props) => {
  const form = useForm<ForgotPasswordFormSchema>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      phoneNumber: '',
      password: ''
    }
  });

  const postForgotPasswordMutation = useMutation({
    mutationFn: postForgotPassword,
    onSuccess: ({ data }) => {
      onSuccess(data);
    }
  });

  const onSubmit = (data: ForgotPasswordFormSchema) => {
    postForgotPasswordMutation.mutate({ data });
  };

  return {
    form,
    state: {
      isPending: postForgotPasswordMutation.isPending
    },
    functions: {
      onSubmit
    }
  };
};
