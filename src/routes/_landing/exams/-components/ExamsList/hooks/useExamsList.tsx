import { useQuery } from '@tanstack/react-query';
import { useQueryState } from 'nuqs';

import { getExams } from '@/utils/api/requests';

export const useExamsList = () => {
  const [type] = useQueryState('type', { defaultValue: '' });
  const getExamsQuery = useQuery({
    queryKey: ['exams', type],
    queryFn: () =>
      getExams({
        config: { params: { type } }
      })
  });

  return {
    state: {
      exams: getExamsQuery.data?.data,
      isLoading: getExamsQuery.isLoading
    }
  };
};
