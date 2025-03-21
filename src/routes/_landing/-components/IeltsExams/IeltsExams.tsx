import { BaseLayout } from '@/components/layout';
import { TextAnimate } from '@/components/magicui/text-animate.tsx';

import { ExamCards } from './components';

export const IeltsExams = () => {
  return (
    <BaseLayout className='py-10 md:py-20'>
      <h2 className='mb-10 text-center text-xl font-semibold md:mb-20 md:text-3xl'>
        <TextAnimate by='character' animation='blurInUp' once>
          Choose Your IELTS Test Format
        </TextAnimate>
      </h2>
      <ExamCards />
    </BaseLayout>
  );
};
