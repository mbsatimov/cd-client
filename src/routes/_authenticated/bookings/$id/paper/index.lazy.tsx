import { createLazyFileRoute, useRouter } from '@tanstack/react-router';
import { ArrowLeftIcon } from 'lucide-react';

import { Button, Spinner } from '@/components/ui';

import { ListeningAnswersTable, OverallScores, ReadingAnswersTable } from './-components';
import { useBookingIdPage } from './-hooks';

const ResultsIdPaperPage = () => {
  const { state } = useBookingIdPage();
  const router = useRouter();

  if (state.isLoading)
    return (
      <div className='mt-20 flex items-center justify-center'>
        <Spinner className='size-10' />
      </div>
    );

  if (!state.result)
    return (
      <div>
        <p>Result not found</p>
      </div>
    );

  return (
    <div className='space-y-6'>
      <div className='flex items-center gap-3'>
        <Button variant='ghost' onClick={() => router.history.back()}>
          <ArrowLeftIcon />
          <span>Back</span>
        </Button>
      </div>
      <OverallScores
        scores={{
          listening: state.result.listeningResult.overallScore,
          reading: state.result.readingResult.overallScore,
          speaking: state.result.speakingResult.overallScore,
          writing: state.result.writingResult.overallScore
        }}
      />
      <ListeningAnswersTable listening={state.result.listeningResult} />
      <ReadingAnswersTable reading={state.result.readingResult} />
    </div>
  );
};

export const Route = createLazyFileRoute('/_authenticated/bookings/$id/paper/')({
  component: ResultsIdPaperPage
});
