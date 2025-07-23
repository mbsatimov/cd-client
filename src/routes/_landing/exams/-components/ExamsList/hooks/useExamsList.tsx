import { useQuery } from '@tanstack/react-query';

import { getExams } from '@/utils/api/requests';

export const useExamsList = () => {
  const getExamsQuery = useQuery({
    queryKey: ['exams'],
    queryFn: () => getExams()
  });

  return {
    state: {
      exams: getExamsQuery.data?.data,
      isLoading: getExamsQuery.isLoading
    }
  };
};
