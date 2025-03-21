import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { postRegister } from '@/utils/api/requests';

import { registerFormSchema, type RegisterFormSchema } from '../constants';

interface Props {
  onSuccess: (otpKey: number) => void;
}

export const useRegisterForm = ({ onSuccess }: Props) => {
  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      password: '',
      passwordConfirm: ''
    }
  });

  const postRegisterMutation = useMutation({
    mutationFn: postRegister,
    onSuccess: ({ data }) => {
      onSuccess(data);
    }
  });

  const onSubmit = ({ passwordConfirm, ...data }: RegisterFormSchema) => {
    postRegisterMutation.mutate({ data });
  };

  return {
    form,
    state: {
      isPending: postRegisterMutation.isPending
    },
    functions: {
      onSubmit
    }
  };
};
