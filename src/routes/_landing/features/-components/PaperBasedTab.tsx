import { motion } from 'framer-motion';

import { cn } from '@/lib/utils.ts';

const items = [
  {
    title: 'SMS Notifications',
    description:
      'Visual showing SMS alerts – users get notified about important updates like test changes, speaking test dates, and other relevant info via SMS.',
    image: '/landing/features/sms.png'
  },
  {
    title: 'Website Access',
    description:
      'Illustrate how users can easily view their results, register for exams, and access other helpful features via the website.',
    image: '/landing/features/website.png'
  },
  {
    title: 'Real Exam Experience',
    description:
      'Highlight that the exams closely replicate official Cambridge tests, and that qualified teachers evaluate writing and speaking sections.',
    image: '/landing/features/atmosphere.png'
  },
  {
    title: 'Headphone Setup',
    description:
      'Show candidates equipped with proper headphones to simulate a real exam environment.',
    image: '/landing/features/headphone.png'
  },
  {
    title: 'Results & Feedback',
    description:
      'Include visuals showing users receiving detailed results, feedback, their speaking audio recordings, and scanned answer sheets — all accessible through the website.',
    image: '/landing/features/feedback.png'
  }
];

export const PaperBasedTab = () => {
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
