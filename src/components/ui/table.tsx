import * as React from 'react';

import { cn } from '@/lib/utils';

import { Skeleton } from './skeleton';

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement> & {
    isLoading?: boolean;
    skeletonOptions?: TableSkeletonProps;
  }
>(({ className, isLoading, skeletonOptions, ...props }, ref) => (
  <div className='relative size-full overflow-auto rounded-md border border-border'>
    {isLoading ? (
      <TableSkeleton className={className} {...skeletonOptions} />
    ) : (
      <table ref={ref} className={cn('w-full caption-bottom text-sm', className)} {...props} />
    )}
  </div>
));
Table.displayName = 'Table';

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />
));
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props} />
));
TableBody.displayName = 'TableBody';

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', className)}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        'border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
        className
      )}
      {...props}
    />
  )
);
TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'h-10 text-nowrap px-2 text-left align-middle font-medium text-foreground/80 [&:has([role=checkbox])]:pr-0',
      className
    )}
    {...props}
  />
));
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn('text-nowrap p-2 align-middle [&:has([role=checkbox])]:pr-0', className)}
    {...props}
  />
));
TableCell.displayName = 'TableCell';

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption ref={ref} className={cn('mt-4 text-sm text-muted-foreground', className)} {...props} />
));
TableCaption.displayName = 'TableCaption';

const TableEmpty = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { isEmpty: boolean }
>(({ className, children, isEmpty, ...props }, ref) =>
  isEmpty ? null : (
    <div
      ref={ref}
      className={cn('flex h-[200px] w-full items-center justify-center text-center', className)}
      {...props}
    >
      {children || 'No data'}
    </div>
  )
);
TableEmpty.displayName = 'TableEmpty';

interface TableSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  cellWidths?: string[];
  columnCount?: number;
  rowCount?: number;
  shrinkZero?: boolean;
}

const TableSkeleton = (props: TableSkeletonProps) => {
  const {
    columnCount = 5,
    rowCount = 10,
    cellWidths = ['auto'],
    shrinkZero = false,
    ...skeletonProps
  } = props;
  return (
    <div>
      <Table
        {...skeletonProps}
        skeletonOptions={{
          columnCount,
          rowCount,
          cellWidths,
          shrinkZero,
          ...skeletonProps
        }}
      >
        <TableHeader>
          {Array.from({ length: 1 }).map((_, i) => (
            <TableRow key={i} className='hover:bg-transparent'>
              {Array.from({ length: columnCount }).map((_, j) => (
                <TableHead
                  key={j}
                  style={{
                    width: cellWidths[j],
                    minWidth: shrinkZero ? cellWidths[j] : 'auto'
                  }}
                >
                  <Skeleton className='h-6 w-full' />
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {Array.from({ length: rowCount }).map((_, i) => (
            <TableRow key={i} className='hover:bg-transparent'>
              {Array.from({ length: columnCount }).map((_, j) => (
                <TableCell
                  key={j}
                  style={{
                    width: cellWidths[j],
                    minWidth: shrinkZero ? cellWidths[j] : 'auto'
                  }}
                >
                  <Skeleton className='h-6 w-full' />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableEmpty,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  TableSkeleton
};
