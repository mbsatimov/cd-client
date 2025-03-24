import { BaseLayout } from '@/components/layout';
import { TextAnimate } from '@/components/magicui/text-animate.tsx';

import { WhyChooseUsCards } from './components';

export const WhyChooseUs = () => {
  return (
    <BaseLayout className='py-10 md:py-20'>
      <h2 className='mb-10 text-center text-xl font-semibold md:mb-20 md:text-3xl'>
        <span className='md:hidden'>Why Choose IELTS ZONE for Mock IELTS?</span>
        <TextAnimate by='character' className='hidden md:block' animation='blurInUp' once>
          Why Choose IELTS ZONE for Mock IELTS?
        </TextAnimate>
      </h2>
      <WhyChooseUsCards />
    </BaseLayout>
  );
};
