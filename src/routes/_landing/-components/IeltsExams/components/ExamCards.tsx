import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { MoveRightIcon } from 'lucide-react';
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
            <CardDescription>ON COMPUTER</CardDescription>
            <CardTitle className='text-xl leading-6 sm:text-2xl md:leading-8'>
              Take your IELTS test digitally with ease
            </CardTitle>
          </CardHeader>
          <div className='md:1/3 w-2/5 shrink-0 rounded-r-lg border-l'>
            <img
              alt=''
              className='relative z-[1] h-full w-full object-cover'
              height={235}
              src='/landing/exams/pc.png'
              width={235}
            />
          </div>
        </div>
        <CardContent className='px-5 py-4 sm:px-8'>
          <CardDescription>
            Experience the IELTS test on a computer with a user-friendly interface, fast results,
            and a seamless testing experience. Ideal for candidates comfortable with digital
            environments.
          </CardDescription>
        </CardContent>
        <CardFooter className='gap-4 px-5 pb-4 sm:px-8'>
          <Button asChild>
            <Link search={{ type: 'CD' }} to='/exams'>
              Book now
            </Link>
          </Button>
          <Button
            asChild
            className='group transition-opacity group-hover/card:opacity-100 lg:opacity-0'
            variant='ghost'
          >
            <Link search={{ type: 'offline-cd' }} to='/features'>
              <span>Learn more</span>
              <MoveRightIcon className='transition group-hover:translate-x-1' />
            </Link>
          </Button>
        </CardFooter>
      </Card>
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
            <CardDescription>ON PAPER</CardDescription>
            <CardTitle className='text-xl leading-6 sm:text-2xl md:leading-8'>
              The traditional way to take your IELTS test
            </CardTitle>
          </CardHeader>
          <div className='md:1/3 w-2/5 shrink-0 rounded-r-lg border-l'>
            <img
              alt=''
              className='relative z-[1] h-full w-full object-cover'
              height={235}
              src='/landing/exams/paper.png'
              width={235}
            />
          </div>
        </div>
        <CardContent className='px-5 py-4 md:px-8'>
          <CardDescription>
            Prefer the classic approach? Take your test on paper, using a pen and answer sheets. A
            great option for those who are used to handwriting their answers.
          </CardDescription>
        </CardContent>
        <CardFooter className='gap-4 px-5 pb-4 md:px-8'>
          <Button asChild>
            <Link search={{ type: 'PAPER' }} to='/exams'>
              Book now
            </Link>
          </Button>
          <Button
            asChild
            className='group transition-opacity group-hover/card:opacity-100 lg:opacity-0'
            variant='ghost'
          >
            <Link search={{ type: 'paper' }} to='/features'>
              <span>Learn more</span>
              <MoveRightIcon className='transition group-hover:translate-x-1' />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};
