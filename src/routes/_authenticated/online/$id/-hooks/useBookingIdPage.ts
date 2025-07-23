import { useQuery } from '@tanstack/react-query';

import { getCDOnlineResult } from '@/utils/api/requests';

import { Route } from '../index.lazy.tsx';

export const useBookingIdPage = () => {
  const { id } = Route.useParams();

  const getExamResultsQuery = useQuery({
    queryKey: ['results', id],
    queryFn: () => getCDOnlineResult({ participantId: id })
  });

  return {
    state: {
      isLoading: getExamResultsQuery.isLoading,
      result: getExamResultsQuery.data?.data
    }
  };
};
