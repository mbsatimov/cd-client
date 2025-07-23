import { createLazyFileRoute, useRouter } from '@tanstack/react-router';
import { ArrowLeftIcon } from 'lucide-react';
import React from 'react';

import { Button, Spinner } from '@/components/ui';

import {
  ListeningResultDetails,
  OverallScoresTabs,
  ReadingResultDetails,
  WritingResultDetails
} from './-components';
import { useBookingIdPage } from './-hooks';

const ResultsIdCDPage = () => {
  const { state } = useBookingIdPage();
  const [currentTab, setCurrentTab] = React.useState('listening');
  const router = useRouter();

  if (state.isLoading)
    return (
      <div className='mt-20 flex items-center justify-center'>
        <Spinner />
      </div>
    );

  if (!state.result)
    return (
      <div>
        <p>Result not found</p>
      </div>
    );

  return (
    <div className='space-y-4 md:space-y-6'>
      <div className='flex items-center gap-3'>
        <Button variant='ghost' onClick={() => router.history.back()}>
          <ArrowLeftIcon />
          <span>Back</span>
        </Button>
      </div>
      <OverallScoresTabs
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        scores={{
          listening: state.result.listeningResult?.overallScore,
          reading: state.result.readingResult?.overallScore,
          writing: state.result.writingResult?.overallScore
        }}
        sections={state.result.sections}
      />
      {currentTab === 'listening' && state.result.listeningResult && (
        <ListeningResultDetails listening={state.result.listeningResult} />
      )}
      {currentTab === 'reading' && state.result.readingResult && (
        <ReadingResultDetails reading={state.result.readingResult} />
      )}
      {currentTab === 'writing' && state.result.writingResult && (
        <WritingResultDetails writing={state.result.writingResult} />
      )}
    </div>
  );
};

export const Route = createLazyFileRoute('/_authenticated/online/$id/')({
  component: ResultsIdCDPage
});
