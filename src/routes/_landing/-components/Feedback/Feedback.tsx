import { motion } from 'motion/react';

import { BaseLayout } from '@/components/layout';
import { Marquee } from '@/components/magicui/marquee.tsx';
import { TextAnimate } from '@/components/magicui/text-animate.tsx';
import { useIsMobile } from '@/hooks';

import { FeedbackCard } from './components';
import { reviews } from './data.ts';

const firstRow = reviews;
const secondRow = reviews;
const thirdRow = reviews;

export const Feedback = () => {
  const isMobile = useIsMobile();

  return (
    <BaseLayout className='py-10 md:py-20'>
      <h2 className='mb-10 text-center text-xl font-semibold md:mb-20 md:text-3xl'>
        <span className='md:hidden'>Loved by people all over the universe</span>
        <TextAnimate by='character' className='hidden md:block' animation='blurInUp' once>
          Loved by people all over the universe
        </TextAnimate>
      </h2>
      <div className='relative grid w-full grid-cols-1 flex-row items-center justify-center overflow-hidden md:h-[80vh] md:grid-cols-2 lg:grid-cols-3'>
        <Marquee
          className='[--duration:25s] md:[--duration:15s]'
          reverse={isMobile}
          vertical={!isMobile}
          pauseOnHover
        >
          {firstRow.map((review) => (
            <motion.div
              key={review.body}
              initial={isMobile ? undefined : { opacity: 0 }}
              whileInView={isMobile ? undefined : { opacity: 1 }}
              transition={isMobile ? undefined : { duration: 0.5, delay: Math.random() }}
              viewport={isMobile ? undefined : { once: true }}
            >
              <FeedbackCard key={review.body} {...review} />
            </motion.div>
          ))}
        </Marquee>
        <Marquee className='[--duration:25s] md:[--duration:20s]' vertical={!isMobile} pauseOnHover>
          {secondRow.map((review) => (
            <motion.div
              key={review.body}
              initial={isMobile ? undefined : { opacity: 0 }}
              whileInView={isMobile ? undefined : { opacity: 1 }}
              transition={isMobile ? undefined : { duration: 0.5, delay: Math.random() }}
              viewport={isMobile ? undefined : { once: true }}
            >
              <FeedbackCard key={review.body} {...review} />
            </motion.div>
          ))}
        </Marquee>
        <Marquee vertical className='hidden [--duration:15s] lg:flex' pauseOnHover>
          {thirdRow.map((review) => (
            <motion.div
              key={review.body}
              initial={{ opacity: isMobile ? 1 : 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: Math.random() }}
              viewport={{ once: true }}
            >
              <FeedbackCard key={review.body} {...review} />
            </motion.div>
          ))}
        </Marquee>
        <div className='pointer-events-none absolute inset-x-0 top-0 hidden h-1/4 bg-gradient-to-b from-background md:block'></div>
        <div className='pointer-events-none absolute inset-x-0 bottom-0 hidden h-1/4 bg-gradient-to-t from-background md:block'></div>
      </div>
    </BaseLayout>
  );
};
