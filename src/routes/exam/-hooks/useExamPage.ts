import { useMutation } from '@tanstack/react-query';
import { useRouter } from '@tanstack/react-router';
import React from 'react';

import { getMockByCode } from '@/utils/api/requests';

export const useExamPage = () => {
  const router = useRouter();
  const [code, setCode] = React.useState('');

  const getExamsByIdQuery = useMutation({
    mutationFn: getMockByCode,
    onSuccess: () => {
      router.navigate({
        to: '/exam/$id',
        params: { id: code }
      });
    }
  });

  const onSubmit = () => {
    getExamsByIdQuery.mutate({
      config: { params: { code } }
    });
  };

  return {
    state: {
      code,
      isLoading: getExamsByIdQuery.isPending
    },
    functions: {
      setCode,
      onSubmit
    }
  };
};
