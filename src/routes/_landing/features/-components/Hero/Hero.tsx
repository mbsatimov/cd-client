import { motion } from 'framer-motion';

import { BaseLayout } from '@/components/layout';
import { BackgroundLines } from '@/components/ui/background-lines.tsx';

import { ReadingScreen } from './components';

export const Hero = () => {
  return (
    <BaseLayout className='min-h-screen !pt-0 pb-10 md:pb-20'>
      <BackgroundLines className='relative flex flex-col py-20 md:py-40'>
        <motion.h1
          animate={{ y: 0, opacity: 1 }}
          className='relative mx-auto mt-6 max-w-4xl text-center text-2xl font-semibold md:text-3xl lg:text-7xl lg:leading-[1.2]'
          initial={{ y: 30, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          Simple, Powerful Features
        </motion.h1>
        <motion.p
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          className='relative mx-auto mt-6 max-w-3xl text-center text-base text-muted-foreground md:text-xl'
          initial={{ y: 30, opacity: 0, rotateX: 20 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          Our platform is packed with features to help you get the most out of your exams.
        </motion.p>
      </BackgroundLines>

      <motion.div
        animate={{ y: 0, opacity: 1, rotateX: 0, filter: 'blur(0px)' }}
        className='relative mx-auto max-w-6xl rounded-[32px] border border-neutral-200/50 bg-neutral-100 p-2 backdrop-blur-lg dark:border-neutral-700 dark:bg-neutral-800/50 md:p-4'
        initial={{ y: 40, opacity: 0, rotateX: 0, filter: 'blur(10px)' }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        <motion.div
          animate={{ opacity: 0.2 }}
          className='absolute -top-1/4 left-[20px] -z-10 aspect-square w-[55%] rounded-full bg-[#FFD700] blur-[100px]'
          initial={{ opacity: 0 }}
          transition={{ duration: 1, delay: 1 }}
        />
        <motion.div
          animate={{ opacity: 0.2 }}
          className='absolute -top-1/4 right-[20px] -z-10 aspect-square w-[55%] rounded-full bg-[#6d28d9] blur-[100px]'
          initial={{ opacity: 0 }}
          transition={{ duration: 1, delay: 1 }}
        />
        <div className='rounded-[24px] border border-neutral-200 bg-background/50 p-2 dark:border-neutral-700 dark:bg-black'>
          <ReadingScreen />
        </div>
      </motion.div>
    </BaseLayout>
  );
};
