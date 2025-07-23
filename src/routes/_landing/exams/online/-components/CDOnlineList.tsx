import { useSuspenseQuery } from '@tanstack/react-query';

import { Pagination } from '@/components/Pagination.tsx';
import { getCDOnlineAll } from '@/utils/api/requests';

import { CDOnlineItem } from './CDOnlineItem.tsx';

export const CDOnlineList = () => {
  const getCDOnlineQuery = useSuspenseQuery({
    queryKey: ['cd-online', 'all'],
    queryFn: () => getCDOnlineAll()
  });
  const data = getCDOnlineQuery.data.data;
  return (
    <div className='space-y-4 py-4'>
      <div className='grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4'>
        {data.data.map((exam) => (
          <CDOnlineItem key={exam.id} item={exam} />
        ))}
      </div>
      <Pagination total={data.total} />
    </div>
  );
};
