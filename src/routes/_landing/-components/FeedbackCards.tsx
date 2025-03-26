import { motion } from 'framer-motion';

import { BaseLayout } from '@/components/layout';
import { Marquee } from '@/components/magicui/marquee.tsx';
import { TextAnimate } from '@/components/magicui/text-animate.tsx';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui';
import { useIsMobile } from '@/hooks';

const reviews = [
  {
    name: "Laziz G'ayratov",
    body: "Exam was almost real. At the same time, I will recommend my friends. It is first time I have attended to the mock exam. Zo'r I can say a word 👍👍👍",
    img: 'https://avatar.vercel.sh/42'
  },
  {
    name: 'Candidate',
    body: 'The exam was so amazing and I felt the real exam atmosphere, and I did not expect so much. it was 100% out of 100. The speaking was my favourite and all the sections were cool. I think the reading was quite difficult because I usually got 7 but I got 5. But it is okay.',
    img: 'https://avatar.vercel.sh/jill'
  },
  {
    name: 'Shaxzod',
    body: 'I am really satisfied with the mock exam took place in IELTS ZONE. It is really similar to real exam. What I like most about mock exam is materials which is authentic and as well as invigilators.',
    img: 'https://avatar.vercel.sh/john'
  },
  {
    name: 'Nigina',
    body: 'I liked it. I give 70% out of 100%. I liked the speaking most. I recommend others to take exam at IELTS ZONE. I like all the thing about mock exam, materials, invigilators and service.',
    img: 'https://avatar.vercel.sh/next.js'
  },
  {
    name: 'Imomali',
    body: 'The mock exam condition was really good. It was 99.9% similar to real exam. All the things were well orginized. I really recommend anyone to take a mock exam at IELTSZONE if they wanna feel real exam condition.',
    img: 'https://avatar.vercel.sh/jane'
  },
  {
    name: 'Tommy',
    body: 'I liked the mock exam. I have felt exam atmosphere because I took IELTS before. I know how its atmosphere. Everything was satisfactory👌(Especially feedback folder).',
    img: 'https://avatar.vercel.sh/satori'
  }
];

const firstRow = reviews;
const secondRow = reviews;
const thirdRow = reviews;

const ReviewCard = ({ img, name, body }: { img: string; name: string; body: string }) => {
  return (
    <Card className='h-full w-[300px] rounded-3xl md:w-full'>
      <CardHeader className='flex flex-row items-center gap-2 space-y-0 pb-4'>
        <img alt='' className='size-8 rounded-full' height='32' src={img} width='32' />
        <figcaption className='text-sm font-medium dark:text-white'>{name}</figcaption>
      </CardHeader>
      <CardContent className='mt-2 text-sm'>
        <CardDescription className='line-clamp-5'>{body}</CardDescription>
      </CardContent>
    </Card>
  );
};

export const FeedbackCards = () => {
  const isMobile = useIsMobile();

  console.log(isMobile);

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
          className='[--duration:25s] md:[--duration:10s]'
          reverse={isMobile}
          vertical={!isMobile}
        >
          {firstRow.map((review) => (
            <motion.div
              key={review.body}
              initial={isMobile ? undefined : { opacity: 0 }}
              whileInView={isMobile ? undefined : { opacity: 1 }}
              transition={isMobile ? undefined : { duration: 0.5, delay: Math.random() }}
              viewport={isMobile ? undefined : { once: true }}
            >
              <ReviewCard key={review.body} {...review} />
            </motion.div>
          ))}
        </Marquee>
        <Marquee className='[--duration:25s] md:[--duration:15s]' vertical={!isMobile}>
          {secondRow.map((review) => (
            <motion.div
              key={review.body}
              initial={isMobile ? undefined : { opacity: 0 }}
              whileInView={isMobile ? undefined : { opacity: 1 }}
              transition={isMobile ? undefined : { duration: 0.5, delay: Math.random() }}
              viewport={isMobile ? undefined : { once: true }}
            >
              <ReviewCard key={review.body} {...review} />
            </motion.div>
          ))}
        </Marquee>
        <Marquee vertical className='hidden [--duration:10s] lg:flex'>
          {thirdRow.map((review) => (
            <motion.div
              key={review.body}
              initial={{ opacity: isMobile ? 1 : 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: Math.random() }}
              viewport={{ once: true }}
            >
              <ReviewCard key={review.body} {...review} />
            </motion.div>
          ))}
        </Marquee>
        <div className='pointer-events-none absolute inset-x-0 top-0 hidden h-1/4 bg-gradient-to-b from-background md:block'></div>
        <div className='pointer-events-none absolute inset-x-0 bottom-0 hidden h-1/4 bg-gradient-to-t from-background md:block'></div>
      </div>
    </BaseLayout>
  );
};
