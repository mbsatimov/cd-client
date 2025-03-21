import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useCanGoBack, useRouter } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { postLogin } from '@/utils/api/requests';
import { useAuth } from '@/utils/stores';

import { loginFormSchema, type LoginFormSchema } from '../constants';

export const useLoginForm = () => {
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      phoneNumber: '',
      password: ''
    }
  });

  const authStore = useAuth();
  const router = useRouter();
  const canGoBack = useCanGoBack();
  const postLoginMutation = useMutation({
    mutationFn: postLogin,
    onSuccess: ({ data }) => {
      toast.success('Logged in successfully');
      authStore.setAccessToken(data.token);
      if (canGoBack) router.history.back();
      else router.navigate({ to: '/' });
    }
  });

  const onSubmit = (data: LoginFormSchema) => {
    postLoginMutation.mutate({ data });
  };

  return {
    form,
    state: {
      isPending: postLoginMutation.isPending
    },
    functions: {
      onSubmit
    }
  };
};
