import { useSuspenseQuery } from '@tanstack/react-query';

import { getRegistrations } from '@/utils/api/requests';

export const useBookingList = () => {
  const getRegistrationsQuery = useSuspenseQuery({
    queryKey: ['registrations'],
    queryFn: () => getRegistrations()
  });

  return {
    state: {
      registrations: getRegistrationsQuery.data.data,
      isLoading: getRegistrationsQuery.isLoading
    }
  };
};
