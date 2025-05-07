import { Search } from 'lucide-react';
import React from 'react';

import { useBasicQueryParams, useDebouncedValue } from '@/hooks';
import { cn } from '@/lib/utils';

import { Input } from './ui/input';

type Props = React.ComponentProps<typeof Input>;

export const SearchQueryInput = ({ className, placeholder, ...props }: Props) => {
  const { search: searchQuery, setPage, setSearch: setSearchQuery } = useBasicQueryParams();
  const [search, setSearch] = React.useState(searchQuery);

  const debouncedValue = useDebouncedValue(search);

  React.useEffect(() => {
    setSearchQuery(debouncedValue).then();
    setPage(null);
  }, [debouncedValue]);

  return (
    <div className='relative w-full'>
      <Input
        {...props}
        className={cn('max-w-80 pl-10', className)}
        size='sm'
        type='search'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder || 'Search...'}
      />
      <span className='pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3'>
        <Search className='size-4 text-muted-foreground' />
      </span>
    </div>
  );
};
