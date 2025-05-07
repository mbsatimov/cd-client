import { Link } from '@tanstack/react-router';

import { Pagination } from '@/components/Pagination.tsx';
import { SearchQueryInput } from '@/components/SearchQueryInput.tsx';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui';

import { useTestsTable } from './hooks';

export const TestsTable = () => {
  const { state } = useTestsTable();
  return (
    <div className='space-y-4'>
      <div>
        <SearchQueryInput />
      </div>
      <Table
        isLoading={state.isFetching}
        skeletonOptions={{
          rowCount: state.size,
          columnCount: 4,
          cellWidths: ['40%', '20%', '20%', '20%']
        }}
      >
        <TableHeader>
          <TableHead>#</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Action</TableHead>
        </TableHeader>
        <TableBody>
          {state.placementTests?.data.length ? (
            state.placementTests?.data.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className='font-medium'>
                  <Link params={{ id: String(row.id) }} to='/placements/$id'>
                    {row.title}
                  </Link>
                </TableCell>
                <TableCell>{row.description || '-'}</TableCell>
                <TableCell>
                  <Button asChild size='sm'>
                    <Link params={{ id: String(row.id) }} to='/placements/$id'>
                      Start
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className='h-24 text-center' colSpan={7}>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Pagination total={state.placementTests?.total} />
    </div>
  );
};
