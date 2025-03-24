import { motion } from 'framer-motion';

import { BaseLayout } from '@/components/layout';
import { Marquee } from '@/components/magicui/marquee.tsx';
import { TextAnimate } from '@/components/magicui/text-animate.tsx';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui';
import { useIsMobile } from '@/hooks';

const reviews = [
  {
    name: 'Jack',
    username: '@jack',
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: 'https://avatar.vercel.sh/jack'
  },
  {
    name: 'Jill',
    username: '@jill',
    body: "I don't know what to say. I'm speechless. This is amazing.",
    img: 'https://avatar.vercel.sh/jill'
  },
  {
    name: 'John',
    username: '@john',
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: 'https://avatar.vercel.sh/john'
  }
];

const firstRow = reviews;
const secondRow = reviews;
const thirdRow = reviews;

const ReviewCard = ({
  img,
  name,
  username,
  body
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <Card className='rounded-3xl'>
      <CardHeader className='flex flex-row items-center gap-2 pb-4'>
        <img alt='' className='size-8 rounded-full' height='32' src={img} width='32' />
        <div className='flex flex-col'>
          <figcaption className='text-sm font-medium dark:text-white'>{name}</figcaption>
          <p className='text-xs font-medium dark:text-white/40'>{username}</p>
        </div>
      </CardHeader>
      <CardContent className='mt-2 text-sm'>
        <CardDescription>{body}</CardDescription>
      </CardContent>
    </Card>
  );
};

export const FeedbackCards = () => {
  const isMobile = useIsMobile();

  return (
    <BaseLayout className='py-10 md:py-20'>
      <h2 className='mb-10 text-center text-xl font-semibold md:mb-20 md:text-3xl'>
        <span className='md:hidden'>Loved by people all over the universe</span>
        <TextAnimate by='character' className='hidden md:block' animation='blurInUp' once>
          Loved by people all over the universe
        </TextAnimate>
      </h2>
      <div className='relative grid w-full grid-cols-1 flex-row items-center justify-center overflow-hidden sm:grid-cols-2 md:h-[80vh] lg:grid-cols-3'>
        <Marquee
          className='[--duration:25s] md:[--duration:10s]'
          reverse={isMobile}
          vertical={!isMobile}
        >
          {firstRow.map((review) => (
            <motion.div
              key={review.username}
              initial={{ opacity: isMobile ? 1 : 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: Math.random() }}
              viewport={{ once: true }}
            >
              <ReviewCard key={review.username} {...review} />
            </motion.div>
          ))}
        </Marquee>
        <Marquee className='[--duration:25s] md:[--duration:15s]' vertical={!isMobile}>
          {secondRow.map((review) => (
            <motion.div
              key={review.username}
              initial={{ opacity: isMobile ? 1 : 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: Math.random() }}
              viewport={{ once: true }}
            >
              <ReviewCard key={review.username} {...review} />
            </motion.div>
          ))}
        </Marquee>
        <Marquee vertical className='hidden [--duration:10s] lg:flex'>
          {thirdRow.map((review) => (
            <motion.div
              key={review.username}
              initial={{ opacity: isMobile ? 1 : 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: Math.random() }}
              viewport={{ once: true }}
            >
              <ReviewCard key={review.username} {...review} />
            </motion.div>
          ))}
        </Marquee>
        <div className='pointer-events-none absolute inset-x-0 top-0 hidden h-1/4 bg-gradient-to-b from-background md:block'></div>
        <div className='pointer-events-none absolute inset-x-0 bottom-0 hidden h-1/4 bg-gradient-to-t from-background md:block'></div>
      </div>
    </BaseLayout>
  );
};
