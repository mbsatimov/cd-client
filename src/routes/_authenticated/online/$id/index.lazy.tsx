import { useSuspenseQuery } from '@tanstack/react-query';
import { createLazyFileRoute, Link, useRouter } from '@tanstack/react-router';
import { ArrowLeftIcon } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui';
import { getCDOnlineResult } from '@/utils/api/requests';

import {
  ListeningResultDetails,
  OverallScoresTabs,
  ReadingResultDetails,
  WritingResultDetails
} from './-components';

const ResultsIdCDPage = () => {
  const { id } = Route.useParams();

  const getExamResultsQuery = useSuspenseQuery({
    queryKey: ['results', id],
    queryFn: () => getCDOnlineResult({ participantId: id })
  });

  const result = getExamResultsQuery.data.data;

  const [currentTab, setCurrentTab] = React.useState('listening');
  const router = useRouter();

  if (!result)
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
      {!result.listeningResult || !result.readingResult || !result.writingResult ? (
        <div className='mx-auto max-w-2xl'>
          <p className='mb-8 text-5xl font-bold md:mb-10 md:text-6xl'>Attention!</p>
          <p className='mb-6 text-lg font-medium leading-8 md:pb-8 md:text-xl'>
            This is an IELTS mock exam consisting of {result.sections.join(', ')}. Test takes up to{' '}
            {result.sections.length} hours to complete. You can not leave the test unless finished.
            Please answer to all questions.
          </p>

          <ul className='list-inside list-disc space-y-2 md:text-lg'>
            <li>Make sure you have stable internet connection.</li>
            <li>Test your speakers. You should be able to hear the audio clearly.</li>
            <li>Enter the code given to you.</li>
            <li>Click &quot;Start Exam&quot; button once you are ready.</li>
            <li>Good luck with your exam!</li>
          </ul>
          <Button className='mt-10' size='lg' type='submit'>
            <Link params={{ id: String(id) }} to='/exam/online/$id'>
              Start Exam
            </Link>
          </Button>
        </div>
      ) : (
        <>
          <OverallScoresTabs
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            scores={{
              listening: result.listeningResult?.overallScore,
              reading: result.readingResult?.overallScore,
              writing: result.writingResult?.overallScore
            }}
            sections={result.sections}
          />
          {currentTab === 'listening' && result.listeningResult && (
            <ListeningResultDetails listening={result.listeningResult} />
          )}
          {currentTab === 'reading' && result.readingResult && (
            <ReadingResultDetails reading={result.readingResult} />
          )}
          {currentTab === 'writing' && result.writingResult && (
            <WritingResultDetails writing={result.writingResult} />
          )}
        </>
      )}
    </div>
  );
};

export const Route = createLazyFileRoute('/_authenticated/online/$id/')({
  component: ResultsIdCDPage
});
