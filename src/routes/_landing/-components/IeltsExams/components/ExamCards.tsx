import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import React from 'react';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui';
import { Meteors } from '@/components/ui/meteors.tsx';
import { cn } from '@/lib/utils.ts';

export const ExamCards = () => {
  const [hovered, setHovered] = React.useState<number | null>(null);

  return (
    <motion.div
      className='mx-auto grid max-w-2xl gap-6 lg:max-w-full lg:grid-cols-2'
      initial={{ y: 30, opacity: 0, filter: 'blur(10px)' }}
      style={{ perspective: '1000px' }}
      whileInView={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: '0px 0px -30% 0px' }}
    >
      {/* Offline CD Exam Card */}
      <Card
        className={cn(
          'group/card relative origin-left overflow-hidden transition-all duration-500 lg:hover:scale-[108%] lg:hover:shadow-xl lg:hover:shadow-primary/20',
          hovered !== null && hovered !== 0 && 'lg:[transform:rotateY(10deg)_scale(0.95)]'
        )}
        onMouseEnter={() => setHovered(0)}
        onMouseLeave={() => setHovered(null)}
      >
        <Meteors />
        <div className='flex justify-between border-b'>
          <CardHeader className='flex-1 justify-between p-5 sm:p-8'>
            <CardDescription>OFFLINE CD</CardDescription>
            <CardTitle className='text-xl leading-6 sm:text-2xl md:leading-8'>
              Experience the most realistic IELTS CD exam offline
            </CardTitle>
          </CardHeader>
          <div className='md:1/3 w-2/5 shrink-0 rounded-r-lg border-l'>
            <img
              alt=''
              className='relative z-[1] aspect-square h-full w-full object-contain'
              height={235}
              src='/landing/exams/pc.png'
              width={235}
            />
          </div>
        </div>
        <CardContent className='px-5 py-4 sm:px-8'>
          <CardDescription>
            Prepare for the real IELTS CD exam with a fully immersive offline experience. Simulate
            the actual test environment, including the same software interface and time constraints.
            Ideal for those who want to replicate the exam experience as closely as possible.
          </CardDescription>
        </CardContent>
        <CardFooter className='gap-4 px-5 pb-4 sm:px-8'>
          <Button asChild>
            <Link to='/exams'>Book now</Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Online CD Exam Card */}
      <Card
        className={cn(
          'group/card relative origin-right overflow-hidden transition-all duration-500 lg:hover:scale-[108%] lg:hover:shadow-xl lg:hover:shadow-primary/20',
          hovered !== null && hovered !== 1 && 'lg:[transform:rotateY(-10deg)_scale(0.95)]'
        )}
        onMouseEnter={() => setHovered(1)}
        onMouseLeave={() => setHovered(null)}
      >
        <Meteors />
        <div className='flex justify-between border-b'>
          <CardHeader className='flex-1 justify-between p-5 sm:p-8'>
            <CardDescription>ONLINE CD</CardDescription>
            <CardTitle className='text-xl leading-6 sm:text-2xl md:leading-8'>
              Take your IELTS test online, anytime, anywhere
            </CardTitle>
          </CardHeader>
          <div className='md:1/3 w-2/5 shrink-0 rounded-r-lg border-l'>
            <img
              alt=''
              className='relative z-[1] aspect-square h-full w-full object-contain'
              height={235}
              src='/landing/exams/laptop.png'
              width={235}
            />
          </div>
        </div>
        <CardContent className='px-5 py-4 md:px-8'>
          <CardDescription>
            Enjoy the flexibility of taking your IELTS CD exam online from anywhere. With a lower
            cost and convenient access, this option allows you to take the exam at your own pace,
            right from the comfort of your home. Perfect for those seeking a more affordable and
            accessible test experience.
          </CardDescription>
        </CardContent>
        <CardFooter className='gap-4 px-5 pb-4 md:px-8'>
          <Button asChild>
            <Link to='/exams/online'>Try now</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
