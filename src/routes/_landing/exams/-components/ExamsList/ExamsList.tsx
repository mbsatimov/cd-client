import { Link } from '@tanstack/react-router';
import { format } from 'date-fns';
import { ArrowUpRight, FileTextIcon, MailOpenIcon, MonitorIcon } from 'lucide-react';

import { Pagination } from '@/components/Pagination.tsx';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Separator,
  Spinner
} from '@/components/ui';
import { formatPrice } from '@/lib/utils.ts';

import { useExamsList } from './hooks';

export const ExamList = () => {
  const { state } = useExamsList();
  if (state.isLoading) {
    return (
      <div className='mt-10 grid place-items-center'>
        <Spinner />
      </div>
    );
  }
  return (
    <div className='space-y-4 py-4'>
      {state.exams?.data.length ? (
        state.exams?.data.map((exam) => (
          <article key={exam.id}>
            <Card className='flex flex-col overflow-hidden sm:flex-row'>
              <div className='hidden flex-col items-center justify-center border-r bg-primary p-3 text-primary-foreground sm:flex'>
                <div className='text-2xl font-bold'>{format(exam.examDateTime, 'MMM')}</div>
                <span className='text-2xl font-bold'>{format(exam.examDateTime, 'dd')}</span>
                <Separator className='my-2 w-6 bg-white' />
                <span className='text-lg font-bold'>{format(exam.examDateTime, 'E')}</span>
              </div>
              <div className='bg-primary p-3 text-primary-foreground sm:hidden'>
                <div className='text-lg font-bold'>
                  {format(exam.examDateTime, 'dd MMMM, EEEE')}
                </div>
              </div>
              <div className='flex-1'>
                <CardHeader className='flex-row justify-between space-y-0 border-b p-4'>
                  <div className='space-y-2'>
                    <CardTitle className='text-xl md:text-2xl'>{exam.location}</CardTitle>
                    <CardDescription>
                      <a
                        href={exam.locationUrl}
                        className='inline-flex items-center gap-1 hover:underline'
                      >
                        Open location in Google Maps
                        <ArrowUpRight className='size-4' />
                      </a>
                    </CardDescription>
                  </div>
                  <div className='text-right text-sm'>
                    <div className='text-lg font-semibold'>{format(exam.examDateTime, 'p')}</div>
                    <div className='text-muted-foreground'>
                      {format(exam.examDateTime, 'dd MMMM, yyyy')}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className='flex p-4'>
                  <div className='grid flex-1 gap-3 md:grid-cols-2'>
                    {exam.type === 'PAPER' && (
                      <div className='flex items-center gap-2'>
                        <MailOpenIcon className='size-5' />
                        <p className='text-sm'>Results expected in 1 to 3 days</p>
                      </div>
                    )}
                    {exam.type === 'CD' && (
                      <div className='flex items-center gap-2'>
                        <MailOpenIcon className='size-5' />
                        <p className='text-sm'>Results expected in 1 to 2 days</p>
                      </div>
                    )}
                    {exam.type === 'PAPER' && (
                      <div className='flex items-center gap-2'>
                        <FileTextIcon className='size-5' />
                        <p className='text-sm'>IELTS on paper</p>
                      </div>
                    )}
                    {exam.type === 'CD' && (
                      <div className='flex items-center gap-2'>
                        <MonitorIcon className='size-5' />
                        <p className='text-sm'>IELTS on computer</p>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className='flex items-end justify-between gap-6 p-4 pt-0'>
                  <div className='flex flex-wrap items-center gap-2'>
                    <div className='flex items-center gap-2 text-sm'>{formatPrice(exam.price)}</div>
                    <Badge className='bg-yellow-500 hover:bg-yellow-500/80'>
                      For our students {formatPrice(exam.priceForOurStudents)}
                    </Badge>
                  </div>
                  <div className='flex items-end'>
                    <Button asChild>
                      <Link params={{ id: String(exam.id) }} to='/exams/$id'>
                        Book now
                      </Link>
                    </Button>
                  </div>
                </CardFooter>
              </div>
            </Card>
          </article>
        ))
      ) : (
        <div className='my-10 text-center text-muted-foreground'>No exams found</div>
      )}
      <Pagination total={state.exams?.total} />
    </div>
  );
};
