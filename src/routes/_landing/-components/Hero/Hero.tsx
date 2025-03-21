import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { MoveRightIcon } from 'lucide-react';

import { BaseLayout } from '@/components/layout';
import { Button } from '@/components/ui';
import { BackgroundLines } from '@/components/ui/background-lines.tsx';

export const Hero = () => {
  return (
    <BaseLayout className='h-screen !pt-0 pb-10 md:pb-20'>
      <motion.div
        animate={{ opacity: 0.17 }}
        className='absolute left-[20px] top-1/3 -z-10 aspect-square w-[55%] rounded-full bg-[#FFD700] blur-[100px]'
        initial={{ opacity: 0 }}
        transition={{ duration: 1, delay: 1 }}
      />
      <motion.div
        animate={{ opacity: 0.17 }}
        className='absolute right-[20px] top-1/3 -z-10 aspect-square w-[55%] rounded-full bg-[#6d28d9] blur-[100px]'
        initial={{ opacity: 0 }}
        transition={{ duration: 1, delay: 1 }}
      />
      <BackgroundLines className='relative flex h-full flex-col justify-center'>
        <motion.h1
          animate={{ y: 0, opacity: 1 }}
          className='relative mx-auto mt-6 max-w-4xl text-center text-2xl font-semibold md:text-4xl lg:text-8xl lg:leading-[1.2]'
          initial={{ y: 30, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <span>
            Participate in the <span className='text-yellow-400'>MOCK IELTS EXAM</span>
          </span>
        </motion.h1>
        <motion.p
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          className='relative mx-auto mt-6 max-w-3xl text-center text-base text-muted-foreground md:text-xl'
          initial={{ y: 30, opacity: 0, rotateX: 20 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          Our platform provides a comprehensive set of resources to help you prepare for the IELTS
          exam. Whether you&apos;re a beginner or an advanced learner, we have everything you need
          to succeed.
        </motion.p>
        <motion.div
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          className='mx-auto mb-10 mt-8 space-x-4 md:mb-20'
          initial={{ y: 40, opacity: 0, rotateX: 20 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Button asChild>
            <Link to='/exams'>Book now</Link>
          </Button>
          <Button asChild className='group' variant='ghost'>
            <Link to='/features'>
              Learn More
              <MoveRightIcon className='transition group-hover:translate-x-1' />
            </Link>
          </Button>
        </motion.div>
      </BackgroundLines>
    </BaseLayout>
  );
};
