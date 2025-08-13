import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { LaptopMinimalCheckIcon, MonitorCheckIcon } from 'lucide-react';

import { BaseLayout } from '@/components/layout';
import { Button } from '@/components/ui';
import { BackgroundLines } from '@/components/ui/background-lines.tsx';
import { useIsMobile } from '@/hooks';

export const Hero = () => {
  const isMobile = useIsMobile();

  return (
    <BackgroundLines className='relative h-[calc(100vh-64px)] !pt-0 pb-10 md:pb-20'>
      <BaseLayout className='flex h-full flex-col justify-center'>
        <motion.div
          animate={{ opacity: isMobile ? 0.3 : 0.2 }}
          className='absolute left-0 top-1/2 -z-10 aspect-square w-[55%] rounded-full bg-[#FFD700] blur-[100px] md:left-[20px] md:top-1/3'
          initial={{ opacity: 0 }}
          transition={{ duration: 1, delay: 1 }}
        />
        <motion.div
          animate={{ opacity: isMobile ? 0.3 : 0.2 }}
          className='absolute right-0 top-1/2 -z-10 aspect-square w-[55%] rounded-full bg-[#6d28d9] blur-[100px] md:right-[20px] md:top-1/3'
          initial={{ opacity: 0 }}
          transition={{ duration: 1, delay: 1 }}
        />
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
          Mock IELTS ZONE is a comprehensive online platform offering realistic IELTS mock exams in
          computer-based format. Receive detailed feedback after each test, monitor your progress
          over time, and prepare with confidence for your official IELTS examination.
        </motion.p>
        <motion.div
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          className='mx-auto mb-10 mt-8 grid grid-cols-2 items-center gap-3 md:mb-20'
          initial={{ y: 40, opacity: 0, rotateX: 20 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Button asChild>
            <Link to='/exams'>
              <MonitorCheckIcon />
              CD Offline
            </Link>
          </Button>
          <Button asChild className='group' variant='secondary'>
            <Link to='/exams/online'>
              <LaptopMinimalCheckIcon />
              CD Online
            </Link>
          </Button>
        </motion.div>
      </BaseLayout>
    </BackgroundLines>
  );
};
