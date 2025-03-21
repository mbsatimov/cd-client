import { createLazyFileRoute } from '@tanstack/react-router';

import { BaseLayout } from '@/components/layout';
import { Button, Input } from '@/components/ui';

import { useExamPage } from './-hooks';

const WritingTestPage = () => {
  const { state, functions } = useExamPage();

  return (
    <BaseLayout className='flex h-svh max-w-3xl items-center'>
      <div>
        <p className='mb-8 text-5xl font-bold md:mb-10 md:text-6xl'>Attention!</p>
        <p className='mb-6 text-lg font-medium leading-8 md:pb-8 md:text-xl'>
          This is an IELTS mock exam consisting of Listening, Reading and Writing. Test takes up to
          3 hours to complete. You can leave the test unless finished. Please answer to all
          questions.
        </p>

        <ul className='list-inside list-disc space-y-2 md:text-lg'>
          <li>Make sure you have stable internet connection.</li>
          <li>Test your speakers. You should be able to hear the audio clearly.</li>
          <li>Enter the code given to you.</li>
          <li>Click &quot;Start Exam&quot; button once you are ready.</li>
          <li>Good luck with your exam!</li>
        </ul>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            functions.onSubmit();
          }}
        >
          <div className='mt-6'>
            <Input
              className='max-w-md'
              value={state.code}
              onChange={(e) => functions.setCode(e.target.value)}
              placeholder='Enter code'
            />
          </div>
          <Button className='mt-10' size='lg' type='submit' loading={state.isLoading}>
            Start Exam
          </Button>
        </form>
      </div>
    </BaseLayout>
  );
};

export const Route = createLazyFileRoute('/exam/')({
  component: WritingTestPage
});
