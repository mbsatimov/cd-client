import { useQuery } from '@tanstack/react-query';

import { getCDResults } from '@/utils/api/requests';

import { Route } from '../index.lazy.tsx';

export const useBookingIdPage = () => {
  const { id } = Route.useParams();

  const getExamResultsQuery = useQuery({
    queryKey: ['results', id],
    queryFn: () => getCDResults({ config: { params: { registrationId: id } } })
  });

  return {
    state: {
      isLoading: getExamResultsQuery.isLoading,
      result: getExamResultsQuery.data?.data
    }
  };
};
