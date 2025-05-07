import { useQuery } from '@tanstack/react-query';

import { useBasicQueryParams } from '@/hooks';
import { getPlacementTests } from '@/utils/api/requests';

export const useTestsTable = () => {
  const { search, page, size } = useBasicQueryParams();

  const getTestsTestsQuery = useQuery({
    queryKey: ['placementTests', search, page, size],
    queryFn: () => getPlacementTests({ config: { params: { search, page, size } } })
  });

  return {
    state: {
      placementTests: getTestsTestsQuery.data?.data,
      page,
      size,
      isFetching: getTestsTestsQuery.isFetching
    }
  };
};
