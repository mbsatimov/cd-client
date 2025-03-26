import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui';

export const FeedbackCard = ({ img, name, body }: { img: string; name: string; body: string }) => {
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
