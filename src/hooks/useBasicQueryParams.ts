import { parseAsInteger, useQueryState } from 'nuqs';

export const useBasicQueryParams = () => {
  const [search, setSearch] = useQueryState('search', { defaultValue: '' });
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(0));
  const [size, setSize] = useQueryState('size', parseAsInteger.withDefault(10));

  return { search, page, size, setSearch, setPage, setSize };
};
