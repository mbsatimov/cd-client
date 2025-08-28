import { motion } from 'motion/react';

import { cn } from '@/lib/utils.ts';

const items = [
  {
    title: 'Anytime, Anywhere Testing',
    description: 'Visualize users taking the exam at their convenience — any day, any time.',
    image: '/landing/features/anywhere.png'
  },
  {
    title: 'Realistic Exam Materials',
    description: 'Highlight that the questions and format resemble real Cambridge-style tests.',
    image: '/landing/features/feedback.png'
  },
  {
    title: 'Affordable Pricing',
    description:
      'Highlight that the exams closely replicate official Cambridge tests, and that qualified teachers evaluate writing and speaking sections.',
    image: '/landing/features/affordable.png'
  },
  {
    title: 'Instant Results',
    description: 'Show users instantly receiving their results right after completing the test.',
    image: '/landing/features/quick-results.png'
  }
];

export const OnlineCDTab = () => {
  return (
    <div>
      {items.map((item, index) => (
        <div key={item.description} className='py-10 md:py-20'>
          <h3 className='mb-6 mt-4 text-left text-2xl font-extrabold tracking-tight sm:text-4xl md:mb-20 md:text-6xl md:leading-none'>
            {item.title}
          </h3>
          <div
            className={cn(
              'relative flex flex-col gap-8 md:gap-20',
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            )}
          >
            <div className='md:basis-1/3'>
              <p className='text-base font-normal md:text-xl lg:text-2xl lg:leading-normal'>
                {item.description}
              </p>
            </div>
            <motion.div
              className='relative rounded-2xl bg-gradient-to-b from-yellow-400/30 to-primary/80 p-10 shadow-2xl md:flex-1'
              initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 'some' }}
            >
              <img alt={item.title} className='aspect-[3/2] object-contain' src={item.image} />
            </motion.div>
          </div>
        </div>
      ))}
    </div>
  );
};
