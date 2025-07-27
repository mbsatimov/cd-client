import { useSuspenseQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { format } from 'date-fns';

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui';
import { getCDOnlineParticipation } from '@/utils/api/requests';

export const CDOnlineList = () => {
  const getCDOnlineQuery = useSuspenseQuery({
    queryKey: ['cd-online', 'me'],
    queryFn: () => getCDOnlineParticipation()
  });
  const data = getCDOnlineQuery.data.data;

  return (
    <div className='grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-4'>
      {data.data.map((exam) => (
        <Card key={exam.id}>
          <CardHeader>
            <CardTitle>TEST 1</CardTitle>
            <CardDescription>Reserved on {format(exam.createdAt, 'dd MMMM, EEEE')}</CardDescription>
          </CardHeader>
          <CardContent className='grid grid-flow-col gap-3'>
            {exam.sections.map((section) => (
              <div key={section} className='rounded-md bg-primary/10 p-4 dark:bg-primary/30'>
                <p className='text-center font-bold text-primary'>{section}</p>
              </div>
            ))}
          </CardContent>
          <CardFooter className='flex justify-end'>
            <Button asChild variant='secondary'>
              <Link params={{ id: String(exam.id) }} to='/online/$id'>
                See details
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
