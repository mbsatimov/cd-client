import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon
} from '@radix-ui/react-icons';

import { Button } from '@/components/ui';
import { useBasicQueryParams } from '@/hooks';

interface Props {
  total?: number;
}

export const Pagination = ({ total = 0 }: Props) => {
  let { page, size, setPage } = useBasicQueryParams();

  const pageCount = Math.ceil(total / size) || 1;

  // Page starts from 0, so we need to add 1
  page++;

  const firstPage = 1;
  const lastPage = pageCount;

  const isFirstPage = page === firstPage;
  const isLastPage = page === lastPage;

  return (
    <div className='flex items-center justify-end overflow-auto px-2'>
      <div className='flex items-center sm:space-x-6 lg:space-x-8'>
        <div className='flex items-center space-x-2'>
          <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
            Page {page} of {pageCount}
          </div>
          <Button
            className='hidden h-8 w-8 p-0 lg:flex'
            disabled={isFirstPage}
            variant='outline'
            onClick={() => setPage(0)}
          >
            <span className='sr-only'>Go to first page</span>
            <DoubleArrowLeftIcon className='h-4 w-4' />
          </Button>
          <Button
            className='h-8 w-8 p-0'
            disabled={isFirstPage}
            variant='outline'
            onClick={() => setPage((prev) => prev - 1)}
          >
            <span className='sr-only'>Go to previous page</span>
            <ChevronLeftIcon className='h-4 w-4' />
          </Button>
          <Button
            className='h-8 w-8 p-0'
            disabled={isLastPage}
            variant='outline'
            onClick={() => setPage((prev) => prev + 1)}
          >
            <span className='sr-only'>Go to next page</span>
            <ChevronRightIcon className='h-4 w-4' />
          </Button>
          <Button
            className='hidden h-8 w-8 p-0 lg:flex'
            disabled={isLastPage}
            variant='outline'
            onClick={() => setPage(lastPage)}
          >
            <span className='sr-only'>Go to last page</span>
            <DoubleArrowRightIcon className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </div>
  );
};
