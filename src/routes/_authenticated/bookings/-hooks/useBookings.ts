import { useQuery } from '@tanstack/react-query';

import { getRegistrations } from '@/utils/api/requests';

export const useBookingsPage = () => {
  const getExamResultsQuery = useQuery({
    queryKey: ['bookings'],
    queryFn: () => getRegistrations()
  });

  return {
    state: {
      results: getExamResultsQuery.data?.data,
      isLoading: getExamResultsQuery.isLoading
    }
  };
};
