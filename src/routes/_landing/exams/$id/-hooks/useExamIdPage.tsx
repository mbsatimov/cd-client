import { useQuery } from '@tanstack/react-query';

import { getExamById } from '@/utils/api/requests';

import { Route } from '../index.lazy.tsx';

export const useExamIdPage = () => {
  const { id } = Route.useParams();

  const getExamByIdQuery = useQuery({
    queryKey: ['exam', id],
    queryFn: () => getExamById({ id })
  });

  return {
    state: {
      isLoading: getExamByIdQuery.isLoading,
      isSuccess: getExamByIdQuery.isSuccess,
      exam: getExamByIdQuery.data?.data
    }
  };
};
