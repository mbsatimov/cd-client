import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { ArrowLeftIcon } from 'lucide-react';

import { BaseLayout } from '@/components/layout';
import { Button } from '@/components/ui';

const ExamEndPage = () => {
  return (
    <BaseLayout className='flex h-svh max-w-3xl items-center'>
      <div className='text-center'>
        <h1 className='mb-8 text-5xl font-bold md:mb-10 md:text-5xl'>
          🎉 Thank You for Completing Your IELTS Mock Exam! 🎉
        </h1>
        <p className='mb-4 text-lg font-medium leading-8 md:pb-6 md:text-xl'>
          Your test has been successfully submitted.
        </p>
        <p className='mb-4 text-lg font-medium leading-8 md:pb-6 md:text-xl'>
          📌 Your results will be displayed in CD IELTS ZONE. Stay tuned!
        </p>
        <p className='mb-4 text-lg font-medium leading-8 md:pb-6 md:text-xl'>
          We appreciate your effort and dedication. Every step you take brings you closer to
          success. Keep practicing, stay confident, and believe in yourself!
        </p>

        <p className='mb-4 text-lg font-medium leading-8 md:pb-6 md:text-xl'>
          🌟 Good luck with your IELTS journey! 🌟
        </p>

        <Button asChild>
          <Link to='/exam'>
            <ArrowLeftIcon />
            Back to Home Page
          </Link>
        </Button>
      </div>
    </BaseLayout>
  );
};

export const Route = createLazyFileRoute('/exam/end/')({
  component: ExamEndPage
});
