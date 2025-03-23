import { createLazyFileRoute, useRouter } from '@tanstack/react-router';
import { format } from 'date-fns';
import { ArrowUpRight, FileTextIcon, MailOpenIcon, MonitorIcon } from 'lucide-react';

import { BaseLayout } from '@/components/layout';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Spinner
} from '@/components/ui';

import { BookExamForm } from './-components';
import { useExamIdPage } from './-hooks';

const ExamIdPage = () => {
  const { state } = useExamIdPage();
  const router = useRouter();

  if (state.isLoading) {
    return (
      <div className='mt-20 grid place-items-center'>
        <Spinner />
      </div>
    );
  }

  if (!state.exam) {
    return (
      <div className='mt-20 grid place-items-center'>
        <p className='text-muted-foreground'>Exam not found</p>
      </div>
    );
  }

  return (
    <BaseLayout className='max-w-4xl space-y-8'>
      <Card>
        <CardHeader>
          <CardTitle>{state.exam.location}</CardTitle>
          <CardDescription>
            <a
              href={state.exam.locationUrl}
              className='inline-flex items-center gap-1 hover:underline'
            >
              Open location in Google Maps
              <ArrowUpRight className='size-4' />
            </a>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid flex-1 gap-3 sm:grid-cols-2'>
            {state.exam.type === 'PAPER' && (
              <div className='flex items-center gap-2'>
                <MailOpenIcon className='size-5' />
                <p className='text-sm'>Results expected in 1 to 3 days</p>
              </div>
            )}
            {state.exam.type === 'CD' && (
              <div className='flex items-center gap-2'>
                <MailOpenIcon className='size-5' />
                <p className='text-sm'>Results expected in 1 to 2 days</p>
              </div>
            )}
            {state.exam.type === 'PAPER' && (
              <div className='flex items-center gap-2'>
                <FileTextIcon className='size-5' />
                <p className='text-sm'>IELTS on paper</p>
              </div>
            )}
            {state.exam.type === 'CD' && (
              <div className='flex items-center gap-2'>
                <MonitorIcon className='size-5' />
                <p className='text-sm'>IELTS on computer</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className='text-xl font-bold sm:text-2xl'>Your main test time</h2>
        <p className='mb-2 text-muted-foreground'></p>
        <Card className='flex items-center justify-between'>
          <CardHeader>
            <CardTitle>{format(state.exam.examDateTime, 'p')}</CardTitle>
            <CardDescription>{format(state.exam.examDateTime, 'EEEE, dd MMMM')}</CardDescription>
          </CardHeader>
          <CardContent className='p-5'>
            <Button variant='outline' onClick={() => router.history.back()}>
              Change
            </Button>
          </CardContent>
        </Card>
      </div>
      <BookExamForm exam={state.exam} />
    </BaseLayout>
  );
};

export const Route = createLazyFileRoute('/_landing/exams/$id/')({
  component: ExamIdPage
});
